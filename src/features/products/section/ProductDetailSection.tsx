'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback, useState } from 'react';
import ProductDetailTem from '@/features/products/template/ProductDetailTem/ProductDetailTem';
import {
  getProductById,
  updateMyProduct,
  deleteProduct,
} from '@/features/products/api/products.api';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '@/features/wishlist/api/wishlist.api';
import { cartApi } from '@/features/cart/api/cart.api';
import {
  CATEGORY_SECTIONS,
  BREADCRUMB_ITEMS,
  ERROR_MESSAGES,
  getCategoryLabelById,
  getSubCategoryLabelById,
  PATHNAME,
} from '@/constants';
import { getApiUrl } from '@/utils/api';
import { useToast } from '@/hooks/useToast';
import { useAuthStore } from '@/lib/store/authStore';
import { ROLE_LEVEL } from '@/utils/auth';
import CustomModal from '@/components/molecules/CustomModal/CustomModal';
import LinkText from '@/components/atoms/LinkText/LinkText';
import ProductEditModal, {
  type ProductEditFormData,
} from '@/components/molecules/ProductEditModal/ProductEditModal';
import type { DetailPageLayoutProps } from '@/components/organisms/DetailPageLayout/DetailPageLayout';
import type { Option } from '@/components/atoms/DropDown/DropDown';

const ProductDetailSection = () => {
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : '';
  const productId = params?.productId ? String(params.productId) : '';

  const queryClient = useQueryClient();
  const router = useRouter();
  const { triggerToast } = useToast();
  const { user } = useAuthStore();
  const [isCartAddFailedModalOpen, setIsCartAddFailedModalOpen] = useState(false);
  const [isCartAddSuccessModalOpen, setIsCartAddSuccessModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // 메니저 이상급만 ItemMenu 사용 가능
  const canUseMenu = useMemo(() => {
    if (!user?.role) return false;
    const userRole = user.role;
    return ROLE_LEVEL[userRole] >= ROLE_LEVEL.manager;
  }, [user?.role]);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });

  // 위시리스트 목록 조회
  const { data: wishlistData } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => getWishlist(),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });

  // 현재 상품이 위시리스트에 있는지 확인
  const isLiked = useMemo(() => {
    if (!wishlistData?.data || !productId) return false;
    return wishlistData.data.some((item) => item.product.id === Number(productId));
  }, [wishlistData, productId]);

  // 위시리스트 추가 mutation
  const addWishlistMutation = useMutation({
    mutationFn: () => addToWishlist(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      triggerToast('success', '위시리스트에 추가되었습니다.');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '위시리스트 추가에 실패했습니다.';
      triggerToast('error', message);
    },
  });

  // 위시리스트 제거 mutation
  const removeWishlistMutation = useMutation({
    mutationFn: () => removeFromWishlist(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      triggerToast('success', '위시리스트에서 제거되었습니다.');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '위시리스트 제거에 실패했습니다.';
      triggerToast('error', message);
    },
  });

  // 위시리스트 토글 핸들러
  const handleToggleLike = useCallback(() => {
    if (isLiked) {
      removeWishlistMutation.mutate();
    } else {
      addWishlistMutation.mutate();
    }
  }, [isLiked, addWishlistMutation, removeWishlistMutation]);

  // 장바구니 추가 mutation
  const addToCartMutation = useMutation({
    mutationFn: (qty: number) => cartApi.addToCart(Number(productId), qty),
    onSuccess: () => {
      // 캐시 즉시 제거하여 최신 데이터 보장
      queryClient.removeQueries({ queryKey: ['cart'] });
      setIsCartAddSuccessModalOpen(true);
    },
    onError: () => {
      setIsCartAddFailedModalOpen(true);
    },
  });

  // 장바구니 담기 핸들러
  const handleAddToCart = useCallback(
    (qty: number) => {
      if (!productId) {
        triggerToast('error', '상품 정보를 불러올 수 없습니다.');
        return;
      }
      addToCartMutation.mutate(qty);
    },
    [productId, addToCartMutation, triggerToast]
  );

  const handleCloseCartAddFailedModal = useCallback(() => {
    setIsCartAddFailedModalOpen(false);
  }, []);

  const handleCloseCartAddSuccessModal = useCallback(() => {
    setIsCartAddSuccessModalOpen(false);
  }, []);

  const handleGoToCart = useCallback(() => {
    setIsCartAddSuccessModalOpen(false);
    router.push(PATHNAME.CART(companyId));
  }, [companyId, router]);

  const handleGoToProducts = useCallback(() => {
    setIsCartAddSuccessModalOpen(false);
    router.push(PATHNAME.PRODUCTS(companyId));
  }, [companyId, router]);

  const detailPageProps: DetailPageLayoutProps = useMemo(() => {
    if (!product) {
      return {
        breadcrumbItems: [],
        productDetailHeader: {
          productName: '',
          price: 0,
          purchaseCount: 0,
        },
      };
    }

    const categoryLabel = product.categoryId ? getCategoryLabelById(product.categoryId) : null;
    const subCategoryLabel = product.categoryId
      ? getSubCategoryLabelById(product.categoryId)
      : null;

    const breadcrumbItems = [
      {
        label: BREADCRUMB_ITEMS.HOME.label,
        href: BREADCRUMB_ITEMS.HOME.href(companyId),
      },
      {
        label: BREADCRUMB_ITEMS.PRODUCTS.label,
        href: BREADCRUMB_ITEMS.PRODUCTS.href(companyId),
      },
      ...(categoryLabel
        ? [
            {
              label: categoryLabel,
              href: BREADCRUMB_ITEMS.PRODUCTS.href(companyId),
            },
          ]
        : []),
      ...(subCategoryLabel
        ? [
            {
              label: subCategoryLabel,
              href: BREADCRUMB_ITEMS.PRODUCTS.href(companyId),
            },
          ]
        : []),
    ];

    const imageUrl = product.image
      ? `${getApiUrl()}/uploads/${product.image}`
      : '/icons/no-image.svg';

    return {
      breadcrumbItems,
      productImage: {
        src: imageUrl,
        alt: product.name,
      },
      productDetailHeader: {
        productName: product.name,
        price: product.price,
        purchaseCount: product.salesCount || 0,
        // type을 전달하지 않으면 ProductDetailHeader에서 역할에 따라 자동 결정
        type: undefined,
        onAddToCart: handleAddToCart,
        // manager 이상일 때만 onMenuClick 전달
        onMenuClick: canUseMenu
          ? (action) => {
              if (action === 'edit') setEditModalOpen(true);
              if (action === 'delete') setDeleteModalOpen(true);
            }
          : undefined,
      },
      accordionPanels: [
        {
          id: 'link',
          label: '제품 링크',
          content: product.link ? (
            <LinkText
              url={product.link}
              className="text-14 tracking--0.35 text-gray-600 tablet:text-16 tablet:tracking--0.4 desktop:text-16 desktop:tracking--0.4"
              clickable
            />
          ) : (
            '링크 없음'
          ),
        },
      ],
      liked: isLiked,
      onToggleLike: handleToggleLike,
    };
  }, [product, companyId, isLiked, handleToggleLike, handleAddToCart, canUseMenu]);

  // 수정 모달 핸들러
  const handleEditSubmit = useCallback(
    async (data: ProductEditFormData): Promise<void> => {
      try {
        await updateMyProduct(productId, data);
        triggerToast('success', '상품이 수정되었습니다.');
        // 상품 상세와 목록 모두 invalidate하여 최신 데이터 보장
        await queryClient.invalidateQueries({ queryKey: ['product', productId] });
        await queryClient.invalidateQueries({ queryKey: ['products'] });
        setEditModalOpen(false);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : '상품 수정에 실패했습니다.';
        triggerToast('error', message);
      }
    },
    [productId, queryClient, triggerToast]
  );

  // 삭제 모달 핸들러
  const handleDeleteConfirm = useCallback(async (): Promise<void> => {
    try {
      await deleteProduct(productId);
      triggerToast('success', '상품이 삭제되었습니다.');
      // 서버와 재동기화: invalidate로 모든 관련 쿼리 무효화
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      await queryClient.invalidateQueries({ queryKey: ['product', productId] });
      setDeleteModalOpen(false);
      // 리다이렉트 후 페이지가 마운트될 때 쿼리가 활성화되면 자동으로 refetch됨
      router.push(PATHNAME.PRODUCTS(companyId));
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '상품 삭제에 실패했습니다.';
      triggerToast('error', message);
    }
  }, [productId, companyId, router, queryClient, triggerToast]);

  // 카테고리 옵션 초기화 (수정 모달용)
  const initialCategoryOption = useMemo((): Option | null => {
    if (!product?.categoryId) return null;
    const categoryLabel = getCategoryLabelById(product.categoryId);
    // 카테고리 라벨을 Option 형식으로 변환 (간단한 매핑)
    const categoryMap: Record<string, Option> = {
      스낵: { key: '1', label: '스낵' },
      음료: { key: '2', label: '음료' },
      생수: { key: '3', label: '생수' },
      간편식: { key: '4', label: '간편식' },
      신선식: { key: '5', label: '신선식' },
      원두커피: { key: '6', label: '원두커피' },
      비품: { key: '7', label: '비품' },
    };
    return categoryLabel ? (categoryMap[categoryLabel] ?? null) : null;
  }, [product?.categoryId]);

  const initialSubCategoryOption = useMemo((): Option | null => {
    if (!product?.categoryId) return null;
    const subCategoryLabel = getSubCategoryLabelById(product.categoryId);
    // 서브카테고리 라벨을 Option 형식으로 변환 (간단한 매핑)
    // 실제로는 더 정확한 매핑이 필요할 수 있음
    return subCategoryLabel ? { key: subCategoryLabel, label: subCategoryLabel } : null;
  }, [product?.categoryId]);

  const initialLink = useMemo(() => product?.link || '', [product?.link]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  return (
    <>
      <ProductDetailTem
        categorySections={CATEGORY_SECTIONS}
        detailPageProps={detailPageProps}
        isLoading={isLoading}
        hasProduct={!!product}
      />
      <CustomModal
        open={isCartAddFailedModalOpen}
        type="cart-add-failed"
        description="나중에 다시 시도해주세요."
        onClose={handleCloseCartAddFailedModal}
        onConfirm={handleCloseCartAddFailedModal}
      />
      <CustomModal
        open={isCartAddSuccessModalOpen}
        type="cart-add-success"
        description="장바구니에 상품이 추가되었습니다."
        onClose={handleCloseCartAddSuccessModal}
        onGoToCart={handleGoToCart}
        onGoToProducts={handleGoToProducts}
      />
      {canUseMenu && (
        <>
          <ProductEditModal
            open={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            onSubmit={handleEditSubmit}
            initialName={product?.name || ''}
            initialPrice={product?.price ? String(product.price) : ''}
            initialLink={initialLink}
            initialImage={product?.image ? `${getApiUrl()}/uploads/${product.image}` : null}
            initialCategory={initialCategoryOption}
            initialSubCategory={initialSubCategoryOption}
          />
          <CustomModal
            open={deleteModalOpen}
            type="delete"
            productName={product?.name || ''}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={handleDeleteConfirm}
          />
        </>
      )}
    </>
  );
};

export default ProductDetailSection;

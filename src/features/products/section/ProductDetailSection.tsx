'use client';

import { useParams, useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useCallback, useState, useEffect } from 'react';
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
  PATHNAME,
  getChildById,
  getParentById,
  buildProductBreadcrumb,
} from '@/constants';
import { buildImageUrl } from '@/utils/api';
import { useToast } from '@/hooks/useToast';
import { useAuthStore } from '@/lib/store/authStore';
import { ROLE_LEVEL } from '@/utils/auth';
import { logger } from '@/utils/logger';
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
  const [editModalImageUrl, setEditModalImageUrl] = useState<string | null>(null);
  const [imageRefreshKey, setImageRefreshKey] = useState(0); // 이미지 캐시 무효화를 위한 키

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
    staleTime: 0, // 캐시 없이 항상 최신 데이터 가져오기 (이미지 업데이트 반영)
    refetchOnMount: true, // ✅ 페이지 마운트 시 항상 최신 데이터 가져오기
    refetchOnWindowFocus: true, // ✅ 윈도우 포커스 시 refetch
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

  // 수정 모달용 이미지 URL 로드 (signed URL 필요)
  useEffect(() => {
    const loadImageUrl = async () => {
      if (product?.image) {
        try {
          const url = await buildImageUrl(product.image);
          setEditModalImageUrl(url || null);
        } catch {
          // 이미지 로딩 실패 시 null로 설정
          setEditModalImageUrl(null);
        }
      } else {
        setEditModalImageUrl(null);
      }
    };
    loadImageUrl().catch(() => {
      // 에러는 이미 loadImageUrl 내부에서 처리됨
    });
  }, [product?.image]);

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
    onSuccess: async () => {
      // 캐시 무효화하여 자동으로 최신 데이터를 다시 가져옴 (GNB 업데이트 포함)
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
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
    // 장바구니 캐시를 무효화하고 refetch하여 최신 데이터를 가져오도록 함
    (async () => {
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      await queryClient.refetchQueries({ queryKey: ['cart'] });
      router.push(PATHNAME.CART(companyId));
    })().catch((refetchError) => {
      // 에러 발생 시 로그만 남기고 계속 진행
      logger.error('Failed to refetch cart before navigation', {
        hasError: true,
        errorType: refetchError instanceof Error ? refetchError.constructor.name : 'Unknown',
      });
      // 에러가 발생해도 페이지 이동은 진행
      router.push(PATHNAME.CART(companyId));
    });
  }, [companyId, router, queryClient]);

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

    // buildProductBreadcrumb를 사용하여 대분류와 소분류를 모두 포함한 breadcrumb 생성
    const categoryBreadcrumbItems = buildProductBreadcrumb({ categoryId: product.categoryId });

    const breadcrumbItems = [
      {
        label: BREADCRUMB_ITEMS.HOME.label,
        href: BREADCRUMB_ITEMS.HOME.href(companyId),
      },
      {
        label: BREADCRUMB_ITEMS.PRODUCTS.label,
        href: BREADCRUMB_ITEMS.PRODUCTS.href(companyId),
      },
      // buildProductBreadcrumb에서 반환된 대분류와 소분류 추가
      ...categoryBreadcrumbItems.map((item) => ({
        label: item.label,
        href: item.href,
      })),
    ];

    // 프록시 API를 통해 이미지 로드 (CORS 방지)
    // imageRefreshKey를 사용하여 이미지 업데이트 시 캐시 무효화
    const imageUrl = product?.image
      ? `/api/product/image?key=${encodeURIComponent(product.image)}&t=${imageRefreshKey}`
      : '/icons/no-image.svg';

    return {
      breadcrumbItems,
      productImage: {
        src: imageUrl,
        alt: product.name,
      },
      productImageKey: product.image || null,
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
    async (
      data: ProductEditFormData,
      options?: { imageFile?: File; removeImage?: boolean }
    ): Promise<void> => {
      try {
        // 새 이미지 파일이 있으면 options에 imageFile 전달
        // X 버튼으로 이미지가 삭제된 경우 removeImage=true 전달
        const hasNewImageFile = !!options?.imageFile;
        const initialImageKey = product?.image || null;
        const hasNoImage = !data.image && !initialImageKey;
        let updateOptions;
        if (hasNewImageFile) {
          updateOptions = { imageFile: options.imageFile }; // 새 이미지 파일 전달 (이미 S3에 업로드됨)
        } else if (hasNoImage) {
          updateOptions = { removeImage: true }; // 이미지가 삭제된 경우
        } else {
          updateOptions = undefined; // 기존 이미지 유지
        }

        logger.info('[ProductDetailSection] handleEditSubmit: 상품 수정 시작', {
          hasImageFile: hasNewImageFile,
          removeImage: hasNoImage,
          imageKey: data.image,
        });

        await updateMyProduct(productId, data, updateOptions);

        // 상품 상세와 목록 모두 invalidate하여 최신 데이터 보장
        await queryClient.invalidateQueries({ queryKey: ['product', productId] });
        await queryClient.invalidateQueries({ queryKey: ['products'] });
        // myProduct 쿼리도 invalidate (내 상품 디테일 페이지와 동기화)
        await queryClient.invalidateQueries({ queryKey: ['myProduct', productId] });
        // 쿼리를 완전히 리셋하고 다시 가져오기
        await queryClient.resetQueries({ queryKey: ['product', productId] });
        // 즉시 refetch하여 수정된 데이터가 바로 반영되도록 함
        await queryClient.refetchQueries({
          queryKey: ['product', productId],
          type: 'active',
        });

        // 이미지 리프레시를 위한 타임스탬프 증가 (캐시 무효화)
        setImageRefreshKey((prev) => prev + 1);

        setEditModalOpen(false);
        // 페이지를 강제로 새로고침하여 최신 데이터 반영
        router.refresh();
        triggerToast('success', '상품이 수정되었습니다.');
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : '상품 수정에 실패했습니다.';
        triggerToast('error', message);
      }
    },
    [productId, queryClient, triggerToast, router]
  );

  // 삭제 모달 핸들러
  const handleDeleteConfirm = useCallback(async (): Promise<void> => {
    try {
      // 실제 삭제 API 호출 (서버에서 삭제 완료 대기)
      await deleteProduct(productId);
      triggerToast('success', '상품이 삭제되었습니다.');

      // 서버와 재동기화: 모든 관련 쿼리 무효화 및 reset
      // resetQueries를 먼저 호출하여 모든 캐시를 제거
      queryClient.resetQueries({ queryKey: ['products'] }).catch(() => {});
      queryClient.resetQueries({ queryKey: ['product', productId] }).catch(() => {});

      // invalidateQueries로 모든 쿼리를 무효화
      queryClient.invalidateQueries({ queryKey: ['products'] }).catch(() => {});
      queryClient.invalidateQueries({ queryKey: ['product', productId] }).catch(() => {});

      setDeleteModalOpen(false);

      // 리다이렉트 (ProductListSection의 refetchOnMount: true로 자동 리페치됨)
      // resetQueries로 캐시가 제거되었으므로 새로운 데이터를 서버에서 가져옴
      router.push(PATHNAME.PRODUCTS(companyId));
    } catch (err: unknown) {
      // 에러 발생 시 모든 쿼리 무효화
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      await queryClient.invalidateQueries({ queryKey: ['product', productId] });
      const message = err instanceof Error ? err.message : '상품 삭제에 실패했습니다.';
      triggerToast('error', message);
    }
  }, [productId, companyId, router, queryClient, triggerToast]);

  // 카테고리 옵션 초기화 (수정 모달용)
  const initialCategoryOption = useMemo((): Option | null => {
    if (!product?.categoryId) return null;
    // categoryId는 소분류 ID이므로, 소분류를 찾아서 대분류를 가져옴
    const childCategory = getChildById(product.categoryId);
    if (!childCategory) return null;

    const parentCategory = getParentById(childCategory.parentId);
    if (!parentCategory) return null;

    // 대분류 ID를 문자열 key로 변환 (드롭다운에서 사용하는 형식)
    return { key: String(parentCategory.id), label: parentCategory.name };
  }, [product?.categoryId]);

  const initialSubCategoryOption = useMemo((): Option | null => {
    if (!product?.categoryId) return null;
    // categoryId는 소분류 ID이므로, 소분류를 직접 찾음
    const childCategory = getChildById(product.categoryId);
    if (!childCategory) return null;

    // 소분류 key와 name을 사용하여 Option 생성
    return { key: childCategory.key, label: childCategory.name };
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
            initialImage={editModalImageUrl}
            initialImageKey={product?.image || null}
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

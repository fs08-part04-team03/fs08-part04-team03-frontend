'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import ProductDetailTem from '@/features/products/template/ProductDetailTem/ProductDetailTem';
import { useProduct } from '@/features/products/queries/product.queries';
import {
  CATEGORY_SECTIONS,
  BREADCRUMB_ITEMS,
  ERROR_MESSAGES,
  getChildById,
  getParentById,
  buildProductBreadcrumb,
} from '@/constants';
import { useAuthStore } from '@/lib/store/authStore';
import { ROLE_LEVEL } from '@/utils/auth';
import LinkText from '@/components/atoms/LinkText/LinkText';
import type { DetailPageLayoutProps } from '@/components/organisms/DetailPageLayout/DetailPageLayout';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import { useProductNavigation } from '@/features/products/handlers/useProductNavigation';
import { useProductModals } from '@/features/products/handlers/useProductModals';
import { useProductWishlistActions } from '@/features/products/handlers/useProductWishlistActions';
import { useProductCartActions } from '@/features/products/handlers/useProductCartActions';
import { useProductEditActions } from '@/features/products/handlers/useProductEditActions';
import { PRODUCT_LABELS } from '@/features/products/constants';
import { logger } from '@/utils/logger';

const ProductDetailSection = () => {
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : '';
  const productId = params?.productId ? String(params.productId) : '';

  const { user } = useAuthStore();
  const [editModalImageUrl, setEditModalImageUrl] = useState<string | null>(null);

  // 메니저 이상급만 ItemMenu 사용 가능
  const canUseMenu = useMemo(() => {
    if (!user?.role) return false;
    const userRole = user.role;
    return ROLE_LEVEL[userRole] >= ROLE_LEVEL.manager;
  }, [user?.role]);

  // 데이터 패칭
  const { data: product, isLoading, error } = useProduct(productId, { enabled: !!productId });

  // 핸들러 훅 사용
  const navigation = useProductNavigation(companyId);
  const modals = useProductModals();
  const wishlistActions = useProductWishlistActions(productId);
  const cartActions = useProductCartActions(
    productId,
    modals.handleOpenCartAddSuccessModal,
    modals.handleOpenCartAddFailedModal
  );
  const editActions = useProductEditActions(productId, companyId, () => {
    modals.handleCloseEditModal();
  });

  // 수정 모달용 이미지 URL 로드 (signed URL 필요)
  useEffect(() => {
    setEditModalImageUrl(product?.imageUrl ?? null);
  }, [product?.imageUrl]);

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

    return {
      breadcrumbItems,
      productImage: {
        src: product.imageUrl || '/icons/no-image.svg',
        alt: product.name,
      },
      productImageKey: product.imageUrl || null,
      productDetailHeader: {
        productName: product.name,
        price: product.price,
        purchaseCount: product.salesCount || 0,
        // type을 전달하지 않으면 ProductDetailHeader에서 역할에 따라 자동 결정
        type: undefined,
        onAddToCart: cartActions.handleAddToCart,
        // manager 이상일 때만 onMenuClick 전달
        onMenuClick: canUseMenu
          ? (action) => {
              if (action === 'edit') modals.handleOpenEditModal();
              if (action === 'delete') modals.handleOpenDeleteModal();
            }
          : undefined,
      },
      accordionPanels: [
        {
          id: 'link',
          label: PRODUCT_LABELS.ACCORDION.PRODUCT_LINK,
          content: product.link ? (
            <LinkText
              url={product.link}
              className="text-14 tracking--0.35 text-gray-600 tablet:text-16 tablet:tracking--0.4 desktop:text-16 desktop:tracking--0.4"
              clickable
            />
          ) : (
            PRODUCT_LABELS.ACCORDION.LINK_NONE
          ),
        },
      ],
      liked: wishlistActions.isLiked,
      onToggleLike: wishlistActions.handleToggleLike,
    };
  }, [
    product,
    companyId,
    wishlistActions.isLiked,
    wishlistActions.handleToggleLike,
    cartActions.handleAddToCart,
    canUseMenu,
    modals,
  ]);

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

  // 에러 상태 분기
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  return (
    <ProductDetailTem
      categorySections={CATEGORY_SECTIONS}
      detailPageProps={detailPageProps}
      isLoading={isLoading}
      hasProduct={!!product}
      productCategoryId={product?.categoryId ?? null}
      canUseMenu={canUseMenu}
      editModalOpen={modals.editModalOpen}
      deleteModalOpen={modals.deleteModalOpen}
      onCloseEditModal={modals.handleCloseEditModal}
      onCloseDeleteModal={modals.handleCloseDeleteModal}
      onEditSubmit={editActions.handleEditSubmit}
      onDeleteConfirm={editActions.handleDeleteConfirm}
      initialCategoryOption={initialCategoryOption}
      initialSubCategoryOption={initialSubCategoryOption}
      initialLink={initialLink}
      initialImage={editModalImageUrl}
      initialImageKey={product?.imageUrl || null}
      productName={product?.name || ''}
      productPrice={product?.price ? String(product.price) : ''}
      cartAddFailedModalOpen={modals.cartAddFailedModalOpen}
      cartAddSuccessModalOpen={modals.cartAddSuccessModalOpen}
      onCloseCartAddFailedModal={modals.handleCloseCartAddFailedModal}
      onCloseCartAddSuccessModal={modals.handleCloseCartAddSuccessModal}
      onGoToCart={() => {
        navigation.goToCart().catch((navError) => {
          logger.error('Failed to navigate to cart', {
            hasError: true,
            errorType: navError instanceof Error ? navError.constructor.name : 'Unknown',
          });
        });
      }}
      onGoToProducts={navigation.goToProducts}
      onChangeCategory={navigation.goToProductsByCategory}
    />
  );
};

export default ProductDetailSection;

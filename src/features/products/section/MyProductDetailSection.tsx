'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import MyProductDetailTem from '@/features/products/template/MyProductDetailTem/MyProductDetailTem';
import { useMyProduct } from '@/features/products/queries/product.queries';
import {
  CATEGORY_SECTIONS,
  BREADCRUMB_ITEMS,
  LOADING_MESSAGES,
  ERROR_MESSAGES,
  buildProductBreadcrumb,
  getChildById,
  getParentById,
} from '@/constants';
import { useAuthStore } from '@/lib/store/authStore';
import { ROLE_LEVEL } from '@/utils/auth';
import LinkText from '@/components/atoms/LinkText/LinkText';
import type { DetailPageLayoutProps } from '@/components/organisms/DetailPageLayout/DetailPageLayout';
import { useProductWishlistActions } from '@/features/products/handlers/useProductWishlistActions';
import { useProductNavigation } from '@/features/products/handlers/useProductNavigation';
import { useProductEditActions } from '@/features/products/handlers/useProductEditActions';
import { useProductModals } from '@/features/products/handlers/useProductModals';
import { PRODUCT_LABELS } from '@/features/products/constants';

const MyProductDetailSection = () => {
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : '';
  const productId = params?.productId ? String(params.productId) : '';
  const { user } = useAuthStore();

  // 데이터 패칭
  const { data: product, isLoading, error } = useMyProduct(productId, { enabled: !!productId });

  // 핸들러 훅 사용
  const navigation = useProductNavigation(companyId);
  const modals = useProductModals();
  const wishlistActions = useProductWishlistActions(productId);
  const editActions = useProductEditActions(
    productId,
    companyId,
    () => {
      modals.handleCloseEditModal();
    },
    () => {
      modals.handleCloseDeleteModal();
      navigation.goToMyProducts();
    }
  );

  // 메니저 이상급만 ItemMenu 사용 가능
  const canUseMenu = useMemo(() => {
    if (!user?.role) return false;
    const userRole = user.role;
    return ROLE_LEVEL[userRole] >= ROLE_LEVEL.manager;
  }, [user?.role]);

  // 카테고리 옵션 초기화 (수정 모달용) - hooks 규칙을 위해 early return 전에 선언
  const initialCategoryOption = useMemo(() => {
    if (!product?.categoryId) return null;
    const childCategory = getChildById(product.categoryId);
    if (!childCategory) return null;
    const parentCategory = getParentById(childCategory.parentId);
    if (!parentCategory) return null;
    return { key: String(parentCategory.id), label: parentCategory.name };
  }, [product?.categoryId]);

  const initialSubCategoryOption = useMemo(() => {
    if (!product?.categoryId) return null;
    const childCategory = getChildById(product.categoryId);
    if (!childCategory) return null;
    return { key: childCategory.key, label: childCategory.name };
  }, [product?.categoryId]);

  const initialLink = useMemo(() => product?.link || '', [product?.link]);

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
        label: PRODUCT_LABELS.BREADCRUMB.MY_PRODUCT_LIST,
        href: `/${companyId}/products/my`,
      },
      // buildProductBreadcrumb에서 반환된 대분류와 소분류 추가
      ...categoryBreadcrumbItems.map((item) => ({
        label: item.label,
        href: item.href,
      })),
    ];

    // 상대 경로 사용 (SSR 하이드레이션 불일치 방지)
    // imageRefreshKey를 사용하여 이미지 업데이트 시 캐시 무효화
    const imageUrl = product.image
      ? `/api/product/image?key=${encodeURIComponent(product.image)}&t=${editActions.imageRefreshKey}`
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
    editActions.imageRefreshKey,
  ]);

  // 로딩 상태 분기
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{LOADING_MESSAGES.DEFAULT}</p>
      </div>
    );
  }

  // 에러 상태 분기
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  // 상품이 없을 때
  if (!product) {
    return null;
  }

  return (
    <MyProductDetailTem
      categorySections={CATEGORY_SECTIONS}
      detailPageProps={detailPageProps}
      canUseMenu={canUseMenu}
      productCategoryId={product.categoryId}
      editModalOpen={modals.editModalOpen}
      deleteModalOpen={modals.deleteModalOpen}
      onCloseEditModal={modals.handleCloseEditModal}
      onCloseDeleteModal={modals.handleCloseDeleteModal}
      onOpenEditModal={modals.handleOpenEditModal}
      onOpenDeleteModal={modals.handleOpenDeleteModal}
      onEditSubmit={editActions.handleEditSubmit}
      onDeleteConfirm={editActions.handleDeleteConfirm}
      initialCategoryOption={initialCategoryOption}
      initialSubCategoryOption={initialSubCategoryOption}
      initialLink={initialLink}
      initialImage={null}
      initialImageKey={product.image || null}
      productName={product.name}
      productPrice={String(product.price)}
      onProductUpdated={() => {
        // 이미지 리프레시는 editActions에서 처리됨
      }}
      onChangeCategory={navigation.goToProductsByCategory}
    />
  );
};

export default MyProductDetailSection;

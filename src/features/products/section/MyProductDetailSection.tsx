'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import MyProductDetailTem from '@/features/products/template/MyProductDetailTem/MyProductDetailTem';
import { useMyProduct } from '@/features/products/queries/product.queries';
import {
  CATEGORY_SECTIONS,
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
import type {
  MyProductDetailDataState,
  MyProductDetailCategoryState,
  MyProductDetailModalState,
  MyProductDetailModalHandlers,
  MyProductDetailEditInitialValues,
} from '@/features/products/types/my-product-detail.types';

const MyProductDetailSection = () => {
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : '';
  const productId = params?.productId ? String(params.productId) : '';
  const user = useAuthStore((state) => state.user);

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

  // 카테고리 옵션 초기화 (수정 모달용)
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

    const categoryBreadcrumbItems = buildProductBreadcrumb({ categoryId: product.categoryId });

    const breadcrumbItems = [
      {
        label: PRODUCT_LABELS.BREADCRUMB.MY_PRODUCT_LIST,
        href: `/${companyId}/products/my`,
      },
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
      liked: Boolean(wishlistActions.isLiked),
      onToggleLike: () => {
        wishlistActions.handleToggleLike();
      },
    };
  }, [product, companyId, wishlistActions]);

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

  // 그룹화된 Props
  const dataState: MyProductDetailDataState = {
    detailPageProps,
    productCategoryId: product.categoryId ?? null,
    productName: product.name,
    productPrice: String(product.price),
  };

  const categoryState: MyProductDetailCategoryState = {
    categorySections: CATEGORY_SECTIONS,
    onChangeCategory: navigation.goToProductsByCategory,
  };

  const modalState: MyProductDetailModalState = {
    editModalOpen: modals.editModalOpen,
    deleteModalOpen: modals.deleteModalOpen,
  };

  const modalHandlers: MyProductDetailModalHandlers = {
    onCloseEditModal: modals.handleCloseEditModal,
    onCloseDeleteModal: modals.handleCloseDeleteModal,
    onOpenEditModal: modals.handleOpenEditModal,
    onOpenDeleteModal: modals.handleOpenDeleteModal,
    onEditSubmit: editActions.handleEditSubmit,
    onDeleteConfirm: editActions.handleDeleteConfirm,
    onProductUpdated: () => {
      // 이미지 리프레시는 editActions에서 처리됨
    },
  };

  const editInitialValues: MyProductDetailEditInitialValues = {
    initialCategoryOption,
    initialSubCategoryOption,
    initialLink,
    initialImage: null,
    initialImageKey: product.imageUrl || null,
  };

  return (
    <MyProductDetailTem
      dataState={dataState}
      categoryState={categoryState}
      modalState={modalState}
      modalHandlers={modalHandlers}
      editInitialValues={editInitialValues}
      canUseMenu={canUseMenu}
    />
  );
};

export default MyProductDetailSection;

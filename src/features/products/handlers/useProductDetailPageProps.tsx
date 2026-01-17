'use client';

import { useMemo, useState, useEffect } from 'react';
import {
  CATEGORY_SECTIONS,
  BREADCRUMB_ITEMS,
  PARENT_CATEGORY_OPTIONS,
  getChildById,
  getParentById,
  buildProductBreadcrumb,
} from '@/constants';
import { useAuthStore } from '@/lib/store/authStore';
import { ROLE_LEVEL } from '@/utils/auth';
import LinkText from '@/components/atoms/LinkText/LinkText';
import type { DetailPageLayoutProps } from '@/components/organisms/DetailPageLayout/DetailPageLayout';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import type { BreadcrumbItem } from '@/components/molecules/Breadcrumb/Breadcrumb';
import type { BackendProduct } from '@/features/products/utils/product.utils';
import { PRODUCT_LABELS } from '@/features/products/constants';

interface UseProductDetailPagePropsParams {
  product: BackendProduct | undefined;
  companyId: string;
  navigation: {
    handleCategoryChange: (categoryId: number) => void;
    goToProductsByCategory: (categoryId: number) => void;
  };
  wishlistActions: {
    isLiked: boolean;
    handleToggleLike: () => void;
  };
  cartActions: {
    handleAddToCart: () => void;
  };
  modals: {
    handleOpenEditModal: () => void;
    handleOpenDeleteModal: () => void;
  };
}

/**
 * 상품 상세 페이지 Props 계산 훅
 * - DetailPageLayout에 전달할 props 계산
 * - 카테고리 옵션 초기화
 * - 이미지 URL 관리
 */
export function useProductDetailPageProps({
  product,
  companyId,
  navigation,
  wishlistActions,
  cartActions,
  modals,
}: UseProductDetailPagePropsParams) {
  const user = useAuthStore((state) => state.user);
  const [editModalImageUrl, setEditModalImageUrl] = useState<string | null>(null);

  // 메니저 이상급만 ItemMenu 사용 가능
  const canUseMenu = useMemo(() => {
    if (!user?.role) return false;
    const userRole = user.role;
    return ROLE_LEVEL[userRole] >= ROLE_LEVEL.manager;
  }, [user?.role]);

  // 수정 모달용 이미지 URL 로드
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
    const categoryBreadcrumbItems = buildProductBreadcrumb({
      categoryId: product.categoryId,
      onParentCategoryClick: (parentKey) => {
        const category = PARENT_CATEGORY_OPTIONS.find((c) => c.id === parentKey);
        if (category) {
          navigation.handleCategoryChange(category.parentId);
        }
      },
      onSubCategoryClick: (subCategoryId) => {
        navigation.goToProductsByCategory(subCategoryId);
      },
    });

    const breadcrumbItems = [
      {
        label: BREADCRUMB_ITEMS.PRODUCTS.label,
        href: BREADCRUMB_ITEMS.PRODUCTS.href(companyId),
      },
      ...(categoryBreadcrumbItems as unknown as BreadcrumbItem[]),
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
        onAddToCart: cartActions.handleAddToCart,
        onMenuClick: canUseMenu
          ? (action) => {
              if (action === 'edit') {
                modals.handleOpenEditModal();
              }
              if (action === 'delete') {
                modals.handleOpenDeleteModal();
              }
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
      liked: Boolean(wishlistActions.isLiked),
      onToggleLike: () => {
        wishlistActions.handleToggleLike();
      },
    };
  }, [
    product,
    companyId,
    navigation,
    wishlistActions,
    cartActions.handleAddToCart,
    canUseMenu,
    modals,
  ]);

  // 카테고리 옵션 초기화 (수정 모달용)
  const initialCategoryOption = useMemo((): Option | null => {
    if (!product?.categoryId) return null;
    const childCategory = getChildById(product.categoryId);
    if (!childCategory) return null;

    const parentCategory = getParentById(childCategory.parentId);
    if (!parentCategory) return null;

    return { key: String(parentCategory.id), label: parentCategory.name };
  }, [product?.categoryId]);

  const initialSubCategoryOption = useMemo((): Option | null => {
    if (!product?.categoryId) return null;
    const childCategory = getChildById(product.categoryId);
    if (!childCategory) return null;

    return { key: childCategory.key, label: childCategory.name };
  }, [product?.categoryId]);

  const initialLink = useMemo(() => product?.link || '', [product?.link]);

  return {
    categorySections: CATEGORY_SECTIONS,
    detailPageProps,
    canUseMenu,
    initialCategoryOption,
    initialSubCategoryOption,
    initialLink,
    editModalImageUrl,
    initialImageKey: product?.imageUrl || null,
    productName: product?.name || '',
    productPrice: product?.price ? String(product.price) : '',
    productCategoryId: product?.categoryId ?? null,
    hasProduct: !!product,
  };
}

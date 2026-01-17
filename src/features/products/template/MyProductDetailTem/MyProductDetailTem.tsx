'use client';

import { useMemo, useState } from 'react';
import {
  CategoryPanel,
  type CategoryPanelSection,
} from '@/components/organisms/CategoryPanel/CategoryPanel';
import DetailPageLayout, {
  type DetailPageLayoutProps,
} from '@/components/organisms/DetailPageLayout/DetailPageLayout';
import ProductEditModal, {
  type ProductEditFormData,
} from '@/components/molecules/ProductEditModal/ProductEditModal';
import CustomModal from '@/components/molecules/CustomModal/CustomModal';
import { getChildById } from '@/constants/categories/categories.utils';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import type { UpdateMyProductOptions } from '@/features/products/api/products.api';
import type { MyProductDetailTemGroupedProps } from '@/features/products/types/my-product-detail.types';

/* =====================
 * Props
 * ====================== */
interface MyProductDetailTemLegacyProps {
  categorySections: CategoryPanelSection[];
  detailPageProps: DetailPageLayoutProps;
  canUseMenu: boolean;
  productCategoryId?: number | null;
  editModalOpen?: boolean;
  deleteModalOpen?: boolean;
  onCloseEditModal?: () => void;
  onCloseDeleteModal?: () => void;
  onOpenEditModal?: () => void;
  onOpenDeleteModal?: () => void;
  onEditSubmit?: (data: ProductEditFormData, options?: UpdateMyProductOptions) => void;
  onDeleteConfirm?: () => void;
  initialCategoryOption?: Option | null;
  initialSubCategoryOption?: Option | null;
  initialLink?: string;
  initialImage?: string | null;
  initialImageKey?: string | null;
  productName?: string;
  productPrice?: string;
  onProductUpdated?: () => void;
  onChangeCategory?: (categoryId: number | null) => void;
}

type MyProductDetailTemProps = MyProductDetailTemLegacyProps | MyProductDetailTemGroupedProps;

function isGroupedProps(props: MyProductDetailTemProps): props is MyProductDetailTemGroupedProps {
  return 'dataState' in props && 'categoryState' in props && 'modalState' in props;
}

/* =====================
 * MyProductDetailTem
 * ====================== */
const MyProductDetailTem = (props: MyProductDetailTemProps) => {
  // Props 정규화
  /* eslint-disable react/destructuring-assignment */
  const {
    categorySections,
    detailPageProps,
    canUseMenu,
    productCategoryId,
    editModalOpen,
    deleteModalOpen,
    onCloseEditModal,
    onCloseDeleteModal,
    onOpenEditModal,
    onOpenDeleteModal,
    onEditSubmit,
    onDeleteConfirm,
    initialCategoryOption,
    initialSubCategoryOption,
    initialLink,
    initialImage,
    initialImageKey,
    productName,
    productPrice,
    onProductUpdated,
    onChangeCategory,
  } = isGroupedProps(props)
    ? {
        categorySections: props.categoryState.categorySections,
        detailPageProps: props.dataState.detailPageProps,
        canUseMenu: props.canUseMenu,
        productCategoryId: props.dataState.productCategoryId,
        editModalOpen: props.modalState.editModalOpen,
        deleteModalOpen: props.modalState.deleteModalOpen,
        onCloseEditModal: props.modalHandlers.onCloseEditModal,
        onCloseDeleteModal: props.modalHandlers.onCloseDeleteModal,
        onOpenEditModal: props.modalHandlers.onOpenEditModal,
        onOpenDeleteModal: props.modalHandlers.onOpenDeleteModal,
        onEditSubmit: props.modalHandlers.onEditSubmit,
        onDeleteConfirm: props.modalHandlers.onDeleteConfirm,
        initialCategoryOption: props.editInitialValues.initialCategoryOption,
        initialSubCategoryOption: props.editInitialValues.initialSubCategoryOption,
        initialLink: props.editInitialValues.initialLink,
        initialImage: props.editInitialValues.initialImage,
        initialImageKey: props.editInitialValues.initialImageKey,
        productName: props.dataState.productName,
        productPrice: props.dataState.productPrice,
        onProductUpdated: props.modalHandlers.onProductUpdated,
        onChangeCategory: props.categoryState.onChangeCategory,
      }
    : {
        ...props,
        productCategoryId: props.productCategoryId ?? null,
        editModalOpen: props.editModalOpen ?? false,
        deleteModalOpen: props.deleteModalOpen ?? false,
        initialCategoryOption: props.initialCategoryOption ?? null,
        initialSubCategoryOption: props.initialSubCategoryOption ?? null,
        initialLink: props.initialLink ?? '',
        initialImage: props.initialImage ?? null,
        initialImageKey: props.initialImageKey ?? null,
        productName: props.productName ?? '',
        productPrice: props.productPrice ?? '',
      };
  /* eslint-enable react/destructuring-assignment */

  const initialSelectedCategory = useMemo(() => {
    const lastLabel =
      detailPageProps.breadcrumbItems?.[detailPageProps.breadcrumbItems.length - 1]?.label;

    if (!lastLabel) return null;

    return (
      categorySections
        .flatMap((section) => section.options)
        .find((option) => option.label === lastLabel)?.value ?? null
    );
  }, [categorySections, detailPageProps.breadcrumbItems]);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(initialSelectedCategory);

  // 상품의 대분류 ID 찾기
  const activeSectionId = useMemo(() => {
    if (!productCategoryId) return null;
    const childCategory = getChildById(productCategoryId);
    return childCategory?.parentId ?? null;
  }, [productCategoryId]);

  return (
    <div className="flex justify-center w-full tablet:mt-10 desktop:mt-80">
      <div className="w-327 tablet:w-696 desktop:w-1400">
        <div className="flex flex-col tablet:flex-row items-start gap-20 desktop:gap-40">
          <CategoryPanel
            sections={categorySections}
            activeSectionId={activeSectionId}
            selectedValue={
              typeof selectedCategory === 'string' ? Number(selectedCategory) : selectedCategory
            }
            onChange={onChangeCategory || setSelectedCategory}
          />

          <div className="shrink-0 relative">
            <DetailPageLayout
              breadcrumbItems={detailPageProps.breadcrumbItems}
              productImage={detailPageProps.productImage}
              productDetailHeader={{
                productName: detailPageProps.productDetailHeader.productName,
                price: detailPageProps.productDetailHeader.price,
                purchaseCount: detailPageProps.productDetailHeader.purchaseCount,
                type: undefined,
                onMenuClick: canUseMenu
                  ? (action) => {
                      if (action === 'edit' && onOpenEditModal) {
                        onOpenEditModal();
                      }
                      if (action === 'delete' && onOpenDeleteModal) {
                        onOpenDeleteModal();
                      }
                    }
                  : undefined,
              }}
              liked={detailPageProps.liked}
              onToggleLike={detailPageProps.onToggleLike}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      {canUseMenu && onEditSubmit && onDeleteConfirm && (
        <>
          <ProductEditModal
            open={editModalOpen ?? false}
            onClose={onCloseEditModal || (() => {})}
            onSubmit={(data, options) => {
              onEditSubmit(data, options);
              onProductUpdated?.();
            }}
            initialName={productName ?? ''}
            initialPrice={productPrice ?? ''}
            initialLink={initialLink ?? ''}
            initialImage={initialImage ?? null}
            initialImageKey={initialImageKey ?? null}
            initialCategory={initialCategoryOption ?? null}
            initialSubCategory={initialSubCategoryOption ?? null}
          />
          <CustomModal
            open={deleteModalOpen ?? false}
            type="delete"
            productName={productName ?? ''}
            onClose={onCloseDeleteModal || (() => {})}
            onConfirm={onDeleteConfirm}
          />
        </>
      )}
    </div>
  );
};

export default MyProductDetailTem;

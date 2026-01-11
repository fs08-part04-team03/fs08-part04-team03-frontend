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
import type { Option } from '@/components/atoms/DropDown/DropDown';
import type { UpdateMyProductOptions } from '@/features/products/api/products.api';
import { getChildById } from '@/constants/categories/categories.utils';

/* =====================
 * Props
 * ====================== */
interface MyProductDetailTemProps {
  categorySections: CategoryPanelSection[];
  detailPageProps: DetailPageLayoutProps;
  productId: string;
  companyId: string;
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

/* =====================
 * MyProductDetailTem
 * ====================== */
const MyProductDetailTem = ({
  categorySections,
  detailPageProps,
  productId,
  companyId,
  canUseMenu,
  productCategoryId = null,
  editModalOpen = false,
  deleteModalOpen = false,
  onCloseEditModal,
  onCloseDeleteModal,
  onOpenEditModal,
  onOpenDeleteModal,
  onEditSubmit,
  onDeleteConfirm,
  initialCategoryOption = null,
  initialSubCategoryOption = null,
  initialLink = '',
  initialImage = null,
  initialImageKey = null,
  productName = '',
  productPrice = '',
  onProductUpdated,
  onChangeCategory,
}: MyProductDetailTemProps) => {
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
                // type을 전달하지 않으면 ProductDetailHeader에서 역할에 따라 자동 결정
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
            open={editModalOpen}
            onClose={onCloseEditModal || (() => {})}
            onSubmit={(data, options) => {
              onEditSubmit(data, options);
              onProductUpdated?.();
            }}
            initialName={productName}
            initialPrice={productPrice}
            initialLink={initialLink}
            initialImage={initialImage}
            initialImageKey={initialImageKey}
            initialCategory={initialCategoryOption}
            initialSubCategory={initialSubCategoryOption}
          />
          <CustomModal
            open={deleteModalOpen}
            type="delete"
            productName={productName}
            onClose={onCloseDeleteModal || (() => {})}
            onConfirm={onDeleteConfirm}
          />
        </>
      )}
    </div>
  );
};

export default MyProductDetailTem;

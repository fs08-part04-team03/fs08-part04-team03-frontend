'use client';

import { useMemo } from 'react';

import {
  CategoryPanel,
  type CategoryPanelSection,
} from '@/components/organisms/CategoryPanel/CategoryPanel';

import DetailPageLayout, {
  type DetailPageLayoutProps,
} from '@/components/organisms/DetailPageLayout/DetailPageLayout';
import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';
import CustomModal from '@/components/molecules/CustomModal/CustomModal';
import ProductEditModal, {
  type ProductEditFormData,
} from '@/components/molecules/ProductEditModal/ProductEditModal';
import { LOADING_MESSAGES } from '@/constants';
import { getChildById } from '@/constants/categories/categories.utils';
import { PRODUCT_MESSAGES } from '@/features/products/constants/messages';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import type { UpdateMyProductOptions } from '@/features/products/api/products.api';

/* =====================
 * Props
 * ====================== */
interface ProductDetailTemProps {
  categorySections: CategoryPanelSection[];
  detailPageProps: DetailPageLayoutProps;
  isLoading?: boolean;
  hasProduct?: boolean;
  productCategoryId?: number | null; // 상품의 소분류 ID
  canUseMenu?: boolean;
  editModalOpen?: boolean;
  deleteModalOpen?: boolean;
  onCloseEditModal?: () => void;
  onCloseDeleteModal?: () => void;
  onEditSubmit?: (data: ProductEditFormData, options?: UpdateMyProductOptions) => void;
  onDeleteConfirm?: () => void;
  initialCategoryOption?: Option | null;
  initialSubCategoryOption?: Option | null;
  initialLink?: string;
  initialImage?: string | null;
  initialImageKey?: string | null;
  productName?: string;
  productPrice?: string;
  cartAddFailedModalOpen?: boolean;
  cartAddSuccessModalOpen?: boolean;
  onCloseCartAddFailedModal?: () => void;
  onCloseCartAddSuccessModal?: () => void;
  onGoToCart?: () => void;
  onGoToProducts?: () => void;
  onChangeCategory?: (categoryId: number | null) => void;
}

/* =====================
 * ProductDetailTem
 * ====================== */
const ProductDetailTem = ({
  categorySections,
  detailPageProps,
  isLoading = false,
  hasProduct = true,
  productCategoryId = null,
  canUseMenu = false,
  editModalOpen = false,
  deleteModalOpen = false,
  onCloseEditModal,
  onCloseDeleteModal,
  onEditSubmit,
  onDeleteConfirm,
  initialCategoryOption = null,
  initialSubCategoryOption = null,
  initialLink = '',
  initialImage = null,
  initialImageKey = null,
  productName = '',
  productPrice = '',
  cartAddFailedModalOpen = false,
  cartAddSuccessModalOpen = false,
  onCloseCartAddFailedModal,
  onCloseCartAddSuccessModal,
  onGoToCart,
  onGoToProducts,
  onChangeCategory,
}: ProductDetailTemProps) => {
  // 상품의 대분류 ID 찾기
  const activeSectionId = useMemo(() => {
    if (!productCategoryId) return null;
    const childCategory = getChildById(productCategoryId);
    return childCategory?.parentId ?? null;
  }, [productCategoryId]);

  // 로딩 중일 때는 로딩 메시지만 표시
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{LOADING_MESSAGES.DEFAULT}</p>
      </div>
    );
  }

  // product가 없을 때는 "등록된 상품이 없습니다" 메시지 표시
  if (!hasProduct) {
    return (
      <div className="flex justify-center w-full tablet:mt-10 desktop:mt-80">
        <div className="w-327 tablet:w-696 desktop:w-1400">
          <div className="flex flex-col tablet:flex-row items-start gap-20 desktop:gap-40">
            <CategoryPanel
              sections={categorySections}
              activeSectionId={activeSectionId}
              selectedValue={
                typeof productCategoryId === 'string'
                  ? Number(productCategoryId)
                  : productCategoryId
              }
              onChange={onChangeCategory || (() => {})}
            />
            <div className="flex items-center justify-center w-full h-522 tablet:h-604 desktop:h-938">
              <StatusNotice
                title={PRODUCT_MESSAGES.EMPTY.NO_PRODUCTS.TITLE}
                description={PRODUCT_MESSAGES.EMPTY.NO_PRODUCTS.DESCRIPTION}
                hideButton
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full tablet:mt-10 desktop:mt-80">
      <div className="w-327 tablet:w-696 desktop:w-1400">
        <div className="flex flex-col tablet:flex-row items-start gap-20 desktop:gap-40">
          <CategoryPanel
            sections={categorySections}
            activeSectionId={activeSectionId}
            selectedValue={
              typeof productCategoryId === 'string' ? Number(productCategoryId) : productCategoryId
            }
            onChange={onChangeCategory || (() => {})}
          />

          <div className="shrink-0">
            <DetailPageLayout
              breadcrumbItems={detailPageProps.breadcrumbItems}
              productImage={detailPageProps.productImage}
              accordionPanels={detailPageProps.accordionPanels}
              className={detailPageProps.className}
              productDetailHeader={detailPageProps.productDetailHeader}
              liked={detailPageProps.liked}
              onToggleLike={detailPageProps.onToggleLike}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      <CustomModal
        open={cartAddFailedModalOpen}
        type="cart-add-failed"
        description={PRODUCT_MESSAGES.MODAL.CART_ADD_FAILED_DESCRIPTION}
        onClose={onCloseCartAddFailedModal}
        onConfirm={onCloseCartAddFailedModal}
      />
      <CustomModal
        open={cartAddSuccessModalOpen}
        type="cart-add-success"
        description={PRODUCT_MESSAGES.MODAL.CART_ADD_SUCCESS_DESCRIPTION}
        onClose={onCloseCartAddSuccessModal}
        onGoToCart={onGoToCart}
        onGoToProducts={onGoToProducts}
      />
      {canUseMenu && onEditSubmit && onDeleteConfirm && (
        <>
          <ProductEditModal
            open={editModalOpen}
            onClose={onCloseEditModal || (() => {})}
            onSubmit={onEditSubmit}
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

export default ProductDetailTem;

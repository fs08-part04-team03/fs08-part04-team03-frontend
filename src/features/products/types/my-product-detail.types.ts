/**
 * MyProductDetailTem 그룹화된 Props 타입
 */

import type { CategoryPanelSection } from '@/components/organisms/CategoryPanel/CategoryPanel';
import type { DetailPageLayoutProps } from '@/components/organisms/DetailPageLayout/DetailPageLayout';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import type { ProductEditFormData } from '@/components/molecules/ProductEditModal/ProductEditModal';
import type { UpdateMyProductOptions } from '@/features/products/api/products.api';

/**
 * 데이터 상태
 */
export interface MyProductDetailDataState {
  detailPageProps: DetailPageLayoutProps;
  productCategoryId: number | null;
  productName: string;
  productPrice: string;
}

/**
 * 카테고리 상태
 */
export interface MyProductDetailCategoryState {
  categorySections: CategoryPanelSection[];
  onChangeCategory: (categoryId: number | null) => void;
}

/**
 * 모달 상태
 */
export interface MyProductDetailModalState {
  editModalOpen: boolean;
  deleteModalOpen: boolean;
}

/**
 * 모달 핸들러
 */
export interface MyProductDetailModalHandlers {
  onCloseEditModal: () => void;
  onCloseDeleteModal: () => void;
  onOpenEditModal: () => void;
  onOpenDeleteModal: () => void;
  onEditSubmit: (data: ProductEditFormData, options?: UpdateMyProductOptions) => void;
  onDeleteConfirm: () => void;
  onProductUpdated: () => void;
}

/**
 * 모달 초기값
 */
export interface MyProductDetailEditInitialValues {
  initialCategoryOption: Option | null;
  initialSubCategoryOption: Option | null;
  initialLink: string;
  initialImage: string | null;
  initialImageKey: string | null;
}

/**
 * 그룹화된 Props
 */
export interface MyProductDetailTemGroupedProps {
  dataState: MyProductDetailDataState;
  categoryState: MyProductDetailCategoryState;
  modalState: MyProductDetailModalState;
  modalHandlers: MyProductDetailModalHandlers;
  editInitialValues: MyProductDetailEditInitialValues;
  canUseMenu: boolean;
}

/**
 * ProductDetailTem 그룹화된 Props 타입
 * Props Drilling을 줄이기 위해 관련 Props를 그룹화
 */

import type { CategoryPanelSection } from '@/components/organisms/CategoryPanel/CategoryPanel';
import type { DetailPageLayoutProps } from '@/components/organisms/DetailPageLayout/DetailPageLayout';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import type { ProductEditFormData } from '@/components/molecules/ProductEditModal/ProductEditModal';
import type { UpdateMyProductOptions } from '@/features/products/api/products.api';

/**
 * 데이터 상태
 */
export interface ProductDetailDataState {
  isLoading: boolean;
  hasProduct: boolean;
  detailPageProps: DetailPageLayoutProps;
  productCategoryId: number | null;
}

/**
 * 카테고리 패널 상태
 */
export interface ProductDetailCategoryState {
  categorySections: CategoryPanelSection[];
  onChangeCategory: (categoryId: number | null) => void;
}

/**
 * 수정 모달 상태
 */
export interface ProductDetailEditModalState {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProductEditFormData, options?: UpdateMyProductOptions) => void;
  initialValues: {
    name: string;
    price: string;
    link: string;
    image: string | null;
    imageKey: string | null;
    category: Option | null;
    subCategory: Option | null;
  };
}

/**
 * 삭제 모달 상태
 */
export interface ProductDetailDeleteModalState {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

/**
 * 장바구니 모달 상태
 */
export interface ProductDetailCartModalState {
  addFailedOpen: boolean;
  addSuccessOpen: boolean;
  onCloseAddFailed: () => void;
  onCloseAddSuccess: () => void;
  onGoToCart: () => void;
  onGoToProducts: () => void;
}

/**
 * ProductDetailTem 그룹화된 Props
 */
export interface ProductDetailTemGroupedProps {
  data: ProductDetailDataState;
  category: ProductDetailCategoryState;
  editModal?: ProductDetailEditModalState;
  deleteModal?: ProductDetailDeleteModalState;
  cartModal: ProductDetailCartModalState;
  canUseMenu: boolean;
}

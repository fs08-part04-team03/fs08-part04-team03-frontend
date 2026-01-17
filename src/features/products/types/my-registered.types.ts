/**
 * RegisteredProductTem 그룹화된 Props 타입
 */

import type { RegisteredProductOrgItem } from '@/features/products/components/RegisteredProductOrg/RegisteredProductOrg';
import type { Option } from '@/components/atoms/DropDown/DropDown';

/**
 * 상품 목록 상태
 */
export interface RegisteredProductListState {
  products: RegisteredProductOrgItem[];
  totalCount: number;
  isLoading: boolean;
}

/**
 * 정렬 상태
 */
export interface RegisteredProductSortState {
  sortOptions: Option[];
  selectedSort: Option;
  onSortChange: (sort: Option) => void;
}

/**
 * 페이지네이션 상태
 */
export interface RegisteredProductPaginationState {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

/**
 * 그룹화된 Props
 */
export interface RegisteredProductTemGroupedProps {
  listState: RegisteredProductListState;
  sortState: RegisteredProductSortState;
  paginationState: RegisteredProductPaginationState;
  onRegisterClick: () => void;
}

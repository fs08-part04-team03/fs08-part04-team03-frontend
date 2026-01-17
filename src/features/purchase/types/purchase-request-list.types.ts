/**
 * PurchaseRequestListTem 그룹화된 Props 타입
 */

import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import type { Option } from '@/components/atoms/DropDown/DropDown';

/**
 * 테이블 데이터 상태
 */
export interface PurchaseListTableState {
  purchaseList: PurchaseRequestItem[];
  companyId: string;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
}

/**
 * 정렬 상태
 */
export interface PurchaseListSortState {
  sortOptions: Option[];
  selectedSortOption: Option | undefined;
  onSortChange: (option: Option) => void;
}

/**
 * 모달 상태
 */
export interface PurchaseListModalState {
  selectedRequestId: string | null;
  selectedRequestDetail: PurchaseRequestItem | undefined;
  isModalDetailLoading: boolean;
  approveModalOpen: boolean;
  rejectModalOpen: boolean;
  budget: number;
}

/**
 * 모달 핸들러
 */
export interface PurchaseListModalHandlers {
  onApproveModalClose: () => void;
  onRejectModalClose: () => void;
  onApproveSubmit: (message: string) => void | Promise<void>;
  onRejectSubmit: (message: string) => void | Promise<void>;
}

/**
 * 행 핸들러
 */
export interface PurchaseListRowHandlers {
  onRejectClick: (purchaseRequestId: string) => void;
  onApproveClick: (purchaseRequestId: string) => void;
  onRowClick: (purchaseRequestId: string) => void;
}

/**
 * 페이지네이션 핸들러
 */
export interface PurchaseListPaginationHandlers {
  onPageChange: (page: number) => void;
  onNavigateToProducts: () => void;
}

/**
 * 그룹화된 Props
 */
export interface PurchaseRequestListTemGroupedProps {
  tableState: PurchaseListTableState;
  sortState: PurchaseListSortState;
  modalState: PurchaseListModalState;
  modalHandlers: PurchaseListModalHandlers;
  rowHandlers: PurchaseListRowHandlers;
  paginationHandlers: PurchaseListPaginationHandlers;
  className?: string;
}

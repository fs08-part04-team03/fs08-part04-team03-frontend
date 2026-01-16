/**
 * 내 구매 요청 목록 Props 타입 정의
 * Props Drilling 개선을 위한 그룹화된 타입
 */

import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import type { Option } from '@/components/atoms/DropDown/DropDown';

/**
 * 취소 모달 상태 관리
 */
export interface MyPurchaseCancelModalState {
  cancelModalOpen?: boolean;
  cancelTargetItem?: PurchaseRequestItem | null;
}

/**
 * 취소 모달 핸들러
 */
export interface MyPurchaseCancelModalHandlers {
  onCancelClick?: (purchaseRequestId: string) => void;
  onCancelModalClose?: () => void;
  onCancelConfirm?: () => void | Promise<void>;
}

/**
 * 페이지네이션 상태
 */
export interface MyPurchasePaginationState {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

/**
 * 정렬 상태
 */
export interface MyPurchaseSortState {
  sortOptions?: Option[];
  selectedSortOption?: Option;
  onSortChange?: (option: Option) => void;
}

/**
 * 필터 상태 (상태 필터)
 */
export interface MyPurchaseFilterState {
  statusOptions?: Option[];
  selectedStatusOption?: Option;
  onStatusChange?: (option: Option) => void;
}

/**
 * 네비게이션 핸들러
 * onProductClick은 ProductCard/ProductLink가 직접 hook을 사용하므로 제거됨
 * onRowClick도 usePurchaseRowHandlers에서 직접 hook을 사용하므로 제거됨
 */
export interface MyPurchaseNavigationHandlers {
  onNavigateToProducts?: () => void;
}

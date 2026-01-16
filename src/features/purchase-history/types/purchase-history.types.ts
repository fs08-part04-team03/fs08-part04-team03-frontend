/**
 * 구매 내역 Props 타입 정의
 * Props Drilling 개선을 위한 그룹화된 타입
 */

import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import type { Option } from '@/components/atoms/DropDown/DropDown';

/**
 * 예산 정보 (9개 필드 통합)
 */
export interface PurchaseHistoryBudgetInfo {
  thisMonthBudget: number;
  lastMonthBudget: number;
  thisMonthSpending: number;
  lastMonthSpending: number;
  thisYearTotalSpending: number;
  lastYearTotalSpending: number;
  spendingPercentage?: number;
  currentBudget?: number;
  lastBudget?: number;
}

/**
 * 정렬 상태
 */
export interface PurchaseHistorySortState {
  selectedSort?: Option;
  onSortChange?: (option: Option) => void;
}

/**
 * 테이블 상태 (데이터 + 로딩)
 */
export interface PurchaseHistoryTableState {
  items: PurchaseRequestItem[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  isLoading?: boolean;
  isEmpty?: boolean;
}

/**
 * 네비게이션 핸들러
 */
export interface PurchaseHistoryNavigationHandlers {
  onNavigateToProducts?: () => void;
  onItemClick?: (orderId: string) => void;
}

/**
 * Empty 상태 메시지
 */
export interface PurchaseHistoryEmptyState {
  emptyMessage?: {
    TITLE: string;
    DESCRIPTION: string;
    BUTTON_TEXT: string;
  };
}

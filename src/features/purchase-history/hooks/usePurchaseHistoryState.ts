/**
 * 구매 내역을 위한 통합 커스텀 훅
 * Props Drilling 개선 - 상태와 핸들러를 그룹화하여 관리
 */

import { useState, useCallback } from 'react';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import { COMMON_SORT_OPTIONS, DEFAULT_SORT_KEY } from '@/constants/sort';
import { PURCHASE_HISTORY_DEFAULTS } from '@/features/purchase-history/constants/defaults';
import { usePurchaseHistoryHandlers } from '@/features/purchase-history/handlers/usePurchaseHistoryHandlers';
import { useSortHandlers } from '@/features/purchase-history/handlers/useSortHandlers';
import type {
  PurchaseHistorySortState,
  PurchaseHistoryNavigationHandlers,
} from '@/features/purchase-history/types/purchase-history.types';

interface UsePurchaseHistoryStateParams {
  companyId: string;
}

/**
 * 구매 내역의 모든 상태와 핸들러를 통합 관리하는 훅
 */
export const usePurchaseHistoryState = ({ companyId }: UsePurchaseHistoryStateParams) => {
  // 페이지네이션
  const [currentPage, setCurrentPage] = useState<number>(PURCHASE_HISTORY_DEFAULTS.INITIAL_PAGE);

  // 정렬
  const [selectedSort, setSelectedSort] = useState<Option>(() => {
    const defaultOption = COMMON_SORT_OPTIONS.find((opt) => opt.key === DEFAULT_SORT_KEY);
    return defaultOption || COMMON_SORT_OPTIONS[0] || { key: 'LATEST', label: '최신순' };
  });

  // 네비게이션 핸들러
  const { handleNavigateToProducts, handleNavigateToDetail } =
    usePurchaseHistoryHandlers(companyId);

  // 정렬 핸들러
  const { handleSortChange } = useSortHandlers(setSelectedSort, () => setCurrentPage(1));

  // 페이지 변경 핸들러
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  // 정렬 상태 그룹
  const sortState: PurchaseHistorySortState = {
    selectedSort,
    onSortChange: handleSortChange,
  };

  // 네비게이션 핸들러 그룹
  const navigationHandlers: PurchaseHistoryNavigationHandlers = {
    onNavigateToProducts: handleNavigateToProducts,
    onItemClick: handleNavigateToDetail,
  };

  return {
    // 페이지네이션 (API 호출용)
    currentPage,
    selectedSort,
    handlePageChange,

    // 그룹화된 상태와 핸들러
    sortState,
    navigationHandlers,
  };
};

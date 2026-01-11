'use client';

import { useState, useMemo } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import PurchaseHistoryTem from '@/features/purchase-history/template/PurchaseHistoryTem/PurchaseHistoryTem';
import { Toast } from '@/components/molecules/Toast/Toast';
import { COMMON_SORT_OPTIONS, DEFAULT_SORT_KEY } from '@/constants/sort';
import { ERROR_MESSAGES } from '@/constants';
import { useToast } from '@/hooks/useToast';
import {
  usePurchaseHistory,
  usePurchaseHistoryBudget,
} from '@/features/purchase-history/queries/purchase-history.queries';
import {
  getSortParams,
  useSortHandlers,
} from '@/features/purchase-history/handlers/useSortHandlers';
import { usePurchaseHistoryHandlers } from '@/features/purchase-history/handlers/usePurchaseHistoryHandlers';
import { PURCHASE_HISTORY_DEFAULTS } from '@/features/purchase-history/constants/defaults';
import { PURCHASE_HISTORY_MESSAGES } from '@/features/purchase-history/constants/messages';

/**
 * PurchaseHistorySection
 * 구매 내역 리스트 데이터/상태 결정 레이어
 * - 구매 내역 목록 API 호출 (React Query 사용)
 * - 예산 정보 API 호출 (React Query 사용)
 * - loading / error / empty 분기
 * - Template에 필요한 props를 만들고 내려주기
 */
const PurchaseHistorySection = () => {
  const [currentPage, setCurrentPage] = useState<number>(PURCHASE_HISTORY_DEFAULTS.INITIAL_PAGE);
  const [selectedSort, setSelectedSort] = useState<Option>(() => {
    const defaultOption = COMMON_SORT_OPTIONS.find((opt) => opt.key === DEFAULT_SORT_KEY);
    return defaultOption || COMMON_SORT_OPTIONS[0] || { key: 'LATEST', label: '최신순' };
  });

  const { user } = useAuthStore();
  const companyId = user?.companyId || '';

  // useToast 훅 사용
  const { showToast, toastVariant, toastMessage, closeToast } = useToast();

  // 핸들러 훅 사용
  const { handleNavigateToProducts, handleNavigateToDetail } =
    usePurchaseHistoryHandlers(companyId);
  const { handleSortChange } = useSortHandlers(setSelectedSort, () => setCurrentPage(1));

  const sortParams = getSortParams(selectedSort.key);

  // 구매 내역 목록 조회 (React Query) - 서버 측 페이지네이션
  const {
    data: purchaseData,
    isLoading: isPurchaseLoading,
    error: purchaseError,
  } = usePurchaseHistory({
    sortBy: sortParams.sortBy,
    order: sortParams.order,
    page: currentPage,
  });

  // 예산 조회 (React Query)
  const {
    data: budgetData,
    isLoading: isBudgetLoading,
    error: budgetError,
  } = usePurchaseHistoryBudget(companyId, { enabled: !!companyId });

  // 서버에서 받은 데이터를 그대로 사용 (서버 측 페이지네이션)
  const { items, totalPages } = useMemo(() => {
    if (!purchaseData) {
      return { items: [], totalPages: 1 };
    }

    return {
      items: purchaseData.purchaseRequests,
      totalPages: purchaseData.totalPages || 1,
    };
  }, [purchaseData]);

  // 예산 데이터 처리
  const budgetInfo = useMemo(() => {
    if (!budgetData) {
      return {
        thisMonthBudget: 0,
        lastMonthBudget: 0,
        thisMonthSpending: 0,
        lastMonthSpending: 0,
        thisYearTotalSpending: 0,
        lastYearTotalSpending: 0,
        spendingPercentage: 0,
        currentBudget: 0,
        lastBudget: 0,
      };
    }

    return {
      thisMonthBudget: Number.isFinite(budgetData.budget) ? budgetData.budget : 0,
      thisMonthSpending: Number.isFinite(budgetData.monthlySpending)
        ? budgetData.monthlySpending
        : 0,
      lastMonthBudget: Number.isFinite(budgetData.lastMonthBudget) ? budgetData.lastMonthBudget : 0,
      lastMonthSpending: Number.isFinite(budgetData.lastMonthSpending)
        ? budgetData.lastMonthSpending
        : 0,
      thisYearTotalSpending: Number.isFinite(budgetData.thisYearTotalSpending)
        ? budgetData.thisYearTotalSpending
        : 0,
      lastYearTotalSpending: Number.isFinite(budgetData.lastYearTotalSpending)
        ? budgetData.lastYearTotalSpending
        : 0,
      spendingPercentage: Number.isFinite(budgetData.spendingPercentage)
        ? budgetData.spendingPercentage
        : 0,
      currentBudget: Number.isFinite(budgetData.remainingBudget) ? budgetData.remainingBudget : 0,
      lastBudget: Number.isFinite(budgetData.lastBudget) ? budgetData.lastBudget : 0,
    };
  }, [budgetData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // loading 분기
  const isLoading = isPurchaseLoading || isBudgetLoading;

  // error 분기
  if (purchaseError || budgetError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  // empty 분기는 Template에서 처리 (items.length === 0)

  return (
    <>
      <PurchaseHistoryTem
        thisMonthBudget={budgetInfo.thisMonthBudget}
        lastMonthBudget={budgetInfo.lastMonthBudget}
        thisMonthSpending={budgetInfo.thisMonthSpending}
        lastMonthSpending={budgetInfo.lastMonthSpending}
        thisYearTotalSpending={budgetInfo.thisYearTotalSpending}
        lastYearTotalSpending={budgetInfo.lastYearTotalSpending}
        spendingPercentage={budgetInfo.spendingPercentage}
        currentBudget={budgetInfo.currentBudget}
        lastBudget={budgetInfo.lastBudget}
        selectedSort={selectedSort}
        onSortChange={handleSortChange}
        items={items}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isLoading={isLoading}
        isEmpty={items.length === 0}
        onNavigateToProducts={handleNavigateToProducts}
        onItemClick={handleNavigateToDetail}
        emptyMessage={PURCHASE_HISTORY_MESSAGES.EMPTY}
      />
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-toast">
          <Toast variant={toastVariant} message={toastMessage} onClose={closeToast} />
        </div>
      )}
    </>
  );
};

export default PurchaseHistorySection;

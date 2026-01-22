'use client';

/**
 * PurchaseHistorySection - 개선된 버전
 * Props Drilling 개선 - 통합 훅 사용
 */

import { useMemo } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import PurchaseHistoryTem from '@/features/purchase-history/template/PurchaseHistoryTem/PurchaseHistoryTem';
import { Toast } from '@/components/molecules/Toast/Toast';
import { ERROR_MESSAGES } from '@/constants';
import { useToast } from '@/hooks/useToast';
import {
  usePurchaseHistory,
  usePurchaseHistoryBudget,
} from '@/features/purchase-history/queries/purchase-history.queries';
import { getSortParams } from '@/features/purchase-history/handlers/useSortHandlers';
import { PURCHASE_HISTORY_MESSAGES } from '@/features/purchase-history/constants/messages';
import { usePurchaseHistoryState } from '@/features/purchase-history/hooks/usePurchaseHistoryState';
import { usePageTitle } from '@/hooks/usePageTitle';

/**
 * PurchaseHistorySection - 개선된 버전
 * 통합 훅을 사용하여 Props Drilling 최소화
 */
const PurchaseHistorySection = () => {
  usePageTitle('구매 내역');
  const user = useAuthStore((state) => state.user);
  const companyId = user?.companyId || '';

  // Toast
  const { showToast, toastVariant, toastMessage, closeToast } = useToast();

  // 🎯 통합 훅 사용 - 모든 상태와 핸들러를 그룹화하여 관리
  const { currentPage, selectedSort, handlePageChange, sortState, navigationHandlers } =
    usePurchaseHistoryState({ companyId });

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

  // 🎯 그룹화된 Props 준비
  // 예산 정보
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

  // 테이블 데이터
  const { items, totalPages } = useMemo(() => {
    if (!purchaseData) {
      return { items: [], totalPages: 1 };
    }

    return {
      items: purchaseData.purchaseRequests,
      totalPages: purchaseData.totalPages || 1,
    };
  }, [purchaseData]);

  const isLoading = isPurchaseLoading || isBudgetLoading;

  // error 분기
  if (purchaseError || budgetError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  // 🎯 그룹화된 Props 준비
  const tableState = {
    items,
    currentPage,
    totalPages,
    onPageChange: handlePageChange,
    isLoading,
    isEmpty: items.length === 0,
  };

  const emptyState = {
    emptyMessage: PURCHASE_HISTORY_MESSAGES.EMPTY,
  };

  return (
    <>
      {/* 🎯 깔끔하게 그룹화된 Props 전달 */}
      <PurchaseHistoryTem
        budgetInfo={budgetInfo}
        sortState={sortState}
        tableState={tableState}
        navigationHandlers={navigationHandlers}
        emptyState={emptyState}
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

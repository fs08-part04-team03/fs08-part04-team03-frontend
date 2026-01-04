'use client';

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import {
  managePurchaseRequests,
  getBudget,
  type ManagePurchaseRequestsParams,
} from '@/features/purchase/api/purchase.api';
import PurchaseHistoryTem from '@/features/purchase-history/template/PurchaseHistoryTem/PurchaseHistoryTem';
import { Toast } from '@/components/molecules/Toast/Toast';
import { COMMON_SORT_OPTIONS, DEFAULT_SORT_KEY } from '@/constants/sort';
import { QUERY_STALE_TIME_BUDGET, LOADING_MESSAGES, ERROR_MESSAGES } from '@/constants';
import { useToast } from '@/hooks/useToast';
import { logger } from '@/utils/logger';

/**
 * PurchaseHistorySection
 * 구매 내역 리스트 비즈니스 로직을 담당하는 섹션 컴포넌트
 * - 구매 내역 목록 API 호출 (React Query 사용)
 * - 예산 정보 API 호출 (React Query 사용)
 * - 페이지네이션 관리
 * - 정렬 관리
 * - Toast 관리
 */
const PurchaseHistorySection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState<Option>(() => {
    const defaultOption = COMMON_SORT_OPTIONS.find((opt) => opt.key === DEFAULT_SORT_KEY);
    return defaultOption || COMMON_SORT_OPTIONS[0] || { key: 'LATEST', label: '최신순' };
  });

  const { user } = useAuthStore();
  const companyId = user?.companyId || '';

  // useToast 훅 사용
  const { showToast, toastVariant, toastMessage, closeToast } = useToast();

  // 드롭다운 옵션 key를 API sort 파라미터로 변환
  const getSortParams = (
    sortKey: string
  ): { sortBy?: 'createdAt' | 'totalPrice'; order?: 'asc' | 'desc' } => {
    if (sortKey === 'PRICE_LOW') {
      return { sortBy: 'totalPrice', order: 'asc' };
    }
    if (sortKey === 'PRICE_HIGH') {
      return { sortBy: 'totalPrice', order: 'desc' };
    }
    // LATEST 또는 기본값
    return { sortBy: 'createdAt', order: 'desc' };
  };

  const sortParams = getSortParams(selectedSort.key);

  // 구매 내역 목록 조회 (React Query) - 서버 측 페이지네이션
  const {
    data: purchaseData,
    isLoading: isPurchaseLoading,
    error: purchaseError,
  } = useQuery({
    queryKey: ['purchaseHistory', sortParams.sortBy, sortParams.order, currentPage],
    queryFn: async () => {
      logger.info('[PurchaseHistory] 구매 내역 조회 시작:', {
        sortBy: sortParams.sortBy,
        order: sortParams.order,
        page: currentPage,
        status: 'APPROVED',
      });

      const params: ManagePurchaseRequestsParams = {
        page: currentPage,
        size: 4, // 페이지당 4개
        sortBy: sortParams.sortBy,
        order: sortParams.order,
        status: 'APPROVED',
      };

      const response = await managePurchaseRequests(params);

      logger.info('[PurchaseHistory] 구매 내역 조회 성공:', {
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
      });

      return response;
    },
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });

  // 예산 조회 (React Query)
  const {
    data: budgetData,
    isLoading: isBudgetLoading,
    error: budgetError,
  } = useQuery({
    queryKey: ['budget', companyId],
    queryFn: async () => {
      if (!companyId) {
        throw new Error('Company ID is required');
      }

      logger.info('[PurchaseHistory] 예산 정보 조회 시작:', { companyId });

      const result = await getBudget(companyId);

      logger.info('[PurchaseHistory] 예산 정보 조회 성공:', result);

      return result;
    },
    enabled: !!companyId,
    staleTime: QUERY_STALE_TIME_BUDGET,
  });

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

  const handleSortChange = (option: Option) => {
    logger.info('[PurchaseHistory] 정렬 변경:', { option });
    setSelectedSort(option);
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 로딩 중일 때
  if (isPurchaseLoading || isBudgetLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{LOADING_MESSAGES.DEFAULT}</p>
      </div>
    );
  }

  // 에러 발생 시
  if (purchaseError || budgetError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600">{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

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
        companyId={companyId}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
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

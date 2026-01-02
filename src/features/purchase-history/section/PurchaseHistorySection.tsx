'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import {
  managePurchaseRequests,
  getBudget,
  type PurchaseRequestItem,
  type ManagePurchaseRequestsParams,
} from '@/features/purchase/api/purchase.api';
import PurchaseHistoryTem from '@/features/purchase-history/template/PurchaseHistoryTem/PurchaseHistoryTem';
import { Toast } from '@/components/molecules/Toast/Toast';
import { COMMON_SORT_OPTIONS, DEFAULT_SORT_KEY } from '@/constants/sort';
import { useToast } from '@/hooks/useToast';
import { logger } from '@/utils/logger';

/**
 * PurchaseHistorySection
 * 구매 내역 리스트 비즈니스 로직을 담당하는 섹션 컴포넌트
 * - 구매 내역 목록 API 호출
 * - 예산 정보 API 호출
 * - 페이지네이션 관리
 * - 정렬 관리
 * - Toast 관리
 */
const PurchaseHistorySection = () => {
  const [items, setItems] = useState<PurchaseRequestItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSort, setSelectedSort] = useState<Option>(() => {
    const defaultOption = COMMON_SORT_OPTIONS.find((opt) => opt.key === DEFAULT_SORT_KEY);
    return defaultOption || COMMON_SORT_OPTIONS[0] || { key: 'LATEST', label: '최신순' };
  });

  // Budget data (백엔드에서 계산된 값)
  const [thisMonthBudget, setThisMonthBudget] = useState(0);
  const [lastMonthBudget, setLastMonthBudget] = useState(0);
  const [thisMonthSpending, setThisMonthSpending] = useState(0);
  const [lastMonthSpending, setLastMonthSpending] = useState(0);
  const [thisYearTotalSpending, setThisYearTotalSpending] = useState(0);
  const [lastYearTotalSpending, setLastYearTotalSpending] = useState(0);
  const [spendingPercentage, setSpendingPercentage] = useState(0);
  const [currentBudget, setCurrentBudget] = useState(0);
  const [lastBudget, setLastBudget] = useState(0);

  const { user } = useAuthStore();
  const companyId = user?.companyId || '';

  // useToast 훅 사용
  const { showToast, toastMessage, triggerToast, closeToast } = useToast();

  // 구매 내역 목록 조회
  useEffect(() => {
    (async () => {
      try {
        logger.info('[PurchaseHistory] 구매 내역 조회 시작:', {
          page: currentPage,
          sort: selectedSort.key,
          status: 'APPROVED',
        });

        // 드롭다운 옵션 key를 API sort 파라미터로 변환
        // LATEST는 undefined로 전달 (기본 정렬)
        const sortParam = selectedSort.key === 'LATEST' ? undefined : selectedSort.key;

        // 상태는 항상 APPROVED로 고정
        const statusParam = 'APPROVED';

        logger.info('[PurchaseHistory] API 파라미터:', {
          page: currentPage,
          size: 100,
          sort: sortParam,
          status: statusParam,
        });

        // 충분한 데이터를 가져와서 클라이언트 측에서 필터링 및 페이지네이션
        const params: ManagePurchaseRequestsParams = {
          page: 1, // 항상 첫 페이지부터 가져옴 (클라이언트 측 페이지네이션)
          size: 100,
          sort: sortParam,
          status: statusParam,
        };

        const response = await managePurchaseRequests(params);

        logger.info('[PurchaseHistory] 구매 내역 조회 성공:', {
          totalItems: response.totalItems,
          currentPage: response.currentPage,
        });

        // 구매 승인일과 담당자(approver)가 있고, 상태가 APPROVED인 항목만 필터링
        const filteredItems = response.purchaseRequests.filter(
          (item) =>
            item.approver && item.approver.id && item.approver.name && item.status === 'APPROVED'
        );

        // 클라이언트 측 정렬 적용
        const sortedItems = [...filteredItems].sort((a, b) => {
          if (sortParam === 'PRICE_LOW') {
            return a.totalPrice - b.totalPrice;
          }
          if (sortParam === 'PRICE_HIGH') {
            return b.totalPrice - a.totalPrice;
          }
          // LATEST 또는 기본값: 최신순 (날짜 내림차순)
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        // 페이지당 4개로 페이지네이션
        const itemsPerPage = 4;
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const paginatedItems = sortedItems.slice(startIndex, endIndex);

        // 필터링된 전체 아이템 수를 기반으로 totalPages 계산
        const calculatedTotalPages = Math.max(1, Math.ceil(filteredItems.length / itemsPerPage));

        logger.info('[PurchaseHistory] 필터링된 구매 내역:', {
          originalCount: response.purchaseRequests.length,
          approverFilteredCount: response.purchaseRequests.filter(
            (item) => item.approver && item.approver.id && item.approver.name
          ).length,
          approvedFilteredCount: filteredItems.length,
          paginatedCount: paginatedItems.length,
          calculatedTotalPages,
          sortParam,
          statusParam,
        });

        setItems(paginatedItems);
        setCurrentPage(currentPage);
        setTotalPages(calculatedTotalPages);
      } catch (error) {
        logger.error('[PurchaseHistory] 구매 내역 조회 실패:', error);
        const errorMessage =
          error instanceof Error ? error.message : '구매 내역을 불러오는데 실패했습니다.';
        triggerToast('custom', errorMessage);
      }
    })().catch(() => {
      // 에러는 이미 catch 블록에서 처리됨
    });
  }, [currentPage, selectedSort, triggerToast]);

  // 예산 정보 조회
  useEffect(() => {
    (async () => {
      try {
        if (!companyId) return;

        logger.info('[PurchaseHistory] 예산 정보 조회 시작:', { companyId });

        const budgetData = await getBudget(companyId);

        logger.info('[PurchaseHistory] 예산 정보 조회 성공:', budgetData);

        // 백엔드에서 계산된 모든 값을 그대로 사용
        setThisMonthBudget(Number.isFinite(budgetData.budget) ? budgetData.budget : 0);
        setThisMonthSpending(
          Number.isFinite(budgetData.monthlySpending) ? budgetData.monthlySpending : 0
        );
        setLastMonthBudget(
          Number.isFinite(budgetData.lastMonthBudget) ? budgetData.lastMonthBudget : 0
        );
        setLastMonthSpending(
          Number.isFinite(budgetData.lastMonthSpending) ? budgetData.lastMonthSpending : 0
        );
        setThisYearTotalSpending(
          Number.isFinite(budgetData.thisYearTotalSpending) ? budgetData.thisYearTotalSpending : 0
        );
        setLastYearTotalSpending(
          Number.isFinite(budgetData.lastYearTotalSpending) ? budgetData.lastYearTotalSpending : 0
        );
        setSpendingPercentage(
          Number.isFinite(budgetData.spendingPercentage) ? budgetData.spendingPercentage : 0
        );
        setCurrentBudget(
          Number.isFinite(budgetData.remainingBudget) ? budgetData.remainingBudget : 0
        );
        setLastBudget(Number.isFinite(budgetData.lastBudget) ? budgetData.lastBudget : 0);
      } catch (error) {
        logger.error('[PurchaseHistory] 예산 정보 조회 실패:', error);
        // 예산 조회 실패는 토스트를 띄우지 않음 (선택적 정보)
      }
    })().catch(() => {
      // 에러는 이미 catch 블록에서 처리됨
    });
  }, [companyId]);

  const handleSortChange = (option: Option) => {
    logger.info('[PurchaseHistory] 정렬 변경:', { option });
    setSelectedSort(option);
    setCurrentPage(1); // 정렬 변경 시 첫 페이지로
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      <PurchaseHistoryTem
        thisMonthBudget={thisMonthBudget}
        lastMonthBudget={lastMonthBudget}
        thisMonthSpending={thisMonthSpending}
        lastMonthSpending={lastMonthSpending}
        thisYearTotalSpending={thisYearTotalSpending}
        lastYearTotalSpending={lastYearTotalSpending}
        spendingPercentage={spendingPercentage}
        currentBudget={currentBudget}
        lastBudget={lastBudget}
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
          <Toast variant="custom" message={toastMessage} onClose={closeToast} />
        </div>
      )}
    </>
  );
};

export default PurchaseHistorySection;

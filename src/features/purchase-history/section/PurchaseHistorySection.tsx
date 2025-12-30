'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import {
  getMyPurchases,
  getBudget,
  type PurchaseRequestItem,
  type GetMyPurchasesParams,
} from '@/features/purchase/api/purchase.api';
import PurchaseHistoryTem from '@/features/purchase-history/template/PurchaseHistoryTem/PurchaseHistoryTem';
import { Toast } from '@/components/molecules/Toast/Toast';
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
  const [selectedSort, setSelectedSort] = useState<Option>({
    key: 'createdAt,desc',
    label: '최신순',
  });

  // Budget data
  const [thisMonthBudget, setThisMonthBudget] = useState(0);
  const [lastMonthBudget, setLastMonthBudget] = useState(0);
  const [thisMonthSpending, setThisMonthSpending] = useState(0);
  const [lastMonthSpending, setLastMonthSpending] = useState(0);
  const [thisYearTotalSpending, setThisYearTotalSpending] = useState(0);
  const [lastYearTotalSpending, setLastYearTotalSpending] = useState(0);

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
        });

        const params: GetMyPurchasesParams = {
          page: currentPage,
          size: 10,
          sort: selectedSort.key,
          status: 'APPROVED', // 승인된 구매 내역만 조회
        };

        const response = await getMyPurchases(params);

        logger.info('[PurchaseHistory] 구매 내역 조회 성공:', {
          totalItems: response.totalItems,
          currentPage: response.currentPage,
        });

        setItems(response.purchaseList);
        setCurrentPage(response.currentPage);
        setTotalPages(response.totalPages);
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

        // 현재 월 데이터 (API에서 제공)
        setThisMonthBudget(budgetData.budget);
        setThisMonthSpending(budgetData.monthlySpending);

        // TODO: 아래 데이터는 백엔드 API에서 제공되지 않음
        // 추후 연간/월간 지출 통계 API가 추가되면 실제 값으로 대체 필요
        // - lastMonthBudget, lastMonthSpending: 지난 달 예산/지출
        // - thisYearTotalSpending: 올해 1월~현재월 누적 지출
        // - lastYearTotalSpending: 작년 동기간 누적 지출
        setLastMonthBudget(0);
        setLastMonthSpending(0);
        setThisYearTotalSpending(0);
        setLastYearTotalSpending(0);
      } catch (error) {
        logger.error('[PurchaseHistory] 예산 정보 조회 실패:', error);
        // 예산 조회 실패는 토스트를 띄우지 않음 (선택적 정보)
      }
    })().catch(() => {
      // 에러는 이미 catch 블록에서 처리됨
    });
  }, [companyId]);

  const handleSortChange = (option: Option) => {
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

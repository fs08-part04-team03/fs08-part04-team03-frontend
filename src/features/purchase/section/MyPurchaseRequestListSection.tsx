'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyPurchases, cancelPurchaseRequest } from '@/features/purchase/api/purchase.api';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import MyPurchaseRequestListTem from '@/features/purchase/template/MyPurchaseRequestListTem/MyPurchaseRequestListTem';
import { Toast } from '@/components/molecules/Toast/Toast';
import {
  PURCHASE_REQUEST_STATUS_OPTIONS,
  SUCCESS_MESSAGES,
  PURCHASE_ERROR_MESSAGES,
  ERROR_MESSAGES,
} from '@/constants';
import { COMMON_SORT_OPTIONS, DEFAULT_SORT_KEY } from '@/constants/sort';
import { useToast } from '@/hooks/useToast';
import { usePaginationParams } from '@/hooks/usePaginationParams';
import { logger } from '@/utils/logger';

const MyPurchaseRequestListSection = () => {
  // useToast 훅 사용
  const { showToast, toastVariant, toastMessage, triggerToast, closeToast } = useToast();

  // usePaginationParams 훅 사용
  const {
    params: paginationParams,
    handlePageChange,
    handleSortChange,
    handleStatusChange,
  } = usePaginationParams({ defaultSize: 6, defaultSortKey: 'LATEST' });

  const { page, size, status, sort } = paginationParams;

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelTargetItem, setCancelTargetItem] = useState<PurchaseRequestItem | null>(null);

  const selectedSortOption =
    sort && sort !== DEFAULT_SORT_KEY
      ? COMMON_SORT_OPTIONS.find((opt) => opt.key === sort)
      : COMMON_SORT_OPTIONS.find((opt) => opt.key === DEFAULT_SORT_KEY);

  const selectedStatusOption =
    status && status !== 'ALL'
      ? PURCHASE_REQUEST_STATUS_OPTIONS.find((opt) => opt.key === status)
      : PURCHASE_REQUEST_STATUS_OPTIONS.find((opt) => opt.key === 'ALL');

  const {
    data,
    isLoading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ['myPurchases', page, size, status, sort],
    queryFn: async () => {
      const response = await getMyPurchases({ page, size, status, sort });

      logger.info('[MyPurchaseRequestList] API 응답:', {
        totalItems: response.totalItems,
        purchaseListLength: response.purchaseList.length,
        status,
        requestedStatus: status,
      });

      // 클라이언트 측에서 상태 필터링 적용 (백엔드 필터링이 제대로 작동하지 않을 수 있으므로)
      let filteredList = [...response.purchaseList];
      if (status && status !== 'ALL') {
        filteredList = filteredList.filter((item) => item.status === status);
        logger.info('[MyPurchaseRequestList] 상태 필터링 적용:', {
          originalCount: response.purchaseList.length,
          filteredCount: filteredList.length,
          status,
        });
      }

      // 클라이언트 측에서 정렬 적용 (백엔드 정렬이 제대로 작동하지 않을 수 있으므로)
      const sortedList = [...filteredList];
      if (sort === 'PRICE_LOW') {
        sortedList.sort((a, b) => a.totalPrice - b.totalPrice);
      } else if (sort === 'PRICE_HIGH') {
        sortedList.sort((a, b) => b.totalPrice - a.totalPrice);
      } else {
        // LATEST 또는 기본값: createdAt 기준 내림차순 (최신순)
        // 날짜가 늦은 것(최신)부터 오래된 것 순서로 정렬
        sortedList.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }

      return {
        ...response,
        purchaseList: sortedList,
        totalItems: filteredList.length, // 필터링된 개수로 업데이트
        // 클라이언트 필터링 시 페이지네이션도 재계산
        totalPages: Math.ceil(filteredList.length / size) || 1,
        currentPage: 1, // 필터링 후 첫 페이지로 리셋
      };
    },
  });

  const handleCancelClick = useCallback(
    (purchaseRequestId: string) => {
      if (!data) return;
      const item = data.purchaseList.find((p) => p.id === purchaseRequestId);
      if (item) {
        setCancelTargetItem(item);
        setCancelModalOpen(true);
      }
    },
    [data]
  );

  const handleCancelModalClose = useCallback(() => {
    setCancelModalOpen(false);
    setCancelTargetItem(null);
  }, []);

  const handleCancelConfirm = useCallback(async () => {
    if (!cancelTargetItem) return;

    try {
      await cancelPurchaseRequest(cancelTargetItem.id);
      await refetch();
      setCancelModalOpen(false);
      setCancelTargetItem(null);
      triggerToast('custom', SUCCESS_MESSAGES.PURCHASE_CANCELLED);
    } catch (cancelError) {
      logger.error('구매 요청 취소 실패:', cancelError);
      triggerToast('error', PURCHASE_ERROR_MESSAGES.CANCEL_FAILED);
      setCancelModalOpen(false);
      setCancelTargetItem(null);
    }
  }, [cancelTargetItem, refetch, triggerToast]);

  if (queryError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  // 페이지당 6개만 표시
  const displayList = data?.purchaseList.slice(0, 6) || [];

  return (
    <div className="w-full">
      <MyPurchaseRequestListTem
        purchaseList={displayList}
        onCancelClick={handleCancelClick}
        cancelModalOpen={cancelModalOpen}
        cancelTargetItem={cancelTargetItem}
        onCancelModalClose={handleCancelModalClose}
        onCancelConfirm={handleCancelConfirm}
        currentPage={data?.currentPage}
        totalPages={data?.totalPages}
        onPageChange={handlePageChange}
        sortOptions={COMMON_SORT_OPTIONS}
        selectedSortOption={selectedSortOption}
        onSortChange={handleSortChange}
        statusOptions={PURCHASE_REQUEST_STATUS_OPTIONS}
        selectedStatusOption={selectedStatusOption}
        onStatusChange={handleStatusChange}
        isLoading={isLoading}
      />
      {/* Toast */}
      {showToast && (
        <div className="fixed top-60 left-1/2 -translate-x-1/2 z-toast tablet:top-30">
          <Toast variant={toastVariant} message={toastMessage} onClose={closeToast} />
        </div>
      )}
    </div>
  );
};

export default MyPurchaseRequestListSection;

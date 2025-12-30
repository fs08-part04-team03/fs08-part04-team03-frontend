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
  LOADING_MESSAGES,
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
  } = usePaginationParams({ defaultSize: 10, defaultSortKey: DEFAULT_SORT_KEY });

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
    queryFn: () => getMyPurchases({ page, size, status, sort }),
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{LOADING_MESSAGES.DEFAULT}</p>
      </div>
    );
  }

  if (queryError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="w-full">
      <MyPurchaseRequestListTem
        purchaseList={data.purchaseList}
        onCancelClick={handleCancelClick}
        cancelModalOpen={cancelModalOpen}
        cancelTargetItem={cancelTargetItem}
        onCancelModalClose={handleCancelModalClose}
        onCancelConfirm={handleCancelConfirm}
        currentPage={data.currentPage}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
        sortOptions={COMMON_SORT_OPTIONS}
        selectedSortOption={selectedSortOption}
        onSortChange={handleSortChange}
        statusOptions={PURCHASE_REQUEST_STATUS_OPTIONS}
        selectedStatusOption={selectedStatusOption}
        onStatusChange={handleStatusChange}
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

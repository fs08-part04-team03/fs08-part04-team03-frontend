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
      try {
        // 정렬 옵션을 API 스펙에 맞게 변환
        let sortBy: 'createdAt' | 'updatedAt' | 'totalPrice' | undefined = 'createdAt';
        let order: 'asc' | 'desc' = 'desc';

        if (sort === 'LATEST' || !sort || sort === DEFAULT_SORT_KEY) {
          sortBy = 'createdAt';
          order = 'desc';
        } else if (sort === 'PRICE_LOW') {
          sortBy = 'totalPrice';
          order = 'asc';
        } else if (sort === 'PRICE_HIGH') {
          sortBy = 'totalPrice';
          order = 'desc';
        }

        const response = await getMyPurchases({
          page,
          limit: size,
          sortBy,
          order,
          status,
        });

        // 백엔드에서 이미 정렬/필터링된 데이터를 받으므로 클라이언트 측 추가 처리는 최소화
        // 페이지네이션은 백엔드에서 처리하므로 그대로 사용
        return response;
      } catch (error) {
        logger.error('[MyPurchaseRequestList] API 호출 실패:', {
          error: error instanceof Error ? error.message : String(error),
          page,
          size,
          status,
          sort,
        });
        throw error;
      }
    },
    retry: false, // 401 에러 시 재시도 방지
    refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
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

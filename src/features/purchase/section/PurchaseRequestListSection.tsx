'use client';

import { useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import {
  managePurchaseRequests,
  approvePurchaseRequest,
  rejectPurchaseRequest,
  getBudget,
} from '@/features/purchase/api/purchase.api';
import PurchaseRequestListTem from '@/features/purchase/template/PurchaseRequestListTem/PurchaseRequestListTem';
import { Toast } from '@/components/molecules/Toast/Toast';
import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';
import {
  PURCHASE_REQUEST_STATUS_OPTIONS,
  QUERY_STALE_TIME_BUDGET,
  SUCCESS_MESSAGES,
  PURCHASE_ERROR_MESSAGES,
  LOADING_MESSAGES,
  ERROR_MESSAGES,
  VALIDATION_MESSAGES,
} from '@/constants';
import { COMMON_SORT_OPTIONS, DEFAULT_SORT_KEY } from '@/constants/sort';
import { useToast } from '@/hooks/useToast';
import { usePaginationParams } from '@/hooks/usePaginationParams';
import { logger } from '@/utils/logger';

const PurchaseRequestListSection = () => {
  const params = useParams();
  const queryClient = useQueryClient();
  const companyId = params?.companyId ? String(params.companyId) : undefined;

  // useToast 훅 사용
  const { showToast, toastVariant, toastMessage, triggerToast, closeToast } = useToast();

  // usePaginationParams 훅 사용
  const {
    params: paginationParams,
    handlePageChange,
    handleSortChange,
    handleStatusChange,
  } = usePaginationParams({ defaultSize: 6, defaultSortKey: DEFAULT_SORT_KEY });

  const { page, size, status, sort } = paginationParams;

  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

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
  } = useQuery({
    queryKey: ['purchaseRequests', page, size, status, sort],
    queryFn: () => managePurchaseRequests({ page, size, status, sort }),
  });

  // 예산 조회
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
      const result = await getBudget(companyId);
      return result;
    },
    enabled: !!companyId,
    staleTime: QUERY_STALE_TIME_BUDGET,
  });

  const handleRejectClick = useCallback((purchaseRequestId: string) => {
    setSelectedRequestId(purchaseRequestId);
    setRejectModalOpen(true);
  }, []);

  const handleApproveClick = useCallback((purchaseRequestId: string) => {
    setSelectedRequestId(purchaseRequestId);
    setApproveModalOpen(true);
  }, []);

  const handleRejectModalClose = useCallback(() => {
    setRejectModalOpen(false);
    setSelectedRequestId(null);
  }, []);

  const handleApproveModalClose = useCallback(() => {
    setApproveModalOpen(false);
    setSelectedRequestId(null);
  }, []);

  const handleRejectSubmit = useCallback(
    async (message: string) => {
      if (!selectedRequestId) return;
      try {
        await rejectPurchaseRequest(selectedRequestId, { reason: message });
        await queryClient.invalidateQueries({ queryKey: ['purchaseRequests'] });
        setRejectModalOpen(false);
        setSelectedRequestId(null);
        triggerToast('custom', SUCCESS_MESSAGES.PURCHASE_REJECTED);
      } catch (rejectError) {
        logger.error('구매 요청 반려 실패:', rejectError);
        triggerToast('error', PURCHASE_ERROR_MESSAGES.REJECT_FAILED);
      }
    },
    [selectedRequestId, queryClient, triggerToast]
  );

  const handleApproveSubmit = useCallback(
    async (_message: string) => {
      if (!selectedRequestId) return;
      try {
        await approvePurchaseRequest(selectedRequestId);
        await queryClient.invalidateQueries({ queryKey: ['purchaseRequests'] });
        setApproveModalOpen(false);
        setSelectedRequestId(null);
        triggerToast('custom', SUCCESS_MESSAGES.PURCHASE_APPROVED);
      } catch (approveError) {
        logger.error('구매 요청 승인 실패:', approveError);
        triggerToast('error', PURCHASE_ERROR_MESSAGES.APPROVE_FAILED);
      }
    },
    [selectedRequestId, queryClient, triggerToast]
  );

  // companyId 필수 체크
  if (!companyId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{VALIDATION_MESSAGES.COMPANY_ID_REQUIRED}</p>
      </div>
    );
  }

  if (isLoading || isBudgetLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{LOADING_MESSAGES.DEFAULT}</p>
      </div>
    );
  }

  if (queryError || budgetError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  if (data === undefined || data.purchaseRequests === undefined) {
    return null;
  }

  const purchaseList = data.purchaseRequests;

  if (purchaseList.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <StatusNotice
          title="구매 요청 내역이 없습니다"
          description="아직 승인 대기 중인 구매 요청이 없습니다"
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <PurchaseRequestListTem
        purchaseList={purchaseList}
        companyId={companyId}
        onRejectClick={handleRejectClick}
        onApproveClick={handleApproveClick}
        selectedRequestId={selectedRequestId}
        approveModalOpen={approveModalOpen}
        rejectModalOpen={rejectModalOpen}
        onApproveModalClose={handleApproveModalClose}
        onRejectModalClose={handleRejectModalClose}
        onApproveSubmit={handleApproveSubmit}
        onRejectSubmit={handleRejectSubmit}
        budget={budgetData?.budget ?? 0}
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

export default PurchaseRequestListSection;

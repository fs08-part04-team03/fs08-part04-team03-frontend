'use client';

import { useState, useCallback, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import {
  managePurchaseRequests,
  approvePurchaseRequest,
  rejectPurchaseRequest,
  getBudget,
} from '@/features/purchase/api/purchase.api';
import PurchaseRequestListTem from '@/features/purchase/template/PurchaseRequestListTem/PurchaseRequestListTem';
import { Toast } from '@/components/molecules/Toast/Toast';
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
  const router = useRouter();
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

  // 기본적으로 PENDING 상태만 조회 (이미 처리된 요청 제외)
  const effectiveStatus = status || 'PENDING';

  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const selectedSortOption =
    sort && sort !== DEFAULT_SORT_KEY
      ? COMMON_SORT_OPTIONS.find((opt) => opt.key === sort)
      : COMMON_SORT_OPTIONS.find((opt) => opt.key === DEFAULT_SORT_KEY);

  const selectedStatusOption =
    effectiveStatus && effectiveStatus !== 'ALL'
      ? PURCHASE_REQUEST_STATUS_OPTIONS.find((opt) => opt.key === effectiveStatus)
      : PURCHASE_REQUEST_STATUS_OPTIONS.find((opt) => opt.key === 'PENDING');

  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ['purchaseRequests', page, size, effectiveStatus, sort],
    queryFn: () => managePurchaseRequests({ page, size, status: effectiveStatus, sort }),
    retry: false, // 401 에러 시 재시도 방지
    refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
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
    retry: false,
    refetchOnWindowFocus: false,
  });

  // 디버깅: 로딩 상태와 에러 상태 로깅
  useEffect(() => {
    logger.info('[PurchaseRequestList] 상태:', {
      isLoading,
      isBudgetLoading,
      hasData: !!data,
      hasBudgetData: !!budgetData,
      hasError: !!queryError,
      hasBudgetError: !!budgetError,
      errorMessage: queryError instanceof Error ? queryError.message : undefined,
      budgetErrorMessage: budgetError instanceof Error ? budgetError.message : undefined,
    });
  }, [isLoading, isBudgetLoading, data, budgetData, queryError, budgetError]);

  // 401 에러 처리 (리다이렉트는 fetchWithAuth에서 처리됨)
  useEffect(() => {
    if (queryError instanceof Error && queryError.message.includes('인증이 만료되었습니다')) {
      logger.info('[PurchaseRequestList] 인증 만료로 리다이렉트됨');
    } else if (queryError) {
      logger.error('[PurchaseRequestList] 구매 요청 조회 실패:', queryError);
    }
  }, [queryError]);

  // 예산 조회 에러 처리
  useEffect(() => {
    if (budgetError instanceof Error && budgetError.message.includes('인증이 만료되었습니다')) {
      logger.info('[PurchaseRequestList] 예산 조회 중 인증 만료로 리다이렉트됨');
    } else if (budgetError) {
      logger.error('[PurchaseRequestList] 예산 조회 실패:', budgetError);
    }
  }, [budgetError]);

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
        // 구매 요청 목록과 예산 데이터 모두 갱신
        await queryClient.invalidateQueries({ queryKey: ['purchaseRequests'] });
        await queryClient.invalidateQueries({ queryKey: ['budget', companyId] });
        setApproveModalOpen(false);
        setSelectedRequestId(null);
        triggerToast('custom', SUCCESS_MESSAGES.PURCHASE_APPROVED);
      } catch (approveError) {
        logger.error('구매 요청 승인 실패:', approveError);
        triggerToast('error', PURCHASE_ERROR_MESSAGES.APPROVE_FAILED);
      }
    },
    [selectedRequestId, companyId, queryClient, triggerToast]
  );

  const handleProductNavigation = useCallback(() => {
    if (companyId) {
      router.push(`/${companyId}/products`);
    }
  }, [companyId, router]);

  const handleRowClick = useCallback(
    (purchaseRequestId: string) => {
      if (companyId) {
        router.push(`/${companyId}/requests/${purchaseRequestId}`);
      }
    },
    [companyId, router]
  );

  // companyId 필수 체크
  if (!companyId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{VALIDATION_MESSAGES.COMPANY_ID_REQUIRED}</p>
      </div>
    );
  }

  // 에러가 발생하면 먼저 표시 (401 에러는 리다이렉트되므로 제외)
  if (queryError || budgetError) {
    const isAuthError =
      (queryError instanceof Error && queryError.message.includes('인증이 만료되었습니다')) ||
      (budgetError instanceof Error && budgetError.message.includes('인증이 만료되었습니다'));

    // 401 에러는 이미 리다이렉트 처리 중이므로 표시하지 않음
    if (isAuthError) {
      return null;
    }

    logger.error('[PurchaseRequestList] 에러 발생:', { queryError, budgetError });
    let errorMessage: string = ERROR_MESSAGES.FETCH_ERROR;
    if (queryError instanceof Error) {
      errorMessage = queryError.message;
    } else if (budgetError instanceof Error) {
      errorMessage = budgetError.message;
    }
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{errorMessage}</p>
      </div>
    );
  }

  // 메인 데이터(구매 요청 목록)가 로딩 중이면 대기
  // 예산 데이터는 선택적이므로 로딩 중이어도 메인 데이터 표시 가능
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{LOADING_MESSAGES.DEFAULT}</p>
      </div>
    );
  }

  // 데이터가 없으면 에러 상태로 표시 (isLoading이 false인 경우)
  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  const purchaseList = data.purchaseRequests || [];
  // 무조건 6개까지만 표시
  const displayList = purchaseList.slice(0, 6);

  return (
    <div className="w-full mt-20 tablet:mt-20 desktop:mt-80">
      <PurchaseRequestListTem
        purchaseList={displayList}
        companyId={companyId}
        onRejectClick={handleRejectClick}
        onApproveClick={handleApproveClick}
        onRowClick={handleRowClick}
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
        onNavigateToProducts={handleProductNavigation}
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

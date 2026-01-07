'use client';

import { useState, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import PurchaseRequestDetailTem from '@/features/purchase/template/PurchaseRequestDetailTem/PurchaseRequestDetailTem';
import {
  getPurchaseRequestDetail,
  approvePurchaseRequest,
  rejectPurchaseRequest,
  getBudget,
} from '@/features/purchase/api/purchase.api';
import { Toast } from '@/components/molecules/Toast/Toast';
import CustomModal from '@/components/molecules/CustomModal/CustomModal';
import {
  QUERY_STALE_TIME_BUDGET,
  PURCHASE_ERROR_MESSAGES,
  LOADING_MESSAGES,
  ERROR_MESSAGES,
} from '@/constants';
import { useToast } from '@/hooks/useToast';
import { logger } from '@/utils/logger';

const PurchaseRequestDetailSection = () => {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const requestId = params?.requestId as string | undefined;
  const companyId = params?.companyId ? String(params.companyId) : undefined;

  // useToast 훅 사용
  const { showToast, toastVariant, toastMessage, triggerToast, closeToast } = useToast();

  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successModalType, setSuccessModalType] = useState<'approved' | 'rejected'>('approved');
  const [budgetShortageModalOpen, setBudgetShortageModalOpen] = useState(false);

  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ['purchaseRequestDetail', requestId],
    queryFn: async () => {
      if (!requestId) {
        throw new Error('Request ID is required');
      }
      try {
        return await getPurchaseRequestDetail(requestId);
      } catch (error) {
        // 404 에러인 경우 사용자에게 명확한 메시지 표시
        if (error instanceof Error && error.message.includes('찾을 수 없습니다')) {
          triggerToast('error', error.message);
        }
        throw error;
      }
    },
    enabled: !!requestId,
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    retry: false, // 404 에러는 재시도하지 않음
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

  // 예산 검증: 예산 데이터가 없으면 승인 불가 (보안상 안전)
  const budget: number = budgetData?.budget ?? 0;
  const monthlySpending: number = budgetData?.monthlySpending ?? 0;
  const totalOrderAmount = data ? data.totalPrice + data.shippingFee : 0;
  const remainingBudget = budget - monthlySpending;

  // 예산 데이터 로딩 실패 시 승인 불가
  const hasBudgetData = !isBudgetLoading && !budgetError && budgetData !== undefined;
  const isBudgetSufficient = hasBudgetData && remainingBudget >= totalOrderAmount;

  const handleApproveClick = useCallback(() => {
    if (!hasBudgetData) {
      triggerToast('error', '예산 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    if (!isBudgetSufficient) {
      triggerToast('error', '예산이 부족합니다.');
      setBudgetShortageModalOpen(true);
      return;
    }
    setApproveModalOpen(true);
  }, [hasBudgetData, isBudgetSufficient, triggerToast]);

  const handleRejectClick = useCallback(() => {
    setRejectModalOpen(true);
  }, []);

  const handleApproveModalClose = useCallback(() => {
    setApproveModalOpen(false);
  }, []);

  const handleRejectModalClose = useCallback(() => {
    setRejectModalOpen(false);
  }, []);

  const handleApproveSubmit = useCallback(
    async (_message: string) => {
      if (!requestId) return;
      try {
        await approvePurchaseRequest(requestId);
        // 캐시 즉시 제거하여 최신 데이터 보장
        queryClient.removeQueries({ queryKey: ['purchaseRequestDetail', requestId] });
        queryClient.removeQueries({ queryKey: ['purchaseRequests'] });
        queryClient.removeQueries({ queryKey: ['budget', companyId] });
        setApproveModalOpen(false);
        setSuccessModalType('approved');
        setSuccessModalOpen(true);
      } catch (approveError) {
        logger.error('구매 요청 승인 실패:', approveError);
        triggerToast('error', PURCHASE_ERROR_MESSAGES.APPROVE_FAILED);
      }
    },
    [requestId, companyId, queryClient, triggerToast]
  );

  const handleRejectSubmit = useCallback(
    async (message: string) => {
      if (!requestId) return;
      try {
        await rejectPurchaseRequest(requestId, { reason: message });
        // 캐시 즉시 제거하여 최신 데이터 보장
        queryClient.removeQueries({ queryKey: ['purchaseRequestDetail', requestId] });
        queryClient.removeQueries({ queryKey: ['purchaseRequests'] });
        setRejectModalOpen(false);
        setSuccessModalType('rejected');
        setSuccessModalOpen(true);
      } catch (rejectError) {
        logger.error('구매 요청 반려 실패:', rejectError);
        triggerToast('error', PURCHASE_ERROR_MESSAGES.REJECT_FAILED);
      }
    },
    [requestId, queryClient, triggerToast]
  );

  const handleSuccessModalClose = useCallback(() => {
    setSuccessModalOpen(false);
  }, []);

  const handleGoHome = useCallback(() => {
    if (companyId) {
      router.push(`/${companyId}`);
    }
  }, [companyId, router]);

  const handleGoToPurchaseHistory = useCallback(() => {
    if (companyId) {
      router.push(`/${companyId}/purchase-history`);
    }
  }, [companyId, router]);

  const handleGoToPurchaseRequests = useCallback(() => {
    if (companyId) {
      router.push(`/${companyId}/purchase-requests`);
    }
  }, [companyId, router]);

  const handleBudgetShortageModalClose = useCallback(() => {
    setBudgetShortageModalOpen(false);
  }, []);

  const handleGoToBudgetRequest = useCallback(() => {
    setBudgetShortageModalOpen(false);
    triggerToast('custom', '예산 증액 요청 기능은 준비 중입니다.');
  }, [triggerToast]);

  if (isLoading || isBudgetLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{LOADING_MESSAGES.DEFAULT}</p>
      </div>
    );
  }

  if (queryError) {
    // 404 에러인 경우 더 명확한 메시지 표시
    const isNotFoundError =
      queryError instanceof Error && queryError.message.includes('찾을 수 없습니다');

    let errorMessage: string = ERROR_MESSAGES.FETCH_ERROR;
    if (isNotFoundError && queryError instanceof Error) {
      errorMessage = queryError.message;
    } else if (isNotFoundError) {
      errorMessage = '구매 요청을 찾을 수 없습니다.';
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-20">
        <p className="text-16 text-gray-900">{errorMessage}</p>
        {isNotFoundError && (
          <button
            type="button"
            onClick={() => router.push(`/${companyId}/purchase-requests`)}
            className="px-20 py-10 bg-primary-500 text-white rounded-8 hover:bg-primary-600 transition-colors"
          >
            구매 요청 목록으로 돌아가기
          </button>
        )}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  // 예산 로딩 실패 시 경고 로그 (승인 버튼은 비활성화됨)
  if (budgetError) {
    logger.warn('예산 정보를 불러오는 중 오류가 발생했습니다. 승인이 비활성화됩니다.', budgetError);
  }

  if (!companyId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>회사 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <PurchaseRequestDetailTem
        purchaseRequest={data}
        companyId={companyId}
        budget={budget}
        monthlySpending={monthlySpending}
        remainingBudget={remainingBudget}
        approveModalOpen={approveModalOpen}
        rejectModalOpen={rejectModalOpen}
        onApproveClick={handleApproveClick}
        onRejectClick={handleRejectClick}
        onApproveModalClose={handleApproveModalClose}
        onRejectModalClose={handleRejectModalClose}
        onApproveSubmit={handleApproveSubmit}
        onRejectSubmit={handleRejectSubmit}
        isBudgetSufficient={isBudgetSufficient}
      />
      {/* Toast */}
      {showToast && (
        <div className="fixed top-60 left-1/2 -translate-x-1/2 z-toast tablet:top-30">
          <Toast variant={toastVariant} message={toastMessage} onClose={closeToast} />
        </div>
      )}
      {/* Success Modal */}
      <CustomModal
        open={successModalOpen}
        type={successModalType}
        onClose={handleSuccessModalClose}
        onHome={handleGoHome}
        onOrder={
          successModalType === 'approved' ? handleGoToPurchaseHistory : handleGoToPurchaseRequests
        }
      />
      {/* Budget Shortage Modal */}
      <CustomModal
        open={budgetShortageModalOpen}
        type="budget-shortage"
        onClose={handleBudgetShortageModalClose}
        onBudgetRequest={handleGoToBudgetRequest}
      />
    </div>
  );
};

export default PurchaseRequestDetailSection;

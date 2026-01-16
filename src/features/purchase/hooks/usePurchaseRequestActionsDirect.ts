/**
 * usePurchaseRequestActionsDirect
 * Props Depth 1단계 달성을 위한 직접 접근 훅
 * requestId만 받아서 승인/반려 액션을 직접 처리
 */

import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useApprovePurchaseRequest,
  useRejectPurchaseRequest,
  usePurchaseBudget,
  usePurchaseRequestDetail,
  purchaseKeys,
} from '@/features/purchase/queries/purchase.queries';
import { PURCHASE_ERROR_MESSAGES } from '@/constants';
import { useToast } from '@/hooks/useToast';
import { useCompanyId } from '@/lib/context/CompanyContext';
import { usePurchaseRequestModals } from '@/features/purchase/handlers/usePurchaseModals';

/**
 * 구매 요청 승인/반려를 직접 처리하는 훅
 * 컴포넌트에서 requestId만 받아서 사용 가능
 */
export const usePurchaseRequestActionsDirect = (requestId: string | undefined) => {
  const companyId = useCompanyId();
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();
  const modals = usePurchaseRequestModals();

  // 데이터 조회
  const { data: purchaseRequest } = usePurchaseRequestDetail(requestId);
  const {
    data: budgetData,
    isLoading: isBudgetLoading,
    error: budgetError,
  } = usePurchaseBudget(companyId, { enabled: !!companyId });

  // Mutations
  const approveMutation = useApprovePurchaseRequest();
  const rejectMutation = useRejectPurchaseRequest();

  // 예산 검증
  const budget: number = budgetData?.budget ?? 0;
  const monthlySpending: number = budgetData?.monthlySpending ?? 0;
  const totalOrderAmount = purchaseRequest
    ? (purchaseRequest.itemsTotalPrice ?? purchaseRequest.totalPrice ?? 0) +
      purchaseRequest.shippingFee
    : 0;
  const remainingBudget = budget - monthlySpending;

  const hasBudgetData = !isBudgetLoading && !budgetError && budgetData !== undefined;
  const isBudgetSufficient = hasBudgetData && remainingBudget >= totalOrderAmount;

  const handleApproveClick = useCallback(() => {
    if (!hasBudgetData) {
      triggerToast('error', '예산 정보를 불러올 수 없습니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    if (!isBudgetSufficient) {
      triggerToast('error', '예산이 부족합니다.');
      modals.openBudgetShortageModal();
      return;
    }
    modals.openApproveModal();
  }, [hasBudgetData, isBudgetSufficient, triggerToast, modals]);

  const handleRejectClick = useCallback(() => {
    modals.openRejectModal();
  }, [modals]);

  const handleApproveSubmit = useCallback(
    (_message: string) => {
      if (!requestId) return;
      approveMutation.mutate(
        { purchaseRequestId: requestId, companyId },
        {
          onSuccess: () => {
            queryClient.removeQueries({ queryKey: purchaseKeys.detail(requestId) });
            queryClient.removeQueries({ queryKey: purchaseKeys.all });
            if (companyId) {
              queryClient.removeQueries({ queryKey: purchaseKeys.budget(companyId) });
            }
            modals.closeApproveModal();
            modals.openSuccessModal('approved');
          },
          onError: () => {
            triggerToast('error', PURCHASE_ERROR_MESSAGES.APPROVE_FAILED);
          },
        }
      );
    },
    [requestId, companyId, approveMutation, queryClient, triggerToast, modals]
  );

  const handleRejectSubmit = useCallback(
    (message: string) => {
      if (!requestId) return;
      rejectMutation.mutate(
        { purchaseRequestId: requestId, reason: message },
        {
          onSuccess: () => {
            queryClient.removeQueries({ queryKey: purchaseKeys.detail(requestId) });
            queryClient.removeQueries({ queryKey: purchaseKeys.all });
            modals.closeRejectModal();
            modals.openSuccessModal('rejected');
          },
          onError: () => {
            triggerToast('error', PURCHASE_ERROR_MESSAGES.REJECT_FAILED);
          },
        }
      );
    },
    [requestId, rejectMutation, queryClient, triggerToast, modals]
  );

  return {
    budget,
    monthlySpending,
    remainingBudget,
    isBudgetSufficient,
    handleApproveClick,
    handleRejectClick,
    handleApproveSubmit,
    handleRejectSubmit,
    approveModalOpen: modals.approveModalOpen,
    rejectModalOpen: modals.rejectModalOpen,
    successModalOpen: modals.successModalOpen,
    successModalType: modals.successModalType,
    budgetShortageModalOpen: modals.budgetShortageModalOpen,
    closeApproveModal: modals.closeApproveModal,
    closeRejectModal: modals.closeRejectModal,
    closeSuccessModal: modals.closeSuccessModal,
    closeBudgetShortageModal: modals.closeBudgetShortageModal,
  };
};

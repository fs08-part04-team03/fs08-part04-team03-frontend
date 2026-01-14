import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import {
  useApprovePurchaseRequest,
  useRejectPurchaseRequest,
  purchaseKeys,
} from '@/features/purchase/queries/purchase.queries';
import { PURCHASE_ERROR_MESSAGES } from '@/constants';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';

interface UsePurchaseRequestActionsParams {
  requestId: string | undefined;
  companyId: string | undefined;
  budgetData: { budget: number; monthlySpending: number } | undefined;
  isBudgetLoading: boolean;
  budgetError: Error | null;
  purchaseRequest: PurchaseRequestItem | undefined;
  triggerToast: (variant: 'error' | 'success' | 'custom', message: string) => void;
  onApproveModalOpen: () => void;
  onRejectModalOpen: () => void;
  onApproveSuccess: () => void;
  onRejectSuccess: () => void;
  onBudgetInsufficient: () => void;
}

/**
 * 구매 요청 승인/반려 액션을 처리하는 훅
 * 이벤트/핸들러 조합 레이어 - Section에서 사용
 */
export const usePurchaseRequestActions = ({
  requestId,
  companyId,
  budgetData,
  isBudgetLoading,
  budgetError,
  purchaseRequest,
  triggerToast,
  onApproveModalOpen,
  onRejectModalOpen,
  onApproveSuccess,
  onRejectSuccess,
  onBudgetInsufficient,
}: UsePurchaseRequestActionsParams) => {
  const queryClient = useQueryClient();
  const approveMutation = useApprovePurchaseRequest();
  const rejectMutation = useRejectPurchaseRequest();

  // 예산 검증: 예산 데이터가 없으면 승인 불가 (보안상 안전)
  const budget: number = budgetData?.budget ?? 0;
  const monthlySpending: number = budgetData?.monthlySpending ?? 0;
  const totalOrderAmount = purchaseRequest
    ? (purchaseRequest.itemsTotalPrice ?? purchaseRequest.totalPrice ?? 0) +
      purchaseRequest.shippingFee
    : 0;
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
      onBudgetInsufficient();
      return;
    }
    onApproveModalOpen();
  }, [hasBudgetData, isBudgetSufficient, triggerToast, onBudgetInsufficient, onApproveModalOpen]);

  const handleRejectClick = useCallback(() => {
    onRejectModalOpen();
  }, [onRejectModalOpen]);

  const handleApproveSubmit = useCallback(
    (_message: string) => {
      if (!requestId) return;
      approveMutation.mutate(
        { purchaseRequestId: requestId, companyId },
        {
          onSuccess: () => {
            // 캐시 즉시 제거하여 최신 데이터 보장
            queryClient.removeQueries({ queryKey: purchaseKeys.detail(requestId) });
            queryClient.removeQueries({ queryKey: purchaseKeys.all });
            if (companyId) {
              queryClient.removeQueries({ queryKey: purchaseKeys.budget(companyId) });
            }
            onApproveSuccess();
          },
          onError: () => {
            triggerToast('error', PURCHASE_ERROR_MESSAGES.APPROVE_FAILED);
          },
        }
      );
    },
    [requestId, companyId, approveMutation, queryClient, triggerToast, onApproveSuccess]
  );

  const handleRejectSubmit = useCallback(
    (message: string) => {
      if (!requestId) return;
      rejectMutation.mutate(
        { purchaseRequestId: requestId, reason: message },
        {
          onSuccess: () => {
            // 캐시 즉시 제거하여 최신 데이터 보장
            queryClient.removeQueries({ queryKey: purchaseKeys.detail(requestId) });
            queryClient.removeQueries({ queryKey: purchaseKeys.all });
            onRejectSuccess();
          },
          onError: () => {
            triggerToast('error', PURCHASE_ERROR_MESSAGES.REJECT_FAILED);
          },
        }
      );
    },
    [requestId, rejectMutation, queryClient, triggerToast, onRejectSuccess]
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
  };
};

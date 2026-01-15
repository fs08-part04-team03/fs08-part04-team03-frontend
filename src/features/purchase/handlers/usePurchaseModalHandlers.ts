import { useState, useCallback } from 'react';
import {
  useApprovePurchaseRequest,
  useRejectPurchaseRequest,
  purchaseKeys,
} from '@/features/purchase/queries/purchase.queries';
import { useQueryClient } from '@tanstack/react-query';
import { SUCCESS_MESSAGES, PURCHASE_ERROR_MESSAGES } from '@/constants';

interface UsePurchaseModalHandlersParams {
  companyId: string | undefined;
  triggerToast: (variant: 'error' | 'success' | 'custom', message: string) => void;
}

/**
 * 구매 요청 목록 모달 핸들러 훅
 * 이벤트/핸들러 조합 레이어 - Section에서 사용
 */
export const usePurchaseModalHandlers = ({
  companyId,
  triggerToast,
}: UsePurchaseModalHandlersParams) => {
  const queryClient = useQueryClient();
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const approveMutation = useApprovePurchaseRequest();
  const rejectMutation = useRejectPurchaseRequest();

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
    (message: string) => {
      if (!selectedRequestId) return;
      rejectMutation.mutate(
        { purchaseRequestId: selectedRequestId, reason: message },
        {
          onSuccess: () => {
            // 캐시 즉시 제거하여 최신 데이터 보장
            queryClient.removeQueries({ queryKey: purchaseKeys.all });
            setRejectModalOpen(false);
            setSelectedRequestId(null);
            triggerToast('custom', SUCCESS_MESSAGES.PURCHASE_REJECTED);
          },
          onError: () => {
            triggerToast('error', PURCHASE_ERROR_MESSAGES.REJECT_FAILED);
          },
        }
      );
    },
    [selectedRequestId, rejectMutation, queryClient, triggerToast]
  );

  const handleApproveSubmit = useCallback(
    (message: string) => {
      if (!selectedRequestId) return;
      approveMutation.mutate(
        { purchaseRequestId: selectedRequestId, message, companyId },
        {
          onSuccess: () => {
            // 캐시 즉시 제거하여 최신 데이터 보장
            queryClient.removeQueries({ queryKey: purchaseKeys.all });
            if (companyId) {
              queryClient.removeQueries({ queryKey: purchaseKeys.budget(companyId) });
            }
            setApproveModalOpen(false);
            setSelectedRequestId(null);
            triggerToast('custom', SUCCESS_MESSAGES.PURCHASE_APPROVED);
          },
          onError: () => {
            triggerToast('error', PURCHASE_ERROR_MESSAGES.APPROVE_FAILED);
          },
        }
      );
    },
    [selectedRequestId, companyId, approveMutation, queryClient, triggerToast]
  );

  return {
    approveModalOpen,
    rejectModalOpen,
    selectedRequestId,
    handleRejectClick,
    handleApproveClick,
    handleRejectModalClose,
    handleApproveModalClose,
    handleRejectSubmit,
    handleApproveSubmit,
  };
};

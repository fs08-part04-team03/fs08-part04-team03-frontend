import { useState, useCallback } from 'react';

/**
 * 구매 요청 상세 페이지의 모달 상태를 관리하는 훅
 * 이벤트/핸들러 조합 레이어 - Section에서 사용
 */
export const usePurchaseRequestModals = () => {
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [successModalType, setSuccessModalType] = useState<'approved' | 'rejected'>('approved');
  const [budgetShortageModalOpen, setBudgetShortageModalOpen] = useState(false);

  const openApproveModal = useCallback(() => {
    setApproveModalOpen(true);
  }, []);

  const closeApproveModal = useCallback(() => {
    setApproveModalOpen(false);
  }, []);

  const openRejectModal = useCallback(() => {
    setRejectModalOpen(true);
  }, []);

  const closeRejectModal = useCallback(() => {
    setRejectModalOpen(false);
  }, []);

  const openSuccessModal = useCallback((type: 'approved' | 'rejected') => {
    setSuccessModalType(type);
    setSuccessModalOpen(true);
  }, []);

  const closeSuccessModal = useCallback(() => {
    setSuccessModalOpen(false);
  }, []);

  const openBudgetShortageModal = useCallback(() => {
    setBudgetShortageModalOpen(true);
  }, []);

  const closeBudgetShortageModal = useCallback(() => {
    setBudgetShortageModalOpen(false);
  }, []);

  return {
    approveModalOpen,
    rejectModalOpen,
    successModalOpen,
    successModalType,
    budgetShortageModalOpen,
    openApproveModal,
    closeApproveModal,
    openRejectModal,
    closeRejectModal,
    openSuccessModal,
    closeSuccessModal,
    openBudgetShortageModal,
    closeBudgetShortageModal,
  };
};

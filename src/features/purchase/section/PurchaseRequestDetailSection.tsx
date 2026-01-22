'use client';

import { useParams } from 'next/navigation';
import PurchaseRequestDetailTem from '@/features/purchase/template/PurchaseRequestDetailTem/PurchaseRequestDetailTem';
import { Toast } from '@/components/molecules/Toast/Toast';
import CustomModal from '@/components/molecules/CustomModal/CustomModal';
import { LOADING_MESSAGES, ERROR_MESSAGES } from '@/constants';
import { useToast } from '@/hooks/useToast';
import { logger } from '@/utils/logger';
import {
  usePurchaseRequestDetail,
  usePurchaseBudget,
} from '@/features/purchase/queries/purchase.queries';
import { usePurchaseRequestModals } from '@/features/purchase/handlers/usePurchaseModals';
import { usePurchaseRequestActions } from '@/features/purchase/handlers/usePurchaseActions';
import { usePurchaseNavigation } from '@/features/purchase/handlers/usePurchaseNavigation';
import { PURCHASE_LABELS, PURCHASE_MESSAGES } from '@/features/purchase/constants';
import { useAuthStore } from '@/lib/store/authStore';
import { usePageTitle } from '@/hooks/usePageTitle';
import type {
  PurchaseDetailBudgetState,
  PurchaseDetailModalState,
  PurchaseDetailModalHandlers,
} from '@/features/purchase/types/purchase-request-detail.types';

/**
 * PurchaseRequestDetailSection
 * 구매 요청 상세 데이터/상태 결정 레이어
 */
const PurchaseRequestDetailSection = () => {
  usePageTitle('구매 요청 상세');
  const params = useParams();
  const requestId = params?.requestId as string | undefined;
  const companyId = params?.companyId ? String(params.companyId) : undefined;

  const { showToast, toastVariant, toastMessage, triggerToast, closeToast } = useToast();

  // 사용자 권한 확인 (manager/admin만 예산 조회 가능)
  const user = useAuthStore((state) => state.user);
  const isManagerOrAdmin = user?.role === 'manager' || user?.role === 'admin';

  // 모달 상태 관리
  const modals = usePurchaseRequestModals();

  // 데이터 조회
  const { data, isLoading, error: queryError } = usePurchaseRequestDetail(requestId);

  // 예산 조회 (관리자 권한이 있는 경우에만 호출)
  const {
    data: budgetData,
    isLoading: isBudgetLoading,
    error: budgetError,
  } = usePurchaseBudget(companyId, { enabled: !!companyId && isManagerOrAdmin });

  // 네비게이션
  const navigation = usePurchaseNavigation(companyId);

  // 승인/반려 액션 처리
  const actions = usePurchaseRequestActions({
    requestId,
    companyId,
    budgetData,
    isBudgetLoading,
    budgetError,
    purchaseRequest: data,
    triggerToast,
    onApproveModalOpen: modals.openApproveModal,
    onRejectModalOpen: modals.openRejectModal,
    onApproveModalClose: modals.closeApproveModal,
    onRejectModalClose: modals.closeRejectModal,
    onApproveSuccess: () => {
      modals.closeApproveModal();
      modals.openSuccessModal('approved');
    },
    onRejectSuccess: () => {
      modals.closeRejectModal();
      modals.openSuccessModal('rejected');
    },
    onBudgetInsufficient: () => {
      modals.openBudgetShortageModal();
    },
  });

  const handleGoToBudgetRequest = () => {
    modals.closeBudgetShortageModal();
    triggerToast('custom', PURCHASE_MESSAGES.BUDGET_REQUEST_NOT_AVAILABLE);
  };

  if (isLoading || isBudgetLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{LOADING_MESSAGES.DEFAULT}</p>
      </div>
    );
  }

  if (queryError) {
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
        {isNotFoundError && companyId && (
          <button
            type="button"
            onClick={navigation.goToPurchaseRequests}
            className="px-20 py-10 bg-primary-500 text-white rounded-8 hover:bg-primary-600 transition-colors"
          >
            {PURCHASE_LABELS.BUTTONS.BACK_TO_LIST}
          </button>
        )}
      </div>
    );
  }

  if (!data) {
    return null;
  }

  if (budgetError) {
    logger.warn('예산 정보를 불러오는 중 오류가 발생했습니다. 승인이 비활성화됩니다.', budgetError);
  }

  if (!companyId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{PURCHASE_MESSAGES.COMPANY_NOT_FOUND}</p>
      </div>
    );
  }

  // 그룹화된 Props
  const budgetState: PurchaseDetailBudgetState = {
    budget: actions.budget,
    monthlySpending: actions.monthlySpending,
    remainingBudget: actions.remainingBudget,
    isBudgetSufficient: actions.isBudgetSufficient,
  };

  const modalState: PurchaseDetailModalState = {
    approveModalOpen: modals.approveModalOpen,
    rejectModalOpen: modals.rejectModalOpen,
  };

  const modalHandlers: PurchaseDetailModalHandlers = {
    onApproveClick: actions.handleApproveClick,
    onRejectClick: actions.handleRejectClick,
    onApproveModalClose: modals.closeApproveModal,
    onRejectModalClose: modals.closeRejectModal,
    onApproveSubmit: actions.handleApproveSubmit,
    onRejectSubmit: actions.handleRejectSubmit,
  };

  return (
    <div className="w-full">
      <PurchaseRequestDetailTem
        purchaseRequest={data}
        companyId={companyId}
        budgetState={budgetState}
        modalState={modalState}
        modalHandlers={modalHandlers}
      />
      {showToast && (
        <div className="fixed top-60 left-1/2 -translate-x-1/2 z-toast tablet:top-30">
          <Toast variant={toastVariant} message={toastMessage} onClose={closeToast} />
        </div>
      )}
      <CustomModal
        open={modals.successModalOpen}
        type={modals.successModalType}
        onClose={modals.closeSuccessModal}
        onHome={navigation.goHome}
        onOrder={
          modals.successModalType === 'approved'
            ? navigation.goToPurchaseHistory
            : navigation.goToPurchaseRequests
        }
      />
      <CustomModal
        open={modals.budgetShortageModalOpen}
        type="budget-shortage"
        onClose={modals.closeBudgetShortageModal}
        onBudgetRequest={handleGoToBudgetRequest}
      />
    </div>
  );
};

export default PurchaseRequestDetailSection;

'use client';

import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { PurchaseRequestDetailTopOrg } from '@/features/purchase/components/PurchaseRequestDetailTopOrg/PurchaseRequestDetailTopOrg';
import PurchaseRequestDetailOrg from '@/features/purchase/components/PurchaseRequestDetailOrg/PurchaseRequestDetailOrg';
import ApprovalRequestModal from '@/components/molecules/ApprovalRequestModal/ApprovalRequestModal';
import { logger } from '@/utils/logger';
import type { PurchaseRequestDetailTemGroupedProps } from '@/features/purchase/types/purchase-request-detail.types';
import PurchaseRequestDetailActionsOrg from '../../components/PurchaseRequestDetailActionsOrg/PurchaseRequestDetailActionsOrg';

interface PurchaseRequestDetailTemLegacyProps {
  purchaseRequest: PurchaseRequestItem;
  companyId: string;
  budget: number;
  monthlySpending: number;
  remainingBudget: number;
  approveModalOpen: boolean;
  rejectModalOpen: boolean;
  onApproveClick: () => void;
  onRejectClick: () => void;
  onApproveModalClose: () => void;
  onRejectModalClose: () => void;
  onApproveSubmit: (message: string) => void | Promise<void>;
  onRejectSubmit: (message: string) => void | Promise<void>;
  isBudgetSufficient?: boolean;
}

type PurchaseRequestDetailTemProps =
  | PurchaseRequestDetailTemLegacyProps
  | PurchaseRequestDetailTemGroupedProps;

function isGroupedProps(
  props: PurchaseRequestDetailTemProps
): props is PurchaseRequestDetailTemGroupedProps {
  return 'budgetState' in props && 'modalState' in props && 'modalHandlers' in props;
}

const PurchaseRequestDetailTem = ({ ...props }: PurchaseRequestDetailTemProps) => {
  /* ============================
   * Props 정규화 (🔥 핵심)
   * ============================ */
  const {
    purchaseRequest,
    companyId,
    budget,
    monthlySpending,
    remainingBudget,
    approveModalOpen,
    rejectModalOpen,
    onApproveModalClose,
    onRejectModalClose,
    onApproveSubmit,
    onRejectSubmit,
    onApproveClick,
    onRejectClick,
    isBudgetSufficient,
  } = isGroupedProps(props)
    ? {
        purchaseRequest: props.purchaseRequest,
        companyId: props.companyId,
        budget: props.budgetState.budget,
        monthlySpending: props.budgetState.monthlySpending,
        remainingBudget: props.budgetState.remainingBudget,
        approveModalOpen: props.modalState.approveModalOpen,
        rejectModalOpen: props.modalState.rejectModalOpen,
        onApproveModalClose: props.modalHandlers.onApproveModalClose,
        onRejectModalClose: props.modalHandlers.onRejectModalClose,
        onApproveSubmit: props.modalHandlers.onApproveSubmit,
        onRejectSubmit: props.modalHandlers.onRejectSubmit,
        onApproveClick: props.modalHandlers.onApproveClick,
        onRejectClick: props.modalHandlers.onRejectClick,
        isBudgetSufficient: props.budgetState.isBudgetSufficient,
      }
    : props;

  /* ============================
   * BudgetInfo
   * ============================ */
  const budgetInfo = {
    monthlySpending,
    remainingBudget,
    budgetAfterPurchase:
      remainingBudget -
      ((purchaseRequest.itemsTotalPrice ?? purchaseRequest.totalPrice ?? 0) +
        purchaseRequest.shippingFee),
  };

  /* ============================
   * ApprovedInfo
   * ============================ */
  let approvedInfo:
    | {
        approverName: string;
        approvalDate: string | null;
        statusLabel: string;
        resultMessage: string;
      }
    | undefined;

  if (purchaseRequest.status === 'APPROVED' || purchaseRequest.status === 'REJECTED') {
    const statusLabel = purchaseRequest.status === 'APPROVED' ? '승인' : '반려';
    const resultMessage = purchaseRequest.reason || purchaseRequest.rejectReason || '-';

    approvedInfo = {
      approverName: purchaseRequest.approver?.name || '-',
      approvalDate: purchaseRequest.approvedAt || null,
      statusLabel,
      resultMessage,
    };
  }

  /* ============================
   * Modal Data
   * ============================ */
  const modalData = {
    user: {
      name: purchaseRequest.requester.name,
      company: {
        name:
          typeof purchaseRequest.requester.company === 'string'
            ? purchaseRequest.requester.company
            : '',
      },
      avatarSrc:
        typeof purchaseRequest.requester.avatarSrc === 'string'
          ? purchaseRequest.requester.avatarSrc
          : undefined,
    },
    items: purchaseRequest.purchaseItems.map((item) => {
      const parsedId = Number.parseInt(item.id, 10);

      if (Number.isNaN(parsedId)) {
        logger.warn('Invalid item id in purchase request', {
          hasItemId: !!item.id,
        });
      }

      return {
        id: Number.isNaN(parsedId) ? 0 : parsedId,
        title: item.products.name,
        price: item.priceSnapshot,
        quantity: item.quantity,
        imageSrc: item.products.imageUrl ?? '',
      };
    }),
    deliveryFee: purchaseRequest.shippingFee,
    budget,
  };

  return (
    <>
      <div className="flex flex-col items-center gap-30 mt-30">
        <div className="tablet:mt-30 desktop:mt-60 mb-54 desktop:mb-254 tablet:mb-132">
          <PurchaseRequestDetailTopOrg purchaseRequest={purchaseRequest} />

          <PurchaseRequestDetailOrg
            purchaseRequest={purchaseRequest}
            budgetInfo={budgetInfo}
            approvedInfo={approvedInfo}
          />

          <PurchaseRequestDetailActionsOrg
            companyId={companyId}
            actionType="admin"
            onApproveClick={onApproveClick}
            onRejectClick={onRejectClick}
            isBudgetSufficient={isBudgetSufficient}
          />
        </div>
      </div>

      <ApprovalRequestModal
        open={approveModalOpen}
        onClose={onApproveModalClose}
        onSubmit={onApproveSubmit}
        user={modalData.user}
        items={modalData.items}
        deliveryFee={modalData.deliveryFee}
        budget={modalData.budget}
        action="approve"
      />

      <ApprovalRequestModal
        open={rejectModalOpen}
        onClose={onRejectModalClose}
        onSubmit={onRejectSubmit}
        user={modalData.user}
        items={modalData.items}
        deliveryFee={modalData.deliveryFee}
        budget={modalData.budget}
        action="reject"
      />
    </>
  );
};

export default PurchaseRequestDetailTem;

'use client';

import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { PurchaseRequestDetailTopOrg } from '@/features/purchase/components/PurchaseRequestDetailTopOrg/PurchaseRequestDetailTopOrg';
import PurchaseRequestDetailOrg from '@/features/purchase/components/PurchaseRequestDetailOrg/PurchaseRequestDetailOrg';
import ApprovalRequestModal from '@/components/molecules/ApprovalRequestModal/ApprovalRequestModal';
import { getApiUrl } from '@/utils/api';
import { logger } from '@/utils/logger';
import PurchaseRequestDetailActionsOrg from '../../components/PurchaseRequestDetailActionsOrg/PurchaseRequestDetailActionsOrg';

interface PurchaseRequestDetailTemProps {
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

const PurchaseRequestDetailTem = ({
  purchaseRequest,
  companyId,
  budget,
  monthlySpending,
  remainingBudget,
  approveModalOpen,
  rejectModalOpen,
  onApproveClick,
  onRejectClick,
  onApproveModalClose,
  onRejectModalClose,
  onApproveSubmit,
  onRejectSubmit,
  isBudgetSufficient = true,
}: PurchaseRequestDetailTemProps) => {
  // BudgetInfo 계산
  const budgetInfo = {
    monthlySpending,
    remainingBudget,
    budgetAfterPurchase:
      remainingBudget - (purchaseRequest.totalPrice + purchaseRequest.shippingFee),
  };

  // 모달 데이터 변환
  const modalData = {
    user: {
      name: purchaseRequest.requester.name,
      company: {
        name:
          'company' in purchaseRequest.requester &&
          purchaseRequest.requester.company &&
          typeof purchaseRequest.requester.company === 'string'
            ? purchaseRequest.requester.company
            : '',
      },
      avatarSrc:
        'avatarSrc' in purchaseRequest.requester &&
        purchaseRequest.requester.avatarSrc &&
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
        imageSrc: item.products.image ? `${getApiUrl()}/uploads/${item.products.image}` : undefined,
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
          <PurchaseRequestDetailOrg purchaseRequest={purchaseRequest} budgetInfo={budgetInfo} />
          <PurchaseRequestDetailActionsOrg
            companyId={companyId}
            actionType="admin"
            onApproveClick={onApproveClick}
            onRejectClick={onRejectClick}
            isBudgetSufficient={isBudgetSufficient}
          />
        </div>
      </div>

      {/* 승인 모달 */}
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

      {/* 반려 모달 */}
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

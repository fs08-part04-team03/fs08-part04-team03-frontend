'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { PurchaseRequestDetailTopOrg } from '@/features/purchase/components/PurchaseRequestDetailTopOrg/PurchaseRequestDetailTopOrg';
import PurchaseRequestDetailOrg from '@/features/purchase/components/PurchaseRequestDetailOrg/PurchaseRequestDetailOrg';
import ApprovalRequestModal from '@/components/molecules/ApprovalRequestModal/ApprovalRequestModal';
import PurchaseRequestDetailActionsOrg from '../../components/PurchaseRequestDetailActionsOrg/PurchaseRequestDetailActionsOrg';

interface PurchaseRequestDetailTemProps {
  purchaseRequest: PurchaseRequestItem;
  budget: number;
  monthlySpending: number;
  approveModalOpen: boolean;
  rejectModalOpen: boolean;
  onApproveClick: () => void;
  onRejectClick: () => void;
  onApproveModalClose: () => void;
  onRejectModalClose: () => void;
  onApproveSubmit: (message: string) => void | Promise<void>;
  onRejectSubmit: (message: string) => void | Promise<void>;
}

const PurchaseRequestDetailTem: React.FC<PurchaseRequestDetailTemProps> = ({
  purchaseRequest,
  budget,
  monthlySpending,
  approveModalOpen,
  rejectModalOpen,
  onApproveClick,
  onRejectClick,
  onApproveModalClose,
  onRejectModalClose,
  onApproveSubmit,
  onRejectSubmit,
}) => {
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : undefined;

  // BudgetInfo에 필요한 값들을 계산 (my/ 경로가 아닌 경우 BudgetInfo만 표시)
  const budgetInfo = {
    monthlySpending,
    remainingBudget: budget,
    budgetAfterPurchase: budget - (purchaseRequest.totalPrice + purchaseRequest.shippingFee), // 구매 후 예산
  };

  // 모달에 필요한 데이터 변환
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
    items: purchaseRequest.purchaseItems.map((item, index) => ({
      id: index,
      title: item.products.name,
      price: item.priceSnapshot,
      quantity: item.quantity,
    })),
    deliveryFee: purchaseRequest.shippingFee,
    budget,
  };

  return (
    <div className="flex flex-col mt-30 tablet:mt-30 desktop:mt-60">
      <PurchaseRequestDetailTopOrg purchaseRequest={purchaseRequest} />
      <PurchaseRequestDetailOrg purchaseRequest={purchaseRequest} budgetInfo={budgetInfo} />
      <PurchaseRequestDetailActionsOrg
        companyId={companyId}
        actionType="admin"
        onApproveClick={onApproveClick}
        onRejectClick={onRejectClick}
      />
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
    </div>
  );
};

export default PurchaseRequestDetailTem;

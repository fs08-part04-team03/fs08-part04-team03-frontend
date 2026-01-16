/**
 * 구매 요청 모달들
 * - 승인/반려 모달만 담당
 */

import { useMemo } from 'react';
import ApprovalRequestModal from '@/components/molecules/ApprovalRequestModal/ApprovalRequestModal';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';

interface PurchaseModalState {
  selectedRequestId?: string | null;
  selectedRequestDetail?: PurchaseRequestItem;
  isDetailLoading?: boolean;
  approveModalOpen?: boolean;
  rejectModalOpen?: boolean;
}

interface PurchaseModalHandlers {
  onApproveModalClose?: () => void;
  onRejectModalClose?: () => void;
  onApproveSubmit?: (message: string) => void | Promise<void>;
  onRejectSubmit?: (message: string) => void | Promise<void>;
}

interface PurchaseBudgetInfo {
  budget?: number;
}

interface PurchaseRequestModalsProps {
  modalState?: PurchaseModalState;
  modalHandlers?: PurchaseModalHandlers;
  budgetInfo?: PurchaseBudgetInfo;
}

export const PurchaseRequestModals = ({
  modalState,
  modalHandlers,
  budgetInfo,
}: PurchaseRequestModalsProps) => {
  const selectedRequest = modalState?.selectedRequestDetail;
  const isModalDetailLoading = modalState?.isDetailLoading ?? false;

  const modalData = useMemo(() => {
    if (!selectedRequest) return null;

    return {
      user: {
        name: selectedRequest.requester.name,
        company: {
          name:
            'company' in selectedRequest.requester &&
            selectedRequest.requester.company &&
            typeof selectedRequest.requester.company === 'string'
              ? selectedRequest.requester.company
              : '',
        },
        avatarSrc:
          'avatarSrc' in selectedRequest.requester &&
          selectedRequest.requester.avatarSrc &&
          typeof selectedRequest.requester.avatarSrc === 'string'
            ? selectedRequest.requester.avatarSrc
            : undefined,
      },
      items: selectedRequest.purchaseItems.map((item, index) => {
        const imageSrc = item.products.imageUrl ? item.products.imageUrl : '';
        return {
          id: index,
          title: item.products.name,
          price: item.priceSnapshot,
          quantity: item.quantity,
          imageSrc,
        };
      }),
      deliveryFee: selectedRequest.shippingFee,
      budget: budgetInfo?.budget ?? 0,
    };
  }, [selectedRequest, budgetInfo?.budget]);

  if (!modalData || isModalDetailLoading) {
    return null;
  }

  return (
    <>
      {/* 승인 모달 */}
      <ApprovalRequestModal
        open={modalState?.approveModalOpen ?? false}
        onClose={modalHandlers?.onApproveModalClose || (() => {})}
        onSubmit={modalHandlers?.onApproveSubmit || (async () => {})}
        user={modalData.user}
        items={modalData.items}
        deliveryFee={modalData.deliveryFee}
        budget={modalData.budget}
        action="approve"
      />

      {/* 반려 모달 */}
      <ApprovalRequestModal
        open={modalState?.rejectModalOpen ?? false}
        onClose={modalHandlers?.onRejectModalClose || (() => {})}
        onSubmit={modalHandlers?.onRejectSubmit || (async () => {})}
        user={modalData.user}
        items={modalData.items}
        deliveryFee={modalData.deliveryFee}
        budget={modalData.budget}
        action="reject"
      />
    </>
  );
};

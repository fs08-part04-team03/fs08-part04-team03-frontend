/**
 * 내 구매 요청 취소 모달
 * - 취소 확인 모달만 담당
 */

import CustomModal from '@/components/molecules/CustomModal/CustomModal';
import type {
  MyPurchaseCancelModalState,
  MyPurchaseCancelModalHandlers,
} from '@/features/purchase/types/my-purchase-list.types';

interface MyPurchaseCancelModalProps {
  cancelModalState?: MyPurchaseCancelModalState;
  cancelModalHandlers?: MyPurchaseCancelModalHandlers;
}

export const MyPurchaseCancelModal = ({
  cancelModalState,
  cancelModalHandlers,
}: MyPurchaseCancelModalProps) => {
  if (
    !cancelModalState?.cancelModalOpen ||
    !cancelModalState?.cancelTargetItem ||
    !cancelModalHandlers?.onCancelModalClose
  ) {
    return null;
  }

  return (
    <CustomModal
      open={cancelModalState.cancelModalOpen}
      type="cancel"
      productName={cancelModalState.cancelTargetItem.purchaseItems[0]?.products.name}
      cancelCount={Math.max(0, cancelModalState.cancelTargetItem.purchaseItems.length - 1)}
      onClose={cancelModalHandlers.onCancelModalClose}
      onConfirm={cancelModalHandlers.onCancelConfirm}
    />
  );
};

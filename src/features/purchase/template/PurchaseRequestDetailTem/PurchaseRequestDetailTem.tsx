'use client';

import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { PurchaseRequestDetailTopOrg } from '@/features/purchase/components/PurchaseRequestDetailTopOrg/PurchaseRequestDetailTopOrg';
import PurchaseRequestDetailOrg from '@/features/purchase/components/PurchaseRequestDetailOrg/PurchaseRequestDetailOrg';
import ApprovalRequestModal from '@/components/molecules/ApprovalRequestModal/ApprovalRequestModal';
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
      remainingBudget -
      ((purchaseRequest.totalPrice ?? purchaseRequest.itemsTotalPrice) +
        purchaseRequest.shippingFee),
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

      // 이미지 키 유효성 검증 (null, undefined, 빈 문자열, 공백만 있는 경우 처리)
      const hasValidImage =
        item.products.image &&
        typeof item.products.image === 'string' &&
        item.products.image.trim().length > 0;

      // 이미지 URL 생성: 백엔드에서 받은 image 키를 프록시 API 경로로 변환
      // 상대 경로 사용 (SSR 하이드레이션 불일치 방지)
      const imageSrc =
        hasValidImage && item.products.image
          ? `/api/product/image?key=${encodeURIComponent(item.products.image.trim())}`
          : undefined;

      // 디버깅: 이미지 정보 로깅 (항상 로깅)
      logger.info('[PurchaseRequestDetailTem] 상품 이미지 정보', {
        productId: item.products.id,
        productName: item.products.name,
        rawImageField: item.products.image ?? null,
        hasImageField: !!item.products.image,
        imageFieldType: typeof item.products.image,
        imageFieldLength: item.products.image?.length ?? 0,
        hasValidImage,
        imageKey: hasValidImage && item.products.image ? item.products.image.trim() : null,
        imageSrc,
      });

      // 이미지가 없는 경우 경고 로깅
      if (!hasValidImage) {
        logger.warn('[PurchaseRequestDetailTem] 상품 이미지가 없음', {
          productId: item.products.id,
          productName: item.products.name,
          rawImageField: item.products.image ?? null,
          imageFieldType: typeof item.products.image,
        });
      }

      return {
        id: Number.isNaN(parsedId) ? 0 : parsedId,
        title: item.products.name,
        price: item.priceSnapshot,
        quantity: item.quantity,
        imageSrc,
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

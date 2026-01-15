'use client';

import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import {
  PURCHASE_REQUEST_STATUS_LABEL,
  PURCHASE_RESULT_MESSAGES,
} from '@/features/purchase/constants';
import { PurchaseRequestDetailTopOrg } from '@/features/purchase/components/PurchaseRequestDetailTopOrg/PurchaseRequestDetailTopOrg';
import PurchaseRequestDetailOrg from '@/features/purchase/components/PurchaseRequestDetailOrg/PurchaseRequestDetailOrg';
import PurchaseRequestDetailActionsOrg from '../../components/PurchaseRequestDetailActionsOrg/PurchaseRequestDetailActionsOrg';

interface MyPurchaseRequestDetailTemProps {
  purchaseRequest: PurchaseRequestItem;
  companyId: string;
  onGoToList?: () => void;
}

/**
 * MyPurchaseRequestDetailTem
 * 순수 UI 조립 레이어
 * - header / list / row / footer 컴포지션만 담당
 * - props 기반 렌더링만 수행
 */
const MyPurchaseRequestDetailTem = ({
  purchaseRequest,
  companyId,
  onGoToList,
}: MyPurchaseRequestDetailTemProps) => {
  // ApprovedInfo 계산
  let resultMessage = '-';
  if (purchaseRequest.status === 'REJECTED' && purchaseRequest.rejectReason) {
    resultMessage = purchaseRequest.rejectReason;
  } else if (purchaseRequest.status === 'APPROVED') {
    // reason이 있으면 사용, 없으면 기본 메시지
    resultMessage = purchaseRequest.reason || PURCHASE_RESULT_MESSAGES.APPROVED;
  }

  const approvedInfo = {
    approverName: purchaseRequest.approver?.name || '-',
    approvalDate: purchaseRequest.approver ? purchaseRequest.updatedAt : null,
    statusLabel: PURCHASE_REQUEST_STATUS_LABEL[purchaseRequest.status],
    resultMessage,
  };

  return (
    <div className="flex flex-col items-center gap-30 mt-30">
      <div className="tablet:mt-30 desktop:mt-60 mb-54 desktop:mb-254 tablet:mb-132">
        <PurchaseRequestDetailTopOrg purchaseRequest={purchaseRequest} companyId={companyId} />
        <PurchaseRequestDetailOrg purchaseRequest={purchaseRequest} approvedInfo={approvedInfo} />
        <PurchaseRequestDetailActionsOrg
          companyId={companyId}
          actionType="user"
          purchaseRequest={purchaseRequest}
          onGoToList={onGoToList}
        />
      </div>
    </div>
  );
};

export default MyPurchaseRequestDetailTem;

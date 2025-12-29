'use client';

import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { PURCHASE_REQUEST_STATUS_LABEL } from '@/constants/purchase.constants';
import { PurchaseRequestDetailTopOrg } from '@/features/purchase/components/PurchaseRequestDetailTopOrg/PurchaseRequestDetailTopOrg';
import PurchaseRequestDetailOrg from '@/features/purchase/components/PurchaseRequestDetailOrg/PurchaseRequestDetailOrg';
import PurchaseRequestDetailActionsOrg from '../../components/PurchaseRequestDetailActionsOrg/PurchaseRequestDetailActionsOrg';

interface MyPurchaseRequestDetailTemProps {
  purchaseRequest: PurchaseRequestItem;
  companyId: string;
}

const MyPurchaseRequestDetailTem = ({
  purchaseRequest,
  companyId,
}: MyPurchaseRequestDetailTemProps) => {
  // ApprovedInfo 계산
  let resultMessage = '-';
  if (purchaseRequest.status === 'REJECTED' && purchaseRequest.rejectReason) {
    resultMessage = purchaseRequest.rejectReason;
  } else if (purchaseRequest.status === 'APPROVED') {
    resultMessage = '승인되었습니다.';
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
        <PurchaseRequestDetailTopOrg purchaseRequest={purchaseRequest} />
        <PurchaseRequestDetailOrg purchaseRequest={purchaseRequest} approvedInfo={approvedInfo} />
        <PurchaseRequestDetailActionsOrg companyId={companyId} actionType="user" />
      </div>
    </div>
  );
};

export default MyPurchaseRequestDetailTem;

'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { PURCHASE_REQUEST_STATUS_LABEL } from '@/constants/purchase.constants';
import { PurchaseRequestDetailTopOrg } from '@/features/purchase/components/PurchaseRequestDetailTopOrg/PurchaseRequestDetailTopOrg';
import PurchaseRequestDetailOrg from '@/features/purchase/components/PurchaseRequestDetailOrg/PurchaseRequestDetailOrg';
import PurchaseRequestDetailActionsOrg from '../../components/PurchaseRequestDetailActionsOrg/PurchaseRequestDetailActionsOrg';

interface MyPurchaseRequestDetailTemProps {
  purchaseRequest: PurchaseRequestItem;
}

const MyPurchaseRequestDetailTem: React.FC<MyPurchaseRequestDetailTemProps> = ({
  purchaseRequest,
}) => {
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : undefined;

  if (!companyId) {
    return <div className="p-20 text-red-600">회사 정보를 불러올 수 없습니다.</div>;
  }

  // ApprovedInfo에 필요한 값들을 계산 (my/ 경로에서는 ApprovedInfo만 표시)
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
    <div className="flex flex-col mt-30 tablet:mt-30 desktop:mt-60">
      <PurchaseRequestDetailTopOrg purchaseRequest={purchaseRequest} />
      <PurchaseRequestDetailOrg purchaseRequest={purchaseRequest} approvedInfo={approvedInfo} />
      <PurchaseRequestDetailActionsOrg companyId={companyId} actionType="user" />
    </div>
  );
};

export default MyPurchaseRequestDetailTem;

'use client';

import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PurchaseHistoryDetailTopOrg from '../../components/PurchaseHistoryDetailTopOrg/PurchaseHistoryDetailTopOrg';
import PurchaseHistoryDetailInfoOrg from '../../components/PurchaseHistoryDetailInfoOrg/PurchaseHistoryDetailInfoOrg';

interface PurchaseHistoryDetailTemProps {
  purchaseRequest: PurchaseRequestItem;
  approvedInfo: {
    approverName: string;
    approvalDate: string | null;
    statusLabel: string;
    resultMessage: string;
  };
}

const PurchaseHistoryDetailTem = ({
  purchaseRequest,
  approvedInfo,
}: PurchaseHistoryDetailTemProps) => (
  <div className="flex flex-col items-center gap-30 mt-30">
    <div className="tablet:mt-30 desktop:mt-60 mb-54 desktop:mb-254 tablet:mb-132">
      <PurchaseHistoryDetailTopOrg purchaseRequest={purchaseRequest} />
      <PurchaseHistoryDetailInfoOrg purchaseRequest={purchaseRequest} approvedInfo={approvedInfo} />
    </div>
  </div>
);

export default PurchaseHistoryDetailTem;

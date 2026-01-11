// 내 구매 요청 내역 - MyPurchaseRequestListPage
// GET /api/v1/purchase/user/getMyPurchases

'use client';

import React from 'react';
import { clsx } from '@/utils/clsx';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { PurchaseRequestItemRowMobile } from './components/PurchaseRequestItemRowMobile';
import { PurchaseRequestItemRowDesktop } from './components/PurchaseRequestItemRowDesktop';

/**
 * PurchaseRequestItemListOrg Props
 */
export interface PurchaseRequestItemListOrgProps {
  purchaseList: PurchaseRequestItem[];
  className?: string;
  onReject?: (purchaseRequestId: string) => void;
  onApprove?: (purchaseRequestId: string) => void;
  onCancel?: (purchaseRequestId: string) => void;
  onRowClick?: (purchaseRequestId: string) => void;
  companyId?: string;
  onProductClick?: (productId: number) => void;
}

/**
 * 구매 요청 아이템 리스트 컴포넌트
 */
const PurchaseRequestItemListOrg = ({
  purchaseList,
  className,
  onReject,
  onApprove,
  onCancel,
  onRowClick,
  companyId,
  onProductClick,
}: PurchaseRequestItemListOrgProps) => (
  <div className={clsx('w-full', className)}>
    {purchaseList.map((item) => (
      <React.Fragment key={item.id}>
        {/* 모바일 레이아웃 */}
        <div className="tablet:hidden">
          <PurchaseRequestItemRowMobile
            item={item}
            onReject={onReject}
            onApprove={onApprove}
            onCancel={onCancel}
            onRowClick={onRowClick}
            companyId={companyId}
            onProductClick={onProductClick}
          />
        </div>

        {/* 태블릿/데스크탑 레이아웃 */}
        <div className="hidden tablet:block">
          <PurchaseRequestItemRowDesktop
            item={item}
            onReject={onReject}
            onApprove={onApprove}
            onCancel={onCancel}
            onRowClick={onRowClick}
            companyId={companyId}
            onProductClick={onProductClick}
          />
        </div>
      </React.Fragment>
    ))}
  </div>
);

export default PurchaseRequestItemListOrg;

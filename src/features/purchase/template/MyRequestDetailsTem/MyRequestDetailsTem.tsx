'use client';

import React from 'react';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { MyRequestDetailTopOrg } from '@/features/purchase/components/MyRequestDetailTopOrg/MyRequestDetailTopOrg';
import MyRequestDetailsOrg from '@/features/purchase/components/MyRequestDetailsOrg/MyRequestDetailsOrg';

interface MyRequestDetailsTemProps {
  purchaseRequest: PurchaseRequestItem;
}

const MyRequestDetailsTem: React.FC<MyRequestDetailsTemProps> = ({ purchaseRequest }) => (
  <div className="flex flex-col mt-30 tablet:mt-30 desktop:mt-60">
    <MyRequestDetailTopOrg purchaseRequest={purchaseRequest} />
    <MyRequestDetailsOrg purchaseRequest={purchaseRequest} />
  </div>
);

export default MyRequestDetailsTem;

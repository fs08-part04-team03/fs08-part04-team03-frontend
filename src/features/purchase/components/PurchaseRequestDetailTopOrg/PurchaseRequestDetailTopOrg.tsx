'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import OrderItemDetailCard from '@/components/molecules/OrderItemDetailCard/OrderItemDetailCard';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { Divider } from '@/components/atoms/Divider/Divider';

interface PurchaseRequestDetailTopOrgProps {
  purchaseRequest: PurchaseRequestItem;
}

export const PurchaseRequestDetailTopOrg: React.FC<PurchaseRequestDetailTopOrgProps> = ({
  purchaseRequest,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className="flex flex-col gap-16 gap-y-30">
      <h1 className="font-bold text-18">구매 요청 내역</h1>
      <div className="flex items-center gap-10">
        <p className="font-bold text-16">요청 품목</p>
        <p className="text-16"> 총 {purchaseRequest.purchaseItems.length}개</p>
        <IconButton variant="default" size="sm" onClick={toggleOpen} aria-expanded={isOpen}>
          <Image
            alt="Arrow Up"
            height={7}
            src="/icons/arrow-up.svg"
            width={12}
            className={clsx('transition-transform duration-200', isOpen && 'rotate-180')}
          />
        </IconButton>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-16 px-0 tablet:px-0 desktop:px-60">
          {purchaseRequest.purchaseItems.map((item, index) => (
            <React.Fragment key={item.id}>
              <OrderItemDetailCard
                name={item.products.name}
                unitPrice={item.priceSnapshot}
                quantity={item.quantity}
                imageSrc={item.products.image}
              />
              {index < purchaseRequest.purchaseItems.length - 1 && <Divider className="my-16" />}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchaseRequestDetailTopOrg;

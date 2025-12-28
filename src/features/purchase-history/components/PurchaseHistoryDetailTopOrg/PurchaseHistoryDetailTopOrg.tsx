'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import OrderItemDetailCard from '@/components/molecules/OrderItemDetailCard/OrderItemDetailCard';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { Divider } from '@/components/atoms/Divider/Divider';
import PriceText from '@/components/atoms/PriceText/PriceText';

interface PurchaseHistoryDetailTopOrgProps {
  purchaseRequest: PurchaseRequestItem;
}

export const PurchaseHistoryDetailTopOrg: React.FC<PurchaseHistoryDetailTopOrgProps> = ({
  purchaseRequest,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const orderAmount = purchaseRequest.totalPrice - purchaseRequest.shippingFee;
  const { shippingFee } = purchaseRequest;
  const totalAmount = purchaseRequest.totalPrice;

  return (
    <div className="flex flex-col gap-16 gap-y-30">
      <h1 className="font-bold text-18">구매 내역 상세</h1>
      <div className="flex items-center gap-10">
        <p className="font-bold text-16">구매품목</p>
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
        <div className="flex flex-col px-0 tablet:px-20 desktop:px-60 py-30 tablet:py-30 desktop:py-40 tablet:w-696 desktop:w-1200 desktop:shadow-lg tablet:shadow-lg">
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

          <Divider />
          <div className="flex flex-col gap-12 px-20 pt-20">
            <div className="flex justify-between items-center">
              <span className="text-16 text-gray-700">주문금액</span>
              <PriceText value={orderAmount} className="text-16 text-gray-700" />
            </div>
            <div className="flex justify-between items-center">
              <span className="text-16 text-gray-700">배송비</span>
              <PriceText value={shippingFee} className="text-16 text-gray-700" />
            </div>
            <div className="flex justify-between items-center pt-8">
              <span className="text-18 font-bold text-gray-950">총 주문금액</span>
              <PriceText value={totalAmount} className="text-18 font-bold text-gray-950" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseHistoryDetailTopOrg;

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

// 가격 행 컴포넌트
interface PriceRowProps {
  label: string;
  value: number;
  bold?: boolean;
}

const PriceRow = ({ label, value, bold = false }: PriceRowProps) => (
  <div className="flex justify-between items-center">
    <span className={`${bold ? 'text-18 font-bold text-gray-950' : 'text-16 text-gray-700'}`}>
      {label}
    </span>
    <PriceText
      value={value}
      className={`${bold ? 'text-18 font-bold text-gray-950' : 'text-16 text-gray-700'}`}
    />
  </div>
);

// 구매 물품 목록 섹션
interface PurchaseItemsListProps {
  items: PurchaseRequestItem['purchaseItems'];
}

const PurchaseItemsList = ({ items }: PurchaseItemsListProps) => {
  const hasScroll = items.length > 2;

  return (
    <div className={clsx(hasScroll && 'max-h-280 overflow-y-auto')}>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className="my-16">
            <OrderItemDetailCard
              name={item.products.name}
              unitPrice={item.priceSnapshot}
              quantity={item.quantity}
              imageSrc={item.products.image}
            />
          </div>
          {index < items.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </div>
  );
};

// 가격 요약 섹션
interface PriceSummaryProps {
  orderAmount: number;
  shippingFee: number;
  totalAmount: number;
}

const PriceSummary = ({ orderAmount, shippingFee, totalAmount }: PriceSummaryProps) => (
  <>
    <Divider />
    <div className="flex flex-col gap-12 tablet:gap-12 tablet:px-20 desktop:gap-12 desktop:px-20 pt-20">
      <PriceRow label="주문금액" value={orderAmount} />
      <PriceRow label="배송비" value={shippingFee} />
      <div className="pt-8">
        <PriceRow label="총 주문금액" value={totalAmount} bold />
      </div>
    </div>
  </>
);

// 메인 컴포넌트
export const PurchaseHistoryDetailTopOrg = ({
  purchaseRequest,
}: PurchaseHistoryDetailTopOrgProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const { totalPrice, shippingFee } = purchaseRequest;
  const orderAmount = totalPrice;
  const totalAmount = totalPrice + shippingFee;

  return (
    <div className="flex flex-col gap-30">
      <div className="px-24 tablet:px-0">
        <h1 className="font-bold text-18">구매 내역 상세</h1>
      </div>
      <div className="flex items-center gap-6 px-24 tablet:px-0">
        <p className="font-bold text-16">구매품목</p>
        <p className="text-16">총 {purchaseRequest.purchaseItems.length}개</p>
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
        <div className="flex flex-col w-full px-24 tablet:px-20 desktop:px-60 tablet:py-30 desktop:py-40 tablet:w-696 desktop:w-1200 desktop:shadow-lg tablet:shadow-lg">
          <PurchaseItemsList items={purchaseRequest.purchaseItems} />
          <PriceSummary
            orderAmount={orderAmount}
            shippingFee={shippingFee}
            totalAmount={totalAmount}
          />
        </div>
      )}
    </div>
  );
};

export default PurchaseHistoryDetailTopOrg;

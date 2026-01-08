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
      {items.map((item, index) => {
        // S3 이미지 키를 프록시 API로 변환
        // 백엔드에서 받은 S3 키(예: "products/xxx.png" 또는 "xxx.png")를
        // 프록시 API 엔드포인트(/api/product/image?key=...)로 변환하여
        // 프록시가 백엔드의 /api/v1/upload/image/{key}를 호출하고
        // 백엔드가 S3에서 이미지를 가져와서 반환함
        const imageSrc = item.products.image
          ? `/api/product/image?key=${encodeURIComponent(item.products.image)}`
          : '';

        return (
          <React.Fragment key={item.id || `item-${index}`}>
            <div className="my-16">
              <OrderItemDetailCard
                name={item.products.name}
                unitPrice={item.priceSnapshot}
                quantity={item.quantity}
                imageSrc={imageSrc}
              />
            </div>
            {index < items.length - 1 && <Divider />}
          </React.Fragment>
        );
      })}
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

  // itemsTotalPrice를 우선 사용하고, 없으면 totalPrice 사용 (하위 호환성)
  const orderAmount = purchaseRequest.itemsTotalPrice ?? purchaseRequest.totalPrice ?? 0;
  const shippingFee = purchaseRequest.shippingFee ?? 0;
  const totalAmount = orderAmount + shippingFee;

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
            style={{ width: 'auto', height: 'auto' }}
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

'use client';

import React from 'react';
import { clsx } from '@/utils/clsx';
import PriceText from '@/components/atoms/PriceText/PriceText';

export interface OrderItemDetailCardProps {
  name: string;
  unitPrice: number;
  quantity: number;
  imageSrc?: string;
  className?: string;
}

// 모바일 버전
export const OrderItemDetailCardMobile: React.FC<OrderItemDetailCardProps> = ({
  name,
  unitPrice,
  quantity,
  imageSrc,
  className,
}) => {
  const displayTotalPrice = unitPrice * quantity;

  return (
    <div className={clsx('tablet:hidden', className)}>
      <div className="flex flex-col w-full rounded-12 bg-white px-12 py-8 gap-8">
        <div className="flex items-center gap-12">
          <div className="overflow-hidden rounded-8 bg-gray-50 w-85 h-85 p-15">
            {imageSrc ? (
              <img src={imageSrc} alt={name} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <img
                  src="/icons/photo-icon.svg"
                  alt=""
                  className="opacity-40"
                  width={20}
                  height={20}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4 flex-1">
            <p className="text-black-100 text-14 leading-20">{name}</p>
            <PriceText value={unitPrice} className="text-black-100 text-14 leading-20" />
            <div className="pt-14 flex items-center justify-between">
              <span className="text-black-100 text-14 leading-20">수량 {quantity}개</span>
              <PriceText value={displayTotalPrice} className="text-gray-700 font-bold text-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 태블릿 버전
export const OrderItemDetailCardTablet: React.FC<OrderItemDetailCardProps> = ({
  name,
  unitPrice,
  quantity,
  imageSrc,
  className,
}) => {
  const displayTotalPrice = unitPrice * quantity;

  return (
    <div className={clsx('hidden tablet:flex desktop:hidden', className)}>
      <div className="flex items-center justify-between w-full rounded-12 bg-white px-16 py-12 gap-12">
        <div className="flex items-center gap-12">
          <div className="overflow-hidden rounded-8 bg-gray-50 w-140 h-140 p-15">
            {imageSrc ? (
              <img src={imageSrc} alt={name} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <img
                  src="/icons/photo-icon.svg"
                  alt=""
                  className="opacity-40"
                  width={24}
                  height={24}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-black-100 text-16 leading-24">{name}</p>
            <PriceText value={unitPrice} className="text-black-100 text-16 leading-24" />
            <div className="pt-30">
              <span className="text-black-100 text-16 leading-24">수량 {quantity}개</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-8 shrink-0">
          <PriceText
            value={displayTotalPrice}
            className="text-gray-700 font-bold text-20 text-right"
          />
        </div>
      </div>
    </div>
  );
};

// 데스크탑 버전
export const OrderItemDetailCardDesktop: React.FC<OrderItemDetailCardProps> = ({
  name,
  unitPrice,
  quantity,
  imageSrc,
  className,
}) => {
  const displayTotalPrice = unitPrice * quantity;

  return (
    <div className={clsx('hidden desktop:flex', className)}>
      <div className="flex items-center justify-between w-full rounded-12 bg-white px-20 py-16 gap-16">
        <div className="flex items-center gap-12">
          <div className="overflow-hidden rounded-8 bg-gray-50 w-140 h-140 p-15">
            {imageSrc ? (
              <img src={imageSrc} alt={name} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <img
                  src="/icons/photo-icon.svg"
                  alt=""
                  className="opacity-40"
                  width={28}
                  height={28}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-black-100 text-16 leading-24">{name}</p>
            <PriceText value={unitPrice} className="text-black-100 text-16 leading-24" />
            <div className="pt-30">
              <span className="text-black-100 text-16 leading-24">수량 {quantity}개</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-8 shrink-0">
          <PriceText
            value={displayTotalPrice}
            className="text-gray-700 font-bold text-20 text-right"
          />
        </div>
      </div>
    </div>
  );
};

// 메인 컴포넌트
const OrderItemDetailCard: React.FC<OrderItemDetailCardProps> = ({
  name,
  unitPrice,
  quantity,
  imageSrc,
  className,
}) => (
  <>
    <OrderItemDetailCardMobile
      name={name}
      unitPrice={unitPrice}
      quantity={quantity}
      imageSrc={imageSrc}
      className={className}
    />
    <OrderItemDetailCardTablet
      name={name}
      unitPrice={unitPrice}
      quantity={quantity}
      imageSrc={imageSrc}
      className={className}
    />
    <OrderItemDetailCardDesktop
      name={name}
      unitPrice={unitPrice}
      quantity={quantity}
      imageSrc={imageSrc}
      className={className}
    />
  </>
);

export default OrderItemDetailCard;

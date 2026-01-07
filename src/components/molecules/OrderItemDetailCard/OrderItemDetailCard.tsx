'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
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
  const [imageError, setImageError] = useState(false);

  // imageSrc 변경 시 imageError 상태 초기화
  useEffect(() => {
    setImageError(false);
  }, [imageSrc]);

  // 이미지 URL 유효성 검증
  const isValidImageUrl = imageSrc && typeof imageSrc === 'string' && imageSrc.trim().length > 0;
  const shouldShowImage = isValidImageUrl && !imageError;

  // 외부 URL인지 확인
  const isExternalUrl = isValidImageUrl
    ? imageSrc.startsWith('http://') || imageSrc.startsWith('https://')
    : false;

  return (
    <div className={clsx('tablet:hidden', className)}>
      <div className="flex flex-col w-full rounded-12 bg-white px-12 py-8 gap-8">
        <div className="flex items-center gap-12">
          <div className="relative overflow-hidden rounded-8 bg-gray-50 w-85 h-85 shrink-0">
            {shouldShowImage ? (
              <div className="absolute inset-0 flex items-center justify-center">
                {isExternalUrl ? (
                  <img
                    src={imageSrc}
                    alt={name}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    onError={() => setImageError(true)}
                    crossOrigin="anonymous"
                  />
                ) : (
                  <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    sizes="85px"
                    className="object-contain"
                    style={{ objectPosition: 'center' }}
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/icons/no-image.svg"
                  alt="이미지 없음"
                  width={85}
                  height={85}
                  className="object-contain"
                  unoptimized
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
  const [imageError, setImageError] = useState(false);

  // imageSrc 변경 시 imageError 상태 초기화
  useEffect(() => {
    setImageError(false);
  }, [imageSrc]);

  // 이미지 URL 유효성 검증
  const isValidImageUrl = imageSrc && typeof imageSrc === 'string' && imageSrc.trim().length > 0;
  const shouldShowImage = isValidImageUrl && !imageError;

  // 외부 URL인지 확인
  const isExternalUrl = isValidImageUrl
    ? imageSrc.startsWith('http://') || imageSrc.startsWith('https://')
    : false;

  return (
    <div className={clsx('hidden tablet:flex desktop:hidden', className)}>
      <div className="flex items-center justify-between w-full rounded-12 bg-white px-16 py-12 gap-12">
        <div className="flex items-center gap-12">
          <div className="relative overflow-hidden rounded-8 bg-gray-50 w-140 h-140 shrink-0">
            {shouldShowImage ? (
              <div className="absolute inset-0 flex items-center justify-center">
                {isExternalUrl ? (
                  <img
                    src={imageSrc}
                    alt={name}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    onError={() => setImageError(true)}
                    crossOrigin="anonymous"
                  />
                ) : (
                  <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    sizes="140px"
                    className="object-contain"
                    style={{ objectPosition: 'center' }}
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/icons/no-image.svg"
                  alt="이미지 없음"
                  width={140}
                  height={140}
                  className="object-contain"
                  unoptimized
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
  const [imageError, setImageError] = useState(false);

  // imageSrc 변경 시 imageError 상태 초기화
  useEffect(() => {
    setImageError(false);
  }, [imageSrc]);

  // 이미지 URL 유효성 검증
  const isValidImageUrl = imageSrc && typeof imageSrc === 'string' && imageSrc.trim().length > 0;
  const shouldShowImage = isValidImageUrl && !imageError;

  // 외부 URL인지 확인
  const isExternalUrl = isValidImageUrl
    ? imageSrc.startsWith('http://') || imageSrc.startsWith('https://')
    : false;

  return (
    <div className={clsx('hidden desktop:flex', className)}>
      <div className="flex items-center justify-between w-full rounded-12 bg-white px-20 py-16 gap-16">
        <div className="flex items-center gap-12">
          <div className="relative overflow-hidden rounded-8 bg-gray-50 w-140 h-140 shrink-0">
            {shouldShowImage ? (
              <div className="absolute inset-0 flex items-center justify-center">
                {isExternalUrl ? (
                  <img
                    src={imageSrc}
                    alt={name}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    onError={() => setImageError(true)}
                    crossOrigin="anonymous"
                  />
                ) : (
                  <Image
                    src={imageSrc}
                    alt={name}
                    fill
                    sizes="140px"
                    className="object-contain"
                    style={{ objectPosition: 'center' }}
                    onError={() => setImageError(true)}
                  />
                )}
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src="/icons/no-image.svg"
                  alt="이미지 없음"
                  width={140}
                  height={140}
                  className="object-contain"
                  unoptimized
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

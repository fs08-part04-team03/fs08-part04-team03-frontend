'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { clsx } from '@/utils/clsx';
import PriceText from '@/components/atoms/PriceText/PriceText';
import { PATHNAME } from '@/constants';

export interface OrderItemDetailCardProps {
  name: string;
  unitPrice: number;
  quantity: number;
  imageSrc?: string;
  className?: string;
  productId?: number | string; // 상품 상세 페이지로 이동하기 위한 ID
  companyId?: string; // 회사 ID
  onProductClick?: (productId: number | string) => void; // 상품 클릭 핸들러 (옵션)
}

// 모바일 버전
export const OrderItemDetailCardMobile: React.FC<OrderItemDetailCardProps> = ({
  name,
  unitPrice,
  quantity,
  imageSrc,
  className,
  productId,
  companyId,
  onProductClick,
}) => {
  const router = useRouter();

  const handleProductNameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onProductClick && productId) {
      onProductClick(productId);
    } else if (companyId && productId) {
      router.push(PATHNAME.PRODUCT_DETAIL(companyId, String(productId)));
    }
  };

  const handleProductNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      if (onProductClick && productId) {
        onProductClick(productId);
      } else if (companyId && productId) {
        router.push(PATHNAME.PRODUCT_DETAIL(companyId, String(productId)));
      }
    }
  };
  const displayTotalPrice = unitPrice * quantity;
  const [imageError, setImageError] = useState(false);

  // imageSrc 변경 시 imageError 상태 초기화
  useEffect(() => {
    setImageError(false);
  }, [imageSrc]);

  // 이미지 URL 유효성 검증
  const isValidImageUrl = imageSrc && typeof imageSrc === 'string' && imageSrc.trim().length > 0;
  const shouldShowImage = isValidImageUrl && !imageError;

  // 외부 URL인지 확인 (유효한 URL일 때만 체크)
  const isExternalUrl = isValidImageUrl
    ? imageSrc.startsWith('http://') || imageSrc.startsWith('https://')
    : false;

  // 프록시 API URL인지 확인
  const isProxyApiUrl = isValidImageUrl ? imageSrc.startsWith('/api/product/image') : false;

  return (
    <div className={clsx('tablet:hidden', className)}>
      <div className="flex flex-col w-full rounded-12 bg-white px-12 py-8 gap-8">
        <div className="flex items-center gap-12">
          <div className="relative overflow-hidden rounded-8 bg-gray-50 w-85 h-85 shrink-0">
            {shouldShowImage ? (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* 외부 URL 또는 프록시 API URL은 일반 img 태그 사용 */}
                {/* 프록시 API URL은 인증이 필요하므로 쿠키가 자동으로 포함되도록 img 태그 사용 */}
                {isExternalUrl || isProxyApiUrl ? (
                  <img
                    src={imageSrc}
                    alt={name}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    onError={() => setImageError(true)}
                    crossOrigin={isExternalUrl ? 'anonymous' : undefined}
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
            {productId ? (
              <button
                type="button"
                onClick={handleProductNameClick}
                onKeyDown={handleProductNameKeyDown}
                className={clsx(
                  'text-left text-black-100 text-14 leading-20',
                  'cursor-pointer hover:underline hover:text-primary-500'
                )}
              >
                {name}
              </button>
            ) : (
              <p className="text-black-100 text-14 leading-20">{name}</p>
            )}
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
  productId,
  companyId,
  onProductClick,
}) => {
  const router = useRouter();

  const handleProductNameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onProductClick && productId) {
      onProductClick(productId);
    } else if (companyId && productId) {
      router.push(PATHNAME.PRODUCT_DETAIL(companyId, String(productId)));
    }
  };

  const handleProductNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      if (onProductClick && productId) {
        onProductClick(productId);
      } else if (companyId && productId) {
        router.push(PATHNAME.PRODUCT_DETAIL(companyId, String(productId)));
      }
    }
  };
  const displayTotalPrice = unitPrice * quantity;
  const [imageError, setImageError] = useState(false);

  // imageSrc 변경 시 imageError 상태 초기화
  useEffect(() => {
    setImageError(false);
  }, [imageSrc]);

  // 이미지 URL 유효성 검증
  const isValidImageUrl = imageSrc && typeof imageSrc === 'string' && imageSrc.trim().length > 0;
  const shouldShowImage = isValidImageUrl && !imageError;

  // 외부 URL인지 확인 (유효한 URL일 때만 체크)
  const isExternalUrl = isValidImageUrl
    ? imageSrc.startsWith('http://') || imageSrc.startsWith('https://')
    : false;

  // 프록시 API URL인지 확인
  const isProxyApiUrl = isValidImageUrl ? imageSrc.startsWith('/api/product/image') : false;

  return (
    <div className={clsx('hidden tablet:flex desktop:hidden', className)}>
      <div className="flex items-center justify-between w-full rounded-12 bg-white px-16 py-12 gap-12">
        <div className="flex items-center gap-12">
          <div className="relative overflow-hidden rounded-8 bg-gray-50 w-140 h-140 shrink-0">
            {shouldShowImage ? (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* 외부 URL 또는 프록시 API URL은 일반 img 태그 사용 */}
                {/* 프록시 API URL은 인증이 필요하므로 쿠키가 자동으로 포함되도록 img 태그 사용 */}
                {isExternalUrl || isProxyApiUrl ? (
                  <img
                    src={imageSrc}
                    alt={name}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    onError={() => setImageError(true)}
                    crossOrigin={isExternalUrl ? 'anonymous' : undefined}
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
            {productId ? (
              <button
                type="button"
                onClick={handleProductNameClick}
                onKeyDown={handleProductNameKeyDown}
                className={clsx(
                  'text-left text-black-100 text-16 leading-24',
                  'cursor-pointer hover:underline hover:text-primary-500'
                )}
              >
                {name}
              </button>
            ) : (
              <p className="text-black-100 text-16 leading-24">{name}</p>
            )}
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
  productId,
  companyId,
  onProductClick,
}) => {
  const router = useRouter();

  const handleProductNameClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onProductClick && productId) {
      onProductClick(productId);
    } else if (companyId && productId) {
      router.push(PATHNAME.PRODUCT_DETAIL(companyId, String(productId)));
    }
  };

  const handleProductNameKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      if (onProductClick && productId) {
        onProductClick(productId);
      } else if (companyId && productId) {
        router.push(PATHNAME.PRODUCT_DETAIL(companyId, String(productId)));
      }
    }
  };
  const displayTotalPrice = unitPrice * quantity;
  const [imageError, setImageError] = useState(false);

  // imageSrc 변경 시 imageError 상태 초기화
  useEffect(() => {
    setImageError(false);
  }, [imageSrc]);

  // 이미지 URL 유효성 검증
  const isValidImageUrl = imageSrc && typeof imageSrc === 'string' && imageSrc.trim().length > 0;
  const shouldShowImage = isValidImageUrl && !imageError;

  // 외부 URL인지 확인 (유효한 URL일 때만 체크)
  const isExternalUrl = isValidImageUrl
    ? imageSrc.startsWith('http://') || imageSrc.startsWith('https://')
    : false;

  // 프록시 API URL인지 확인
  const isProxyApiUrl = isValidImageUrl ? imageSrc.startsWith('/api/product/image') : false;

  return (
    <div className={clsx('hidden desktop:flex', className)}>
      <div className="flex items-center justify-between w-full rounded-12 bg-white px-20 py-16 gap-16">
        <div className="flex items-center gap-12">
          <div className="relative overflow-hidden rounded-8 bg-gray-50 w-140 h-140 shrink-0">
            {shouldShowImage ? (
              <div className="absolute inset-0 flex items-center justify-center">
                {/* 외부 URL 또는 프록시 API URL은 일반 img 태그 사용 */}
                {/* 프록시 API URL은 인증이 필요하므로 쿠키가 자동으로 포함되도록 img 태그 사용 */}
                {isExternalUrl || isProxyApiUrl ? (
                  <img
                    src={imageSrc}
                    alt={name}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    onError={() => setImageError(true)}
                    crossOrigin={isExternalUrl ? 'anonymous' : undefined}
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
            {productId ? (
              <button
                type="button"
                onClick={handleProductNameClick}
                onKeyDown={handleProductNameKeyDown}
                className={clsx(
                  'text-left text-black-100 text-16 leading-24',
                  'cursor-pointer hover:underline hover:text-primary-500'
                )}
              >
                {name}
              </button>
            ) : (
              <p className="text-black-100 text-16 leading-24">{name}</p>
            )}
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
  productId,
  companyId,
  onProductClick,
}) => (
  <>
    <OrderItemDetailCardMobile
      name={name}
      unitPrice={unitPrice}
      quantity={quantity}
      imageSrc={imageSrc}
      className={className}
      productId={productId}
      companyId={companyId}
      onProductClick={onProductClick}
    />
    <OrderItemDetailCardTablet
      name={name}
      unitPrice={unitPrice}
      quantity={quantity}
      imageSrc={imageSrc}
      className={className}
      productId={productId}
      companyId={companyId}
      onProductClick={onProductClick}
    />
    <OrderItemDetailCardDesktop
      name={name}
      unitPrice={unitPrice}
      quantity={quantity}
      imageSrc={imageSrc}
      className={className}
      productId={productId}
      companyId={companyId}
      onProductClick={onProductClick}
    />
  </>
);

export default OrderItemDetailCard;

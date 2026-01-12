'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import { clsx } from '@/utils/clsx';
import { PATHNAME } from '@/constants';
import PriceText from '@/components/atoms/PriceText/PriceText';
import Button from '@/components/atoms/Button/Button';
import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import { NumberInput } from '@/components/molecules/NumberInput/NumberInput';
import type { Option } from '@/components/atoms/DropDown/DropDown';

export type OrderItemCardVariant = 'default' | 'confirm';

/**
 * 이미지 렌더링 컴포넌트
 */
interface ProductImageProps {
  imageSrc?: string;
  name: string;
  productId?: number;
  onProductClick?: () => void;
  onImageError: () => void;
  imageSizes: string;
  isExternalUrl: boolean;
  isProxyApiUrl: boolean;
  shouldShowImage: boolean;
}

const ProductImage: React.FC<ProductImageProps> = ({
  imageSrc,
  name,
  productId,
  onProductClick,
  onImageError,
  imageSizes,
  isExternalUrl,
  isProxyApiUrl,
  shouldShowImage,
}) => {
  const containerClassName = clsx(
    'relative overflow-hidden rounded-8 bg-gray-50',
    'w-85 h-85',
    'tablet:w-140 tablet:h-140',
    'desktop:w-140 desktop:h-140',
    productId && 'cursor-pointer'
  );

  const imageContent = shouldShowImage ? (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* 외부 URL 또는 프록시 API URL은 일반 img 태그 사용 */}
      {/* 프록시 API URL은 인증이 필요하므로 쿠키가 자동으로 포함되도록 img 태그 사용 */}
      {isExternalUrl || isProxyApiUrl ? (
        <img
          src={imageSrc}
          alt={name}
          className="max-w-full max-h-full w-auto h-auto object-contain"
          onError={onImageError}
          crossOrigin={isExternalUrl ? 'anonymous' : undefined}
        />
      ) : (
        <Image
          key={imageSrc} // 이미지 URL 변경 시 강제 리렌더링 (캐시 무효화)
          src={imageSrc!}
          alt={name}
          fill
          sizes={imageSizes}
          className="object-contain"
          style={{ objectPosition: 'center' }}
          onError={onImageError}
        />
      )}
    </div>
  ) : (
    <div className="absolute inset-0 flex items-center justify-center">
      <img
        src="/icons/photo-icon.svg"
        alt=""
        width={28}
        height={28}
        className="opacity-40 w-20 h-20 tablet:w-24 tablet:h-24 desktop:w-28 desktop:h-28"
        loading="eager"
      />
    </div>
  );

  if (productId && onProductClick) {
    return (
      <button
        type="button"
        className={clsx(containerClassName, 'p-0 border-0')}
        onClick={onProductClick}
        aria-label={`${name} 상세 페이지로 이동`}
      >
        {imageContent}
      </button>
    );
  }

  return <div className={containerClassName}>{imageContent}</div>;
};

/**
 * 상품명 렌더링 컴포넌트
 */
interface ProductNameProps {
  name: string;
  productId?: number;
  onProductClick?: () => void;
  className?: string;
}

const ProductName: React.FC<ProductNameProps> = ({
  name,
  productId,
  onProductClick,
  className,
}) => {
  if (productId && onProductClick) {
    return (
      <button
        type="button"
        className={clsx(className, 'bg-transparent p-0 border-0 text-left')}
        onClick={onProductClick}
        aria-label={`${name} 상세 페이지로 이동`}
      >
        {name}
      </button>
    );
  }

  return <p className={className}>{name}</p>;
};

export interface OrderItemCardProps {
  variant?: OrderItemCardVariant;
  name: string;
  unitPrice: number;
  quantity: number;
  shippingCost?: number;
  shippingLabelText?: string;
  imageSrc?: string;
  productId?: number; // ✅ 상품 상세 페이지 이동을 위한 productId 추가
  checked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  onQuantityChange?: (option: Option) => void;
  onPurchaseClick?: () => void;
  purchaseButtonLabel?: string;
  purchaseButtonDisabled?: boolean;
  className?: string;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({
  variant = 'default',
  name,
  unitPrice,
  quantity,
  shippingCost = 0,
  shippingLabelText = '택배',
  imageSrc,
  productId,
  checked = false,
  onCheckboxChange,
  onQuantityChange,
  onPurchaseClick,
  purchaseButtonLabel = '즉시 구매',
  purchaseButtonDisabled,
  className,
}) => {
  const router = useRouter();
  const params = useParams();
  // companyId가 배열인 경우 첫 번째 요소 사용, 문자열이면 그대로 사용
  let companyId = '';
  if (typeof params?.companyId === 'string') {
    companyId = params.companyId;
  } else if (Array.isArray(params?.companyId) && params.companyId.length > 0) {
    const firstElement = params.companyId[0];
    if (typeof firstElement === 'string') {
      companyId = firstElement;
    }
  }
  const [imageError, setImageError] = useState(false);
  // 페이지 마운트 시 타임스탬프 생성 (이미지 캐시 무효화)
  // 각 컴포넌트가 마운트될 때마다 새로운 타임스탬프를 생성하여 캐시 무효화
  const [imageTimestamp, setImageTimestamp] = useState(() => Date.now());
  const displayTotalPrice = unitPrice * quantity;

  // 상품 상세 페이지로 이동
  const handleProductClick = () => {
    if (productId && companyId) {
      router.push(PATHNAME.PRODUCT_DETAIL(companyId, String(productId)));
    }
  };

  /** 상품명 공통 클래스 */
  const productNameClass = clsx(
    'text-black-100',
    'text-14 leading-20 tablet:text-16 tablet:leading-24',
    'truncate whitespace-nowrap overflow-hidden',
    'max-w-76.83', // mobile
    'tablet:max-w-270', // tablet
    'desktop:max-w-none', // desktop (제한 없음)
    productId && 'cursor-pointer hover:underline' // ✅ 클릭 가능한 경우 스타일 추가
  );

  // 이미지 URL 유효성 검증 및 타입 확인
  const isValidImageUrl = Boolean(
    imageSrc && typeof imageSrc === 'string' && imageSrc.trim().length > 0
  );
  const shouldShowImage = isValidImageUrl && !imageError;

  // imageSrc 변경 시 imageError 초기화
  useEffect(() => {
    if (isValidImageUrl) {
      setImageError(false);
    }
  }, [imageSrc, isValidImageUrl]);

  // 외부 URL인지 확인
  const isExternalUrl =
    isValidImageUrl && imageSrc
      ? imageSrc.startsWith('http://') || imageSrc.startsWith('https://')
      : false;

  // 프록시 API URL인지 확인
  const isProxyApiUrl =
    isValidImageUrl && imageSrc ? imageSrc.startsWith('/api/product/image') : false;

  // imageSrc가 변경될 때마다 타임스탬프 업데이트 (이미지 업데이트 반영)
  useEffect(() => {
    if (isValidImageUrl && isProxyApiUrl) {
      // imageSrc가 변경되면 새로운 타임스탬프 생성
      setImageTimestamp(Date.now());
    }
  }, [imageSrc, isValidImageUrl, isProxyApiUrl]);

  // 프록시 API URL인 경우 타임스탬프 추가하여 캐시 무효화
  const imageSrcWithTimestamp = useMemo(() => {
    if (!isValidImageUrl || !imageSrc) return imageSrc;
    if (isProxyApiUrl) {
      return `${imageSrc}${imageSrc.includes('?') ? '&' : '?'}t=${imageTimestamp}`;
    }
    return imageSrc;
  }, [imageSrc, isValidImageUrl, isProxyApiUrl, imageTimestamp]);

  // 이미지 크기 설정 (CLS 방지)
  const imageSizes = '(max-width: 767px) 85px, 140px';

  // Confirm variant
  if (variant === 'confirm') {
    return (
      <div
        className={clsx(
          'flex items-center justify-between w-full rounded-12 bg-white',
          'px-12 py-8 gap-8',
          'tablet:px-16 tablet:py-12 tablet:gap-12',
          'desktop:px-20 desktop:py-16 desktop:gap-16',
          className
        )}
      >
        {/* 이미지 & 상품 정보 */}
        <div className="flex items-center gap-12">
          <ProductImage
            imageSrc={imageSrcWithTimestamp}
            name={name}
            productId={productId}
            onProductClick={handleProductClick}
            onImageError={() => setImageError(true)}
            imageSizes={imageSizes}
            isExternalUrl={isExternalUrl}
            isProxyApiUrl={isProxyApiUrl}
            shouldShowImage={shouldShowImage}
          />

          <div className="flex flex-col gap-4">
            <ProductName
              name={name}
              productId={productId}
              onProductClick={handleProductClick}
              className={productNameClass}
            />

            <PriceText
              value={unitPrice}
              className="text-black-100 text-14 leading-20 tablet:text-16 tablet:leading-24"
            />

            <div className="pt-14 tablet:pt-30">
              <span className="text-black-100 text-14 leading-20 tablet:text-16 tablet:leading-24">
                수량 {quantity}개
              </span>
            </div>
          </div>
        </div>

        {/* 총액 */}
        <div className="flex flex-col items-end gap-8 shrink-0">
          <PriceText
            value={displayTotalPrice}
            className="text-gray-900 font-semibold text-24 leading-32 text-right"
          />
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={clsx(
        'flex items-center justify-between w-full rounded-12 bg-white',
        'px-12 py-8 gap-8',
        'tablet:px-16 tablet:py-12 tablet:gap-12',
        'desktop:px-20 desktop:py-16 desktop:gap-16',
        className
      )}
    >
      {/* 체크박스 & 이미지 & 상품 정보 */}
      <div className="flex items-center gap-12">
        <Checkbox
          checked={checked}
          onChange={onCheckboxChange}
          aria-label={`${name} 선택`}
          className="shrink-0"
        />

        <ProductImage
          imageSrc={imageSrcWithTimestamp}
          name={name}
          productId={productId}
          onProductClick={handleProductClick}
          onImageError={() => setImageError(true)}
          imageSizes={imageSizes}
          isExternalUrl={isExternalUrl}
          isProxyApiUrl={isProxyApiUrl}
          shouldShowImage={shouldShowImage}
        />

        <div className="flex flex-col gap-4">
          <ProductName
            name={name}
            productId={productId}
            onProductClick={handleProductClick}
            className={productNameClass}
          />

          <PriceText
            value={unitPrice}
            className="text-black-100 text-14 leading-20 tablet:text-16 tablet:leading-24"
          />

          <div className="pt-13 flex items-center gap-4">
            <span className="text-black-100 text-13 leading-20 tablet:text-14">
              {shippingLabelText}
              <span className="hidden tablet:inline"> 배송비</span>
            </span>
            <PriceText
              value={shippingCost}
              className="font-normal text-black-100 text-13 leading-20 tablet:text-14"
            />
          </div>
        </div>
      </div>

      {/* NumberInput & 총액 & 구매 버튼 */}
      <div className="flex flex-col items-end gap-8 shrink-0 justify-end">
        <div className="w-72 flex justify-end tablet:w-99">
          <NumberInput
            variant="secondary"
            onQuantityChange={onQuantityChange}
            value={quantity}
            className="h-40 tablet:h-44"
          />
        </div>

        <div className="hidden tablet:flex items-center gap-4">
          <span className="text-gray-900 font-semibold text-24 leading-32">총</span>
          <PriceText
            value={displayTotalPrice}
            className="text-gray-900 font-semibold text-24 leading-32"
          />
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={onPurchaseClick}
          inactive={purchaseButtonDisabled}
          className="w-88 h-40 cursor-pointer tablet:w-99 tablet:h-44"
        >
          {purchaseButtonLabel}
        </Button>
      </div>
    </div>
  );
};

export default OrderItemCard;
export { OrderItemCard };

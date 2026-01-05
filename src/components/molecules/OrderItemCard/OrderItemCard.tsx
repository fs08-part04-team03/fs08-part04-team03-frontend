'use client';

import React from 'react';
import { clsx } from '@/utils/clsx';
import PriceText from '@/components/atoms/PriceText/PriceText';
import Button from '@/components/atoms/Button/Button';
import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import { NumberInput } from '@/components/molecules/NumberInput/NumberInput';
import type { Option } from '@/components/atoms/DropDown/DropDown';

export type OrderItemCardVariant = 'default' | 'confirm';

export interface OrderItemCardProps {
  variant?: OrderItemCardVariant;
  name: string;
  unitPrice: number;
  quantity: number;
  shippingCost?: number;
  shippingLabelText?: string;
  imageSrc?: string;
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
  checked = false,
  onCheckboxChange,
  onQuantityChange,
  onPurchaseClick,
  purchaseButtonLabel = '즉시 구매',
  purchaseButtonDisabled,
  className,
}) => {
  const displayTotalPrice = unitPrice * quantity;

  /** 상품명 공통 클래스 */
  const productNameClass = clsx(
    'text-black-100',
    'text-14 leading-20 tablet:text-16 tablet:leading-24',
    'truncate whitespace-nowrap overflow-hidden',
    'max-w-76.83', // mobile
    'tablet:max-w-270', // tablet
    'desktop:max-w-none' // desktop (제한 없음)
  );

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
          <div
            className={clsx(
              'overflow-hidden rounded-8 bg-gray-50 p-10',
              'w-85 h-85',
              'tablet:w-140 tablet:h-140',
              'desktop:w-140 desktop:h-140'
            )}
          >
            {imageSrc ? (
              <img src={imageSrc} alt={name} className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <img
                  src="/icons/photo-icon.svg"
                  alt=""
                  className="opacity-40 w-20 h-20 tablet:w-24 tablet:h-24 desktop:w-28 desktop:h-28"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <p className={productNameClass}>{name}</p>

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

        <div
          className={clsx(
            'overflow-hidden rounded-8 bg-gray-50 p-10',
            'w-85 h-85',
            'tablet:w-140 tablet:h-140',
            'desktop:w-140 desktop:h-140'
          )}
        >
          {imageSrc ? (
            <img src={imageSrc} alt={name} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <img
                src="/icons/photo-icon.svg"
                alt=""
                className="opacity-40 w-20 h-20 tablet:w-24 tablet:h-24 desktop:w-28 desktop:h-28"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <p className={productNameClass}>{name}</p>

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

'use client';

import React, { useState, useEffect } from 'react';
import { clsx } from '@/utils/clsx';
import PriceText from '@/components/atoms/PriceText/PriceText';
import Button from '@/components/atoms/Button/Button';
import Checkbox from '@/components/atoms/Checkbox/Checkbox';
import { NumberInput } from '@/components/molecules/NumberInput/NumberInput';
import type { Option } from '@/components/atoms/DropDown/DropDown';

export type OrderItemCardVariant = 'default' | 'confirm';

interface OrderItemCardBaseProps {
  name: string;
  unitPrice: number;
  quantity: number;
  totalPrice?: number;
  shippingCost?: number;
  shippingLabelText?: string;
  imageSrc?: string;
  checked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  onQuantityChange?: (option: Option) => void;
  onPurchaseClick?: () => void;
  purchaseButtonLabel?: string;
  className?: string;
}

export interface OrderItemCardProps extends OrderItemCardBaseProps {
  variant?: OrderItemCardVariant;
}

// Default Variant - 모바일
interface OrderItemCardDefaultMobileProps {
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
  className?: string;
}

export const OrderItemCardDefaultMobile: React.FC<OrderItemCardDefaultMobileProps> = ({
  name,
  unitPrice,
  quantity: initialQuantity,
  shippingCost = 0,
  shippingLabelText = '택배',
  imageSrc,
  checked = false,
  onCheckboxChange,
  onQuantityChange,
  onPurchaseClick,
  purchaseButtonLabel,
  className,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleQuantityChange = (option: Option) => {
    const newQuantity = Number(option.key);
    if (!Number.isNaN(newQuantity)) {
      setQuantity(newQuantity);
      onQuantityChange?.(option);
    }
  };

  return (
    <div
      className={clsx(
        'flex items-center justify-between w-full rounded-12 bg-white px-12 py-8 gap-8',
        className
      )}
    >
      <div className="flex items-center gap-12">
        <Checkbox
          checked={checked}
          onChange={onCheckboxChange}
          aria-label={`${name} 선택`}
          className="shrink-0"
        />
        <div className="overflow-hidden rounded-8 bg-gray-50 w-85 h-85">
          {imageSrc ? (
            <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
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

        <div className="flex flex-col gap-4">
          <p className="text-black-100 text-14 leading-20">{name}</p>
          <PriceText value={unitPrice} className="text-black-100 text-14 leading-20" />
          <div className="pt-13 flex items-center gap-4">
            <span className="text-black-100 text-13 leading-20">{shippingLabelText}</span>
            <PriceText
              value={shippingCost}
              className="!font-normal !text-black-100 text-13 leading-20"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-8 shrink-0 justify-end">
        <div className="w-72 flex justify-end">
          <NumberInput
            variant="secondary"
            onQuantityChange={handleQuantityChange}
            value={quantity}
            className="h-40"
          />
        </div>
        {onPurchaseClick && (
          <Button variant="secondary" size="sm" onClick={onPurchaseClick} className="w-88 h-40">
            {purchaseButtonLabel ?? '즉시 구매'}
          </Button>
        )}
      </div>
    </div>
  );
};

// Default Variant - 태블릿
interface OrderItemCardDefaultTabletProps {
  name: string;
  unitPrice: number;
  quantity: number;
  totalPrice?: number;
  shippingCost?: number;
  shippingLabelText?: string;
  imageSrc?: string;
  checked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  onQuantityChange?: (option: Option) => void;
  onPurchaseClick?: () => void;
  purchaseButtonLabel?: string;
  className?: string;
}

export const OrderItemCardDefaultTablet: React.FC<OrderItemCardDefaultTabletProps> = ({
  name,
  unitPrice,
  quantity: initialQuantity,
  totalPrice: _totalPrice,
  shippingCost = 0,
  shippingLabelText = '택배 배송비',
  imageSrc,
  checked = false,
  onCheckboxChange,
  onQuantityChange,
  onPurchaseClick,
  purchaseButtonLabel,
  className,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const displayTotalPrice = unitPrice * quantity;

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleQuantityChange = (option: Option) => {
    const newQuantity = Number(option.key);
    if (!Number.isNaN(newQuantity)) {
      setQuantity(newQuantity);
      onQuantityChange?.(option);
    }
  };

  return (
    <div
      className={clsx(
        'flex items-center justify-between w-full rounded-12 bg-white px-16 py-12 gap-12',
        className
      )}
    >
      <div className="flex items-center gap-12">
        <Checkbox
          checked={checked}
          onChange={onCheckboxChange}
          aria-label={`${name} 선택`}
          className="shrink-0"
        />
        <div className="overflow-hidden rounded-8 bg-gray-50 w-140 h-140">
          {imageSrc ? (
            <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
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
          <div className="pt-13 flex items-center gap-4 justify-end">
            <span className="text-black-100 text-14 leading-20">{shippingLabelText}</span>
            <PriceText
              value={shippingCost}
              className="!font-normal !text-black-100 text-14 leading-20"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end justify-end gap-8 shrink-0">
        <div className="w-99 flex justify-end">
          <NumberInput
            variant="secondary"
            onQuantityChange={handleQuantityChange}
            value={quantity}
            className="h-44"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-900 font-semibold text-24 leading-32">총</span>
          <PriceText
            value={displayTotalPrice}
            className="text-gray-900 font-semibold text-24 leading-32"
          />
        </div>
        {onPurchaseClick && (
          <Button variant="secondary" size="sm" onClick={onPurchaseClick} className="w-99 h-44">
            {purchaseButtonLabel ?? '즉시 구매'}
          </Button>
        )}
      </div>
    </div>
  );
};

// Default Variant - 데스크탑
interface OrderItemCardDefaultDesktopProps {
  name: string;
  unitPrice: number;
  quantity: number;
  totalPrice?: number;
  shippingCost?: number;
  shippingLabelText?: string;
  imageSrc?: string;
  checked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
  onQuantityChange?: (option: Option) => void;
  onPurchaseClick?: () => void;
  purchaseButtonLabel?: string;
  className?: string;
}

export const OrderItemCardDefaultDesktop: React.FC<OrderItemCardDefaultDesktopProps> = ({
  name,
  unitPrice,
  quantity: initialQuantity,
  totalPrice: _totalPrice,
  shippingCost = 0,
  shippingLabelText = '택배 배송비',
  imageSrc,
  checked = false,
  onCheckboxChange,
  onQuantityChange,
  onPurchaseClick,
  purchaseButtonLabel,
  className,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const displayTotalPrice = unitPrice * quantity;

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleQuantityChange = (option: Option) => {
    const newQuantity = Number(option.key);
    if (!Number.isNaN(newQuantity)) {
      setQuantity(newQuantity);
      onQuantityChange?.(option);
    }
  };

  return (
    <div
      className={clsx(
        'flex items-center justify-between w-full rounded-12 bg-white px-20 py-16 gap-16',
        className
      )}
    >
      <div className="flex items-center gap-12">
        <Checkbox
          checked={checked}
          onChange={onCheckboxChange}
          aria-label={`${name} 선택`}
          className="shrink-0"
        />
        <div className="overflow-hidden rounded-8 bg-gray-50 w-140 h-140">
          {imageSrc ? (
            <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
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
          <div className="pt-13 flex items-center gap-4">
            <span className="text-black-100 text-14 leading-20">{shippingLabelText}</span>
            <PriceText
              value={shippingCost}
              className="!font-normal !text-black-100 text-14 leading-20"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-8 shrink-0 justify-end">
        <div className="w-99">
          <NumberInput
            variant="secondary"
            onQuantityChange={handleQuantityChange}
            value={quantity}
            className="w-full h-44"
          />
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-900 font-semibold text-24 leading-32">총</span>
          <PriceText
            value={displayTotalPrice}
            className="text-gray-900 font-semibold text-24 leading-32"
          />
        </div>
        {onPurchaseClick && (
          <Button variant="secondary" size="sm" onClick={onPurchaseClick} className="w-99 h-44">
            {purchaseButtonLabel ?? '즉시 구매'}
          </Button>
        )}
      </div>
    </div>
  );
};

// Default Variant 통합 컴포넌트
const OrderItemCardDefault: React.FC<OrderItemCardBaseProps> = ({
  name,
  unitPrice,
  quantity,
  totalPrice,
  shippingCost,
  shippingLabelText,
  imageSrc,
  checked,
  onCheckboxChange,
  onQuantityChange,
  onPurchaseClick,
  purchaseButtonLabel,
  className,
}) => (
  <>
    {/* 모바일 (~ 743px) */}
    <div className="tablet:hidden">
      <OrderItemCardDefaultMobile
        name={name}
        unitPrice={unitPrice}
        quantity={quantity}
        shippingCost={shippingCost}
        shippingLabelText={shippingLabelText}
        imageSrc={imageSrc}
        checked={checked}
        onCheckboxChange={onCheckboxChange}
        onQuantityChange={onQuantityChange}
        onPurchaseClick={onPurchaseClick}
        purchaseButtonLabel={purchaseButtonLabel}
        className={className}
      />
    </div>

    {/* 태블릿 (744px ~ 1199px) */}
    <div className="hidden tablet:flex desktop:hidden">
      <OrderItemCardDefaultTablet
        name={name}
        unitPrice={unitPrice}
        quantity={quantity}
        totalPrice={totalPrice}
        shippingCost={shippingCost}
        shippingLabelText={shippingLabelText}
        imageSrc={imageSrc}
        checked={checked}
        onCheckboxChange={onCheckboxChange}
        onQuantityChange={onQuantityChange}
        onPurchaseClick={onPurchaseClick}
        purchaseButtonLabel={purchaseButtonLabel}
        className={className}
      />
    </div>

    {/* 데스크탑 (1200px ~) */}
    <div className="hidden desktop:flex">
      <OrderItemCardDefaultDesktop
        name={name}
        unitPrice={unitPrice}
        quantity={quantity}
        totalPrice={totalPrice}
        shippingCost={shippingCost}
        shippingLabelText={shippingLabelText}
        imageSrc={imageSrc}
        checked={checked}
        onCheckboxChange={onCheckboxChange}
        onQuantityChange={onQuantityChange}
        onPurchaseClick={onPurchaseClick}
        purchaseButtonLabel={purchaseButtonLabel}
        className={className}
      />
    </div>
  </>
);

// Confirm Variant: 이미지, 제목, 금액, 수량, 금액
interface OrderItemCardConfirmProps {
  name: string;
  unitPrice: number;
  quantity: number;
  totalPrice?: number;
  imageSrc?: string;
  className?: string;
}

const OrderItemCardConfirm: React.FC<OrderItemCardConfirmProps> = ({
  name,
  unitPrice,
  quantity,
  totalPrice: _totalPrice,
  imageSrc,
  className,
}) => {
  const displayTotalPrice = unitPrice * quantity;

  return (
    <>
      {/* 모바일 (~ 743px) */}
      <div className={clsx('tablet:hidden', className)}>
        <div className="flex items-center justify-between w-full rounded-12 bg-white px-12 py-8 gap-8">
          <div className="flex items-center gap-12">
            <div className="overflow-hidden rounded-8 bg-gray-50 w-85 h-85">
              {imageSrc ? (
                <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
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

            <div className="flex flex-col gap-4">
              <p className="text-black-100 text-14 leading-20">{name}</p>
              <PriceText value={unitPrice} className="text-black-100 text-14 leading-20" />
              <div className="pt-14">
                <span className="text-black-100 text-14 leading-20">수량 {quantity}개</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-8 shrink-0">
            <PriceText
              value={displayTotalPrice}
              className="text-gray-900 font-semibold text-24 leading-32 text-right"
            />
          </div>
        </div>
      </div>

      {/* 태블릿 (744px ~ 1199px) */}
      <div className={clsx('hidden tablet:flex desktop:hidden', className)}>
        <div className="flex items-center justify-between w-full rounded-12 bg-white px-16 py-12 gap-12">
          <div className="flex items-center gap-12">
            <div className="overflow-hidden rounded-8 bg-gray-50 w-140 h-140">
              {imageSrc ? (
                <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
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
              className="text-gray-900 font-semibold text-24 leading-32 text-right"
            />
          </div>
        </div>
      </div>

      {/* 데스크탑 (1200px ~) */}
      <div className={clsx('hidden desktop:flex', className)}>
        <div className="flex items-center justify-between w-full rounded-12 bg-white px-20 py-16 gap-16">
          <div className="flex items-center gap-12">
            <div className="overflow-hidden rounded-8 bg-gray-50 w-140 h-140">
              {imageSrc ? (
                <img src={imageSrc} alt={name} className="w-full h-full object-cover" />
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
              className="text-gray-900 font-semibold text-24 leading-32 text-right"
            />
          </div>
        </div>
      </div>
    </>
  );
};

// Main OrderItemCard Component
export const OrderItemCard: React.FC<OrderItemCardProps> = ({
  variant = 'default',
  name,
  unitPrice,
  quantity,
  totalPrice,
  shippingCost,
  shippingLabelText,
  imageSrc,
  checked,
  onCheckboxChange,
  onQuantityChange,
  onPurchaseClick,
  purchaseButtonLabel,
  className,
}) => {
  if (variant === 'confirm') {
    return (
      <OrderItemCardConfirm
        name={name}
        unitPrice={unitPrice}
        quantity={quantity}
        totalPrice={totalPrice}
        imageSrc={imageSrc}
        className={className}
      />
    );
  }

  // default variant는 checked와 onCheckboxChange가 필요
  return (
    <OrderItemCardDefault
      name={name}
      unitPrice={unitPrice}
      quantity={quantity}
      totalPrice={totalPrice}
      shippingCost={shippingCost}
      shippingLabelText={shippingLabelText}
      imageSrc={imageSrc}
      checked={checked ?? false}
      onCheckboxChange={onCheckboxChange}
      onQuantityChange={onQuantityChange}
      onPurchaseClick={onPurchaseClick}
      purchaseButtonLabel={purchaseButtonLabel}
      className={className}
    />
  );
};

export default OrderItemCard;

'use client';

import React, { useState } from 'react';
import { clsx } from '@/utils/clsx';
import PriceText from '@/components/atoms/PriceText/PriceText';
import Button from '@/components/atoms/Button/Button';
import { QuantitySelector } from '@/components/molecules/QuantitySelector/QuantitySelector';
import type { Option } from '@/components/atoms/DropDown/DropDown';

interface OrderItemCardBaseProps {
  name: string;
  unitPrice: number;
  quantity: number;
  totalPrice?: number;
  shippingCost?: number;
  imageSrc?: string;
  imageAlt?: string;
  onQuantityChange?: (option: Option) => void;
  onPurchaseClick?: () => void;
  className?: string;
}

interface OrderItemCardLayoutProps extends OrderItemCardBaseProps {
  containerClassName?: string;
  imageClassName?: string;
  imageIconSize?: number;
  nameClassName?: string;
  unitPriceClassName?: string;
  shippingLabelText?: string;
  shippingCostClassName?: string;
  quantityInputClassName?: string;
  quantitySelectorSizeClassName?: string;
  showTotalLabel?: boolean;
  showTotalPrice?: boolean;
  totalPriceClassName?: string;
  buttonSizeClassName?: string;
  buttonClassName?: string;
}

const OrderItemCardBase: React.FC<OrderItemCardLayoutProps> = ({
  name,
  unitPrice,
  quantity: initialQuantity,
  totalPrice,
  shippingCost = 0,
  imageSrc,
  imageAlt = name,
  onQuantityChange,
  onPurchaseClick,
  className,
  containerClassName,
  imageClassName,
  imageIconSize = 20,
  nameClassName,
  unitPriceClassName,
  shippingLabelText = '택배 배송비',
  shippingCostClassName,
  quantityInputClassName,
  quantitySelectorSizeClassName,
  showTotalLabel = true,
  showTotalPrice = true,
  totalPriceClassName,
  buttonSizeClassName,
  buttonClassName,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const displayTotalPrice = totalPrice ?? unitPrice * quantity;

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
        'flex items-center justify-between w-full rounded-12 bg-white',
        containerClassName,
        className
      )}
    >
      <div className="flex items-center gap-12">
        <div className={clsx('overflow-hidden rounded-8 bg-gray-50', imageClassName)}>
          {imageSrc ? (
            <img src={imageSrc} alt={imageAlt} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-50">
              <img
                src="/icons/photo-icon.svg"
                alt=""
                className="opacity-40"
                width={imageIconSize}
                height={imageIconSize}
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4">
          <p className={clsx('text-black-400', nameClassName)}>{name}</p>
          <PriceText value={unitPrice} className={clsx('text-black-400', unitPriceClassName)} />
          <div className="pt-13 flex items-center gap-4">
            <span className={clsx('text-black-400', shippingCostClassName)}>
              {shippingLabelText}
            </span>
            <PriceText
              value={shippingCost}
              className={clsx('text-black-400', shippingCostClassName)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-8 shrink-0">
        <QuantitySelector
          variant="secondary"
          onQuantityChange={handleQuantityChange}
          value={quantity}
          className={clsx(quantitySelectorSizeClassName, quantityInputClassName)}
        />
        {showTotalPrice && (
          <div className="flex items-center gap-4">
            {showTotalLabel && (
              <span className={clsx('text-gray-900 font-semibold', totalPriceClassName)}>총</span>
            )}
            <PriceText
              value={displayTotalPrice}
              className={clsx('text-gray-900 font-semibold', totalPriceClassName)}
            />
          </div>
        )}
        {onPurchaseClick && (
          <Button
            variant="secondary"
            size="sm"
            onClick={onPurchaseClick}
            className={clsx(buttonSizeClassName, buttonClassName)}
          >
            즉시 구매
          </Button>
        )}
      </div>
    </div>
  );
};

export type OrderItemCardMobileProps = OrderItemCardBaseProps;

export const OrderItemCardMobile: React.FC<OrderItemCardMobileProps> = ({
  name,
  unitPrice,
  quantity,
  totalPrice,
  shippingCost,
  imageSrc,
  imageAlt,
  onQuantityChange,
  onPurchaseClick,
  className,
}) => (
  <OrderItemCardBase
    name={name}
    unitPrice={unitPrice}
    quantity={quantity}
    totalPrice={totalPrice}
    shippingCost={shippingCost}
    imageSrc={imageSrc}
    imageAlt={imageAlt}
    onQuantityChange={onQuantityChange}
    onPurchaseClick={onPurchaseClick}
    className={className}
    containerClassName="px-12 py-8 gap-8"
    imageClassName="w-81 h-81"
    imageIconSize={20}
    nameClassName="text-14 leading-20"
    unitPriceClassName="text-14 leading-20"
    shippingLabelText="택배"
    shippingCostClassName="text-13 leading-20"
    showTotalLabel={false}
    showTotalPrice={false}
    totalPriceClassName="text-24 leading-32"
    quantitySelectorSizeClassName="w-72 h-40"
    buttonSizeClassName="w-88 h-40"
  />
);

export type OrderItemCardTabletProps = OrderItemCardBaseProps;

export const OrderItemCardTablet: React.FC<OrderItemCardTabletProps> = ({
  name,
  unitPrice,
  quantity,
  totalPrice,
  shippingCost,
  imageSrc,
  imageAlt,
  onQuantityChange,
  onPurchaseClick,
  className,
}) => (
  <OrderItemCardBase
    name={name}
    unitPrice={unitPrice}
    quantity={quantity}
    totalPrice={totalPrice}
    shippingCost={shippingCost}
    imageSrc={imageSrc}
    imageAlt={imageAlt}
    onQuantityChange={onQuantityChange}
    onPurchaseClick={onPurchaseClick}
    className={className}
    containerClassName="px-16 py-12 gap-12"
    imageClassName="w-140 h-140"
    imageIconSize={24}
    nameClassName="text-16 leading-24"
    unitPriceClassName="text-16 leading-24"
    shippingLabelText="택배 배송비"
    shippingCostClassName="text-14 leading-20"
    totalPriceClassName="text-24 leading-32"
    quantitySelectorSizeClassName="w-72 h-40"
    buttonSizeClassName="w-99 h-44"
  />
);

export type OrderItemCardDesktopProps = OrderItemCardBaseProps;

export const OrderItemCardDesktop: React.FC<OrderItemCardDesktopProps> = ({
  name,
  unitPrice,
  quantity,
  totalPrice,
  shippingCost,
  imageSrc,
  imageAlt,
  onQuantityChange,
  onPurchaseClick,
  className,
}) => (
  <OrderItemCardBase
    name={name}
    unitPrice={unitPrice}
    quantity={quantity}
    totalPrice={totalPrice}
    shippingCost={shippingCost}
    imageSrc={imageSrc}
    imageAlt={imageAlt}
    onQuantityChange={onQuantityChange}
    onPurchaseClick={onPurchaseClick}
    className={className}
    containerClassName="px-20 py-16 gap-16"
    imageClassName="w-140 h-140"
    imageIconSize={28}
    nameClassName="text-16 leading-24"
    unitPriceClassName="text-16 leading-24"
    shippingLabelText="택배 배송비"
    shippingCostClassName="text-14 leading-20"
    totalPriceClassName="text-24 leading-32"
    quantitySelectorSizeClassName="w-99 h-44"
    buttonSizeClassName="w-99 h-44"
  />
);

// Main OrderItemCard Component (통합 컴포넌트)
export type OrderItemCardProps = OrderItemCardBaseProps;

/**
 * OrderItemCard 이미지 140x140
 */
export const OrderItemCard: React.FC<OrderItemCardProps> = ({
  name,
  unitPrice,
  quantity,
  totalPrice,
  shippingCost,
  imageSrc,
  imageAlt,
  onQuantityChange,
  onPurchaseClick,
  className,
}) => (
  <>
    {/* 모바일 (~ 743px) */}
    <div className="tablet:hidden">
      <OrderItemCardMobile
        name={name}
        unitPrice={unitPrice}
        quantity={quantity}
        totalPrice={totalPrice}
        shippingCost={shippingCost}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        onQuantityChange={onQuantityChange}
        onPurchaseClick={onPurchaseClick}
        className={className}
      />
    </div>

    {/* 태블릿 (744px ~ 1199px) */}
    <div className="hidden tablet:hidden desktop:hidden">
      <OrderItemCardTablet
        name={name}
        unitPrice={unitPrice}
        quantity={quantity}
        totalPrice={totalPrice}
        shippingCost={shippingCost}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        onQuantityChange={onQuantityChange}
        onPurchaseClick={onPurchaseClick}
        className={className}
      />
    </div>

    {/* 데스크탑 (1200px ~) */}
    <div className="hidden tablet:flex desktop:flex">
      <OrderItemCardDesktop
        name={name}
        unitPrice={unitPrice}
        quantity={quantity}
        totalPrice={totalPrice}
        shippingCost={shippingCost}
        imageSrc={imageSrc}
        imageAlt={imageAlt}
        onQuantityChange={onQuantityChange}
        onPurchaseClick={onPurchaseClick}
        className={className}
      />
    </div>
  </>
);

export default OrderItemCard;

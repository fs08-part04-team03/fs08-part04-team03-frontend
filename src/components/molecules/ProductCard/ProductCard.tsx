'use client';

import React from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import ProductTile from '@/components/molecules/ProductTile/ProductTile';

type ProductCardVariant = 'product' | 'order';

interface BaseProductCardProps {
  variant?: ProductCardVariant;
  name: string;
  price: number;
  purchaseCount?: number;
  quantity?: number;
  shippingFee?: number;
  imageUrl?: string;
  className?: string;
  onClick?: () => void;
}

const ProductCard: React.FC<BaseProductCardProps> = ({
  variant = 'product',
  name,
  price,
  purchaseCount,
  quantity,
  shippingFee,
  imageUrl,
  className,
  onClick,
}) => {
  const rootClasses = clsx(
    'flex flex-col overflow-hidden',
    'rounded-8 bg-white text-left',
    'w-155 h-241 tablet:w-367 tablet:h-439 rounded-default',
    'transition-transform transition-[box-shadow] duration-200 ease-out',
    'hover:shadow-dropdown active:scale-[0.97]',
    'motion-reduce:transition-none',
    onClick && 'cursor-pointer',
    className
  );

  const content = (
    <>
      {/* 이미지 영역 */}
      <div className="relative w-155 h-155 rounded-default tablet:w-367 tablet:h-367 bg-gray-50 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        ) : (
          <span className="text-12 text-gray-500">이미지 없음</span>
        )}
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col flex-1 min-w-0 px-8 pt-8 pb-12 gap-2">
        {variant === 'product' ? (
          <ProductTile
            variant="product"
            name={name}
            price={price}
            purchaseCount={purchaseCount}
            size="md"
          />
        ) : (
          <ProductTile
            variant="order"
            name={name}
            price={price}
            quantity={quantity}
            shippingFee={shippingFee}
            size="md"
          />
        )}
      </div>
    </>
  );

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={clsx(
          rootClasses,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900'
        )}
      >
        {content}
      </button>
    );
  }

  return <div className={rootClasses}>{content}</div>;
};

export default ProductCard;

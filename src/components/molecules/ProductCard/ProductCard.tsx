'use client';

import React, { useState } from 'react';
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
  const [liked, setLiked] = useState(false);
  const [pressed, setPressed] = useState(false);

  const rootClasses = clsx(
    'flex flex-col overflow-hidden',
    'rounded-8 bg-white text-left',
    'w-155 h-241 tablet:w-367 tablet:h-439 rounded-default',
    'transition-transform transition-[box-shadow] duration-200 ease-out',
    'hover:shadow-dropdown',
    pressed && 'scale-[0.97]',
    onClick && 'cursor-pointer',
    className
  );

  return (
    <button
      type="button"
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      onClick={onClick}
      className={clsx(rootClasses, 'border-0 bg-transparent p-0 appearance-none text-left')}
    >
      {/* 이미지 영역 */}
      <div className="relative w-155 h-155 rounded-default tablet:w-367 tablet:h-367 bg-gray-50 flex items-center justify-center overflow-hidden cursor-pointer">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        ) : (
          <span className="text-12 text-gray-500">이미지 없음</span>
        )}

        {/* 하트 아이콘 */}
        <button
          type="button"
          aria-pressed={liked}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            setLiked((prev) => !prev);
          }}
          className="absolute bottom-10 right-10 w-30 h-30 tablet:bottom-20 tablet:right-20 cursor-pointer border-0 bg-transparent p-0"
        >
          <Image
            src={liked ? '/icons/heart.svg' : '/icons/heart-outline.svg'}
            alt="찜하기"
            width={30}
            height={30}
          />
        </button>
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-col flex-1 min-w-0 px-8 pt-8 pb-12 gap-2 cursor-pointer">
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
    </button>
  );
};

export default ProductCard;

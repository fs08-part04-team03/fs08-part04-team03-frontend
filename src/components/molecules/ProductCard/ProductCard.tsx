'use client';

import React, { useState, KeyboardEvent } from 'react';
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

  /** 상세 페이지 이동 (현재 onClick, 추후 Link로 대체 가능) */
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
    'cursor-pointer',
    className
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={`${name} 상세 페이지로 이동`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      className={rootClasses}
    >
      {/* 이미지 영역 */}
      <div className="relative w-155 h-155 rounded-default tablet:w-367 tablet:h-367 bg-gray-50 flex items-center justify-center overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        ) : (
          <span className="text-12 text-gray-500">이미지 없음</span>
        )}

        {/* 하트 아이콘 (카드 클릭과 완전 분리) */}
        <button
          type="button"
          aria-pressed={liked}
          aria-label={liked ? '찜하기 취소' : '찜하기'}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            setLiked((prev) => !prev);
          }}
          className="absolute bottom-10 right-10 w-30 h-30 tablet:bottom-20 tablet:right-20 border-0 bg-transparent p-0 cursor-pointer"
        >
          <Image
            src={liked ? '/icons/heart.svg' : '/icons/heart-outline.svg'}
            alt=""
            width={30}
            height={30}
          />
        </button>
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
    </div>
  );
};

export default ProductCard;

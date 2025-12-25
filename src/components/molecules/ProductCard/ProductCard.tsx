'use client';

import React, { useState, KeyboardEvent } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import ProductTile from '@/components/molecules/ProductTile/ProductTile';

type ProductCardVariant = 'product' | 'order' | 'wishlist';

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
    'rounded-8 bg-white text-left rounded-default',
    'transition-transform transition-[box-shadow] duration-200 ease-out',
    'hover:shadow-dropdown',
    pressed && 'scale-[0.97]',
    'cursor-pointer',

    // ✅ Product / Order
    (variant === 'product' || variant === 'order') &&
      'w-155 h-241 tablet:w-156 tablet:h-252 desktop:w-367 desktop:h-439',

    // ✅ Wishlist
    variant === 'wishlist' && 'w-155 h-251 tablet:w-219 tablet:h-315 desktop:w-373 desktop:h-445',

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
      <div
        className={clsx(
          'relative rounded-default bg-gray-50 flex items-center justify-center overflow-hidden',

          // Product / Order 이미지
          (variant === 'product' || variant === 'order') &&
            'w-155 h-241 tablet:w-156 tablet:h-252 desktop:w-367 desktop:h-439',

          // Wishlist 이미지
          variant === 'wishlist' &&
            'w-155 h-155 tablet:w-219 tablet:h-219 desktop:w-373 desktop:h-373'
        )}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        ) : (
          <span className="text-12 text-gray-500">이미지 없음</span>
        )}

        <button
          type="button"
          aria-pressed={liked}
          aria-label={liked ? '찜하기 취소' : '찜하기'}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            setLiked((prev) => !prev);
          }}
          className="absolute bottom-10 right-10 w-30 h-30 tablet:bottom-20 tablet:right-20 bg-transparent p-0"
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
        {variant === 'product' || variant === 'wishlist' ? (
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

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

  /** ✅ wishlist 전용 */
  onUnlike?: () => void;
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
  onUnlike,
}) => {
  const [liked, setLiked] = useState(variant === 'wishlist');
  const [pressed, setPressed] = useState(false);

  const isWishlist = variant === 'wishlist';
  const isLiked = isWishlist ? true : liked;

  const rootClasses = clsx(
    'flex flex-col overflow-hidden',
    'rounded-8 bg-white text-left rounded-default',
    'transition-transform transition-[box-shadow] duration-200 ease-out',
    'hover:shadow-dropdown',
    pressed && 'scale-[0.97]',
    'cursor-pointer',

    // Product / Order
    (variant === 'product' || variant === 'order') &&
      'w-155 h-241 tablet:w-156 tablet:h-252 desktop:w-367 desktop:h-439',

    // Wishlist
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

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isWishlist) {
      onUnlike?.();
      return;
    }

    setLiked((prev) => !prev);
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
      {/* =====================
          Image
      ====================== */}
      <div
        className={clsx(
          'relative rounded-default bg-gray-50 flex items-center justify-center overflow-hidden',
          (variant === 'product' || variant === 'order') &&
            'w-155 h-241 tablet:w-156 tablet:h-252 desktop:w-367 desktop:h-439',
          variant === 'wishlist' &&
            'w-155 h-155 tablet:w-219 tablet:h-219 desktop:w-373 desktop:h-373'
        )}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name}
            width={54}
            height={93}
            className={clsx(
              'object-cover',
              'tablet:w-[54px] tablet:h-[94px]',
              'desktop:w-[128px] desktop:h-[222px]'
            )}
          />
        ) : (
          <span className="text-12 text-gray-500">이미지 없음</span>
        )}

        {/* Heart */}
        <button
          type="button"
          aria-pressed={isLiked}
          aria-label={isLiked ? '찜하기 취소' : '찜하기'}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleHeartClick}
          className="absolute bottom-10 right-10 w-30 h-30 desktop:bottom-20 desktop:right-20 bg-transparent p-0"
        >
          <Image
            src={isLiked ? '/icons/heart.svg' : '/icons/heart-outline.svg'}
            alt=""
            width={30}
            height={30}
          />
        </button>
      </div>

      {/* =====================
          Text
      ====================== */}
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

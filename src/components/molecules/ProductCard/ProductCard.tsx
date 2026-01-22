'use client';

import { useState, KeyboardEvent, useEffect } from 'react';
import Image from 'next/image';
import { clsx } from '@/utils/clsx';
import ProductTile from '@/components/molecules/ProductTile/ProductTile';
import { useProductNavigationDirect } from '@/features/products/hooks/useProductNavigationDirect';

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
  productId?: number;
  onClick?: () => void;
  onUnlike?: () => void;
  liked?: boolean;
  onToggleLike?: () => void | Promise<void>;
  priority?: boolean;
}

const ProductCard = ({
  variant = 'product',
  name,
  price,
  purchaseCount,
  quantity,
  shippingFee,
  imageUrl,
  className,
  productId,
  onClick,
  onUnlike,
  liked: externalLiked,
  onToggleLike,
  priority = false,
}: BaseProductCardProps) => {
  const [internalLiked, setInternalLiked] = useState(variant === 'wishlist');
  const [likedState, setLikedState] = useState(externalLiked ?? internalLiked);
  const [pressed, setPressed] = useState(false);
  const [imgError, setImgError] = useState(false);

  const navigation = useProductNavigationDirect();
  const isWishlist = variant === 'wishlist';

  useEffect(() => {
    setLikedState(externalLiked ?? internalLiked);
  }, [externalLiked, internalLiked]);

  const isLiked = isWishlist ? true : likedState;

  const handleClick = () => {
    if (productId && navigation) {
      navigation.goToProductDetail(productId);
    } else if (onClick) {
      onClick();
    }
  };

  const rootClasses = clsx(
    'flex flex-col overflow-hidden',
    'rounded-default bg-white text-left',
    'shadow-card',
    'transition-[transform,box-shadow,border] duration-300 ease-out',
    'hover:animate-border-shimmer hover:-translate-y-2',
    pressed && 'scale-[0.97]',
    'cursor-pointer',
    (variant === 'product' || variant === 'order') &&
      'w-full aspect-[155/241] tablet:aspect-[156/252] desktop:aspect-[367/439]',
    variant === 'wishlist' &&
      'w-full aspect-[155/251] tablet:aspect-[219/315] desktop:aspect-[373/445]',
    className
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!productId && !onClick) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const handleHeartClickAsync = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isWishlist) {
      onUnlike?.();
      return;
    }

    const nextLiked = !likedState;
    setLikedState(nextLiked);

    if (onToggleLike) {
      try {
        await onToggleLike();
      } catch {
        setLikedState((prev) => !prev);
      }
    } else {
      setInternalLiked((prev) => !prev);
    }
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    handleHeartClickAsync(e);
  };

  const effectiveImageUrl = imageUrl ? imageUrl.trim() : null;
  const shouldShowImage = !!effectiveImageUrl && !imgError;

  useEffect(() => {
    setImgError(false);
  }, [imageUrl]);

  const imageSizes =
    variant === 'wishlist'
      ? '(max-width: 767px) 115px, (max-width: 1199px) 200px, 345px'
      : '(max-width: 767px) 150px, (max-width: 1199px) 150px, 350px';

  const imageContent = shouldShowImage ? (
    <Image
      src={effectiveImageUrl}
      alt={name}
      fill
      sizes={imageSizes}
      className="object-contain"
      onError={() => setImgError(true)}
      priority={priority}
      unoptimized
    />
  ) : (
    <Image
      src="/icons/no-image.svg"
      alt="이미지 없음"
      fill
      sizes={imageSizes}
      className="object-contain"
      style={{ objectPosition: 'center' }}
      unoptimized
    />
  );

  const productTileContent =
    variant === 'product' || variant === 'wishlist' ? (
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
    );

  return (
    <div
      role="link"
      tabIndex={0}
      aria-label={`${name} 상세 페이지로 이동`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      className={rootClasses}
    >
      <div
        className={clsx(
          'relative rounded-default bg-gray-50 overflow-hidden',
          (variant === 'product' || variant === 'order') && 'w-full aspect-square',
          variant === 'wishlist' && 'w-full aspect-square'
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">{imageContent}</div>

        <button
          type="button"
          aria-pressed={isLiked}
          aria-label={isLiked ? '찜하기 취소' : '찜하기'}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleHeartClick}
          className="absolute bottom-10 right-10 w-17 h-17 desktop:bottom-20 desktop:right-20 desktop:w-25 desktop:h-25 bg-transparent p-0 cursor-pointer"
        >
          <Image
            src={isLiked ? '/icons/heart.svg' : '/icons/heart-outline.svg'}
            alt=""
            width={25}
            height={25}
            className="w-full h-full"
          />
        </button>
      </div>

      <div className="flex flex-col flex-1 min-w-0 px-8 pt-8 pb-12 gap-2">{productTileContent}</div>
    </div>
  );
};

export default ProductCard;

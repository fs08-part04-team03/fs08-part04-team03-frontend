'use client';

import { useState, KeyboardEvent, useEffect } from 'react';
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

  /** ✅ 위시리스트 상태 */
  liked?: boolean;
  onToggleLike?: () => void;

  /** 이미지 우선순위 */
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
  onClick,
  onUnlike,
  liked: externalLiked,
  onToggleLike,
  priority = false,
}: BaseProductCardProps) => {
  const [internalLiked, setInternalLiked] = useState(variant === 'wishlist');
  const [pressed, setPressed] = useState(false);
  const [imgError, setImgError] = useState(false);
  // (백엔드에서 presigned URL을 내려주므로 별도의 캐시 버스터 불필요)

  const isWishlist = variant === 'wishlist';
  const liked = externalLiked !== undefined ? externalLiked : internalLiked;
  const isLiked = isWishlist ? true : liked;

  const rootClasses = clsx(
    'flex flex-col overflow-hidden',
    'rounded-8 bg-white text-left rounded-default',
    'shadow-card',
    'transition-[transform,box-shadow,border] duration-300 ease-out',
    'hover:animate-border-shimmer hover:-translate-y-2',
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

    // 외부에서 onToggleLike가 전달되면 그것을 사용, 없으면 내부 state 업데이트
    if (onToggleLike) {
      onToggleLike();
    } else {
      setInternalLiked((prev) => !prev);
    }
  };

  /** =====================
      Image 처리
  ====================== */
  const effectiveImageUrl = imageUrl ? imageUrl.trim() : null;
  const shouldShowImage = !!effectiveImageUrl && !imgError;

  // imageUrl이 변경될 때 에러 상태 초기화
  useEffect(() => {
    setImgError(false);
  }, [imageUrl]);

  // 반응형 이미지 크기 설정 (CLS 방지)
  // Wishlist: Mobile 115px, Tablet 200px, Desktop 345px
  // Product/Order: Mobile 150px, Tablet 150px, Desktop 350px
  const imageSizes =
    variant === 'wishlist'
      ? '(max-width: 767px) 115px, (max-width: 1199px) 200px, 345px'
      : '(max-width: 767px) 150px, (max-width: 1199px) 150px, 350px';

  let imageContent;
  if (shouldShowImage) {
    imageContent = (
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
    );
  } else {
    // imageUrl이 없거나 유효하지 않거나 로딩 실패 시 fallback 이미지 표시
    imageContent = (
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
  }

  /** =====================
      ProductTile 처리
  ====================== */
  let productTileContent;
  if (variant === 'product' || variant === 'wishlist') {
    productTileContent = (
      <ProductTile
        variant="product"
        name={name}
        price={price}
        purchaseCount={purchaseCount}
        size="md"
      />
    );
  } else {
    productTileContent = (
      <ProductTile
        variant="order"
        name={name}
        price={price}
        quantity={quantity}
        shippingFee={shippingFee}
        size="md"
      />
    );
  }

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
          'relative rounded-default bg-gray-50 overflow-hidden',
          (variant === 'product' || variant === 'order') &&
            'w-155 h-241 tablet:w-156 tablet:h-252 desktop:w-367 desktop:h-439',
          variant === 'wishlist' &&
            'w-155 h-155 tablet:w-219 tablet:h-219 desktop:w-373 desktop:h-373'
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center">{imageContent}</div>

        {/* Heart 버튼 */}
        <button
          type="button"
          aria-pressed={isLiked}
          aria-label={isLiked ? '찜하기 취소' : '찜하기'}
          onPointerDown={(e) => e.stopPropagation()}
          onClick={handleHeartClick}
          className="absolute bottom-10 right-10 w-17 h-17 desktop:bottom-20 desktop:right-20 desktop:w-25 desktop:h-25 bg-transparent p-0"
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

      {/* =====================
          Text
      ====================== */}
      <div className="flex flex-col flex-1 min-w-0 px-8 pt-8 pb-12 gap-2">{productTileContent}</div>
    </div>
  );
};

export default ProductCard;

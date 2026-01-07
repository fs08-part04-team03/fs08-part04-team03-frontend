'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Breadcrumb, { type BreadcrumbItem } from '@/components/molecules/Breadcrumb/Breadcrumb';
import AccordionPanel from '@/components/organisms/AccordionPanel/AccordionPanel';
import { clsx } from '@/utils/clsx';
import ProductDetailHeader, {
  type ProductDetailHeaderProps,
} from '@/components/molecules/ProductDetailHeader/ProductDetailHeader';
import { Divider } from '@/components/atoms/Divider/Divider';

/* =====================
 * Types
 ====================== */
export interface DetailPageLayoutProps {
  breadcrumbItems: BreadcrumbItem[];
  productImage?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  // eslint-disable-next-line react/no-unused-prop-types
  productImageKey?: string | null; // 이미지 키 (URL 파싱 방지용, ProductEditModal에 전달용)
  productDetailHeader: ProductDetailHeaderProps & {
    type?: 'default' | 'simple';
  };
  accordionPanels?: Array<{
    id?: string | number;
    label: string;
    content?: string | React.ReactNode;
    subContent?: string | React.ReactNode;
  }>;
  className?: string;
  liked?: boolean;
  onToggleLike?: () => void;
}

type InternalLayoutProps = {
  breadcrumbItems: BreadcrumbItem[];
  productImage?: { src: string; alt: string };
  liked: boolean;
  onToggleLike: () => void;
  productName: string;
  purchaseCount: number;
  price: number;
  type: 'default' | 'simple';
  onQuantityChange?: ProductDetailHeaderProps['onQuantityChange'];
  onMenuClick?: ProductDetailHeaderProps['onMenuClick'];
  onAddToCart?: ProductDetailHeaderProps['onAddToCart'];
  headerClassName?: string;
  accordionPanels?: DetailPageLayoutProps['accordionPanels'];
};

/* =====================
 * Product Image Box
 ====================== */
const ProductImageBox = ({
  sizeClass,
  productImage,
  liked,
  onToggleLike,
}: {
  sizeClass: string;
  productImage?: { src: string; alt: string };
  liked: boolean;
  onToggleLike: () => void;
}) => {
  const [imgError, setImgError] = useState(false);

  // imageUrl이 유효한 문자열인지 체크 (null, undefined, 빈 문자열 모두 처리)
  const isValidImageUrl =
    productImage?.src && typeof productImage.src === 'string' && productImage.src.trim().length > 0;

  // 유효한 imageUrl이 있고 에러가 없을 때만 실제 이미지 표시
  const shouldShowImage = isValidImageUrl && !imgError;

  // 외부 URL인지 확인 (유효한 URL일 때만 체크)
  const isExternalUrl = isValidImageUrl
    ? productImage.src.startsWith('http://') || productImage.src.startsWith('https://')
    : false;
  const isProxyApiUrl = isValidImageUrl ? productImage.src.startsWith('/api/product/image') : false;

  const imageSrc = shouldShowImage ? productImage.src : '/icons/no-image.svg';
  const imageAlt = productImage?.alt || '이미지 없음';

  const isNoImage = imageSrc === '/icons/no-image.svg';

  // 반응형 이미지 크기 설정 (CLS 방지)
  // Mobile: 300px, Tablet: 456px, Desktop: 500px
  const imageSizes = '(max-width: 767px) 300px, (max-width: 1199px) 456px, 500px';

  return (
    <div className={clsx('relative bg-gray-100 rounded-8 shadow-lg', sizeClass)}>
      <div className="absolute inset-0 bg-white rounded-8 p-[73px_120px]">
        {isNoImage ? (
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src="/icons/photo-icon.svg"
              alt="이미지 없음"
              width={50}
              height={50}
              unoptimized
              loading="eager"
              priority
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            {(() => {
              if (isExternalUrl) {
                // 외부 URL은 일반 img 태그 사용 (CORS 문제 방지)
                return (
                  <img
                    src={imageSrc}
                    alt={imageAlt}
                    className="max-w-full max-h-full w-auto h-auto object-contain"
                    onError={() => setImgError(true)}
                    crossOrigin="anonymous"
                  />
                );
              }

              if (isProxyApiUrl) {
                // 프록시 API URL은 unoptimized 사용 (Next.js Image 최적화 우회)
                return (
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    sizes={imageSizes}
                    className="object-contain"
                    style={{ objectPosition: 'center' }}
                    onError={() => setImgError(true)}
                    unoptimized
                  />
                );
              }

              // 내부 이미지는 Next.js Image 최적화 사용
              return (
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes={imageSizes}
                  className="object-contain"
                  style={{ objectPosition: 'center' }}
                  onError={() => setImgError(true)}
                />
              );
            })()}
          </div>
        )}
      </div>

      <button
        type="button"
        aria-pressed={liked}
        aria-label={liked ? '찜하기 취소' : '찜하기'}
        onClick={onToggleLike}
        className="
        absolute bottom-20 right-20
        w-30 h-30
        bg-transparent p-0
        rounded-4
        transition-transform
        active:scale-95
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary-500
        focus-visible:ring-offset-2
      "
      >
        <Image
          src={liked ? '/icons/heart.svg' : '/icons/heart-outline.svg'}
          alt="찜하기"
          width={30}
          height={30}
        />
      </button>
    </div>
  );
};

/* =====================
 * Mobile
 ====================== */
const DetailPageLayoutMobile: React.FC<InternalLayoutProps> = ({
  breadcrumbItems,
  productImage,
  liked,
  onToggleLike,
  accordionPanels,
  productName,
  purchaseCount,
  price,
  type,
  onQuantityChange,
  onMenuClick,
  onAddToCart,
  headerClassName,
}) => (
  <div className="w-full flex justify-center tablet:hidden">
    <div className="w-328 flex flex-col">
      <div className="mb-40">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="mb-30 flex justify-center">
        <ProductImageBox
          sizeClass="w-328 h-328"
          productImage={productImage}
          liked={liked}
          onToggleLike={onToggleLike}
        />
      </div>

      <div className="mb-40">
        <ProductDetailHeader
          productName={productName}
          purchaseCount={purchaseCount}
          price={price}
          type={type}
          onQuantityChange={onQuantityChange}
          onMenuClick={onMenuClick}
          onAddToCart={onAddToCart}
          className={headerClassName}
        />
      </div>

      {accordionPanels?.map((panel, i) => (
        <AccordionPanel
          key={panel.id ?? i}
          label={panel.label}
          content={panel.content}
          subContent={panel.subContent}
        />
      ))}
    </div>
  </div>
);

/* =====================
 * Tablet
 ====================== */
const DetailPageLayoutTablet: React.FC<InternalLayoutProps> = ({
  breadcrumbItems,
  productImage,
  liked,
  onToggleLike,
  accordionPanels,
  productName,
  purchaseCount,
  price,
  type,
  onQuantityChange,
  onMenuClick,
  onAddToCart,
  headerClassName,
}) => (
  <div className="hidden tablet:flex desktop:hidden w-full justify-center">
    <div className="w-496">
      <Breadcrumb items={breadcrumbItems} />
      <Divider className="my-30" />

      <div className="mb-30 flex justify-center">
        <ProductImageBox
          sizeClass="w-496 h-496"
          productImage={productImage}
          liked={liked}
          onToggleLike={onToggleLike}
        />
      </div>

      <ProductDetailHeader
        productName={productName}
        purchaseCount={purchaseCount}
        price={price}
        type={type}
        onQuantityChange={onQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
        className={headerClassName}
      />

      {accordionPanels?.map((panel, i) => (
        <AccordionPanel
          key={panel.id ?? i}
          label={panel.label}
          content={panel.content}
          subContent={panel.subContent}
        />
      ))}
    </div>
  </div>
);

/* =====================
 * Desktop
 ====================== */
const DetailPageLayoutDesktop: React.FC<InternalLayoutProps> = ({
  breadcrumbItems,
  productImage,
  liked,
  onToggleLike,
  accordionPanels,
  productName,
  purchaseCount,
  price,
  type,
  onQuantityChange,
  onMenuClick,
  onAddToCart,
  headerClassName,
}) => (
  <div className="hidden desktop:flex flex-col items-center w-full">
    <div className="w-1180 mb-20">
      <Breadcrumb items={breadcrumbItems} />
    </div>
    <Divider className="w-1180 mb-60" />

    <div className="w-1180 grid grid-cols-[540px_610px] gap-40">
      <ProductImageBox
        sizeClass="w-540 h-540"
        productImage={productImage}
        liked={liked}
        onToggleLike={onToggleLike}
      />

      <div>
        <ProductDetailHeader
          productName={productName}
          purchaseCount={purchaseCount}
          price={price}
          type={type}
          onQuantityChange={onQuantityChange}
          onMenuClick={onMenuClick}
          onAddToCart={onAddToCart}
          className={headerClassName}
        />

        {accordionPanels?.map((panel, i) => (
          <AccordionPanel
            key={panel.id ?? i}
            label={panel.label}
            content={panel.content}
            subContent={panel.subContent}
          />
        ))}
      </div>
    </div>
  </div>
);

/* =====================
 * Root
 ====================== */
const DetailPageLayout: React.FC<DetailPageLayoutProps> = ({
  breadcrumbItems,
  productImage,
  productDetailHeader,
  accordionPanels,
  className,
  liked: externalLiked,
  onToggleLike: externalOnToggleLike,
}) => {
  const [internalLiked, setInternalLiked] = useState(false);

  const liked = externalLiked !== undefined ? externalLiked : internalLiked;

  const handleToggleLike = () => {
    if (externalOnToggleLike) {
      externalOnToggleLike();
    } else {
      setInternalLiked((v) => !v);
    }
  };

  const {
    productName,
    purchaseCount,
    price,
    type,
    onQuantityChange,
    onMenuClick,
    onAddToCart,
    className: headerClassName,
  } = productDetailHeader;

  return (
    <div className={clsx('w-full', className)}>
      <DetailPageLayoutMobile
        breadcrumbItems={breadcrumbItems}
        productImage={productImage}
        accordionPanels={accordionPanels}
        liked={liked}
        onToggleLike={handleToggleLike}
        productName={productName}
        purchaseCount={purchaseCount}
        price={price}
        type={type || 'default'}
        onQuantityChange={onQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
        headerClassName={headerClassName}
      />

      <DetailPageLayoutTablet
        breadcrumbItems={breadcrumbItems}
        productImage={productImage}
        accordionPanels={accordionPanels}
        liked={liked}
        onToggleLike={handleToggleLike}
        productName={productName}
        purchaseCount={purchaseCount}
        price={price}
        type={type || 'default'}
        onQuantityChange={onQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
        headerClassName={headerClassName}
      />

      <DetailPageLayoutDesktop
        breadcrumbItems={breadcrumbItems}
        productImage={productImage}
        accordionPanels={accordionPanels}
        liked={liked}
        onToggleLike={handleToggleLike}
        productName={productName}
        purchaseCount={purchaseCount}
        price={price}
        type={type || 'default'}
        onQuantityChange={onQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
        headerClassName={headerClassName}
      />
    </div>
  );
};

export default DetailPageLayout;

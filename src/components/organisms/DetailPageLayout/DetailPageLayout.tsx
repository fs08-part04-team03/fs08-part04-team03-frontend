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
  productDetailHeader: ProductDetailHeaderProps & {
    type?: 'default' | 'simple';
  };
  accordionPanels?: Array<{
    id?: string | number;
    label: string;
    content?: string;
    subContent?: string;
  }>;
  className?: string;
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
}) => (
  <div className={clsx('relative aspect-square bg-gray-100 rounded-8', sizeClass)}>
    {productImage ? (
      <div className="absolute inset-0 bg-white rounded-8 p-[73px_120px]">
        <div className="relative w-full h-full">
          <Image src={productImage.src} alt={productImage.alt} fill className="object-contain" />
        </div>
      </div>
    ) : (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-gray-400 text-14">상품 이미지</span>
      </div>
    )}

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
          sizeClass="w-328"
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
          onMenuClick={type === 'default' ? onMenuClick : undefined}
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
          sizeClass="w-496"
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
        onMenuClick={type === 'default' ? onMenuClick : undefined}
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

    <div className="w-1180 grid grid-cols-[530px_610px] gap-40">
      <ProductImageBox
        sizeClass="w-530"
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
          onMenuClick={type === 'default' ? onMenuClick : undefined}
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
}) => {
  const [liked, setLiked] = useState(false);

  const handleToggleLike = () => {
    setLiked((v) => !v);
  };

  const {
    productName,
    purchaseCount,
    price,
    type = 'default',
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
        type={type}
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
        type={type}
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
        type={type}
        onQuantityChange={onQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
        headerClassName={headerClassName}
      />
    </div>
  );
};

export default DetailPageLayout;

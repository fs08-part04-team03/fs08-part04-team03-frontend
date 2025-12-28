'use client';

import React from 'react';
import { clsx } from '@/utils/clsx';
import PriceText from '@/components/atoms/PriceText/PriceText';

type ProductTileBaseProps = {
  name: string;
  price: number;
  size?: 'sm' | 'md';
  className?: string;
};

type ProductTileProductProps = ProductTileBaseProps & {
  variant: 'product';
  purchaseCount?: number;
};

type ProductTileOrderProps = ProductTileBaseProps & {
  variant: 'order';
  quantity?: number;
  shippingFee?: number;
  metaOverride?: React.ReactNode;
};

export type ProductTileProps = ProductTileProductProps | ProductTileOrderProps;

const ProductTile: React.FC<ProductTileProps> = (props) => {
  const { name, price, size = 'md', className, variant } = props;

  // 상품명
  const nameClass =
    size === 'sm'
      ? 'text-14 leading-22 tracking--0.35'
      : 'text-16 leading-24 tracking--0.4 tablet:text-18 tablet:leading-26 tablet:tracking--0.45';

  // 보조정보
  const subClass =
    size === 'sm'
      ? 'text-13 leading-18 tracking--0.3'
      : 'text-13 leading-18 tracking--0.3 tablet:text-14 tablet:leading-22 tablet:tracking--0.35';

  // 금액
  const priceClass =
    size === 'sm'
      ? 'text-14 leading-22 tracking--0.35'
      : 'text-16 leading-24 tracking--0.4 tablet:text-18 tablet:leading-26 tablet:tracking--0.45';

  let subNode: React.ReactNode = null;
  let purchaseCountNode: React.ReactNode = null;
  let orderSubNode: React.ReactNode = null;
  let orderSubNodeInline: React.ReactNode = null;

  if (variant === 'product') {
    const { purchaseCount } = props;
    if (purchaseCount !== undefined) {
      purchaseCountNode = (
        <span className={clsx('font-bold text-secondary-500', subClass)}>
          {purchaseCount}회 구매
        </span>
      );
      subNode = (
        <p className={clsx('font-bold text-secondary-500', subClass)}>{purchaseCount}회 구매</p>
      );
    }
  } else if (variant === 'order') {
    const { quantity, shippingFee, metaOverride } = props;

    if (metaOverride) {
      orderSubNode = <p className={clsx('text-gray-600', subClass)}>{metaOverride}</p>;
      orderSubNodeInline = <span className={clsx('text-gray-600', subClass)}>{metaOverride}</span>;
    } else if (quantity !== undefined) {
      orderSubNode = <p className={clsx('text-gray-600', subClass)}>수량 {quantity}개</p>;
      orderSubNodeInline = (
        <span className={clsx('text-gray-600', subClass)}>수량 {quantity}개</span>
      );
    } else if (shippingFee !== undefined) {
      const shippingText = shippingFee === 0 ? '무료' : `${shippingFee.toLocaleString('ko-KR')}원`;
      orderSubNode = <p className={clsx('text-gray-600', subClass)}>배송비 {shippingText}</p>;
      orderSubNodeInline = (
        <span className={clsx('text-gray-600', subClass)}>배송비 {shippingText}</span>
      );
    }
  }

  const renderLayout = () => {
    if (variant === 'product' && purchaseCountNode) {
      return (
        <>
          {/* 모바일 + 태블릿 */}
          <div className="flex flex-col gap-2 desktop:hidden">
            <h1 className={clsx('font-normal text-gray-950', nameClass)}>{name}</h1>
            <PriceText value={price} className={clsx('font-bold text-gray-950', priceClass)} />
            {subNode}
          </div>

          {/* 데스크톱 */}
          <div className="hidden desktop:flex desktop:flex-col desktop:gap-2">
            <div className="flex flex-row items-center gap-8">
              <h1 className={clsx('font-normal text-gray-950', nameClass)}>{name}</h1>
              {purchaseCountNode}
            </div>
            <PriceText value={price} className={clsx('font-bold text-gray-950', priceClass)} />
          </div>
        </>
      );
    }

    if (variant === 'order' && orderSubNode) {
      return (
        <>
          {/* 모바일 + 태블릿 */}
          <div className="flex flex-col gap-2 desktop:hidden">
            <h1 className={clsx('font-normal text-gray-950', nameClass)}>{name}</h1>
            <PriceText value={price} className={clsx('font-bold text-gray-950', priceClass)} />
            {orderSubNode}
          </div>

          {/* 데스크톱 */}
          <div className="hidden desktop:flex desktop:flex-col desktop:gap-2">
            <div className="flex flex-row items-center gap-8">
              <h1 className={clsx('font-normal text-gray-950', nameClass)}>{name}</h1>
              {orderSubNodeInline}
            </div>
            <PriceText value={price} className={clsx('font-bold text-gray-950', priceClass)} />
          </div>
        </>
      );
    }

    return (
      <>
        <h1 className={clsx('font-normal text-gray-950', nameClass)}>{name}</h1>
        {subNode}
        <PriceText value={price} className={clsx('font-bold text-gray-950', priceClass)} />
      </>
    );
  };

  return (
    <div className={clsx('flex flex-col gap-2 flex-1 min-w-0', className)}>{renderLayout()}</div>
  );
};

export default ProductTile;

'use client';

import { useState } from 'react';
import { clsx } from '@/utils/clsx';
import Button from '@/components/atoms/Button/Button';
import ItemMenu from '@/components/molecules/ItemMenu/ItemMenu';
import ProductTile from '@/components/molecules/ProductTile/ProductTile';
import { NumberInput } from '@/components/molecules/NumberInput/NumberInput';
import PriceText from '@/components/atoms/PriceText/PriceText';
import type { Option } from '@/components/atoms/DropDown/DropDown';

export type ProductDetailHeaderType = 'default' | 'simple';

export interface ProductDetailHeaderProps {
  productName: string;
  purchaseCount: number;
  price: number;
  type?: ProductDetailHeaderType;
  onQuantityChange?: (option: Option) => void;
  onMenuClick?: (action: 'edit' | 'delete') => void; // ✅ 수정
  onAddToCart?: () => void;
  className?: string;
}

type InternalHeaderProps = Pick<
  ProductDetailHeaderProps,
  | 'productName'
  | 'purchaseCount'
  | 'price'
  | 'onQuantityChange'
  | 'onMenuClick'
  | 'onAddToCart'
  | 'type'
> & {
  quantity: number;
};

// --- Mobile / Tablet / Desktop ---
// UI 그대로, ItemMenu onClick만 수정
const ProductDetailHeaderMobile: React.FC<InternalHeaderProps> = ({
  productName,
  purchaseCount,
  price,
  onQuantityChange,
  onMenuClick,
  onAddToCart,
  quantity,
  type = 'default',
}) => (
  <div className="flex tablet:hidden w-full">
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-start justify-between gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-16 leading-24 tracking--0.4 font-normal text-gray-950">
            {productName}
          </h1>
          <span className="text-13 leading-18 tracking--0.3 font-bold text-secondary-500">
            {purchaseCount}회 구매
          </span>
        </div>
        <div className="flex items-start gap-8 shrink-0">
          <NumberInput
            variant="default"
            label="수량"
            onQuantityChange={onQuantityChange}
            value={quantity}
          />
          {type === 'default' && <ItemMenu onClick={onMenuClick} />}
        </div>
      </div>
      <PriceText
        value={price}
        className="text-16 leading-24 tracking--0.4 font-bold text-gray-950"
      />
      <Button variant="primary" size="lg" fullWidth className="mt-32" onClick={onAddToCart}>
        장바구니 담기
      </Button>
    </div>
  </div>
);

const ProductDetailHeaderTablet: React.FC<InternalHeaderProps> = ({
  productName,
  purchaseCount,
  price,
  onQuantityChange,
  onMenuClick,
  onAddToCart,
  quantity,
  type = 'default',
}) => (
  <div className="hidden tablet:flex desktop:hidden w-full">
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-start justify-between gap-8">
        <ProductTile
          variant="product"
          name={productName}
          price={price}
          purchaseCount={purchaseCount}
          size="md"
        />
        <div className="flex items-start gap-8 shrink-0">
          <NumberInput
            variant="default"
            label="수량"
            onQuantityChange={onQuantityChange}
            value={quantity}
          />
          {type === 'default' && <ItemMenu onClick={onMenuClick} />}
        </div>
      </div>
      <Button variant="primary" size="lg" fullWidth className="mt-32" onClick={onAddToCart}>
        장바구니 담기
      </Button>
    </div>
  </div>
);

const ProductDetailHeaderDesktop: React.FC<InternalHeaderProps> = ({
  productName,
  purchaseCount,
  price,
  onQuantityChange,
  onMenuClick,
  onAddToCart,
  quantity,
  type = 'default',
}) => (
  <div className="hidden desktop:flex w-full">
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-start justify-between gap-8">
        <ProductTile
          variant="product"
          name={productName}
          price={price}
          purchaseCount={purchaseCount}
          size="md"
        />
        <div className="flex items-start gap-8 shrink-0">
          <NumberInput
            variant="default"
            label="수량"
            onQuantityChange={onQuantityChange}
            value={quantity}
          />
          {type === 'default' && <ItemMenu onClick={onMenuClick} />}
        </div>
      </div>
      <Button variant="primary" size="lg" fullWidth className="mt-32" onClick={onAddToCart}>
        장바구니 담기
      </Button>
    </div>
  </div>
);

// --- Container ---
const ProductDetailHeader: React.FC<ProductDetailHeaderProps> = ({
  productName,
  purchaseCount,
  price,
  type = 'default',
  onQuantityChange,
  onMenuClick,
  onAddToCart,
  className = '',
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (option: Option) => {
    const next = Number(option.key);
    if (!Number.isNaN(next)) {
      setQuantity(next);
      onQuantityChange?.(option);
    }
  };

  const totalPrice = price * quantity;

  return (
    <div className={clsx('flex flex-col gap-8', className)}>
      <ProductDetailHeaderMobile
        productName={productName}
        purchaseCount={purchaseCount}
        price={totalPrice}
        onQuantityChange={handleQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
        quantity={quantity}
        type={type}
      />
      <ProductDetailHeaderTablet
        productName={productName}
        purchaseCount={purchaseCount}
        price={totalPrice}
        onQuantityChange={handleQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
        quantity={quantity}
        type={type}
      />
      <ProductDetailHeaderDesktop
        productName={productName}
        purchaseCount={purchaseCount}
        price={totalPrice}
        onQuantityChange={handleQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
        quantity={quantity}
        type={type}
      />
    </div>
  );
};

export default ProductDetailHeader;

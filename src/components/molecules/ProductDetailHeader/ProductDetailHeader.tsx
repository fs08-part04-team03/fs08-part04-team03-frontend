'use client';

import { useState } from 'react';
import { clsx } from '@/utils/clsx';
import Button from '@/components/atoms/Button/Button';
import ItemMenu from '@/components/molecules/ItemMenu/ItemMenu';
import ProductTile from '@/components/molecules/ProductTile/ProductTile';
import { NumberInput } from '@/components/molecules/NumberInput/NumberInput';

import type { Option } from '@/components/atoms/DropDown/DropDown';

export interface ProductDetailHeaderProps {
  productName: string;
  purchaseCount: number;
  price: number;
  onQuantityChange?: (option: Option) => void;
  onMenuClick?: () => void;
  onAddToCart?: () => void;
  className?: string;
}

type InternalHeaderProps = Pick<
  ProductDetailHeaderProps,
  'productName' | 'purchaseCount' | 'price' | 'onQuantityChange' | 'onMenuClick' | 'onAddToCart'
> & {
  quantity: number;
};

const BaseProductDetailHeaderLayout: React.FC<
  InternalHeaderProps & { wrapperClassName: string }
> = ({
  productName,
  purchaseCount,
  price,
  onQuantityChange,
  onMenuClick,
  onAddToCart,
  quantity,
  wrapperClassName,
}) => (
  <div className={wrapperClassName}>
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
          <ItemMenu onClick={onMenuClick} />
        </div>
      </div>

      <Button variant="primary" size="lg" fullWidth className="mt-32" onClick={onAddToCart}>
        장바구니 담기
      </Button>
    </div>
  </div>
);

export const MobileProductDetailHeader: React.FC<InternalHeaderProps> = ({
  productName,
  purchaseCount,
  price,
  onQuantityChange,
  onMenuClick,
  onAddToCart,
  quantity,
}) => (
  <BaseProductDetailHeaderLayout
    productName={productName}
    purchaseCount={purchaseCount}
    price={price}
    onQuantityChange={onQuantityChange}
    onMenuClick={onMenuClick}
    onAddToCart={onAddToCart}
    quantity={quantity}
    wrapperClassName="flex tablet:hidden w-full"
  />
);

export const DesktopTabletProductDetailHeader: React.FC<InternalHeaderProps> = ({
  productName,
  purchaseCount,
  price,
  onQuantityChange,
  onMenuClick,
  onAddToCart,
  quantity,
}) => (
  <BaseProductDetailHeaderLayout
    productName={productName}
    purchaseCount={purchaseCount}
    price={price}
    onQuantityChange={onQuantityChange}
    onMenuClick={onMenuClick}
    onAddToCart={onAddToCart}
    quantity={quantity}
    wrapperClassName="hidden tablet:flex w-full"
  />
);

const ProductDetailHeader: React.FC<ProductDetailHeaderProps> = ({
  productName,
  purchaseCount,
  price,
  onQuantityChange,
  onMenuClick,
  onAddToCart,
  className = '',
}) => {
  // 수량 상태 관리
  const [quantity, setQuantity] = useState(1);

  // 수량 변경 핸들러
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
      <MobileProductDetailHeader
        productName={productName}
        purchaseCount={purchaseCount}
        price={totalPrice}
        onQuantityChange={handleQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
        quantity={quantity}
      />

      <DesktopTabletProductDetailHeader
        productName={productName}
        purchaseCount={purchaseCount}
        price={totalPrice}
        onQuantityChange={handleQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
        quantity={quantity}
      />
    </div>
  );
};

export default ProductDetailHeader;

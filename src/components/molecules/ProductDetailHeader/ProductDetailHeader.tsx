'use client';

import { useState, useEffect } from 'react';
import { clsx } from '@/utils/clsx';
import Button from '@/components/atoms/Button/Button';
import ItemMenu from '@/components/molecules/ItemMenu/ItemMenu';
import ProductTile from '@/components/molecules/ProductTile/ProductTile';

import type { Option } from '@/components/atoms/DropDown/DropDown';

export interface ProductDetailHeaderProps {
  productName: string;
  purchaseCount: number;
  price: number;
  quantityOptions?: Option[];
  onQuantityChange?: (option: Option) => void;
  onMenuClick?: () => void;
  onAddToCart?: () => void;
  className?: string;
}

export const DEFAULT_QUANTITY_OPTIONS: Option[] = [
  { key: '1', label: '1개' },
  { key: '2', label: '2개' },
  { key: '3', label: '3개' },
  { key: '4', label: '4개' },
  { key: '5', label: '5개' },
];

type InternalHeaderProps = Pick<
  ProductDetailHeaderProps,
  | 'productName'
  | 'purchaseCount'
  | 'price'
  | 'quantityOptions'
  | 'onQuantityChange'
  | 'onMenuClick'
  | 'onAddToCart'
> & {
  quantity: number;
};

interface QuantitySelectorProps {
  quantityOptions: Option[];
  onQuantityChange?: (option: Option) => void;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantityOptions,
  onQuantityChange,
  value,
  defaultValue,
  min = 1,
  max = 999,
}) => {
  const [quantity, setQuantity] = useState<number | null>(defaultValue ?? null);

  // Sync external value
  useEffect(() => {
    if (value !== undefined) {
      setQuantity(value);
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    if (inputValue === '') {
      setQuantity(null);
      return;
    }

    const parsed = Number(inputValue);
    if (Number.isNaN(parsed)) return;

    let next = parsed;
    if (next < min) next = min;
    if (next > max) next = max;

    setQuantity(next);

    const matchedOption = quantityOptions.find((opt) => Number(opt.key) === next) ?? {
      key: String(next),
      label: `${next}개`,
    };

    onQuantityChange?.(matchedOption);
  };

  const handleBlur = () => {
    if (quantity === null || quantity < min) {
      const fallback = min;
      setQuantity(fallback);
      onQuantityChange?.({
        key: String(fallback),
        label: `${fallback}개`,
      });
    }
  };

  const displayValue = value !== undefined ? value : quantity;

  return (
    <input
      type="number"
      min={min}
      max={max}
      value={displayValue ?? ''}
      onChange={handleInputChange}
      onBlur={handleBlur}
      placeholder="수량"
      className={clsx(
        'w-80 h-40 px-12 text-center border border-gray-300 rounded-8',
        'font-sans font-normal text-16 tracking--0.4 text-gray-950',
        'focus:outline-none focus:border-gray-500',
        'appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
        'placeholder:text-gray-500'
      )}
      aria-label="수량 입력"
    />
  );
};

export const DesktopTabletProductDetailHeader: React.FC<InternalHeaderProps> = ({
  productName,
  purchaseCount,
  price,
  quantityOptions = DEFAULT_QUANTITY_OPTIONS,
  onQuantityChange,
  onMenuClick: _onMenuClick,
  onAddToCart,
  quantity,
}) => (
  <div className="hidden tablet:flex">
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-start justify-between">
        <ProductTile
          variant="product"
          name={productName}
          price={price}
          purchaseCount={purchaseCount}
          size="md"
        />

        <div className="flex items-start gap-8">
          <QuantitySelector
            quantityOptions={quantityOptions}
            onQuantityChange={onQuantityChange}
            value={quantity}
          />
          <ItemMenu />
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
  quantityOptions = DEFAULT_QUANTITY_OPTIONS,
  onQuantityChange,
  onMenuClick: _onMenuClick,
  onAddToCart,
  quantity,
}) => (
  <div className="flex tablet:hidden w-full">
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
          <QuantitySelector
            quantityOptions={quantityOptions}
            onQuantityChange={onQuantityChange}
            value={quantity}
          />
          <ItemMenu />
        </div>
      </div>

      <Button variant="primary" size="lg" fullWidth className="mt-32" onClick={onAddToCart}>
        장바구니 담기
      </Button>
    </div>
  </div>
);

const ProductDetailHeader: React.FC<ProductDetailHeaderProps> = ({
  productName,
  purchaseCount,
  price,
  quantityOptions = DEFAULT_QUANTITY_OPTIONS,
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
        quantityOptions={quantityOptions}
        onQuantityChange={handleQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
        quantity={quantity}
      />

      <DesktopTabletProductDetailHeader
        productName={productName}
        purchaseCount={purchaseCount}
        price={totalPrice}
        quantityOptions={quantityOptions}
        onQuantityChange={handleQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
        quantity={quantity}
      />
    </div>
  );
};

export default ProductDetailHeader;

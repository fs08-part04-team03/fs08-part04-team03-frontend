'use client';

import { useState, useEffect } from 'react';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { clsx } from '@/utils/clsx';
import Button from '@/components/atoms/Button/Button';

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
>;

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

  // Sync with external value changes
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
    if (Number.isNaN(parsed)) {
      return;
    }

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

  // Use controlled value if provided, otherwise use internal state
  const displayValue = value !== undefined ? value : quantity;

  return (
    <input
      type="number"
      min={min}
      max={max}
      value={displayValue ?? ''}
      onChange={handleInputChange}
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
  onMenuClick,
  onAddToCart,
}) => (
  <div className="hidden tablet:flex">
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-8">
            <h1 className="font-normal text-18 leading-26 tracking--0.45 text-gray-950">
              {productName}
            </h1>
            <p className="font-bold text-14 leading-24 tracking--0.35 text-secondary-500">
              {purchaseCount}회 구매
            </p>
          </div>
          <div className="flex flex-col items-start font-bold text-18 leading-26 tracking--0.45 text-gray-950">
            {price.toLocaleString('ko-KR')}원
          </div>
        </div>

        <div className="flex items-start gap-8">
          <QuantitySelector quantityOptions={quantityOptions} onQuantityChange={onQuantityChange} />
          <IconButton variant="default" size="md" onClick={onMenuClick} aria-label="메뉴 열기">
            <img src="/icons/kebab-vertical.svg" alt="메뉴" className="w-24 h-24" />
          </IconButton>
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
  onMenuClick,
  onAddToCart,
}) => (
  <div className="flex tablet:hidden w-full">
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-start justify-between gap-8">
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <h1 className="font-normal text-16 leading-24 tracking--0.4 text-gray-950">
            {productName}
          </h1>
          <p className="font-bold text-12 leading-18 tracking--0.3 text-secondary-500">
            {purchaseCount}회 구매
          </p>
          <p className="font-bold text-16 leading-24 tracking--0.4 text-gray-950">
            {price.toLocaleString('ko-KR')}원
          </p>
        </div>
        <div className="flex items-start gap-8 shrink-0">
          <QuantitySelector quantityOptions={quantityOptions} onQuantityChange={onQuantityChange} />
          <IconButton variant="default" size="md" onClick={onMenuClick} aria-label="메뉴 열기">
            <img src="/icons/kebab-vertical.svg" alt="메뉴" className="w-24 h-24" />
          </IconButton>
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
}) => (
  <div className={clsx('flex flex-col gap-8', className)}>
    <MobileProductDetailHeader
      productName={productName}
      purchaseCount={purchaseCount}
      price={price}
      quantityOptions={quantityOptions}
      onQuantityChange={onQuantityChange}
      onMenuClick={onMenuClick}
      onAddToCart={onAddToCart}
    />
    <DesktopTabletProductDetailHeader
      productName={productName}
      purchaseCount={purchaseCount}
      price={price}
      quantityOptions={quantityOptions}
      onQuantityChange={onQuantityChange}
      onMenuClick={onMenuClick}
      onAddToCart={onAddToCart}
    />
  </div>
);

export default ProductDetailHeader;

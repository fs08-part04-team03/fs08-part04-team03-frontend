'use client';

import { useState } from 'react';
import { clsx } from '@/utils/clsx';
import Button from '@/components/atoms/Button/Button';
import ItemMenu from '@/components/molecules/ItemMenu/ItemMenu';
import ProductTile from '@/components/molecules/ProductTile/ProductTile';
import { NumberInput } from '@/components/molecules/NumberInput/NumberInput';
import PriceText from '@/components/atoms/PriceText/PriceText';

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

// 모바일 레이아웃 (purchaseCount가 productName 바로 다음)
const ProductDetailHeaderMobile: React.FC<InternalHeaderProps> = ({
  productName,
  purchaseCount,
  price,
  onQuantityChange,
  onMenuClick,
  onAddToCart,
  quantity,
}) => (
  <div className="flex tablet:hidden w-full">
    <div className="flex w-full flex-col gap-8">
      {/* 상단: 상품명/구매횟수 + 수량 영역 */}
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
          <ItemMenu onClick={onMenuClick} />
        </div>
      </div>

      {/* 가격 */}
      <PriceText
        value={price}
        className="text-16 leading-24 tracking--0.4 font-bold text-gray-950"
      />

      {/* 장바구니 담기 버튼 */}
      <Button variant="primary" size="lg" fullWidth className="mt-32" onClick={onAddToCart}>
        장바구니 담기
      </Button>
    </div>
  </div>
);

// 태블릿 레이아웃 (데스크탑과 동일한 ProductTile 구조)
const ProductDetailHeaderTablet: React.FC<InternalHeaderProps> = ({
  productName,
  purchaseCount,
  price,
  onQuantityChange,
  onMenuClick,
  onAddToCart,
  quantity,
}) => (
  <div className="hidden tablet:flex desktop:hidden w-full">
    <div className="flex w-full flex-col gap-8">
      {/* 상단: 상품 정보 + 수량 영역 (ProductTile 사용) */}
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

      {/* 장바구니 담기 버튼 */}
      <Button variant="primary" size="lg" fullWidth className="mt-32" onClick={onAddToCart}>
        장바구니 담기
      </Button>
    </div>
  </div>
);

// 데스크탑 레이아웃 (2컬럼 헤더 구조)
const ProductDetailHeaderDesktop: React.FC<InternalHeaderProps> = ({
  productName,
  purchaseCount,
  price,
  onQuantityChange,
  onMenuClick,
  onAddToCart,
  quantity,
}) => (
  <div className="hidden desktop:flex w-full">
    <div className="flex w-full flex-col gap-8">
      {/* 상단: 상품 정보 + 수량 영역 (ProductTile 사용) */}
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

      {/* 장바구니 담기 버튼 */}
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
      {/* 모바일 */}
      <ProductDetailHeaderMobile
        productName={productName}
        purchaseCount={purchaseCount}
        price={totalPrice}
        onQuantityChange={handleQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
        quantity={quantity}
      />

      {/* 태블릿 */}
      <ProductDetailHeaderTablet
        productName={productName}
        purchaseCount={purchaseCount}
        price={totalPrice}
        onQuantityChange={handleQuantityChange}
        onMenuClick={onMenuClick}
        onAddToCart={onAddToCart}
        quantity={quantity}
      />

      {/* 데스크탑 */}
      <ProductDetailHeaderDesktop
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

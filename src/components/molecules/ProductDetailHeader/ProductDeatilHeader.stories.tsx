import Button from '@/components/atoms/Button/Button';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';

import ProductDetailHeader from './ProductDetailHeader';

const meta = {
  title: 'Molecules/ProductDetailHeader',
  component: ProductDetailHeader,
  tags: ['autodocs'],
  argTypes: {
    productName: {
      control: 'text',
      description: '제품명',
    },
    purchaseCount: {
      control: 'number',
      description: '구매 횟수',
    },
    price: {
      control: 'number',
      description: '제품 가격',
    },
    quantityOptions: {
      control: 'object',
      description: '수량 선택 옵션',
    },
    onQuantityChange: {
      action: 'quantity-changed',
      description: '수량 변경 시 호출되는 콜백 함수',
    },
    onMenuClick: {
      action: 'menu-clicked',
      description: '케밥 메뉴 클릭 시 호출되는 콜백 함수',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof ProductDetailHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    productName: '프리미엄 무선 이어폰',
    purchaseCount: 42,
    price: 129000,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    layout: 'padded',
  },
};

const MobileProductDetailHeaderComponent = ({
  productName,
  purchaseCount,
  price,
}: {
  productName: string;
  purchaseCount: number;
  price: number;
}) => {
  const [quantity, setQuantity] = useState<number | null>(null);

  return (
    <div className="flex w-full">
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
            <input
              type="number"
              min={1}
              max={999}
              value={quantity ?? ''}
              onChange={(e) => {
                const { value } = e.target;
                if (value === '') {
                  setQuantity(null);
                  return;
                }
                const parsed = Number(value);
                if (!Number.isNaN(parsed)) {
                  setQuantity(Math.min(Math.max(parsed, 1), 999));
                }
              }}
              placeholder="수량"
              className="w-80 h-40 px-12 text-center border border-gray-300 rounded-8 font-sans font-normal text-16 tracking--0.4 text-gray-950 focus:outline-none focus:border-gray-500 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none placeholder:text-gray-500"
              aria-label="수량 입력"
            />
            <IconButton variant="default" size="md" aria-label="메뉴 열기">
              <img src="/icons/kebab-vertical.svg" alt="메뉴" className="w-24 h-24" />
            </IconButton>
          </div>
        </div>
        <Button variant="primary" size="lg" fullWidth className="mt-32">
          장바구니 담기
        </Button>
      </div>
    </div>
  );
};

export const Mobile: Story = {
  render: (args) => (
    <div
      style={{
        width: '375px',
        maxWidth: '100%',
        margin: '0 auto',
        padding: '16px',
      }}
    >
      <MobileProductDetailHeaderComponent
        productName={args.productName}
        purchaseCount={args.purchaseCount}
        price={args.price}
      />
    </div>
  ),
  args: {
    productName: '프리미엄 무선 이어폰',
    purchaseCount: 42,
    price: 129000,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { OrderItemCard } from './OrderItemCard';

const meta = {
  title: 'Molecules/OrderItemCard',
  component: OrderItemCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '주문 상품 카드 컴포넌트입니다. 제품 이미지, 제품 정보(이름, 단가), 수량 선택기, 총 가격, 즉시 구매 버튼을 포함합니다.',
      },
    },
  },
  argTypes: {
    onQuantityChange: {
      action: 'quantity-changed',
    },
    onPurchaseClick: {
      action: 'purchase-clicked',
    },
  },
} satisfies Meta<typeof OrderItemCard>;

export default meta;

type Story = StoryObj<typeof OrderItemCard>;

export const Default: Story = {
  render: (args) => {
    const [quantity, setQuantity] = useState(args.quantity ?? 1);

    return (
      <OrderItemCard
        name={args.name}
        unitPrice={args.unitPrice}
        quantity={quantity}
        totalPrice={args.totalPrice}
        shippingCost={args.shippingCost}
        imageSrc={args.imageSrc}
        imageAlt={args.imageAlt}
        onQuantityChange={(option) => {
          setQuantity(Number(option.key));
          args.onQuantityChange?.(option);
        }}
        onPurchaseClick={args.onPurchaseClick}
        className={args.className}
      />
    );
  },
  args: {
    name: '코카콜라 제로',
    unitPrice: 2000,
    quantity: 1,
    totalPrice: 2000,
    shippingCost: 0,
    imageSrc: '/images/test-profile-image.jpg',
  },
};

export const WithoutImage: Story = {
  render: (args) => {
    const [quantity, setQuantity] = useState(args.quantity ?? 1);

    return (
      <OrderItemCard
        name={args.name}
        unitPrice={args.unitPrice}
        quantity={quantity}
        totalPrice={args.totalPrice}
        shippingCost={args.shippingCost}
        imageSrc={args.imageSrc}
        imageAlt={args.imageAlt}
        onQuantityChange={(option) => {
          setQuantity(Number(option.key));
          args.onQuantityChange?.(option);
        }}
        onPurchaseClick={args.onPurchaseClick}
        className={args.className}
      />
    );
  },
  args: {
    name: '코카콜라 제로',
    unitPrice: 2000,
    quantity: 1,
    totalPrice: 2000,
    shippingCost: 0,
  },
};

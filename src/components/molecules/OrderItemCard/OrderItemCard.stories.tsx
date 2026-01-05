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
          '주문 상품 카드 컴포넌트입니다. variant에 따라 다른 레이아웃을 제공합니다.\n\n- `default`: 체크박스, 이미지, 제목, 금액, 배송비, NumberInput, 총 금액, 즉시 구매 버튼\n- `confirm`: 이미지, 제목, 금액, 수량, 금액',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'confirm'],
      description: '카드 variant 타입',
    },
    onQuantityChange: {
      action: 'quantity-changed',
    },
    onPurchaseClick: {
      action: 'purchase-clicked',
    },
    onCheckboxChange: {
      action: 'checkbox-changed',
    },
  },
} satisfies Meta<typeof OrderItemCard>;

export default meta;

type Story = StoryObj<typeof OrderItemCard>;

export const Default: Story = {
  render: (args) => {
    const [quantity, setQuantity] = useState(args.quantity ?? 1);
    const [checked, setChecked] = useState(false);

    return (
      <OrderItemCard
        variant={args.variant}
        name={args.name}
        unitPrice={args.unitPrice}
        quantity={quantity}
        shippingCost={args.shippingCost}
        shippingLabelText={args.shippingLabelText}
        imageSrc={args.imageSrc}
        checked={checked}
        onCheckboxChange={(newChecked) => {
          setChecked(newChecked);
          args.onCheckboxChange?.(newChecked);
        }}
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
    variant: 'default',
    name: '코카콜라 제로',
    unitPrice: 2000,
    quantity: 1,
    shippingCost: 0,
  },
};

export const Confirm: Story = {
  render: (args) => (
    <OrderItemCard
      variant={args.variant}
      name={args.name}
      unitPrice={args.unitPrice}
      quantity={args.quantity}
      imageSrc={args.imageSrc}
      className={args.className}
    />
  ),
  args: {
    variant: 'confirm',
    name: '코카콜라 제로',
    unitPrice: 2000,
    quantity: 3,
  },
};

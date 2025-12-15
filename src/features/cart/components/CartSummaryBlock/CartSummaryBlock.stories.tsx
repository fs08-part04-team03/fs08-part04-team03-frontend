'use client';

import type { Meta, StoryObj } from '@storybook/nextjs';
import CartSummaryBlock from './CartSummaryBlock';

const meta: Meta<typeof CartSummaryBlock> = {
  title: 'Organisms/CartSummaryBlock',
  component: CartSummaryBlock,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onDeleteSelected: { action: 'onDeleteSelected' },
    onSubmit: { action: 'onSubmit' },
  },
};

export default meta;

type Story = StoryObj<typeof CartSummaryBlock>;

export const Default: Story = {
  args: {
    budget: 500000,
    items: [
      {
        id: 1,
        name: '무선 키보드',
        unitPrice: 120000,
        quantity: 1,
        shippingCost: 3000,
        imageSrc: '/images/zero-cola.svg',
      },
      {
        id: 2,
        name: '무선 마우스',
        unitPrice: 80000,
        quantity: 1,
        shippingCost: 3000,
        imageSrc: '/images/zero-cola.svg',
      },
      {
        id: 3,
        name: '노트북 파우치',
        unitPrice: 35000,
        quantity: 2,
        shippingCost: 3000,
        imageSrc: '/images/zero-cola.svg',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    budget: 300000,
    items: [],
  },
};

export const LowBudget: Story = {
  args: {
    budget: 100000,
    items: [
      {
        id: 1,
        name: '기계식 키보드',
        unitPrice: 150000,
        quantity: 1,
        shippingCost: 5000,
        imageSrc: '/images/zero-cola.svg',
      },
    ],
  },
};

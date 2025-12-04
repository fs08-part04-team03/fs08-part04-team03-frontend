import type { Meta, StoryObj } from '@storybook/nextjs';
import ProductTile from './ProductTile';

const meta = {
  title: 'Molecules/ProductTile',
  component: ProductTile,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ProductTile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Product: Story = {
  args: {
    variant: 'product',
    name: '코카콜라',
    price: 2000,
    purchaseCount: 29,
  },
};

export const ProductWithoutCount: Story = {
  args: {
    variant: 'product',
    name: '새우깡',
    price: 1500,
  },
};

export const Order: Story = {
  args: {
    variant: 'order',
    name: '새우깡',
    price: 1500,
    quantity: 2,
  },
};

export const OrderWithShipping: Story = {
  args: {
    variant: 'order',
    name: '새우깡',
    price: 1500,
    shippingFee: 3000,
  },
};

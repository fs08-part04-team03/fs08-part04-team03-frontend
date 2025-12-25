import type { Meta, StoryObj } from '@storybook/nextjs';
import ProductCard from './ProductCard';

const meta = {
  title: 'Molecules/ProductCard',
  component: ProductCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof ProductCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/* =========================
 * Product (기본 카드)
 * ========================= */
export const Product: Story = {
  args: {
    variant: 'product',
    name: '코카콜라',
    price: 3500,
    purchaseCount: 24,
  },
};

/* =========================
 * Wishlist 카드
 * - mobile: 동일
 * - tablet: w-219
 * - desktop: w-373
 * ========================= */
export const Wishlist: Story = {
  args: {
    variant: 'wishlist',
    name: '코카콜라',
    price: 3500,
    purchaseCount: 24,
  },
};

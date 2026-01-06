import type { Meta, StoryObj } from '@storybook/nextjs';
import ProductCardSkeleton from './ProductCardSkeleton';

const meta = {
  title: 'Molecules/ProductCardSkeleton',
  component: ProductCardSkeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['product', 'order', 'wishlist'],
      description: '카드 타입 (product: 상품 카드, order: 주문 카드, wishlist: 위시리스트 카드)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof ProductCardSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Product: Story = {
  args: {
    variant: 'product',
  },
};

export const Order: Story = {
  args: {
    variant: 'order',
  },
};

export const Wishlist: Story = {
  args: {
    variant: 'wishlist',
  },
};

export const MultipleProducts: Story = {
  render: () => (
    <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-3 gap-x-16 tablet:gap-x-14 desktop:gap-x-40 gap-y-40 tablet:gap-y-50 desktop:gap-y-60">
      <ProductCardSkeleton variant="product" />
      <ProductCardSkeleton variant="product" />
      <ProductCardSkeleton variant="product" />
      <ProductCardSkeleton variant="product" />
      <ProductCardSkeleton variant="product" />
      <ProductCardSkeleton variant="product" />
    </div>
  ),
};

export const MultipleWishlist: Story = {
  render: () => (
    <div className="grid grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-3 gap-x-16 tablet:gap-x-14 desktop:gap-x-40 gap-y-40 tablet:gap-y-50 desktop:gap-y-60">
      <ProductCardSkeleton variant="wishlist" />
      <ProductCardSkeleton variant="wishlist" />
      <ProductCardSkeleton variant="wishlist" />
      <ProductCardSkeleton variant="wishlist" />
      <ProductCardSkeleton variant="wishlist" />
      <ProductCardSkeleton variant="wishlist" />
    </div>
  ),
};

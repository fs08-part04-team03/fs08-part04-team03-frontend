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

export const Default: Story = {
  args: {
    variant: 'product',
    name: '코카콜라',
    price: 3500,
    purchaseCount: 24,
  },
};

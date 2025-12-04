import type { Meta, StoryObj } from '@storybook/nextjs';
import Breadcrumb from './Breadcrumb';

const meta = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: '카테고리 계층 아이템 배열',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

// 대분류만
export const MainCategoryOnly: Story = {
  args: {
    items: [{ label: '스낵' }],
  },
};

// 대분류 > 중분류
export const WithSubCategory: Story = {
  args: {
    items: [{ label: '스낵', href: '/products?category=1' }, { label: '과자' }],
  },
};

// 음료 > 청량/탄산음료
export const Beverage: Story = {
  args: {
    items: [{ label: '음료', href: '/products?category=2' }, { label: '청량 ∙ 탄산 음료' }],
  },
};

// 간편식 > 컵라면
export const SimpleFood: Story = {
  args: {
    items: [{ label: '간편식', href: '/products?category=4' }, { label: '컵라면' }],
  },
};

// 신선식품 > 샐러드
export const FreshFood: Story = {
  args: {
    items: [{ label: '신선식품', href: '/products?category=5' }, { label: '샐러드' }],
  },
};

// 원두커피 > 드립커피
export const Coffee: Story = {
  args: {
    items: [{ label: '원두커피', href: '/products?category=6' }, { label: '드립커피' }],
  },
};

// 비품 > 일회용품(친환경)
export const Supplies: Story = {
  args: {
    items: [{ label: '비품', href: '/products?category=7' }, { label: '일회용품 (친환경)' }],
  },
};

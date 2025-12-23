import type { Meta, StoryObj } from '@storybook/nextjs';
import ProductDetailHeader from './ProductDetailHeader';

const meta = {
  title: 'Molecules/ProductDetailHeader',
  component: ProductDetailHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
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
      description: '제품 단가 (1개 가격)',
    },
    type: {
      control: 'radio',
      options: ['default', 'simple'],
      description: '헤더 타입 (simple일 경우 ItemMenu 숨김)',
    },
    onQuantityChange: {
      action: 'quantity-changed',
      description: '수량 변경 시 호출되는 콜백 함수',
    },
    onMenuClick: {
      action: 'menu-clicked',
      description: '케밥 메뉴 클릭 시 호출되는 콜백 함수',
    },
    onAddToCart: {
      action: 'add-to-cart',
      description: '장바구니 담기 버튼 클릭 시 호출되는 콜백 함수',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof ProductDetailHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

/** =====================
 * Default (ItemMenu 표시)
 ====================== */
export const Default: Story = {
  args: {
    productName: '코카콜라',
    purchaseCount: 29,
    price: 2000,
    type: 'default',
    onMenuClick: (action) => {
      console.log('menu action:', action);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 타입입니다. 모바일/태블릿/데스크탑에서 ItemMenu가 표시되며, 수량 변경 시 총 금액이 자동 계산됩니다.',
      },
    },
  },
};

/** =====================
 * Simple (ItemMenu 숨김)
 ====================== */
export const Simple: Story = {
  args: {
    productName: '코카콜라',
    purchaseCount: 29,
    price: 2000,
    type: 'simple',
    onMenuClick: (action) => {
      console.log('menu action:', action);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'simple 타입입니다. ItemMenu가 숨겨지고 수량 선택과 장바구니 기능만 제공합니다.',
      },
    },
  },
};

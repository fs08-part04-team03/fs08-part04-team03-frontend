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

export const Default: Story = {
  args: {
    productName: '코카콜라',
    purchaseCount: 29,
    price: 2000,
  },
  parameters: {
    docs: {
      description: {
        story:
          '모바일/태블릿과 데스크탑에서 자동으로 적절한 레이아웃을 보여줍니다. 수량 변경 시 총 금액이 자동으로 계산됩니다.',
      },
    },
  },
};

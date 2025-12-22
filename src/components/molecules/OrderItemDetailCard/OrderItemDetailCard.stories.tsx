import type { Meta, StoryObj } from '@storybook/nextjs';
import OrderItemDetailCard from './OrderItemDetailCard';

const meta = {
  title: 'Molecules/OrderItemDetailCard',
  component: OrderItemDetailCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '주문 상품 상세 카드 컴포넌트입니다. 이미지, 제목, 단가, 수량, 총 금액을 표시합니다. 반응형으로 모바일, 태블릿, 데스크탑에 맞게 자동으로 레이아웃이 변경됩니다.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: '상품명',
    },
    unitPrice: {
      control: 'number',
      description: '단가',
    },
    quantity: {
      control: 'number',
      description: '수량',
    },
    imageSrc: {
      control: 'text',
      description: '이미지 URL',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof OrderItemDetailCard>;

export default meta;

type Story = StoryObj<typeof OrderItemDetailCard>;

export const Default: Story = {
  args: {
    name: '코카콜라 제로',
    unitPrice: 1900,
    quantity: 2,
    imageSrc: '/images/zero-cola.svg',
  },
};

export const WithoutImage: Story = {
  args: {
    name: '펩시 콜라',
    unitPrice: 2000,
    quantity: 1,
  },
};

export const MultipleQuantity: Story = {
  args: {
    name: '스프라이트',
    unitPrice: 1500,
    quantity: 5,
    imageSrc: '/images/zero-cola.svg',
  },
};

export const HighPrice: Story = {
  args: {
    name: '프리미엄 상품',
    unitPrice: 50000,
    quantity: 3,
    imageSrc: '/images/zero-cola.svg',
  },
};

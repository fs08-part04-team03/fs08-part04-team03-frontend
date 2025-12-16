import type { Meta, StoryObj } from '@storybook/nextjs';
import DetailPageLayout from './DetailPageLayout';

const meta = {
  title: 'Organisms/DetailPageLayout',
  component: DetailPageLayout,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    breadcrumbItems: {
      control: 'object',
      description: 'Breadcrumb에 표시될 아이템 배열',
    },
    productImage: {
      control: 'object',
      description: '상품 이미지 정보',
    },
    productDetailHeader: {
      control: 'object',
      description: 'ProductDetailHeader에 전달될 props',
    },
    accordionPanels: {
      control: 'object',
      description: 'AccordionPanel 배열',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof DetailPageLayout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    breadcrumbItems: [
      { label: '음료', href: '/products?category=2' },
      { label: '청량 ∙ 탄산 음료' },
    ],
    productImage: {
      src: '/images/zero-cola.svg',
      alt: '제로 콜라',
    },
    productDetailHeader: {
      productName: '코카콜라 제로',
      purchaseCount: 29,
      price: 2000,
      onQuantityChange: () => {},
      onMenuClick: () => {},
      onAddToCart: () => {},
    },
    accordionPanels: [
      {
        label: '상품 정보',
        content: '코카콜라 제로는 설탕 없이 콜라의 맛을 즐길 수 있는 제로 칼로리 음료입니다.',
      },
      {
        label: '배송 정보',
        content: '배송은 평일 기준 2-3일 소요됩니다.',
        subContent: '제주도 및 도서산간 지역은 추가 배송비가 발생할 수 있습니다.',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          '상품 상세 페이지의 기본 레이아웃입니다. 상단 Breadcrumb, 좌측 상품 이미지, 우측 상품 정보와 아코디언 패널로 구성됩니다.',
      },
    },
  },
};

export const WithoutImage: Story = {
  args: {
    breadcrumbItems: [
      { label: '음료', href: '/products?category=2' },
      { label: '청량 ∙ 탄산 음료' },
    ],
    productDetailHeader: {
      productName: '스프라이트',
      purchaseCount: 15,
      price: 1800,
      onQuantityChange: () => {},
      onMenuClick: () => {},
      onAddToCart: () => {},
    },
    accordionPanels: [
      {
        label: '상품 정보',
        content: '상품 이미지가 없는 경우 플레이스홀더가 표시됩니다.',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '상품 이미지가 없는 경우의 레이아웃입니다.',
      },
    },
  },
};

export const MultipleAccordionPanels: Story = {
  args: {
    breadcrumbItems: [{ label: '간편식', href: '/products?category=4' }, { label: '컵라면' }],
    productImage: {
      src: '/images/zero-cola.svg',
      alt: '신라면',
    },
    productDetailHeader: {
      productName: '신라면 컵라면',
      purchaseCount: 42,
      price: 1500,
      onQuantityChange: () => {},
      onMenuClick: () => {},
      onAddToCart: () => {},
    },
    accordionPanels: [
      {
        label: '상품 정보',
        content: '신라면 컵라면은 매콤한 맛이 특징인 인기 컵라면입니다.',
      },
      {
        label: '영양 정보',
        content: '칼로리: 530kcal',
        subContent: '나트륨: 1,980mg',
      },
      {
        label: '배송 정보',
        content: '배송은 평일 기준 2-3일 소요됩니다.',
      },
      {
        label: '교환/반품 안내',
        content: '상품 수령 후 7일 이내 교환/반품이 가능합니다.',
        subContent: '단, 개봉된 상품은 교환/반품이 불가능합니다.',
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: '여러 개의 아코디언 패널이 있는 경우의 레이아웃입니다.',
      },
    },
  },
};

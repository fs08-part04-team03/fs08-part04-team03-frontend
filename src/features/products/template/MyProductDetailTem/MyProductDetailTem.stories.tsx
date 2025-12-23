import type { Meta, StoryObj } from '@storybook/nextjs';

import type { CategoryPanelSection } from '@/components/organisms/CategoryPanel/CategoryPanel';
import type { DetailPageLayoutProps } from '@/components/organisms/DetailPageLayout/DetailPageLayout';
import MyProductDetailTem from './MyProductDetailTem';

/* =====================
 * Mock Data
 ====================== */
const mockCategorySections: CategoryPanelSection[] = [
  {
    id: 1,
    title: '음료',
    options: [
      { value: 101, label: '탄산음료', count: 12 },
      { value: 102, label: '과즙음료', count: 8 },
      { value: 103, label: '에너지음료', count: 5 },
      { value: 104, label: '이온음료', count: 6 },
      { value: 105, label: '건강음료', count: 3 },
      { value: 106, label: '차류', count: 9 },
    ],
  },
  {
    id: 2,
    title: '스낵',
    options: [
      { value: 201, label: '과자', count: 15 },
      { value: 202, label: '쿠키', count: 10 },
      { value: 203, label: '비스켓류', count: 7 },
      { value: 204, label: '초콜릿류', count: 12 },
      { value: 205, label: '캔디류', count: 8 },
      { value: 206, label: '젤리류', count: 5 },
      { value: 207, label: '시리얼바', count: 6 },
      { value: 208, label: '견과류', count: 9 },
    ],
  },
];

const mockDetailPageProps: DetailPageLayoutProps = {
  breadcrumbItems: [{ label: '음료' }, { label: '탄산음료' }],
  productImage: {
    src: '/images/zero-cola.svg',
    alt: '코카콜라 제로',
  },
  productDetailHeader: {
    productName: '코카콜라 제로',
    purchaseCount: 1234,
    price: 2000,
    onQuantityChange: () => {},
    onMenuClick: (action) => {
      console.log('menu action:', action);
    },
    onAddToCart: () => {},
  },
};

/* =====================
 * Meta
 ====================== */
const meta: Meta<typeof MyProductDetailTem> = {
  title: 'Features/Products/Template/MyProductDetailTem',
  component: MyProductDetailTem,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'MyProductDetailTem 컴포넌트는 상품 상세 페이지 템플릿입니다. ' +
          '카테고리 패널, 제품 이미지, 제품 상세 헤더, ItemMenu, 수정/삭제 모달 등을 포함합니다. ' +
          'breadcrumbItems를 통해 상세 페이지 내 위치를 표시하며, headerType에 따라 ItemMenu 표시 여부를 제어할 수 있습니다.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyProductDetailTem>;

/* =====================
 * ItemMenu OFF
 ====================== */
export const WithoutItemMenu: Story = {
  args: {
    categorySections: mockCategorySections,
    detailPageProps: mockDetailPageProps,
    headerType: 'simple', // simple일 때 ItemMenu 표시 X
  },
  parameters: {
    docs: {
      description: {
        story:
          'breadcrumb는 "음료 > 탄산음료"로 고정되며, headerType이 simple일 때 ItemMenu가 표시되지 않습니다.',
      },
    },
  },
};

/* =====================
 * ItemMenu ON
 ====================== */
export const WithItemMenu: Story = {
  args: {
    categorySections: mockCategorySections,
    detailPageProps: mockDetailPageProps,
    headerType: 'default', // default일 때 ItemMenu 표시
  },
  parameters: {
    docs: {
      description: {
        story:
          'breadcrumb는 "음료 > 탄산음료"로 고정되며, headerType이 default일 때 ItemMenu가 표시됩니다. ' +
          'ItemMenu 클릭 시 상품 수정/삭제 모달이 작동합니다.',
      },
    },
  },
};

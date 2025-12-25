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
  argTypes: {
    productRole: {
      control: 'radio',
      options: ['user', 'manager', 'admin'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof MyProductDetailTem>;

/* =====================
 * User (ItemMenu OFF)
 ====================== */
export const User: Story = {
  args: {
    productRole: 'user',
    categorySections: mockCategorySections,
    detailPageProps: mockDetailPageProps,
  },
};

/* =====================
 * Manager (ItemMenu ON)
 ====================== */
export const Manager: Story = {
  args: {
    productRole: 'manager',
    categorySections: mockCategorySections,
    detailPageProps: mockDetailPageProps,
  },
};

/* =====================
 * Admin (ItemMenu ON)
 ====================== */
export const Admin: Story = {
  args: {
    productRole: 'admin',
    categorySections: mockCategorySections,
    detailPageProps: mockDetailPageProps,
  },
};

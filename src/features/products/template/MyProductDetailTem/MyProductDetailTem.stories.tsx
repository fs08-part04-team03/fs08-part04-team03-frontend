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
  {
    id: 3,
    title: '생수',
    options: [
      { value: 301, label: '생수', count: 20 },
      { value: 302, label: '스파클링', count: 7 },
    ],
  },
  {
    id: 4,
    title: '간편식',
    options: [
      { value: 401, label: '컵라면', count: 14 },
      { value: 402, label: '소시지', count: 6 },
      { value: 403, label: '계란', count: 10 },
      { value: 404, label: '컵밥류', count: 8 },
      { value: 405, label: '시리얼', count: 5 },
    ],
  },
  {
    id: 5,
    title: '신선식',
    options: [
      { value: 501, label: '과일', count: 12 },
      { value: 502, label: '샐러드', count: 7 },
      { value: 503, label: '빵', count: 9 },
      { value: 504, label: '샌드위치', count: 6 },
      { value: 505, label: '요거트류', count: 4 },
      { value: 506, label: '유제품', count: 10 },
    ],
  },
  {
    id: 6,
    title: '원두커피',
    options: [
      { value: 601, label: '드립커피', count: 8 },
      { value: 602, label: '원두', count: 5 },
      { value: 603, label: '캡슐커피', count: 7 },
    ],
  },
  {
    id: 7,
    title: '비품',
    options: [
      { value: 701, label: '일회용품', count: 12 },
      { value: 702, label: '사무용품', count: 6 },
      { value: 703, label: '청소용품', count: 4 },
      { value: 704, label: '위생용품', count: 9 },
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
    onMenuClick: () => {},
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
    canUseMenu: {
      control: 'boolean',
      description: 'ItemMenu 사용 가능 여부 (manager 이상)',
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
    canUseMenu: false,
    categorySections: mockCategorySections,
    detailPageProps: mockDetailPageProps,
  },
};

/* =====================
 * Manager (ItemMenu ON)
 ====================== */
export const Manager: Story = {
  args: {
    canUseMenu: true,
    categorySections: mockCategorySections,
    detailPageProps: mockDetailPageProps,
  },
};

/* =====================
 * Admin (ItemMenu ON)
 ====================== */
export const Admin: Story = {
  args: {
    canUseMenu: true,
    categorySections: mockCategorySections,
    detailPageProps: mockDetailPageProps,
  },
};

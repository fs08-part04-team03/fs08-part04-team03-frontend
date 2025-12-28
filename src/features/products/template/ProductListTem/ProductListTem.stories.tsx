import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState, useMemo } from 'react';

import type { CategoryPanelSection } from '@/components/organisms/CategoryPanel/CategoryPanel';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import type { BreadcrumbItem } from '@/components/molecules/Breadcrumb/Breadcrumb';
import ProductListTem from './ProductListTem';

/** =====================
 * Categories
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

/** =====================
 * Mock Data
 ====================== */
const breadcrumbItems: BreadcrumbItem[] = [{ label: '홈', href: '/' }, { label: '상품' }];

const sortOptions: Option[] = [
  { key: 'latest', label: '최신순' },
  { key: 'sell', label: '판매순' },
  { key: 'price-asc', label: '낮은 가격순' },
  { key: 'price-desc', label: '높은 가격순' },
];

const mockProducts = Array.from({ length: 12 }).map((_, index) => ({
  id: index + 1,
  name: `상품 ${index + 1}`,
  price: 1500 + index * 300,
  purchaseCount: 50 + index * 5,
  imageUrl: `/images/zero-cola.svg`,
  categoryId: [101, 102, 103, 201, 202, 301, 401, 501, 601, 701][index % 10],
}));

const sodaProducts = Array.from({ length: 30 }).map((_, index) => ({
  id: mockProducts.length + index + 1,
  name: `탄산음료 ${index + 1}`,
  price: 1000 + index * 200,
  purchaseCount: 20 + index * 3,
  imageUrl: `/images/zero-cola.svg`,
  categoryId: 101,
}));

const allProducts = [...mockProducts, ...sodaProducts];

/** =====================
 * Meta
 ====================== */
const meta: Meta<typeof ProductListTem> = {
  title: 'Features/Products/Template/ProductListTem',
  component: ProductListTem,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof ProductListTem>;

/** =====================
 * Template
 ====================== */
const Template = ({
  categorySections,
  breadcrumbItems: breadcrumbItemsProp,
  sortOptions: sortOptionsProp,
  products,
}: {
  categorySections: CategoryPanelSection[];
  breadcrumbItems: BreadcrumbItem[];
  sortOptions: Option[];
  products: typeof allProducts;
}) => {
  const [selectedSort, setSelectedSort] = useState<Option>(sortOptionsProp[0]!);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  const filteredProducts = useMemo(() => {
    if (selectedCategoryId == null) return products;
    return products.filter((p) => p.categoryId === selectedCategoryId);
  }, [products, selectedCategoryId]);

  const sortedProducts = useMemo(() => {
    switch (selectedSort.key) {
      case 'latest':
        return [...filteredProducts].sort((a, b) => b.id - a.id);
      case 'sell':
        return [...filteredProducts].sort(
          (a, b) => (b.purchaseCount || 0) - (a.purchaseCount || 0)
        );
      case 'price-asc':
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      default:
        return filteredProducts;
    }
  }, [filteredProducts, selectedSort]);

  return (
    <ProductListTem
      categorySections={categorySections}
      breadcrumbItems={breadcrumbItemsProp}
      sortOptions={sortOptionsProp}
      products={sortedProducts}
      selectedSort={selectedSort}
      onChangeSort={setSelectedSort}
      selectedCategoryId={selectedCategoryId}
      onChangeCategory={setSelectedCategoryId}
    />
  );
};

/** =====================
 * Stories
 ====================== */
export const Default: Story = {
  render: () => (
    <Template
      categorySections={mockCategorySections}
      breadcrumbItems={breadcrumbItems}
      sortOptions={sortOptions}
      products={mockProducts} // ✅ 기본 UI 확인 (12개)
    />
  ),
};

export const ManyProducts: Story = {
  render: () => (
    <Template
      categorySections={mockCategorySections}
      breadcrumbItems={breadcrumbItems}
      sortOptions={sortOptions}
      products={allProducts} // ✅ 스크롤 / 밀집 테스트 (42개)
    />
  ),
};

export const SinglePage: Story = {
  render: () => (
    <Template
      categorySections={mockCategorySections}
      breadcrumbItems={breadcrumbItems}
      sortOptions={sortOptions}
      products={allProducts.slice(0, 1)}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <Template
      categorySections={mockCategorySections}
      breadcrumbItems={breadcrumbItems}
      sortOptions={sortOptions}
      products={[]}
    />
  ),
};

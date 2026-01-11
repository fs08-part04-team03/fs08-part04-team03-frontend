import type { Meta, StoryObj } from '@storybook/nextjs';
import type { RegisteredProductOrgItem } from '@/features/products/components/RegisteredProductOrg/RegisteredProductOrg';
import RegisteredProductTem from './RegisteredProductTem';

/** =====================
 * Mock Data
 ====================== */
const mockProducts: RegisteredProductOrgItem[] = [
  {
    id: 1,
    categoryLabel: '청량 · 탄산음료',
    name: '코카콜라 제로',
    price: 2_000,
    imageSrc: '/images/sample1.png',
    link: 'https://www.coca-cola.com/products/coke-zero',
  },
  {
    id: 2,
    categoryLabel: '청량 · 탄산음료',
    name: '스프라이트',
    price: 1_800,
    imageSrc: '/images/sample2.png',
    link: 'https://www.coca-cola.com/products/sprite',
  },
  {
    id: 3,
    categoryLabel: '커피 · 음료',
    name: '아메리카노',
    price: 3_500,
    imageSrc: '/images/sample3.png',
    link: 'https://www.starbucks.com/products/americano',
  },
];

/** 페이지네이션 테스트용 다량 데이터 */
const manyMockProducts: RegisteredProductOrgItem[] = [
  ...mockProducts,
  {
    id: 4,
    categoryLabel: '간편식',
    name: '컵라면',
    price: 1_500,
    imageSrc: '/images/sample4.png',
    link: 'https://www.example.com/products/cup-noodle',
  },
  {
    id: 5,
    categoryLabel: '간편식',
    name: '즉석밥',
    price: 2_200,
    imageSrc: '/images/sample5.png',
    link: 'https://www.example.com/products/instant-rice',
  },
  {
    id: 6,
    categoryLabel: '스낵',
    name: '감자칩',
    price: 1_700,
    imageSrc: '/images/sample6.png',
    link: 'https://www.example.com/products/potato-chips',
  },
  {
    id: 7,
    categoryLabel: '스낵',
    name: '초코바',
    price: 1_200,
    imageSrc: '/images/sample7.png',
    link: 'https://www.example.com/products/choco-bar',
  },
  {
    id: 8,
    categoryLabel: '유제품',
    name: '우유',
    price: 2_500,
    imageSrc: '/images/sample8.png',
    link: 'https://www.example.com/products/milk',
  },
  {
    id: 9,
    categoryLabel: '유제품',
    name: '요거트',
    price: 1_900,
    imageSrc: '/images/sample9.png',
    link: 'https://www.example.com/products/yogurt',
  },
  {
    id: 10,
    categoryLabel: '베이커리',
    name: '식빵',
    price: 3_000,
    imageSrc: '/images/sample10.png',
    link: 'https://www.example.com/products/bread',
  },
  {
    id: 11,
    categoryLabel: '베이커리',
    name: '크루아상',
    price: 3_200,
    imageSrc: '/images/sample11.png',
    link: 'https://www.example.com/products/croissant',
  },
];

/** =====================
 * Meta
 ====================== */
const meta: Meta<typeof RegisteredProductTem> = {
  title: 'Features/Products/Template/RegisteredProductTem',
  component: RegisteredProductTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
상품 관리 페이지의 **Template 레벨 컴포넌트**입니다.

RegisteredProductOrg, DropDown, PaginationBlock을 조합하여  
**상품 등록 내역 화면의 전체 레이아웃과 흐름**을 담당합니다.

---

### 역할 (Responsibility)

- 페이지 상단 **타이틀 및 정렬 옵션 영역 구성**
- 상품 등록 날짜, 주소 정보를 포함한 **RegisteredProductOrg 배치**
- 정렬 DropDown UI 제공 (전체 / 최신순 / 가격순)
- PaginationBlock을 통한 **페이지 이동 UI 제공**
- 페이지 레이아웃 전반의 **여백 및 정렬 관리**

> ⚠️ 본 Template에서는  
> - 상품 데이터 패칭  
> - 실제 API 정렬 / 페이지네이션  
> 과 같은 **비즈니스 로직을 포함하지 않습니다.**

---

### 사용 위치

- Next.js Page 레벨에서 사용
- Page → Template → Organism 구조의 **중간 레이아웃 계층**
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RegisteredProductTem>;

/** =====================
 * Default
 ====================== */
export const Default: Story = {
  args: {
    date: '2024.12.19',
    products: mockProducts,
  },
};

/** =====================
 * Many Products (Pagination)
 ====================== */
export const ManyProducts: Story = {
  args: {
    date: '2024.12.19',
    products: manyMockProducts,
  },
};

/** =====================
 * Single Page
 ====================== */
export const SinglePage: Story = {
  args: {
    date: '2024.12.01',
    products: mockProducts.slice(0, 1),
  },
};

/** =====================
 * Empty Products
 ====================== */
export const Empty: Story = {
  args: {
    date: '2024.12.01',
    products: [],
  },
};

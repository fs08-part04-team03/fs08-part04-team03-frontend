import type { Meta, StoryObj } from '@storybook/nextjs';
import RegisteredProductOrg, { type RegisteredProductOrgItem } from './RegisteredProductOrg';

/** =====================
 * Mock Data
 ====================== */
const mockProducts: RegisteredProductOrgItem[] = [
  {
    id: 1,
    categoryLabel: '청량 · 탄산음료',
    name: '코카콜라 제로',
    price: 2000,
    imageSrc: '/images/sample/coke-zero.png',
    link: 'https://www.coca-cola.com/products/coke-zero',
  },
  {
    id: 2,
    categoryLabel: '커피 · 음료',
    name: '아메리카노',
    price: 4500,
    imageSrc: '/images/sample/americano.png',
    link: 'https://www.starbucks.com/products/americano',
  },
  {
    id: 3,
    categoryLabel: '유제품',
    name: '서울우유 1L',
    price: 3200,
    imageSrc: '/images/sample/milk.png',
    link: 'https://www.seoulmilk.co.kr/products/milk-1l',
  },
];

/** =====================
 * Meta
 ====================== */
const meta: Meta<typeof RegisteredProductOrg> = {
  title: 'Features/Products/Organisms/RegisteredProductOrg',
  component: RegisteredProductOrg,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
조직/파트너 환경에서 **등록된 상품 목록을 날짜 단위로 묶어 보여주는 Organism 컴포넌트**입니다.

---

## 📌 주요 역할

- 특정 날짜에 등록된 **상품 리스트 그룹 표현**
- Product List 내부에 **날짜 + 총 상품 수 헤더 포함**
- 상품 단위로 **카테고리 / 상품명 / 가격 / 출처 주소** 제공
- Divider를 활용한 리스트 구분

---

## 🧩 UI 구조

### 1️⃣ Product List (ul)
Product List 내부는 다음 순서로 구성됩니다.

#### ▸ Header 영역 (리스트 최상단)
- **날짜**
  - ex) \`2024.07.04\`
  - 리스트 그룹의 기준 날짜
- **총 등록 상품 수**
  - \`총 등록한 상품 N개\`
  - products.length 기반 자동 계산
- **Divider**
  - 헤더와 상품 리스트 구분

---

### 2️⃣ 상품 아이템 영역 (li)
각 상품은 다음 정보를 포함합니다.

- **상품 이미지**
  - 90×90 고정 박스
  - 중앙 정렬
- **카테고리 라벨**
  - ex) 청량 · 탄산음료
- **상품명**
- **가격**
  - 천 단위 콤마 + \`원\`
- **주소**
  - 상품 등록 출처 정보
- **하단 Divider**
  - 상품 간 시각적 구분

---

## ⚠️ 참고 사항

- 본 컴포넌트는 **순수 UI 컴포넌트**
- 클릭 이벤트 / 라우팅 / API 연동 없음
- Product List 내부에 Header가 포함된 구조
- 날짜별 여러 리스트를 쌓는 형태로 확장 가능
- 모바일 기준 px 고정 레이아웃

---

## 💡 사용 예시

- 조직 관리자 상품 등록 내역
- 파트너 상품 관리 페이지
- 날짜별 상품 히스토리 리스트
        `,
      },
    },
  },
  argTypes: {
    date: {
      control: 'text',
      description: '상품 리스트 그룹 기준 날짜 (YYYY.MM.DD)',
    },
    products: {
      control: 'object',
      description: '해당 날짜에 등록된 상품 목록',
    },
    companyId: {
      control: 'text',
      description: '회사 ID',
    },
  },
  args: {
    date: '2024.07.04',
    products: mockProducts,
    companyId: 'test-company-id',
    totalCount: mockProducts.length,
  },
};

export default meta;
type Story = StoryObj<typeof RegisteredProductOrg>;

/** =====================
 * Default
 ====================== */
export const Default: Story = {
  name: '기본 / 상품 여러 개',
};

/** =====================
 * Single Product
 ====================== */
export const SingleProduct: Story = {
  name: '단일 상품',
  args: {
    products: [mockProducts[0]!],
    totalCount: 1,
  },
};

/** =====================
 * Empty
 ====================== */
export const Empty: Story = {
  name: '상품 없음',
  args: {
    products: [],
    totalCount: 0,
  },
};

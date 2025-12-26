import type { Meta, StoryObj } from '@storybook/nextjs';
import WishlistTem, { type WishlistItem } from './WishlistTem';

/** =====================
 * Mock Data
 ====================== */
const mockWishlistItems: WishlistItem[] = [
  {
    id: 1,
    name: '코카콜라 제로',
    price: 2_000,
    imageUrl: '/images/sample1.png',
    purchaseCount: 120,
  },
  {
    id: 2,
    name: '스프라이트',
    price: 1_800,
    imageUrl: '/images/sample2.png',
    purchaseCount: 98,
  },
  {
    id: 3,
    name: '아메리카노',
    price: 3_500,
    imageUrl: '/images/sample3.png',
    purchaseCount: 256,
  },
];

/** 페이지네이션 테스트용 다량 데이터 */
const manyWishlistItems: WishlistItem[] = [
  ...mockWishlistItems,
  {
    id: 4,
    name: '컵라면',
    price: 1_500,
    imageUrl: '/images/sample4.png',
    purchaseCount: 540,
  },
  {
    id: 5,
    name: '즉석밥',
    price: 2_200,
    imageUrl: '/images/sample5.png',
    purchaseCount: 312,
  },
  {
    id: 6,
    name: '감자칩',
    price: 1_700,
    imageUrl: '/images/sample6.png',
    purchaseCount: 421,
  },
  {
    id: 7,
    name: '초코바',
    price: 1_200,
    imageUrl: '/images/sample7.png',
    purchaseCount: 689,
  },
  {
    id: 8,
    name: '우유',
    price: 2_500,
    imageUrl: '/images/sample8.png',
    purchaseCount: 274,
  },
  {
    id: 9,
    name: '요거트',
    price: 1_900,
    imageUrl: '/images/sample9.png',
    purchaseCount: 193,
  },
  {
    id: 10,
    name: '식빵',
    price: 3_000,
    imageUrl: '/images/sample10.png',
    purchaseCount: 87,
  },
  {
    id: 11,
    name: '크루아상',
    price: 3_200,
    imageUrl: '/images/sample11.png',
    purchaseCount: 64,
  },
];

/** =====================
 * Meta
 ====================== */
const meta: Meta<typeof WishlistTem> = {
  title: 'Features/Wishlist/Template/WishlistTem',
  component: WishlistTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
찜한 상품 목록 페이지의 **Template 레벨 컴포넌트**입니다.

ProductCard(wishlist variant), Divider, PaginationBlock을 조합하여  
**찜 목록 페이지의 전체 레이아웃과 사용자 인터랙션**을 담당합니다.

---

## 역할 (Responsibility)

- 페이지 상단 **"나의 찜 목록" 타이틀 영역 구성**
- Divider를 통한 섹션 구분
- wishlist variant의 **ProductCard 그리드 배치**
- 디바이스별 (Desktop / Tablet / Mobile)  
  **페이지당 노출 개수 및 레이아웃 관리**
- PaginationBlock을 통한 **페이지 이동 UI 제공**
- 하트(찜) 해제 시 **카드 즉시 제거**
- 구매 수량(\`purchaseCount\`) 정보 표시
- **찜 목록 Empty 상태 UI 처리**

> ⚠️ 본 Template에서는  
> - 실제 서버 API 연동  
> - 찜 데이터 영속화  
> 는 포함하지 않으며,  
> **UI 상태 관리 수준의 로직만 포함합니다.**

---

## Empty 상태 처리 (Empty Wishlist)

찜한 상품이 하나도 없는 경우(\`items.length === 0\`),  
본 Template는 **전용 Empty UI 레이아웃**을 렌더링합니다.

### Empty UI 구성

- \`StatusNotice\` 컴포넌트를 사용하여
  - 아이콘
  - 안내 타이틀
  - 설명 문구
  - CTA 버튼
  을 중앙 정렬 형태로 노출합니다.
- Empty 상태에서도 **PaginationBlock은 항상 노출**됩니다.
  - 페이지 구조의 일관성 유지
  - 향후 서버 페이지네이션 연동 가능성 고려

### 디바이스별 고정 높이 정책

Empty 상태에서는 콘텐츠 유무에 따른  
레이아웃 흔들림(Layout Shift)을 방지하기 위해  
디바이스별 **고정 height 레이아웃**을 적용합니다.

- **Desktop:** \`height: 950px\`
- **Tablet:** \`height: 1045px\`
- **Mobile:** \`height: 542px\`

해당 height 제어는 \`StatusNotice\` 내부가 아닌  
**Template 레벨 Wrapper에서 관리**하여  
StatusNotice 컴포넌트의 재사용성을 유지합니다.

---

## 사용 컴포넌트

- \`ProductCard (variant="wishlist")\`
- \`Divider\`
- \`PaginationBlock\`
- \`StatusNotice\` (Empty 상태 전용)

---

## 사용 위치

- Next.js Page 레벨에서 사용
- Page → Template → Molecule 구조의  
  **중간 레이아웃 계층**

> 반응형 레이아웃, 페이지네이션, Empty 상태,  
> 사용자 인터랙션을 **동시에 검증하기 위한 Template 컴포넌트**입니다.
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof WishlistTem>;

/** =====================
 * Default
 ====================== */
export const Default: Story = {
  args: {
    items: mockWishlistItems,
  },
};

/** =====================
 * Many Items (Pagination)
 ====================== */
export const ManyItems: Story = {
  args: {
    items: manyWishlistItems,
  },
};

/** =====================
 * Single Item
 ====================== */
export const SingleItem: Story = {
  args: {
    items: mockWishlistItems.slice(0, 1),
  },
};

/** =====================
 * Empty Wishlist
 ====================== */
export const Empty: Story = {
  args: {
    items: [],
  },
};

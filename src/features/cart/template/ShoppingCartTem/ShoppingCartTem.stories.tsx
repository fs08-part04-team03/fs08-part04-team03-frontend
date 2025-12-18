import type { Meta, StoryObj } from '@storybook/nextjs';
import type { OrderItem } from '@/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg';
import ShoppingCartTem from './ShoppingCartTem';

/** =====================
 * Mock Data
 ====================== */
const mockItems: OrderItem[] = [
  {
    id: 1,
    name: '노트북',
    unitPrice: 1_200_000,
    quantity: 1,
    shippingCost: 0,
    imageSrc: '/images/sample1.png',
  },
  {
    id: 2,
    name: '무선 마우스',
    unitPrice: 50_000,
    quantity: 2,
    shippingCost: 3_000,
    imageSrc: '/images/sample2.png',
  },
  {
    id: 3,
    name: '키보드',
    unitPrice: 150_000,
    quantity: 1,
    shippingCost: 3_000,
    imageSrc: '/images/sample3.png',
  },
];

/** =====================
 * Meta
 ====================== */
const meta: Meta<typeof ShoppingCartTem> = {
  title: 'Features/Cart/Template/ShoppingCartTem',
  component: ShoppingCartTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
장바구니 페이지의 **Template 레벨 컴포넌트**입니다.

StepBreadcrumb과 CartSummaryBlockOrg를 조합하여  
**장바구니 화면의 전체 레이아웃과 흐름**을 담당합니다.

---

### 역할 (Responsibility)

- 페이지 전반의 **레이아웃 및 여백 관리**
- StepBreadcrumb와 CartSummaryBlockOrg의 **구성 및 배치**
- role, items, budget 등의 props를 **하위 Organism으로 전달**

> ⚠️ 비즈니스 로직 및 상태 관리는 하지 않으며  
> 모든 구매 규칙 및 예산 로직은 CartSummaryBlockOrg에서 처리합니다.

---

### Layout 규칙

- 상단 여백
  - Mobile / Tablet: \`mt-60\`
  - Desktop: \`mt-80\`
- StepBreadcrumb 하단 여백
  - Mobile: \`mb-40\`
  - Tablet / Desktop: \`mb-70\`
- Desktop 환경에서
  - StepBreadcrumb부터 CartSummaryBlockOrg 버튼 영역까지  
    좌우 패딩 \`24px\` 적용

---

### Role 전달 구조

- **User / Manager / Admin** role을 그대로 CartSummaryBlockOrg에 전달
- Template에서는 role에 따른 분기 처리 ❌
- UI 및 행동 제어는 Organism 레벨에서 수행

---

### 사용 위치

- Next.js Page 레벨에서 사용
- 데이터 패칭 및 라우팅 로직은 Page에서 처리
- 본 Template은 순수 UI 조합 역할만 담당
        `,
      },
    },
  },
  argTypes: {
    role: {
      control: 'radio',
      options: ['user', 'manager', 'admin'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShoppingCartTem>;

/** =====================
 * User
 ====================== */
export const User: Story = {
  args: {
    role: 'user',
    items: mockItems,
    onSubmit: (ids) => {
      console.log('User submit:', ids);
    },
  },
};

/** =====================
 * Manager (예산 충분)
 ====================== */
export const ManagerWithinBudget: Story = {
  args: {
    role: 'manager',
    items: mockItems,
    budget: 2_000_000,
    onSubmit: (ids) => {
      console.log('Manager submit:', ids);
    },
    onItemPurchase: (params) => {
      console.log('Manager purchase:', params);
    },
  },
};

/** =====================
 * Manager (예산 초과)
 ====================== */
export const ManagerBudgetExceeded: Story = {
  args: {
    role: 'manager',
    items: mockItems,
    budget: 100_000,
    onSubmit: (ids) => {
      console.log('Manager submit (budget exceeded):', ids);
    },
  },
};

/** =====================
 * Admin (예산 충분)
 ====================== */
export const AdminWithinBudget: Story = {
  args: {
    role: 'admin',
    items: mockItems,
    budget: 2_000_000,
    onItemPurchase: (params) => {
      console.log('Admin purchase:', params);
    },
    onSubmit: (ids) => {
      console.log('Admin submit:', ids);
    },
  },
};

/** =====================
 * Admin (예산 초과)
 ====================== */
export const AdminBudgetExceeded: Story = {
  args: {
    role: 'admin',
    items: mockItems,
    budget: 100_000,
    onSubmit: (ids) => {
      console.log('Admin submit (budget exceeded):', ids);
    },
    onGoBudgetManage: () => {
      console.log('Admin go budget manage');
    },
  },
};

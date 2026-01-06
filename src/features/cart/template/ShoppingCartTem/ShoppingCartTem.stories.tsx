import type { Meta, StoryObj } from '@storybook/nextjs';
import type { OrderItem } from '@/features/cart/components/CartSummaryBlockOrg/CartSummaryBlockOrg';
import ShoppingCartTem from './ShoppingCartTem';

/** =====================
 * Mock Data
 ====================== */
const mockItems: OrderItem[] = [
  {
    cartItemId: 'cart-1',
    productId: 101,
    name: '노트북',
    price: 1_200_000,
    quantity: 1,
    imageSrc: '/images/sample1.png',
  },
  {
    cartItemId: 'cart-2',
    productId: 102,
    name: '무선 마우스',
    price: 50_000,
    quantity: 2,
    imageSrc: '/images/sample2.png',
  },
  {
    cartItemId: 'cart-3',
    productId: 103,
    name: '키보드',
    price: 150_000,
    quantity: 1,
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
- cartRole, items, budget 등의 props를 **하위 Organism으로 전달**

> ⚠️ 비즈니스 로직 및 상태 관리는 하지 않으며  
> 모든 구매 규칙 및 예산 로직은 CartSummaryBlockOrg에서 처리합니다.
        `,
      },
    },
  },
  argTypes: {
    cartRole: {
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
    cartRole: 'user',
    items: mockItems,
    onSubmit: () => {},
    onDeleteSelected: () => {},
    onQuantityChange: () => {},
  },
};

/** =====================
 * Manager (예산 충분)
 ====================== */
export const ManagerWithinBudget: Story = {
  args: {
    cartRole: 'manager',
    items: mockItems,
    budget: 2_000_000,
    onSubmit: () => {},
    onDeleteSelected: () => {},
    onQuantityChange: () => {},
  },
};

/** =====================
 * Manager (예산 초과)
 ====================== */
export const ManagerBudgetExceeded: Story = {
  args: {
    cartRole: 'manager',
    items: mockItems,
    budget: 100_000,
    onSubmit: () => {},
    onDeleteSelected: () => {},
  },
};

/** =====================
 * Admin (예산 충분)
 ====================== */
export const AdminWithinBudget: Story = {
  args: {
    cartRole: 'admin',
    items: mockItems,
    budget: 2_000_000,
    onSubmit: () => {},
    onDeleteSelected: () => {},
  },
};

/** =====================
 * Admin (예산 초과)
 ====================== */
export const AdminBudgetExceeded: Story = {
  args: {
    cartRole: 'admin',
    items: mockItems,
    budget: 100_000,
    onSubmit: () => {},
    onGoBudgetManage: () => {},
  },
};

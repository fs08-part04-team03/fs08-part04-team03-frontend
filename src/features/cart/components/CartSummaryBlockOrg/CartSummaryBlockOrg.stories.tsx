import type { Meta, StoryObj } from '@storybook/nextjs';
import CartSummaryBlockOrg, { type OrderItem, type CartRole } from './CartSummaryBlockOrg';

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
const meta: Meta<typeof CartSummaryBlockOrg> = {
  title: 'Features/Cart/Organisms/CartSummaryBlockOrg',
  component: CartSummaryBlockOrg,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
조직용 장바구니 요약 블록 컴포넌트입니다.

### Role 별 동작

- **User**
  - 상품 선택 및 수량 변경 가능
  - 즉시 구매 버튼 비활성화
  - 예산 정보 미노출

- **Manager**
  - 예산 내: 구매 요청 가능
  - 예산 초과: 긴급 구매 요청 버튼 노출

- **Admin**
  - 예산 내: 즉시 구매 가능
  - 예산 초과: 예산 관리 버튼 노출

※ 라우팅과 API 연동은 페이지 레벨에서 처리합니다.
        `,
      },
    },
  },
  argTypes: {
    role: {
      control: 'radio',
      options: ['user', 'manager', 'admin'] satisfies CartRole[],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CartSummaryBlockOrg>;

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
    onDeleteSelected: (ids) => {
      console.log('User delete:', ids);
    },
    onQuantityChange: (id, qty) => {
      console.log('User quantity change:', id, qty);
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
    onDeleteSelected: (ids) => {
      console.log('Manager delete:', ids);
    },
    onQuantityChange: (id, qty) => {
      console.log('Manager quantity change:', id, qty);
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
      console.log('Manager urgent request:', ids);
    },
    onDeleteSelected: (ids) => {
      console.log('Manager delete:', ids);
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
    onSubmit: (ids) => {
      console.log('Admin submit:', ids);
    },
    onDeleteSelected: (ids) => {
      console.log('Admin delete:', ids);
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
      console.log('Go to budget manage');
    },
  },
};

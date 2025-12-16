import type { Meta, StoryObj } from '@storybook/nextjs';
import CartSummaryBlockOrg, { type OrderItem } from './CartSummaryBlockOrg';

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
const meta: Meta<typeof CartSummaryBlockOrg> = {
  title: 'Features/Cart/CartSummaryBlockOrg',
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
  - 즉시 구매 버튼 노출되지 않음
  - 예산 정보 미노출

- **Manager**
  - 예산 내: 선택된 상품에 대해 즉시 구매 가능
  - 예산 초과: 즉시 구매 버튼 비활성화
  - 하단 구매 요청 버튼 비활성화

- **Admin**
  - Manager와 동일한 구매 규칙
  - 예산 초과 시 모든 구매 액션 비활성화

※ 라우팅은 페이지 레벨에서 처리하며, 본 컴포넌트는 UI와 이벤트만 담당합니다.
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
    onItemPurchase: (params) => {
      console.log('Manager purchase (budget exceeded):', params);
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
    onItemPurchase: (params) => {
      console.log('Admin purchase:', params);
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
    onItemPurchase: (params) => {
      console.log('Admin purchase (budget exceeded):', params);
    },
  },
};

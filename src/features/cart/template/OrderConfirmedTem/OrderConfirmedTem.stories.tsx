import type { Meta, StoryObj } from '@storybook/nextjs';
import type { OrderCompletedItem } from '@/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg';
import OrderConfirmedTem from './OrderConfirmedTem';

/** =====================
 * Mock Data
 ====================== */
const mockItems: OrderCompletedItem[] = [
  {
    id: 1,
    name: '노트북',
    unitPrice: 1_200_000,
    quantity: 1,
    imageSrc: '/images/sample1.png',
  },
  {
    id: 2,
    name: '무선 마우스',
    unitPrice: 50_000,
    quantity: 2,
    imageSrc: '/images/sample2.png',
  },
  {
    id: 3,
    name: '키보드',
    unitPrice: 150_000,
    quantity: 1,
    imageSrc: '/images/sample3.png',
  },
];

/** =====================
 * Meta
 ====================== */
const meta: Meta<typeof OrderConfirmedTem> = {
  title: 'Features/Cart/Template/OrderConfirmedTem',
  component: OrderConfirmedTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
주문 완료 페이지의 **Template 레벨 컴포넌트**입니다.

StepBreadcrumb과 OrderCompletedSummaryOrg를 조합하여  
**주문 완료 화면의 전체 레이아웃과 흐름**을 담당합니다.

---

### 역할 (Responsibility)

- 페이지 전반의 **레이아웃 및 여백 관리**
- role에 따른 **StepBreadcrumb 단계 구성**
- StepBreadcrumb + OrderCompletedSummaryOrg의 **구성 및 배치**
- role, userType, items, 배송 정보 등을 **하위 Organism으로 전달**

> ⚠️ 본 Template에서는  
> - 주문 처리  
> - 메일 전송  
> - 상태 관리  
> 와 같은 **비즈니스 로직을 전혀 포함하지 않습니다.**

---

### StepBreadcrumb 정책

- **User**
  - Shopping Cart → Order → Order Confirmed
  - 현재 단계: \`Order Confirmed\`

- **Manager / Admin**
  - Shopping Cart → Order Confirmed
  - 현재 단계: \`Order Confirmed\`

> StepBreadcrumb는 **모든 role에서 노출되며**,  
> 단계(step) 구성만 role에 따라 달라집니다.  
> 해당 정책은 **Template 레벨에서만 제어**합니다.

---

### 사용 위치

- Next.js Page 레벨에서 사용
- 데이터 패칭, 라우팅, 후처리 로직은 Page에서 담당
- 본 Template은 **순수 UI 조합 역할만 수행**

> ShoppingCartTem → OrderConfirmedTem  
> 로 이어지는 **페이지 플로우의 마지막 단계**에 해당합니다.
        `,
      },
    },
  },
  argTypes: {
    cartRole: {
      control: 'radio',
      options: ['user', 'manager', 'admin'],
    },
    userType: {
      control: 'radio',
      options: ['default'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof OrderConfirmedTem>;

/** =====================
 * User (구매 완료)
 ====================== */
export const User: Story = {
  args: {
    cartRole: 'user',
    userType: 'default',
    items: mockItems,
    shippingFee: 3_000,
    requestMessage: '문 앞에 놓아주세요.',
    onGoCart: () => {},
    onGoOrderHistory: () => {},
  },
};

/** =====================
 * Manager
 ====================== */
export const Manager: Story = {
  args: {
    cartRole: 'manager',
    items: mockItems,
    shippingFee: 3_000,
    onGoCart: () => {},
    onGoOrderHistory: () => {},
  },
};

/** =====================
 * Admin
 ====================== */
export const Admin: Story = {
  args: {
    cartRole: 'admin',
    items: mockItems,
    shippingFee: 3_000,
    onGoCart: () => {},
    onGoOrderHistory: () => {},
  },
};

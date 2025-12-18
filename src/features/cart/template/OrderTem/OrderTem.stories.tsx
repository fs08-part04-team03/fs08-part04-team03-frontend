import type { Meta, StoryObj } from '@storybook/nextjs';
import type { OrderCompletedItem } from '@/features/cart/components/OrderCompletedSummaryOrg/OrderCompletedSummaryOrg';
import OrderTem from './OrderTem';

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
const meta: Meta<typeof OrderTem> = {
  title: 'Features/Cart/Template/OrderTem',
  component: OrderTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
구매 요청 및 주문 완료 화면에서 사용되는  
**Order Template 레벨 컴포넌트**입니다.

StepBreadcrumb과 OrderCompletedSummaryOrg를 조합하여  
**주문 흐름의 전체 레이아웃과 구조**를 담당합니다.

---

### 역할 (Responsibility)

- 페이지 전반의 **레이아웃 및 여백 관리**
- StepBreadcrumb와 OrderCompletedSummaryOrg의 **구성 및 배치**
- 주문 완료 / 구매 요청 화면의 **시각적 구조 제공**
- 하위 Organism에 필요한 데이터와 콜백을 전달

> ⚠️ 본 Template은 **비즈니스 로직을 포함하지 않으며**,  
> 구매 요청 유효성, 메시지 입력 검증, 버튼 제어 로직은  
> 모두 OrderCompletedSummaryOrg에서 처리합니다.

---

### StepBreadcrumb 규칙

- 총 3단계 구성
  1. Shopping Cart
  2. Order
  3. Order Confirmed
- **가운데(Order) Step을 기준으로 중앙 정렬**
- 현재 Step: \`Order (index: 1)\`

---

### User 구매 요청 전용 Template

- 내부적으로 다음 props가 **고정 적용**됩니다.

\`\`\`ts
role="user"
userType="request"
\`\`\`

- 관리자 / 어드민 분기 ❌
- 구매 요청 메시지 입력 영역 노출 ⭕
- 요청 사항 미입력 시 제출 불가 ⭕

---


### 사용 위치

- Next.js Page / Route Segment 레벨
- 데이터 패칭 및 라우팅 제어는 Page에서 담당
- 본 Template은 **순수 UI 조합 역할만 수행**
        `,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OrderTem>;

/** =====================
 * User – 구매 요청
 ====================== */
export const UserRequest: Story = {
  args: {
    items: mockItems,
    shippingFee: 3_000,
    onGoCart: () => {
      console.log('Go back to cart');
    },
    onGoOrderHistory: () => {
      console.log('Go to order history');
    },
  },
};

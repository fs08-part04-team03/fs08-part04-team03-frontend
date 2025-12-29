import type { Meta, StoryObj } from '@storybook/nextjs';
import OrderCompletedSummaryOrg, {
  type OrderCompletedItem,
  type CartRole,
} from './OrderCompletedSummaryOrg';

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
];

/** =====================
 * Meta
 ====================== */
const meta: Meta<typeof OrderCompletedSummaryOrg> = {
  title: 'Features/Cart/Organisms/OrderCompletedSummaryOrg',
  component: OrderCompletedSummaryOrg,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
조직 구매 플로우에서 **구매 완료 / 구매 요청 요약**을 담당하는 컴포넌트입니다.

---

## 📌 주요 특징

- **role 기반 UI 분기**
- px 단위 고정 레이아웃
- 모바일 / 태블릿 / 데스크톱 반응형 유지
- textarea 검증 로직 포함 (user 전용)

---

## 🧩 Role & Type 동작 규칙

### ✅ User
- 요청 사항 입력 textarea 노출
- 글자 수 제한 (최대 50자)
- 입력 없을 경우 에러 메시지 표시

#### User Type
- **default**
  - 상단 타이틀: \`구매가 완료되었습니다\`
  - 버튼: \`구매내역 확인\`

- **request**
  - 상단 타이틀 제거
  - 버튼 텍스트: **구매 요청**

---

### ✅ Manager / Admin
- 동일한 UI 동작
- textarea 미노출
- 단순 구매 완료 요약 화면
- CTA 버튼은 \`구매내역 확인\`

---

## ⚠️ 참고 사항
- 본 컴포넌트는 **UI와 이벤트 트리거만 담당**
- 실제 라우팅 / API 호출은 페이지 레벨에서 처리
        `,
      },
    },
  },
  argTypes: {
    cartRole: {
      control: 'radio',
      options: ['user', 'manager', 'admin'] satisfies CartRole[],
      description: '화면 분기 기준 역할',
    },
    userType: {
      control: 'radio',
      options: ['default', 'request'],
      description: 'User 전용 화면 타입',
    },
  },
};

export default meta;

type Story = StoryObj<typeof OrderCompletedSummaryOrg>;

/** =====================
 * User - Default
 ====================== */
export const UserDefault: Story = {
  name: 'User / 기본 구매 완료',
  args: {
    cartRole: 'user',
    userType: 'default',
    items: mockItems,
    shippingFee: 3_000,
    onGoCart: () => {
      console.log('Go to cart');
    },
    onGoOrderHistory: () => {
      console.log('Go to order history');
    },
  },
};

/** =====================
 * User - Request
 ====================== */
export const UserRequest: Story = {
  name: 'User / 구매 요청',
  args: {
    cartRole: 'user',
    userType: 'request',
    items: mockItems,
    shippingFee: 3_000,
    onGoCart: () => {
      console.log('Go to cart');
    },
    onGoOrderHistory: () => {
      console.log('Request purchase');
    },
  },
};

/** =====================
 * Manager
 ====================== */
export const Manager: Story = {
  name: 'Manager',
  args: {
    cartRole: 'manager',
    items: mockItems,
    shippingFee: 3_000,
    onGoCart: () => {
      console.log('Manager go to cart');
    },
    onGoOrderHistory: () => {
      console.log('Manager order history');
    },
  },
};

/** =====================
 * Admin
 ====================== */
export const Admin: Story = {
  name: 'Admin',
  args: {
    cartRole: 'admin',
    items: mockItems,
    shippingFee: 3_000,
    onGoCart: () => {
      console.log('Admin go to cart');
    },
    onGoOrderHistory: () => {
      console.log('Admin order history');
    },
  },
};

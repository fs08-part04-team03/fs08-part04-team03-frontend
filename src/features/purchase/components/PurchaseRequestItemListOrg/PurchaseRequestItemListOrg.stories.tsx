import type { Meta, StoryObj } from '@storybook/nextjs';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PurchaseRequestItemListOrg from './PurchaseRequestItemListOrg';

const meta = {
  title: 'Features/Purchase/Organisms/PurchaseRequestItemListOrg',
  component: PurchaseRequestItemListOrg,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '구매 요청 아이템 리스트 컴포넌트입니다. 각 구매 요청 항목을 카드 형태로 표시하며, 모바일과 태블릿/데스크탑에서 다른 레이아웃을 제공합니다.\n\n**주요 기능:**\n- 모바일: 날짜, 아이템 설명, 가격, 요청인(UserProfile nameOnly variant)을 세로로 배치하고, 대기중 상태일 때 반려/승인 버튼을 하단에 표시합니다.\n- 태블릿/데스크탑: 테이블 형태로 구매 요청일, 상품 정보, 주문 금액, 요청인(UserProfile secondary variant), 비고(반려/승인 버튼)를 가로로 배치합니다.\n- 긴급 요청(urgent=true)은 빨간 배경색(bg-red-100)으로 강조 표시됩니다.\n- 대기중(PENDING) 상태이고 onReject와 onApprove prop이 제공될 때만 반려/승인 버튼이 표시됩니다.',
      },
    },
  },
} satisfies Meta<typeof PurchaseRequestItemListOrg>;

export default meta;

type Story = StoryObj<typeof PurchaseRequestItemListOrg>;

// 더미 데이터 생성 헬퍼 함수
const createPurchaseItem = (
  id: string,
  status: PurchaseRequestItem['status'],
  itemCount: number = 1,
  totalPrice: number = 1900,
  shippingFee: number = 0,
  createdAt: string = '2024-07-04T00:00:00.000Z',
  urgent: boolean = false
): PurchaseRequestItem & { urgent?: boolean } => ({
  id,
  createdAt,
  updatedAt: createdAt,
  totalPrice,
  shippingFee,
  status,
  purchaseItems: Array.from({ length: itemCount }, (_, index) => ({
    id: `item-${index}`,
    quantity: 1,
    priceSnapshot: totalPrice / itemCount,
    products: {
      id: index + 1,
      name: index === 0 ? '코카콜라 제로' : `상품 ${index + 1}`,
    },
  })),
  requester: {
    id: 'requester-1',
    name: '홍길동',
    email: 'hong@example.com',
  },
  urgent,
});

export const AllVariants: Story = {
  render: () => (
    <PurchaseRequestItemListOrg
      purchaseList={[
        createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z'),
        createPurchaseItem('2', 'PENDING', 1, 3000, 0, '2024-07-03T00:00:00.000Z'),
        createPurchaseItem('3', 'REJECTED', 3, 5000, 0, '2024-07-02T00:00:00.000Z'),
        createPurchaseItem('4', 'APPROVED', 1, 1500, 3000, '2024-07-01T00:00:00.000Z'),
      ]}
      onReject={(id) => {
        // eslint-disable-next-line no-console
        console.log('반려 요청:', id);
      }}
      onApprove={(id) => {
        // eslint-disable-next-line no-console
        console.log('승인 요청:', id);
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          '모든 구매 요청 상태(APPROVED, PENDING, REJECTED)와 다양한 케이스를 한 번에 확인할 수 있습니다. 모바일에서는 가격에 "원" 단위가 포함되고, 요청인은 UserProfile의 nameOnly variant로 아바타와 이름만 표시됩니다. 태블릿/데스크탑에서는 요청인이 UserProfile의 secondary variant로 아바타, 이름, 회사명이 표시됩니다. 대기중(PENDING) 상태인 두 번째 항목에만 반려/승인 버튼이 표시됩니다.',
      },
    },
  },
};

export const Urgent: Story = {
  render: () => (
    <PurchaseRequestItemListOrg
      purchaseList={[
        createPurchaseItem('1', 'PENDING', 1, 5000, 0, '2024-07-04T00:00:00.000Z', true),
        createPurchaseItem('2', 'APPROVED', 2, 3000, 0, '2024-07-03T00:00:00.000Z'),
        createPurchaseItem('3', 'PENDING', 1, 8000, 0, '2024-07-02T00:00:00.000Z', true),
        createPurchaseItem('4', 'REJECTED', 1, 2000, 0, '2024-07-01T00:00:00.000Z'),
      ]}
      onReject={(id) => {
        // eslint-disable-next-line no-console
        console.log('반려 요청:', id);
      }}
      onApprove={(id) => {
        // eslint-disable-next-line no-console
        console.log('승인 요청:', id);
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          'urgent 속성이 true인 구매 요청 아이템은 빨간 배경색(bg-red-100)이 적용되어 긴급 요청임을 시각적으로 강조합니다. 첫 번째와 세 번째 항목이 긴급 요청으로 표시되며, 두 번째와 네 번째 항목은 일반 요청입니다. 긴급 요청은 모바일과 태블릿/데스크탑 모두에서 동일하게 강조 표시됩니다.',
      },
    },
  },
};

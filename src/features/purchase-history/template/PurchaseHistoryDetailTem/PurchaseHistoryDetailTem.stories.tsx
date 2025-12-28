import type { Meta, StoryObj } from '@storybook/nextjs';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PurchaseHistoryDetailTem from './PurchaseHistoryDetailTem';

const meta = {
  title: 'Features/PurchaseHistory/Template/PurchaseHistoryDetailTem',
  component: PurchaseHistoryDetailTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '구매 내역 상세 페이지의 Template 컴포넌트입니다.\n\n**주요 기능:**\n- 상단 구매 물품 정보 표시 (PurchaseHistoryDetailTopOrg)\n- 하단 요청/승인 정보 표시 (PurchaseHistoryDetailInfoOrg)\n- 전체 레이아웃 구성 및 간격 조정\n\n**구성 컴포넌트:**\n- `PurchaseHistoryDetailTopOrg`: 구매 물품 목록과 총 금액 표시\n- `PurchaseHistoryDetailInfoOrg`: 요청 정보와 승인 정보 표시\n\n**레이아웃:**\n- 상단 여백: 모바일/태블릿 30px, 데스크톱 60px\n- 컴포넌트 간 자동 간격 조정',
      },
    },
  },
} satisfies Meta<typeof PurchaseHistoryDetailTem>;

export default meta;

type Story = StoryObj<typeof PurchaseHistoryDetailTem>;

const mockPurchaseRequest: PurchaseRequestItem = {
  id: 'req-1',
  createdAt: '2025-07-05T09:30:00.000Z',
  updatedAt: '2025-07-05T14:20:00.000Z',
  totalPrice: 63000, // (15000 * 2 + 12000 * 1 + 6000 * 3) + 3000 = 60000 + 3000 = 63000
  shippingFee: 3000,
  status: 'APPROVED',
  purchaseItems: [
    {
      id: 'item-1',
      quantity: 2,
      priceSnapshot: 15000,
      products: {
        id: 1,
        name: '코카콜라 제로',
      },
    },
    {
      id: 'item-2',
      quantity: 1,
      priceSnapshot: 12000,
      products: {
        id: 2,
        name: '펩시콜라',
      },
    },
    {
      id: 'item-3',
      quantity: 3,
      priceSnapshot: 6000,
      products: {
        id: 3,
        name: '생수 2L',
      },
    },
  ],
  requester: {
    id: 'user-1',
    name: '김스낵',
    email: 'snack@example.com',
  },
  urgent: false,
  requestMessage: '회의용 음료가 필요합니다. 가능한 빨리 구매 부탁드립니다.',
};

export const Default: Story = {
  args: {
    purchaseRequest: mockPurchaseRequest,
    approvedInfo: {
      approverName: '김코드',
      approvalDate: '2025-07-05T14:20:00.000Z',
      statusLabel: '승인',
      resultMessage: '승인되었습니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 구매 내역 상세 페이지입니다.\n\n**상단 영역 (PurchaseHistoryDetailTopOrg):**\n- 구매 물품 목록: 3개 상품 (코카콜라 제로 2개, 펩시콜라 1개, 생수 2L 3개)\n- 상품 금액: 60,000원\n- 배송비: 3,000원\n- 총 결제 금액: 63,000원\n\n**하단 영역 (PurchaseHistoryDetailInfoOrg):**\n- 요청 정보: 김스낵, 2025년 7월 5일 09:30, 요청 메시지\n- 승인 정보: 김코드, 2025년 7월 5일 14:20, 승인 상태\n\n**레이아웃:**\n- 상단 여백 `mt-30` (모바일/태블릿), `mt-60` (데스크톱)\n- 두 컴포넌트가 세로로 배치됨',
      },
    },
  },
};

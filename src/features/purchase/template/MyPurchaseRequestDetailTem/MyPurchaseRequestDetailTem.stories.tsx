import type { Meta, StoryObj } from '@storybook/nextjs';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import MyPurchaseRequestDetailTem from './MyPurchaseRequestDetailTem';

const meta = {
  title: 'Features/Purchase/Template/MyPurchaseRequestDetailTem',
  component: MyPurchaseRequestDetailTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/company-123/my/purchase-requests/1',
        params: {
          companyId: 'company-123',
        },
      },
    },
    docs: {
      description: {
        component:
          '사용자용 내 구매 요청 상세 페이지 템플릿입니다. 내가 요청한 구매 내역과 승인 정보를 확인할 수 있습니다.\n\n**주요 구성:**\n\n1. **PurchaseRequestDetailTopOrg**: 구매품목 목록 및 가격 요약\n   - 구매품목 토글\n   - 주문금액, 배송비, 총 주문금액\n\n2. **PurchaseRequestDetailOrg**: 요청 정보 및 승인 정보\n   - 요청 정보 (요청인, 요청 날짜, 요청 메시지)\n   - 승인 정보 (담당자, 승인 날짜, 상태, 결과 메시지)\n\n3. **PurchaseRequestDetailActionsOrg**: 목록 보기, 장바구니 다시 담기 버튼',
      },
    },
  },
} satisfies Meta<typeof MyPurchaseRequestDetailTem>;

export default meta;

type Story = StoryObj<typeof MyPurchaseRequestDetailTem>;

const mockPurchaseRequest: PurchaseRequestItem = {
  id: '1',
  createdAt: '2025-06-03T00:00:00.000Z',
  updatedAt: '2025-06-03T00:00:00.000Z',
  itemsTotalPrice: 15000,
  shippingFee: 3000,
  finalTotalPrice: 18000,
  totalPrice: 15000,
  status: 'APPROVED',
  requestMessage: '빠른 배송 부탁드립니다.',
  purchaseItems: [
    {
      id: 'item-1',
      quantity: 1,
      priceSnapshot: 5000,
      itemTotal: 5000,
      products: {
        id: 1,
        name: '코카콜라 제로',
        image: '/images/zero-cola.svg',
      },
    },
    {
      id: 'item-2',
      quantity: 2,
      priceSnapshot: 5000,
      itemTotal: 10000,
      products: {
        id: 2,
        name: '펩시 콜라',
      },
    },
  ],
  requester: {
    id: 'requester-1',
    name: '홍길동',
    email: 'hong@example.com',
  },
  approver: {
    id: 'approver-1',
    name: '관리자',
    email: 'admin@example.com',
  },
  reason: '승인되었습니다.',
};

export const Approved: Story = {
  args: {
    purchaseRequest: mockPurchaseRequest,
    companyId: 'company-123',
  },
  parameters: {
    docs: {
      description: {
        story:
          '승인된 구매 요청을 표시합니다. 구매품목, 요청 정보, 승인 정보가 포함되며, 목록 보기와 장바구니 다시 담기 버튼이 표시됩니다.',
      },
    },
  },
};

export const Pending: Story = {
  args: {
    purchaseRequest: {
      ...mockPurchaseRequest,
      status: 'PENDING',
      approver: undefined,
    },
    companyId: 'company-123',
  },
  parameters: {
    docs: {
      description: {
        story:
          '승인 대기 중인 구매 요청입니다. 담당자가 아직 배정되지 않아 승인 정보의 담당자와 승인 날짜가 "-"로 표시됩니다.',
      },
    },
  },
};

export const Rejected: Story = {
  args: {
    purchaseRequest: {
      ...mockPurchaseRequest,
      status: 'REJECTED',
      rejectReason: '예산 초과로 인해 반려되었습니다. 다음 달에 다시 요청 부탁드립니다.',
    },
    companyId: 'company-123',
  },
  parameters: {
    docs: {
      description: {
        story:
          '반려된 구매 요청입니다. 승인 정보의 상태가 "반려"로 표시되며, 결과 메시지에 반려 사유가 표시됩니다.',
      },
    },
  },
};

export const LongRequestMessage: Story = {
  args: {
    purchaseRequest: {
      ...mockPurchaseRequest,
      requestMessage:
        '이번 프로젝트를 위해 다음 물품들이 필요합니다. 회의실에서 사용할 음료와 간식이 필요하며, 팀원 모두가 함께 즐길 수 있는 품목으로 선정했습니다. 특히 코카콜라 제로는 건강을 생각하는 팀원들을 위한 선택이며, 펩시콜라는 다양한 취향을 고려한 것입니다. 가능한 한 빠른 배송을 부탁드리며, 배송 시 회의실 앞에 직접 배치해 주시면 감사하겠습니다.',
    },
    companyId: 'company-123',
  },
  parameters: {
    docs: {
      description: {
        story:
          '긴 요청 메시지가 포함된 경우입니다. 요청 메시지가 여러 줄로 표시되며 자동 줄바꿈됩니다.',
      },
    },
  },
};

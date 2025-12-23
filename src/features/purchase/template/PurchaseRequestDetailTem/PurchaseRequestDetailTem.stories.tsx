import type { Meta, StoryObj } from '@storybook/nextjs';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PurchaseRequestDetailTem from './PurchaseRequestDetailTem';

const meta = {
  title: 'Features/Purchase/PurchaseRequestDetailTem',
  component: PurchaseRequestDetailTem,
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
          '구매 요청 상세 정보를 표시하는 템플릿 컴포넌트입니다. PurchaseRequestDetailTopOrg와 PurchaseRequestDetailOrg를 조합하여 구매 요청의 전체 상세 정보를 표시합니다.\n\n**주요 구성:**\n\n1. **PurchaseRequestDetailTopOrg**: 구매 요청 상단 정보\n   - 구매 요청 내역 제목\n   - 요청 품목 개수 및 토글 버튼\n   - 품목 목록 (토글 가능)\n\n2. **PurchaseRequestDetailOrg**: 구매 요청 상세 정보\n   - 주문 금액 정보\n   - 요청 정보 (요청인, 요청 날짜, 요청 메시지)\n   - 승인 정보 (담당자, 승인 날짜, 상태, 결과 메시지)\n   - 액션 버튼 (목록 보기, 장바구니 다시 담기)\n\n**반응형 레이아웃:**\n- 모바일/태블릿/데스크탑 각각에 최적화된 레이아웃 제공\n- 모바일/태블릿: 액션 버튼 하단 고정\n- 데스크탑: 액션 버튼 일반 배치',
      },
    },
  },
} satisfies Meta<typeof PurchaseRequestDetailTem>;

export default meta;

type Story = StoryObj<typeof PurchaseRequestDetailTem>;

const mockPurchaseRequest: PurchaseRequestItem = {
  id: '1',
  createdAt: '2025-06-03T00:00:00.000Z',
  updatedAt: '2025-06-03T00:00:00.000Z',
  totalPrice: 15000,
  shippingFee: 3000,
  status: 'APPROVED',
  requestMessage: '빠른 배송 부탁드립니다.',
  purchaseItems: [
    {
      id: 'item-1',
      quantity: 1,
      priceSnapshot: 5000,
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
};

export const Default: Story = {
  args: {
    purchaseRequest: mockPurchaseRequest,
    budget: 2000000,
    monthlySpending: 500000,
    approveModalOpen: false,
    rejectModalOpen: false,
    onApproveClick: () => {
      // eslint-disable-next-line no-console
      console.log('승인 버튼 클릭');
    },
    onRejectClick: () => {
      // eslint-disable-next-line no-console
      console.log('반려 버튼 클릭');
    },
    onApproveModalClose: () => {
      // eslint-disable-next-line no-console
      console.log('승인 모달 닫기');
    },
    onRejectModalClose: () => {
      // eslint-disable-next-line no-console
      console.log('반려 모달 닫기');
    },
    onApproveSubmit: (message: string) => {
      // eslint-disable-next-line no-console
      console.log('승인 제출:', message);
    },
    onRejectSubmit: (message: string) => {
      // eslint-disable-next-line no-console
      console.log('반려 제출:', message);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 구매 요청 상세 정보를 표시합니다. 요청 품목 목록은 토글 버튼으로 접고 펼칠 수 있으며, 주문 금액, 요청 정보, 승인 정보가 모두 포함되어 있습니다.',
      },
    },
  },
};

export const WithoutRequestMessage: Story = {
  args: {
    purchaseRequest: {
      ...mockPurchaseRequest,
      requestMessage: undefined,
    },
    budget: 2000000,
    monthlySpending: 500000,
    approveModalOpen: false,
    rejectModalOpen: false,
    onApproveClick: () => {},
    onRejectClick: () => {},
    onApproveModalClose: () => {},
    onRejectModalClose: () => {},
    onApproveSubmit: () => {},
    onRejectSubmit: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '요청 메시지가 없는 경우를 보여줍니다.',
      },
    },
  },
};

export const WithRejectReason: Story = {
  args: {
    purchaseRequest: {
      ...mockPurchaseRequest,
      status: 'REJECTED',
      rejectReason: '예산 초과로 인한 반려입니다.',
    },
    budget: 2000000,
    monthlySpending: 500000,
    approveModalOpen: false,
    rejectModalOpen: false,
    onApproveClick: () => {},
    onRejectClick: () => {},
    onApproveModalClose: () => {},
    onRejectModalClose: () => {},
    onApproveSubmit: () => {},
    onRejectSubmit: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '반려된 구매 요청의 경우를 보여줍니다. 결과 메시지에 반려 사유가 표시됩니다.',
      },
    },
  },
};

export const WithoutApprover: Story = {
  args: {
    purchaseRequest: {
      ...mockPurchaseRequest,
      status: 'PENDING',
      approver: undefined,
    },
    budget: 2000000,
    monthlySpending: 500000,
    approveModalOpen: false,
    rejectModalOpen: false,
    onApproveClick: () => {},
    onRejectClick: () => {},
    onApproveModalClose: () => {},
    onRejectModalClose: () => {},
    onApproveSubmit: () => {},
    onRejectSubmit: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: '승인자가 아직 없는 경우를 보여줍니다.',
      },
    },
  },
};

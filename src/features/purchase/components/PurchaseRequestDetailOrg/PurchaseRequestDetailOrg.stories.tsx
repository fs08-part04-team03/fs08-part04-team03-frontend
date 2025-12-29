import type { Meta, StoryObj } from '@storybook/nextjs';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PurchaseRequestDetailOrg from './PurchaseRequestDetailOrg';

const meta = {
  title: 'Features/Purchase/Organisms/PurchaseRequestDetailOrg',
  component: PurchaseRequestDetailOrg,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '구매 요청의 상세 정보를 표시하는 Organism 컴포넌트입니다.\n\n**주요 기능:**\n- 요청 정보(요청인, 요청 날짜, 요청 메시지) 표시\n- 예산 정보(이번 달 지출액, 남은 예산, 구매 후 예산) 표시 (선택적)\n- 승인 정보(담당자, 승인 날짜, 상태, 결과 메시지) 표시 (선택적)\n- 반응형 레이아웃 지원 (모바일: 단일 열, 태블릿/데스크톱: 2열 그리드)\n\n**반응형 구조:**\n- **모바일**: 각 필드가 별도 행으로 표시 (140px 라벨 + 1fr 값)\n- **태블릿/데스크톱**: 2개 필드가 한 행에 2x2 그리드로 표시 (140px_1fr_140px_1fr)\n- 텍스트 크기: 모바일 14px, 태블릿/데스크톱 16px\n\n**구성 컴포넌트:**\n- `InfoSection`: 섹션 제목과 Divider를 포함한 래퍼\n- `InfoRowTwoColumns`: 2개 필드를 반응형으로 표시하는 행\n- `InfoRowSingle`: 단일 필드를 전체 너비로 표시하는 행',
      },
    },
  },
} satisfies Meta<typeof PurchaseRequestDetailOrg>;

export default meta;

type Story = StoryObj<typeof PurchaseRequestDetailOrg>;

const mockPurchaseRequest: PurchaseRequestItem = {
  id: 'req-1',
  createdAt: '2025-07-05T09:30:00.000Z',
  updatedAt: '2025-07-05T09:30:00.000Z',
  totalPrice: 45000,
  shippingFee: 3000,
  status: 'PENDING',
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
    purchaseRequest: {
      ...mockPurchaseRequest,
      status: 'APPROVED',
      updatedAt: '2025-07-05T14:20:00.000Z',
    },
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
          '승인 정보가 포함된 전체 상세 정보를 표시합니다.\n\n**요청 정보:**\n- 요청인: 김스낵\n- 요청 날짜: 2025년 7월 5일 09:30\n- 요청 메시지: 회의용 음료가 필요합니다. 가능한 빨리 구매 부탁드립니다.\n\n**승인 정보:**\n- 담당자: 김코드\n- 승인 날짜: 2025년 7월 5일 14:20 (요청 후 약 5시간 후 승인)\n- 상태: 승인\n- 결과 메시지: 승인되었습니다.',
      },
    },
  },
};

export const WithBudgetInfo: Story = {
  args: {
    purchaseRequest: mockPurchaseRequest,
    budgetInfo: {
      monthlySpending: 500000,
      remainingBudget: 2000000,
      budgetAfterPurchase: 1952000,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '예산 정보가 포함된 구매 요청 상세 정보를 표시합니다.\n\n**요청 정보:**\n- 요청인: 김스낵\n- 요청 날짜: 2025년 7월 5일 09:30\n- 요청 메시지: 회의용 음료가 필요합니다. 가능한 빨리 구매 부탁드립니다.\n\n**예산 정보:**\n- 이번 달 지출액: 500,000원\n- 이번 달 남은 예산: 2,000,000원\n- 구매 후 예산: 1,952,000원',
      },
    },
  },
};

export const LongRequestMessage: Story = {
  args: {
    purchaseRequest: {
      ...mockPurchaseRequest,
      status: 'APPROVED',
      updatedAt: '2025-07-05T14:20:00.000Z',
      requestMessage:
        '이번 프로젝트를 위해 다음 물품들이 필요합니다. 회의실에서 사용할 음료와 간식이 필요하며, 팀원 모두가 함께 즐길 수 있는 품목으로 선정했습니다. 특히 코카콜라 제로는 건강을 생각하는 팀원들을 위한 선택이며, 펩시콜라는 다양한 취향을 고려한 것입니다. 가능한 한 빠른 배송을 부탁드리며, 배송 시 회의실 앞에 직접 배치해 주시면 감사하겠습니다. 추가로 영수증 발급도 함께 요청드립니다.',
    },
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
          '긴 요청 메시지가 포함된 상세 정보입니다.\n\n**긴 메시지 처리:**\n- 요청 메시지가 여러 줄로 표시됨\n- `break-words` 클래스로 긴 단어도 자동 줄바꿈\n- fullWidth 옵션으로 `grid-cols-[140px_3fr]` 사용하여 메시지 영역 확보',
      },
    },
  },
};

export const Rejected: Story = {
  args: {
    purchaseRequest: {
      ...mockPurchaseRequest,
      status: 'REJECTED',
      updatedAt: '2025-07-05T11:15:00.000Z',
    },
    approvedInfo: {
      approverName: '박관리',
      approvalDate: '2025-07-05T11:15:00.000Z',
      statusLabel: '반려',
      resultMessage: '예산 초과로 인해 반려되었습니다. 다음 달에 다시 요청 부탁드립니다.',
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '반려된 구매 요청의 상세 정보를 표시합니다.\n\n**승인 정보:**\n- 담당자: 박관리\n- 승인 날짜: 2025년 7월 5일 11:15\n- 상태: 반려\n- 결과 메시지: 예산 초과로 인해 반려되었습니다. 다음 달에 다시 요청 부탁드립니다.',
      },
    },
  },
};

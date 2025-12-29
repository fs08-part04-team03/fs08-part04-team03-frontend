import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PurchaseRequestDetailTem from './PurchaseRequestDetailTem';

const meta = {
  title: 'Features/Purchase/Template/PurchaseRequestDetailTem',
  component: PurchaseRequestDetailTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/company-123/purchase-requests/1',
        params: {
          companyId: 'company-123',
        },
      },
    },
    docs: {
      description: {
        component:
          '관리자용 구매 요청 상세 페이지 템플릿입니다. 구매 요청 내역, 예산 정보, 승인/반려 액션을 포함합니다.\n\n**주요 구성:**\n\n1. **PurchaseRequestDetailTopOrg**: 구매품목 목록 및 가격 요약\n   - 구매품목 토글\n   - 주문금액, 배송비, 총 주문금액\n\n2. **PurchaseRequestDetailOrg**: 요청 정보 및 예산 정보\n   - 요청 정보 (요청인, 요청 날짜, 요청 메시지)\n   - 예산 정보 (이번 달 지출액, 남은 예산, 구매 후 예산)\n\n3. **PurchaseRequestDetailActionsOrg**: 승인/반려 액션 버튼\n\n4. **ApprovalRequestModal**: 승인/반려 모달',
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
    companyId: 'company-123',
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
          '관리자가 구매 요청을 검토하는 기본 화면입니다.\n\n**표시 정보:**\n- 구매품목: 코카콜라 제로 1개, 펩시 콜라 2개\n- 주문금액: 15,000원, 배송비: 3,000원, 총 주문금액: 18,000원\n- 요청인: 홍길동\n- 요청 메시지: 빠른 배송 부탁드립니다.\n- 이번 달 지출액: 500,000원\n- 이번 달 남은 예산: 2,000,000원\n- 구매 후 예산: 1,982,000원\n\n**액션:**\n- 요청 승인 버튼 (활성화)\n- 요청 반려 버튼',
      },
    },
  },
};

export const InsufficientBudget: Story = {
  args: {
    purchaseRequest: mockPurchaseRequest,
    companyId: 'company-123',
    budget: 2000000,
    monthlySpending: 1990000,
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
    onApproveModalClose: () => {},
    onRejectModalClose: () => {},
    onApproveSubmit: () => {},
    onRejectSubmit: () => {},
    isBudgetSufficient: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          '예산이 부족한 경우입니다.\n\n**예산 정보:**\n- 이번 달 지출액: 1,990,000원\n- 이번 달 남은 예산: 2,000,000원\n- 구매 후 예산: 1,982,000원 (음수가 되어 예산 초과)\n\n**특징:**\n- `isBudgetSufficient: false`로 설정\n- 요청 승인 버튼이 비활성화 (inactive) 상태\n- 요청 반려 버튼은 정상 작동\n\n**사용 시나리오:**\n- 구매 후 예산이 음수가 되는 경우\n- 월 예산을 초과하는 구매 요청\n- 관리자가 예산 부족을 이유로 승인할 수 없는 경우',
      },
    },
  },
};

export const WithApproveModal: Story = {
  args: {
    purchaseRequest: mockPurchaseRequest,
    companyId: 'company-123',
    budget: 2000000,
    monthlySpending: 500000,
    approveModalOpen: true,
    rejectModalOpen: false,
    onApproveClick: () => {},
    onRejectClick: () => {},
    onApproveModalClose: () => {
      // eslint-disable-next-line no-console
      console.log('승인 모달 닫기');
    },
    onRejectModalClose: () => {},
    onApproveSubmit: (message: string) => {
      // eslint-disable-next-line no-console
      console.log('승인 제출:', message);
    },
    onRejectSubmit: () => {},
  },
  parameters: {
    docs: {
      description: {
        story:
          '승인 모달이 열린 상태입니다.\n\n**모달 내용:**\n- 요청인 정보: 홍길동\n- 구매품목 리스트: 코카콜라 제로 1개, 펩시 콜라 2개\n- 배송비: 3,000원\n- 예산 정보: 2,000,000원\n- 승인 메시지 입력 필드\n\n**동작:**\n- 승인 메시지 입력 가능\n- 확인 버튼 클릭 시 `onApproveSubmit` 호출\n- X 버튼 또는 취소 버튼 클릭 시 `onApproveModalClose` 호출\n\n**사용 목적:**\n- 승인 모달 UI 확인\n- 모달 레이아웃 검증',
      },
    },
  },
};

export const WithRejectModal: Story = {
  args: {
    purchaseRequest: mockPurchaseRequest,
    companyId: 'company-123',
    budget: 2000000,
    monthlySpending: 500000,
    approveModalOpen: false,
    rejectModalOpen: true,
    onApproveClick: () => {},
    onRejectClick: () => {},
    onApproveModalClose: () => {},
    onRejectModalClose: () => {
      // eslint-disable-next-line no-console
      console.log('반려 모달 닫기');
    },
    onApproveSubmit: () => {},
    onRejectSubmit: (message: string) => {
      // eslint-disable-next-line no-console
      console.log('반려 제출:', message);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '반려 모달이 열린 상태입니다.\n\n**모달 내용:**\n- 요청인 정보: 홍길동\n- 구매품목 리스트: 코카콜라 제로 1개, 펩시 콜라 2개\n- 배송비: 3,000원\n- 예산 정보: 2,000,000원\n- 반려 사유 입력 필드\n\n**동작:**\n- 반려 사유 입력 가능\n- 확인 버튼 클릭 시 `onRejectSubmit` 호출\n- X 버튼 또는 취소 버튼 클릭 시 `onRejectModalClose` 호출\n\n**사용 목적:**\n- 반려 모달 UI 확인\n- 모달 레이아웃 검증',
      },
    },
  },
};

export const Interactive: Story = {
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [approveModalOpen, setApproveModalOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [rejectModalOpen, setRejectModalOpen] = useState(false);

    return (
      <PurchaseRequestDetailTem
        purchaseRequest={args.purchaseRequest}
        companyId={args.companyId}
        budget={args.budget}
        monthlySpending={args.monthlySpending}
        isBudgetSufficient={args.isBudgetSufficient}
        approveModalOpen={approveModalOpen}
        rejectModalOpen={rejectModalOpen}
        onApproveClick={() => {
          // eslint-disable-next-line no-console
          console.log('승인 버튼 클릭 - 모달 열기');
          setApproveModalOpen(true);
        }}
        onRejectClick={() => {
          // eslint-disable-next-line no-console
          console.log('반려 버튼 클릭 - 모달 열기');
          setRejectModalOpen(true);
        }}
        onApproveModalClose={() => {
          // eslint-disable-next-line no-console
          console.log('승인 모달 닫기');
          setApproveModalOpen(false);
        }}
        onRejectModalClose={() => {
          // eslint-disable-next-line no-console
          console.log('반려 모달 닫기');
          setRejectModalOpen(false);
        }}
        onApproveSubmit={(message: string) => {
          // eslint-disable-next-line no-console
          console.log('승인 제출:', message);
          // 실제로는 여기서 API 호출
          setApproveModalOpen(false);
        }}
        onRejectSubmit={(message: string) => {
          // eslint-disable-next-line no-console
          console.log('반려 제출:', message);
          // 실제로는 여기서 API 호출
          setRejectModalOpen(false);
        }}
      />
    );
  },
  args: {
    purchaseRequest: mockPurchaseRequest,
    companyId: 'company-123',
    budget: 2000000,
    monthlySpending: 500000,
    isBudgetSufficient: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          '인터랙티브한 스토리입니다. 승인/반려 버튼을 클릭하면 실제로 모달이 열리고, 모달에서 제출하면 닫힙니다.\n\n**동작:**\n- 승인 버튼 클릭 → 승인 모달 열림\n- 반려 버튼 클릭 → 반려 모달 열림\n- 모달에서 제출 → 콘솔에 메시지 출력 후 모달 닫힘\n- 모달 X 버튼 클릭 → 모달 닫힘\n\n**사용 목적:**\n- 실제 사용자 플로우 테스트\n- 모달 인터랙션 확인\n- 버튼 클릭부터 제출까지 전체 흐름 검증',
      },
    },
  },
};

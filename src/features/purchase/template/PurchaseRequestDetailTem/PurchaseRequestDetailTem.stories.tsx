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
          '관리자용 구매 요청 상세 페이지 템플릿입니다. 구매 요청 내역, 예산 정보, 승인/반려 액션을 포함합니다.\n\n' +
          '**주요 구성:**\n\n' +
          '1. **PurchaseRequestDetailTopOrg**: 구매품목 목록 및 가격 요약\n' +
          '2. **PurchaseRequestDetailOrg**: 요청 정보 및 예산 정보\n' +
          '3. **PurchaseRequestDetailActionsOrg**: 승인/반려 액션 버튼\n' +
          '4. **ApprovalRequestModal**: 승인/반려 모달',
      },
    },
  },
} satisfies Meta<typeof PurchaseRequestDetailTem>;

export default meta;

type Story = StoryObj<typeof PurchaseRequestDetailTem>;

/* =====================
 * Mock Data
 ====================== */
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

/* =====================
 * Stories
 ====================== */
export const Default: Story = {
  args: {
    purchaseRequest: mockPurchaseRequest,
    companyId: 'company-123',
    budget: 2_000_000,
    monthlySpending: 500_000,
    remainingBudget: 1_500_000,
    approveModalOpen: false,
    rejectModalOpen: false,
    onApproveClick: () => {},
    onRejectClick: () => {},
    onApproveModalClose: () => {},
    onRejectModalClose: () => {},
    onApproveSubmit: () => {},
    onRejectSubmit: () => {},
  },
};

export const InsufficientBudget: Story = {
  args: {
    purchaseRequest: mockPurchaseRequest,
    companyId: 'company-123',
    budget: 2_000_000,
    monthlySpending: 1_990_000,
    remainingBudget: 10_000,
    approveModalOpen: false,
    rejectModalOpen: false,
    onApproveClick: () => {},
    onRejectClick: () => {},
    onApproveModalClose: () => {},
    onRejectModalClose: () => {},
    onApproveSubmit: () => {},
    onRejectSubmit: () => {},
    isBudgetSufficient: false,
  },
};

export const WithApproveModal: Story = {
  args: {
    purchaseRequest: mockPurchaseRequest,
    companyId: 'company-123',
    budget: 2_000_000,
    monthlySpending: 500_000,
    remainingBudget: 1_500_000,
    approveModalOpen: true,
    rejectModalOpen: false,
    onApproveClick: () => {},
    onRejectClick: () => {},
    onApproveModalClose: () => {},
    onRejectModalClose: () => {},
    onApproveSubmit: () => {},
    onRejectSubmit: () => {},
  },
};

export const WithRejectModal: Story = {
  args: {
    purchaseRequest: mockPurchaseRequest,
    companyId: 'company-123',
    budget: 2_000_000,
    monthlySpending: 500_000,
    remainingBudget: 1_500_000,
    approveModalOpen: false,
    rejectModalOpen: true,
    onApproveClick: () => {},
    onRejectClick: () => {},
    onApproveModalClose: () => {},
    onRejectModalClose: () => {},
    onApproveSubmit: () => {},
    onRejectSubmit: () => {},
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
        remainingBudget={args.remainingBudget}
        isBudgetSufficient={args.isBudgetSufficient}
        approveModalOpen={approveModalOpen}
        rejectModalOpen={rejectModalOpen}
        onApproveClick={() => setApproveModalOpen(true)}
        onRejectClick={() => setRejectModalOpen(true)}
        onApproveModalClose={() => setApproveModalOpen(false)}
        onRejectModalClose={() => setRejectModalOpen(false)}
        onApproveSubmit={() => setApproveModalOpen(false)}
        onRejectSubmit={() => setRejectModalOpen(false)}
      />
    );
  },
  args: {
    purchaseRequest: mockPurchaseRequest,
    companyId: 'company-123',
    budget: 2_000_000,
    monthlySpending: 500_000,
    remainingBudget: 1_500_000,
    isBudgetSufficient: true,
  },
};

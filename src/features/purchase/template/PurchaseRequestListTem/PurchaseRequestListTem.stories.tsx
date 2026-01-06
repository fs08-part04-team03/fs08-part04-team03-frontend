import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PurchaseRequestListTem from './PurchaseRequestListTem';

const meta = {
  title: 'Features/Purchase/Template/PurchaseRequestListTem',
  component: PurchaseRequestListTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/company-123/purchase-requests',
        params: {
          companyId: 'company-123',
        },
      },
    },
    docs: {
      description: {
        component:
          '관리자용 구매 요청 목록 페이지 템플릿입니다. 구매 요청 목록, 정렬/필터링, 승인/반려 기능을 포함합니다.\n\n**주요 구성:**\n\n1. **모바일 뷰**: PurchaseRequestItemListOrg 사용\n2. **태블릿/데스크톱 뷰**: 테이블 형식 목록\n   - 구매 요청일, 상품 정보, 주문 금액, 요청인, 비고 (승인/반려 버튼)\n3. **정렬/필터링**: 드롭다운으로 최신순, 가격순, 상태별 필터\n4. **페이지네이션**: PaginationBlock\n5. **모달**: ApprovalRequestModal (승인/반려)',
      },
    },
  },
} satisfies Meta<typeof PurchaseRequestListTem>;

export default meta;

type Story = StoryObj<typeof PurchaseRequestListTem>;

const createPurchaseItem = (
  id: string,
  status: PurchaseRequestItem['status'],
  itemCount: number,
  totalPrice: number,
  shippingFee: number,
  createdAt: string,
  requesterName: string = '홍길동'
): PurchaseRequestItem => ({
  id,
  createdAt,
  updatedAt: createdAt,
  totalPrice,
  shippingFee,
  status,
  purchaseItems: Array.from({ length: itemCount }, (_, i) => ({
    id: `item-${i + 1}`,
    quantity: i + 1,
    priceSnapshot: totalPrice / itemCount,
    products: {
      id: i + 1,
      name: `상품 ${i + 1}`,
      image: '/images/zero-cola.svg',
    },
  })),
  requester: {
    id: 'requester-1',
    name: requesterName,
    email: 'hong@example.com',
  },
});

const sortOptions: Option[] = [
  { key: 'LATEST', label: '최신순' },
  { key: 'PRICE_LOW', label: '낮은 가격순' },
  { key: 'PRICE_HIGH', label: '높은 가격순' },
];

export const Default: Story = {
  args: {
    purchaseList: [
      createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z'),
      createPurchaseItem('2', 'PENDING', 1, 3000, 0, '2024-07-03T00:00:00.000Z'),
      createPurchaseItem('3', 'REJECTED', 3, 5000, 0, '2024-07-02T00:00:00.000Z'),
    ],
    companyId: 'company-123',
    sortOptions,
    selectedSortOption: sortOptions[0],
    currentPage: 1,
    totalPages: 1,
    budget: 2000000,
    selectedRequestId: null,
    approveModalOpen: false,
    rejectModalOpen: false,
    onRejectClick: () => {},
    onApproveClick: () => {},
    onRowClick: () => {},
    onNavigateToProducts: () => {},
    onApproveModalClose: () => {},
    onRejectModalClose: () => {},
    onApproveSubmit: () => {},
    onRejectSubmit: () => {},
    onPageChange: () => {},
    onSortChange: () => {},
  },
};

export const EmptyList: Story = {
  args: {
    purchaseList: [],
    companyId: 'company-123',
    sortOptions,
    selectedSortOption: sortOptions[0],
    currentPage: 1,
    totalPages: 1,
    budget: 2000000,
    selectedRequestId: null,
    approveModalOpen: false,
    rejectModalOpen: false,
    onRejectClick: () => {},
    onApproveClick: () => {},
    onRowClick: () => {},
    onNavigateToProducts: () => {},
    onApproveModalClose: () => {},
    onRejectModalClose: () => {},
    onApproveSubmit: () => {},
    onRejectSubmit: () => {},
    onPageChange: () => {},
    onSortChange: () => {},
  },
};

export const WithPagination: Story = {
  args: {
    purchaseList: [
      createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z', '홍길동'),
      createPurchaseItem('2', 'PENDING', 1, 3000, 0, '2024-07-03T00:00:00.000Z', '김철수'),
      createPurchaseItem('3', 'REJECTED', 3, 5000, 0, '2024-07-02T00:00:00.000Z', '이영희'),
      createPurchaseItem('4', 'APPROVED', 1, 1500, 3000, '2024-07-01T00:00:00.000Z', '박민수'),
    ],
    companyId: 'company-123',
    sortOptions,
    selectedSortOption: sortOptions[0],
    currentPage: 2,
    totalPages: 5,
    budget: 2000000,
    selectedRequestId: null,
    approveModalOpen: false,
    rejectModalOpen: false,
    onRejectClick: () => {},
    onApproveClick: () => {},
    onRowClick: () => {},
    onNavigateToProducts: () => {},
    onApproveModalClose: () => {},
    onRejectModalClose: () => {},
    onApproveSubmit: () => {},
    onRejectSubmit: () => {},
    onPageChange: () => {},
    onSortChange: () => {},
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [approveModalOpen, setApproveModalOpen] = useState(false);
    const [rejectModalOpen, setRejectModalOpen] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

    return (
      <PurchaseRequestListTem
        purchaseList={args.purchaseList}
        companyId={args.companyId}
        sortOptions={args.sortOptions}
        selectedSortOption={args.selectedSortOption}
        currentPage={args.currentPage}
        totalPages={args.totalPages}
        budget={args.budget}
        onPageChange={args.onPageChange}
        onSortChange={args.onSortChange}
        selectedRequestId={selectedRequestId}
        approveModalOpen={approveModalOpen}
        rejectModalOpen={rejectModalOpen}
        onApproveClick={(id) => {
          setSelectedRequestId(id);
          setApproveModalOpen(true);
        }}
        onRejectClick={(id) => {
          setSelectedRequestId(id);
          setRejectModalOpen(true);
        }}
        onRowClick={() => {}}
        onNavigateToProducts={() => {}}
        onApproveModalClose={() => {
          setApproveModalOpen(false);
          setSelectedRequestId(null);
        }}
        onRejectModalClose={() => {
          setRejectModalOpen(false);
          setSelectedRequestId(null);
        }}
        onApproveSubmit={() => {
          setApproveModalOpen(false);
          setSelectedRequestId(null);
        }}
        onRejectSubmit={() => {
          setRejectModalOpen(false);
          setSelectedRequestId(null);
        }}
      />
    );
  },
  args: {
    purchaseList: [
      createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z', '홍길동'),
      createPurchaseItem('2', 'PENDING', 1, 3000, 0, '2024-07-03T00:00:00.000Z', '김철수'),
      createPurchaseItem('3', 'REJECTED', 3, 5000, 0, '2024-07-02T00:00:00.000Z', '이영희'),
      createPurchaseItem('4', 'APPROVED', 1, 1500, 3000, '2024-07-01T00:00:00.000Z', '박민수'),
    ],
    companyId: 'company-123',
    sortOptions,
    selectedSortOption: sortOptions[0],
    currentPage: 1,
    totalPages: 1,
    budget: 2000000,
    onPageChange: () => {},
    onSortChange: () => {},
  },
};

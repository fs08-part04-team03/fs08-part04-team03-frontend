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

const statusOptions: Option[] = [
  { key: 'ALL', label: '전체' },
  { key: 'PENDING', label: '대기중' },
  { key: 'APPROVED', label: '승인됨' },
  { key: 'REJECTED', label: '반려됨' },
  { key: 'CANCELLED', label: '취소됨' },
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
    statusOptions,
    selectedStatusOption: statusOptions[0],
    currentPage: 1,
    totalPages: 1,
    budget: 2000000,
    selectedRequestId: null,
    approveModalOpen: false,
    rejectModalOpen: false,
    onRejectClick: (id) => {
      // eslint-disable-next-line no-console
      console.log('반려 클릭:', id);
    },
    onApproveClick: (id) => {
      // eslint-disable-next-line no-console
      console.log('승인 클릭:', id);
    },
    onRowClick: (id) => {
      // eslint-disable-next-line no-console
      console.log('행 클릭:', id);
    },
    onNavigateToProducts: () => {
      // eslint-disable-next-line no-console
      console.log('상품 리스트로 이동');
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
    onPageChange: (page) => {
      // eslint-disable-next-line no-console
      console.log('페이지 변경:', page);
    },
    onSortChange: (sort) => {
      // eslint-disable-next-line no-console
      console.log('정렬 변경:', sort);
    },
    onStatusChange: (status) => {
      // eslint-disable-next-line no-console
      console.log('상태 변경:', status);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 구매 요청 목록 화면입니다. 승인됨, 대기중, 반려됨 상태의 요청들이 표시됩니다.\n\n**특징:**\n- 태블릿/데스크톱에서 테이블 형식으로 표시\n- 모바일에서 카드 형식으로 표시\n- 각 요청마다 승인/반려 버튼 제공',
      },
    },
  },
};

export const EmptyList: Story = {
  args: {
    purchaseList: [],
    companyId: 'company-123',
    sortOptions,
    selectedSortOption: sortOptions[0],
    statusOptions,
    selectedStatusOption: statusOptions[0],
    currentPage: 1,
    totalPages: 1,
    budget: 2000000,
    selectedRequestId: null,
    approveModalOpen: false,
    rejectModalOpen: false,
    onRejectClick: (id) => {
      // eslint-disable-next-line no-console
      console.log('반려 클릭:', id);
    },
    onApproveClick: (id) => {
      // eslint-disable-next-line no-console
      console.log('승인 클릭:', id);
    },
    onRowClick: (id) => {
      // eslint-disable-next-line no-console
      console.log('행 클릭:', id);
    },
    onNavigateToProducts: () => {
      // eslint-disable-next-line no-console
      console.log('상품 리스트로 이동');
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
    onPageChange: (page) => {
      // eslint-disable-next-line no-console
      console.log('페이지 변경:', page);
    },
    onSortChange: (sort) => {
      // eslint-disable-next-line no-console
      console.log('정렬 변경:', sort);
    },
    onStatusChange: (status) => {
      // eslint-disable-next-line no-console
      console.log('상태 변경:', status);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '구매 요청 내역이 없는 경우입니다. StatusNotice 컴포넌트가 표시되며, 상품 리스트로 이동할 수 있는 버튼이 제공됩니다.\n\n**특징:**\n- 빈 상태 UI 표시\n- 상품 리스트로 이동 버튼 제공\n- 정렬/필터 드롭다운은 데스크톱에서만 표시',
      },
    },
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
    statusOptions,
    selectedStatusOption: statusOptions[0],
    currentPage: 2,
    totalPages: 5,
    budget: 2000000,
    selectedRequestId: null,
    approveModalOpen: false,
    rejectModalOpen: false,
    onRejectClick: (id) => {
      // eslint-disable-next-line no-console
      console.log('반려 클릭:', id);
    },
    onApproveClick: (id) => {
      // eslint-disable-next-line no-console
      console.log('승인 클릭:', id);
    },
    onRowClick: (id) => {
      // eslint-disable-next-line no-console
      console.log('행 클릭:', id);
    },
    onNavigateToProducts: () => {
      // eslint-disable-next-line no-console
      console.log('상품 리스트로 이동');
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
    onPageChange: (page) => {
      // eslint-disable-next-line no-console
      console.log('페이지 변경:', page);
    },
    onSortChange: (sort) => {
      // eslint-disable-next-line no-console
      console.log('정렬 변경:', sort);
    },
    onStatusChange: (status) => {
      // eslint-disable-next-line no-console
      console.log('상태 변경:', status);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '페이지네이션이 있는 구매 요청 목록입니다. 현재 페이지가 2페이지이며 총 5페이지가 있습니다.\n\n**특징:**\n- 페이지네이션 블록 표시\n- 여러 요청인의 요청 표시\n- 배송비가 포함된 요청도 표시',
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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

    return (
      <PurchaseRequestListTem
        purchaseList={args.purchaseList}
        companyId={args.companyId}
        sortOptions={args.sortOptions}
        selectedSortOption={args.selectedSortOption}
        statusOptions={args.statusOptions}
        selectedStatusOption={args.selectedStatusOption}
        currentPage={args.currentPage}
        totalPages={args.totalPages}
        budget={args.budget}
        onPageChange={args.onPageChange}
        onSortChange={args.onSortChange}
        onStatusChange={args.onStatusChange}
        selectedRequestId={selectedRequestId}
        approveModalOpen={approveModalOpen}
        rejectModalOpen={rejectModalOpen}
        onApproveClick={(id) => {
          // eslint-disable-next-line no-console
          console.log('승인 버튼 클릭 - 모달 열기:', id);
          setSelectedRequestId(id);
          setApproveModalOpen(true);
        }}
        onRejectClick={(id) => {
          // eslint-disable-next-line no-console
          console.log('반려 버튼 클릭 - 모달 열기:', id);
          setSelectedRequestId(id);
          setRejectModalOpen(true);
        }}
        onRowClick={(id) => {
          // eslint-disable-next-line no-console
          console.log('행 클릭:', id);
        }}
        onNavigateToProducts={() => {
          // eslint-disable-next-line no-console
          console.log('상품 리스트로 이동');
        }}
        onApproveModalClose={() => {
          // eslint-disable-next-line no-console
          console.log('승인 모달 닫기');
          setApproveModalOpen(false);
          setSelectedRequestId(null);
        }}
        onRejectModalClose={() => {
          // eslint-disable-next-line no-console
          console.log('반려 모달 닫기');
          setRejectModalOpen(false);
          setSelectedRequestId(null);
        }}
        onApproveSubmit={(message: string) => {
          // eslint-disable-next-line no-console
          console.log('승인 제출:', message, 'for request:', selectedRequestId);
          // 실제로는 여기서 API 호출
          setApproveModalOpen(false);
          setSelectedRequestId(null);
        }}
        onRejectSubmit={(message: string) => {
          // eslint-disable-next-line no-console
          console.log('반려 제출:', message, 'for request:', selectedRequestId);
          // 실제로는 여기서 API 호출
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
    statusOptions,
    selectedStatusOption: statusOptions[0],
    currentPage: 1,
    totalPages: 1,
    budget: 2000000,
    onPageChange: (page) => {
      // eslint-disable-next-line no-console
      console.log('페이지 변경:', page);
    },
    onSortChange: (sort) => {
      // eslint-disable-next-line no-console
      console.log('정렬 변경:', sort);
    },
    onStatusChange: (status) => {
      // eslint-disable-next-line no-console
      console.log('상태 변경:', status);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '인터랙티브한 스토리입니다. 승인/반려 버튼을 클릭하면 실제로 모달이 열리고, 모달에서 제출하면 닫힙니다.\n\n**동작:**\n- 승인 버튼 클릭 → 해당 요청의 승인 모달 열림\n- 반려 버튼 클릭 → 해당 요청의 반려 모달 열림\n- 모달에서 제출 → 콘솔에 메시지와 요청 ID 출력 후 모달 닫힘\n- 모달 X 버튼 클릭 → 모달 닫힘\n- 행 클릭 → 콘솔에 요청 ID 출력\n\n**사용 목적:**\n- 실제 사용자 플로우 테스트\n- 모달 인터랙션 확인\n- 버튼 클릭부터 제출까지 전체 흐름 검증\n- 다중 요청 처리 시나리오 테스트',
      },
    },
  },
};

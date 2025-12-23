import type { Meta, StoryObj } from '@storybook/nextjs';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PurchaseRequestListTem from './PurchaseRequestListTem';

const meta = {
  title: 'Features/Purchase/PurchaseRequestListTem',
  component: PurchaseRequestListTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/company-123/my/purchase-requests',
        params: {
          companyId: 'company-123',
        },
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
};

export const EmptyList: Story = {
  args: {
    purchaseList: [],
    sortOptions,
    selectedSortOption: sortOptions[0],
    statusOptions,
    selectedStatusOption: statusOptions[0],
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
};

export const WithPagination: Story = {
  args: {
    purchaseList: [
      createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z', '홍길동'),
      createPurchaseItem('2', 'PENDING', 1, 3000, 0, '2024-07-03T00:00:00.000Z', '김철수'),
      createPurchaseItem('3', 'REJECTED', 3, 5000, 0, '2024-07-02T00:00:00.000Z', '이영희'),
      createPurchaseItem('4', 'APPROVED', 1, 1500, 3000, '2024-07-01T00:00:00.000Z', '박민수'),
    ],
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
};

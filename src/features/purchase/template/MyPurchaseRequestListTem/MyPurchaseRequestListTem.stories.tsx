import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import MyPurchaseRequestListTem from './MyPurchaseRequestListTem';

const meta = {
  title: 'Features/Purchase/Template/MyPurchaseRequestListTem',
  component: MyPurchaseRequestListTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/company-123/my/purchase-requests',
      },
    },
    docs: {
      description: {
        component:
          '구매 요청 목록을 표시하는 템플릿 컴포넌트입니다. 모바일에서는 PurchaseRequestItemListOrg를 재사용하고, 태블릿/데스크탑에서는 테이블 형태로 표시합니다. 페이지네이션을 지원합니다.',
      },
    },
  },
} satisfies Meta<typeof MyPurchaseRequestListTem>;

export default meta;

type Story = StoryObj<typeof MyPurchaseRequestListTem>;

/* =====================
 * Options
 ====================== */
const sortOptions: Option[] = [
  { key: 'LATEST', label: '최신순' },
  { key: 'PRICE_LOW', label: '낮은 가격순' },
  { key: 'PRICE_HIGH', label: '높은 가격순' },
];

const defaultSelectedSortOption = sortOptions.find((opt) => opt.key === 'LATEST');

const statusOptions: Option[] = [
  { key: 'ALL', label: '전체' },
  { key: 'PENDING', label: '대기중' },
  { key: 'APPROVED', label: '승인됨' },
  { key: 'REJECTED', label: '반려됨' },
  { key: 'CANCELLED', label: '취소됨' },
];

const defaultSelectedStatusOption = statusOptions.find((opt) => opt.key === 'ALL');

/* =====================
 * Mock Helper
 ====================== */
const createPurchaseItem = (
  id: string,
  status: PurchaseRequestItem['status'],
  itemCount: number = 1,
  totalPrice: number = 1900,
  shippingFee: number = 0,
  createdAt: string = '2024-07-04T00:00:00.000Z',
  urgent: boolean = false
): PurchaseRequestItem => ({
  id,
  createdAt,
  updatedAt: createdAt,
  itemsTotalPrice: totalPrice,
  shippingFee,
  finalTotalPrice: totalPrice + shippingFee,
  totalPrice,
  status,
  purchaseItems: Array.from({ length: itemCount }, (_, index) => ({
    id: `item-${index}`,
    quantity: 1,
    priceSnapshot: totalPrice / itemCount,
    itemTotal: totalPrice / itemCount,
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
  reason: '',
});

/* =====================
 * Stories
 ====================== */
export const Default: Story = {
  render: () => (
    <MyPurchaseRequestListTem
      purchaseList={[
        createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z'),
        createPurchaseItem('2', 'PENDING', 1, 3000, 0, '2024-07-03T00:00:00.000Z'),
        createPurchaseItem('3', 'REJECTED', 3, 5000, 0, '2024-07-02T00:00:00.000Z'),
      ]}
      companyId="company-123"
      cancelModalState={{
        cancelModalOpen: false,
        cancelTargetItem: null,
      }}
      cancelModalHandlers={{
        onCancelClick: () => {},
        onCancelModalClose: () => {},
        onCancelConfirm: () => {},
      }}
      paginationState={{
        currentPage: 1,
        totalPages: 3,
        onPageChange: () => {},
      }}
      sortState={{
        sortOptions,
        selectedSortOption: defaultSelectedSortOption,
        onSortChange: () => {},
      }}
      filterState={{
        statusOptions,
        selectedStatusOption: defaultSelectedStatusOption,
        onStatusChange: () => {},
      }}
      navigationHandlers={{
        onNavigateToProducts: () => {},
      }}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <MyPurchaseRequestListTem
      purchaseList={[]}
      companyId="company-123"
      paginationState={{
        currentPage: 1,
        totalPages: 0,
        onPageChange: () => {},
      }}
      sortState={{
        sortOptions,
        selectedSortOption: defaultSelectedSortOption,
        onSortChange: () => {},
      }}
      filterState={{
        statusOptions,
        selectedStatusOption: defaultSelectedStatusOption,
        onStatusChange: () => {},
      }}
      navigationHandlers={{
        onNavigateToProducts: () => {},
      }}
    />
  ),
};

export const Urgent: Story = {
  render: () => (
    <MyPurchaseRequestListTem
      purchaseList={[
        createPurchaseItem('1', 'PENDING', 1, 5000, 0, '2024-07-04T00:00:00.000Z', true),
        createPurchaseItem('2', 'APPROVED', 2, 3000, 0, '2024-07-03T00:00:00.000Z'),
        createPurchaseItem('3', 'PENDING', 1, 8000, 0, '2024-07-02T00:00:00.000Z', true),
      ]}
      companyId="company-123"
      cancelModalState={{
        cancelModalOpen: false,
        cancelTargetItem: null,
      }}
      cancelModalHandlers={{
        onCancelClick: () => {},
        onCancelModalClose: () => {},
        onCancelConfirm: () => {},
      }}
      paginationState={{
        currentPage: 1,
        totalPages: 1,
        onPageChange: () => {},
      }}
      sortState={{
        sortOptions,
        selectedSortOption: defaultSelectedSortOption,
        onSortChange: () => {},
      }}
      filterState={{
        statusOptions,
        selectedStatusOption: defaultSelectedStatusOption,
        onStatusChange: () => {},
      }}
      navigationHandlers={{
        onNavigateToProducts: () => {},
      }}
    />
  ),
};

export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cancelModalOpen, setCancelModalOpen] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [cancelTargetItem, setCancelTargetItem] = useState<PurchaseRequestItem | null>(null);

    const purchaseList = [
      createPurchaseItem('1', 'PENDING', 1, 5000, 0, '2024-07-04T00:00:00.000Z', true),
      createPurchaseItem('2', 'APPROVED', 2, 3000, 0, '2024-07-03T00:00:00.000Z'),
      createPurchaseItem('3', 'PENDING', 1, 8000, 0, '2024-07-02T00:00:00.000Z'),
    ];

    return (
      <MyPurchaseRequestListTem
        purchaseList={purchaseList}
        companyId="company-123"
        cancelModalState={{
          cancelModalOpen,
          cancelTargetItem,
        }}
        cancelModalHandlers={{
          onCancelClick: (id: string) => {
            const item = purchaseList.find((p) => p.id === id);
            if (item) {
              setCancelTargetItem(item);
              setCancelModalOpen(true);
            }
          },
          onCancelModalClose: () => {
            setCancelModalOpen(false);
            setCancelTargetItem(null);
          },
          onCancelConfirm: () => {
            setCancelModalOpen(false);
            setCancelTargetItem(null);
          },
        }}
        paginationState={{
          currentPage: 1,
          totalPages: 1,
          onPageChange: () => {},
        }}
        sortState={{
          sortOptions,
          selectedSortOption: defaultSelectedSortOption,
          onSortChange: () => {},
        }}
        filterState={{
          statusOptions,
          selectedStatusOption: defaultSelectedStatusOption,
          onStatusChange: () => {},
        }}
        navigationHandlers={{
          onNavigateToProducts: () => {},
        }}
      />
    );
  },
};

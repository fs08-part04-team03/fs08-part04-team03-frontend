import type { Meta, StoryObj } from '@storybook/nextjs';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import MyPurchaseRequestListTem from './MyPurchaseRequestListTem';

const meta = {
  title: 'Features/Purchase/MyPurchaseRequestListTem',
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

// 정렬 옵션 정의
const sortOptions: Option[] = [
  { key: 'LATEST', label: '최신순' },
  { key: 'PRICE_LOW', label: '낮은 가격순' },
  { key: 'PRICE_HIGH', label: '높은 가격순' },
];

const defaultSelectedSortOption = sortOptions.find((opt) => opt.key === 'LATEST');

// 상태 필터 옵션 정의
const statusOptions: Option[] = [
  { key: 'ALL', label: '전체' },
  { key: 'PENDING', label: '대기중' },
  { key: 'APPROVED', label: '승인됨' },
  { key: 'REJECTED', label: '반려됨' },
  { key: 'CANCELLED', label: '취소됨' },
];

const defaultSelectedStatusOption = statusOptions.find((opt) => opt.key === 'ALL');

// 더미 데이터 생성 헬퍼 함수
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
  totalPrice,
  shippingFee,
  status,
  purchaseItems: Array.from({ length: itemCount }, (_, index) => ({
    id: `item-${index}`,
    quantity: 1,
    priceSnapshot: totalPrice / itemCount,
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
});

export const Default: Story = {
  render: () => (
    <MyPurchaseRequestListTem
      purchaseList={[
        createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z'),
        createPurchaseItem('2', 'PENDING', 1, 3000, 0, '2024-07-03T00:00:00.000Z'),
        createPurchaseItem('3', 'REJECTED', 3, 5000, 0, '2024-07-02T00:00:00.000Z'),
      ]}
      onCancelClick={(id) => {
        // eslint-disable-next-line no-console
        console.log('취소 클릭:', id);
      }}
      cancelModalOpen={false}
      cancelTargetItem={null}
      onCancelModalClose={() => {
        // eslint-disable-next-line no-console
        console.log('취소 모달 닫기');
      }}
      onCancelConfirm={() => {
        // eslint-disable-next-line no-console
        console.log('취소 확인');
      }}
      currentPage={1}
      totalPages={3}
      onPageChange={(page) => {
        // eslint-disable-next-line no-console
        console.log('페이지 변경:', page);
      }}
      sortOptions={sortOptions}
      selectedSortOption={defaultSelectedSortOption}
      onSortChange={(sort) => {
        // eslint-disable-next-line no-console
        console.log('정렬 변경:', sort);
      }}
      statusOptions={statusOptions}
      selectedStatusOption={defaultSelectedStatusOption}
      onStatusChange={(status) => {
        // eslint-disable-next-line no-console
        console.log('상태 변경:', status);
      }}
    />
  ),
};

export const Empty: Story = {
  render: () => (
    <MyPurchaseRequestListTem
      purchaseList={[]}
      currentPage={1}
      totalPages={0}
      onPageChange={(page) => {
        // eslint-disable-next-line no-console
        console.log('페이지 변경:', page);
      }}
      sortOptions={sortOptions}
      selectedSortOption={defaultSelectedSortOption}
      onSortChange={(sort) => {
        // eslint-disable-next-line no-console
        console.log('정렬 변경:', sort);
      }}
      statusOptions={statusOptions}
      selectedStatusOption={defaultSelectedStatusOption}
      onStatusChange={(status) => {
        // eslint-disable-next-line no-console
        console.log('상태 변경:', status);
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
      onCancelClick={(id) => {
        // eslint-disable-next-line no-console
        console.log('취소 클릭:', id);
      }}
      cancelModalOpen={false}
      cancelTargetItem={null}
      onCancelModalClose={() => {
        // eslint-disable-next-line no-console
        console.log('취소 모달 닫기');
      }}
      onCancelConfirm={() => {
        // eslint-disable-next-line no-console
        console.log('취소 확인');
      }}
      currentPage={1}
      totalPages={1}
      onPageChange={(page) => {
        // eslint-disable-next-line no-console
        console.log('페이지 변경:', page);
      }}
      sortOptions={sortOptions}
      selectedSortOption={defaultSelectedSortOption}
      onSortChange={(sort) => {
        // eslint-disable-next-line no-console
        console.log('정렬 변경:', sort);
      }}
      statusOptions={statusOptions}
      selectedStatusOption={defaultSelectedStatusOption}
      onStatusChange={(status) => {
        // eslint-disable-next-line no-console
        console.log('상태 변경:', status);
      }}
    />
  ),
};

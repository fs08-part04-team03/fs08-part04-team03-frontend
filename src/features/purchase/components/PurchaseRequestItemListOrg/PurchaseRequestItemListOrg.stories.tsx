import type { Meta, StoryObj } from '@storybook/nextjs';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PurchaseRequestItemListOrg from './PurchaseRequestItemListOrg';

const meta = {
  title: 'Features/Purchase/PurchaseRequestItemListOrg',
  component: PurchaseRequestItemListOrg,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '구매 요청 아이템 리스트 컴포넌트입니다. 날짜, 아이템 설명, 가격, 상태를 표시합니다.',
      },
    },
  },
} satisfies Meta<typeof PurchaseRequestItemListOrg>;

export default meta;

type Story = StoryObj<typeof PurchaseRequestItemListOrg>;

// 더미 데이터 생성 헬퍼 함수
const createPurchaseItem = (
  id: string,
  status: PurchaseRequestItem['status'],
  itemCount: number = 1,
  totalPrice: number = 1900,
  shippingFee: number = 0,
  createdAt: string = '2024-07-04T00:00:00.000Z'
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
});

export const AllVariants: Story = {
  render: () => (
    <PurchaseRequestItemListOrg
      purchaseList={[
        createPurchaseItem('1', 'APPROVED', 2, 1900, 0, '2024-07-04T00:00:00.000Z'),
        createPurchaseItem('2', 'PENDING', 1, 3000, 0, '2024-07-03T00:00:00.000Z'),
        createPurchaseItem('3', 'REJECTED', 3, 5000, 0, '2024-07-02T00:00:00.000Z'),
        createPurchaseItem('4', 'APPROVED', 1, 1500, 3000, '2024-07-01T00:00:00.000Z'),
      ]}
      onCancel={(id) => {
        // eslint-disable-next-line no-console
        console.log('취소 요청:', id);
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story:
          '모든 상태와 다양한 케이스를 한 번에 확인할 수 있습니다. 모바일에서는 가격에 "원"이 포함되고, 대기중 상태일 때만 취소 버튼이 표시됩니다.',
      },
    },
  },
};

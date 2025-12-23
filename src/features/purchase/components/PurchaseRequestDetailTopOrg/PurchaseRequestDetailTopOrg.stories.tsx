import type { Meta, StoryObj } from '@storybook/nextjs';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PurchaseRequestDetailTopOrg from './PurchaseRequestDetailTopOrg';

const meta = {
  title: 'Features/Purchase/Organisms/PurchaseRequestDetailTopOrg',
  component: PurchaseRequestDetailTopOrg,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '내 구매 요청 상세 정보를 표시하는 컴포넌트입니다. 사용자가 요청한 구매 품목 목록을 토글 버튼으로 접고 펼칠 수 있으며, 각 품목은 OrderItemDetailCard 컴포넌트를 사용하여 표시됩니다.\n\n**주요 기능:**\n- 구매 요청 내역 제목 표시\n- 요청 품목 개수 표시 및 토글 버튼\n- 화살표 아이콘 회전 애니메이션 (열림/닫힘 상태에 따라 180도 회전)\n- 품목 목록 접기/펼치기 기능\n- 각 품목 간 Divider로 구분\n\n**사용 컴포넌트:**\n- OrderItemDetailCard: 각 구매 품목을 표시하는 카드 컴포넌트 (반응형 레이아웃 지원)\n- IconButton: 토글 버튼\n- Divider: 품목 간 구분선',
      },
    },
  },
} satisfies Meta<typeof PurchaseRequestDetailTopOrg>;

export default meta;

type Story = StoryObj<typeof PurchaseRequestDetailTopOrg>;

const mockPurchaseRequest: PurchaseRequestItem = {
  id: '1',
  createdAt: '2025-06-03T00:00:00.000Z',
  updatedAt: '2025-06-03T00:00:00.000Z',
  totalPrice: 1900,
  shippingFee: 0,
  status: 'APPROVED',
  purchaseItems: [
    {
      id: 'item-1',
      quantity: 1,
      priceSnapshot: 1900,
      products: {
        id: 1,
        name: '코카콜라 제로',
        image: '/images/zero-cola.svg',
      },
    },
    {
      id: 'item-2',
      quantity: 2,
      priceSnapshot: 3000,
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
};

export const Default: Story = {
  args: {
    purchaseRequest: mockPurchaseRequest,
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 구매 요청 상세 뷰입니다. 토글 버튼을 클릭하면 구매 품목 목록이 펼쳐지거나 접힙니다. 여러 품목이 있을 경우 각 품목 사이에 Divider가 표시됩니다. 화살표 아이콘은 목록이 열려있을 때 180도 회전하여 아래쪽을 가리킵니다.',
      },
    },
  },
};

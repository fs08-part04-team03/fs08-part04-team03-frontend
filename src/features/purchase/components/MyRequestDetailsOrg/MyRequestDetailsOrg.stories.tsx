import type { Meta, StoryObj } from '@storybook/nextjs';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import MyRequestDetailsOrg from './MyRequestDetailsOrg';

const meta = {
  title: 'Features/Purchase/MyRequestDetailsOrg',
  component: MyRequestDetailsOrg,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '구매 요청의 상세 정보를 표시하는 컴포넌트입니다. 반응형 디자인을 지원하며, 모바일/태블릿/데스크탑 각각에 최적화된 레이아웃을 제공합니다.\n\n**주요 섹션:**\n\n1. **주문 금액 정보**\n   - 주문금액: 상품들의 총 금액 (PriceText 컴포넌트 사용)\n   - 배송비: 배송에 필요한 추가 비용\n   - 총 주문 금액: 주문금액 + 배송비 (더 큰 폰트와 볼드 스타일 적용)\n\n2. **요청 정보**\n   - 요청인: 구매 요청을 한 사용자의 이름\n   - 요청 날짜: 구매 요청이 생성된 날짜 (DateText 컴포넌트로 "YYYY.MM.DD" 형식으로 표시)\n   - 요청 메시지: 사용자가 작성한 요청 메시지 (있을 경우에만 표시)\n\n3. **승인 정보**\n   - 담당자: 승인을 처리한 관리자의 이름 (없을 경우 "-" 표시)\n   - 승인 날짜: 승인이 처리된 날짜 (DateText 컴포넌트 사용, 없을 경우 "-" 표시)\n   - 상태: 구매 요청의 현재 상태 (PENDING, APPROVED, REJECTED, CANCELLED)\n   - 결과 메시지: 반려 사유가 있을 경우 표시 (rejectReason)\n\n4. **액션 버튼**\n   - 목록 보기: 구매 요청 목록으로 돌아가기\n   - 장바구니 다시 담기: 구매 요청을 장바구니에 다시 추가\n   - 모바일/태블릿: 화면 하단에 고정 (fixed bottom)\n   - 데스크탑: 승인 정보와 gap-50 간격으로 일반 배치\n\n**반응형 레이아웃:**\n\n- **모바일 (< 768px)**:\n  - 세로 레이아웃 (flex-col)\n  - 각 필드는 라벨(w-140)과 값이 가로로 배치\n  - 요청 메시지와 결과 메시지는 전체 너비 사용\n  - 액션 버튼은 화면 하단에 고정 (fixed bottom)\n  - 텍스트 크기: text-14\n\n- **태블릿 (768px ~ 1023px)**:\n  - 4컬럼 그리드 레이아웃: `grid-cols-[140px_1fr_140px_1fr]`\n  - 첫 번째 행: 요청인 | 값 | 요청 날짜 | 값\n  - 요청 메시지는 별도 그리드로 `grid-cols-[140px_3fr]` 구조\n  - 승인 정보도 동일한 4컬럼 그리드 구조\n  - 액션 버튼은 화면 하단에 고정 (fixed bottom)\n  - 텍스트 크기: text-16\n\n- **데스크탑 (≥ 1024px)**:\n  - 태블릿과 동일한 4컬럼 그리드 레이아웃\n  - 요청 메시지는 `grid-cols-[140px_3fr]` 구조\n  - 승인 정보와 액션 버튼 사이 gap-50 간격\n  - 액션 버튼은 일반 배치 (fixed 아님)\n  - 텍스트 크기: text-16\n\n**사용 컴포넌트:**\n- PriceText: 금액을 표시하는 아톰 컴포넌트 (천 단위 구분, "원" 단위 자동 추가)\n- DateText: 날짜를 "YYYY.MM.DD" 형식으로 표시하는 아톰 컴포넌트\n- Divider: 섹션 간 구분선 (thick: 섹션 제목 아래)\n- Button: 액션 버튼 (목록 보기, 장바구니 다시 담기)',
      },
    },
  },
} satisfies Meta<typeof MyRequestDetailsOrg>;

export default meta;

type Story = StoryObj<typeof MyRequestDetailsOrg>;

const mockPurchaseRequest: PurchaseRequestItem = {
  id: '1',
  createdAt: '2025-06-03T00:00:00.000Z',
  updatedAt: '2025-06-03T00:00:00.000Z',
  totalPrice: 15000,
  shippingFee: 3000,
  status: 'APPROVED',
  requestMessage: '빠른 배송 부탁드립니다.',
  purchaseItems: [],
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
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 구매 요청 상세 정보를 표시합니다. 주문 금액, 요청 정보, 승인 정보가 모두 포함되어 있으며, 승인자가 있는 경우 담당자와 승인 날짜가 표시됩니다. 요청 메시지가 있는 경우 해당 메시지도 표시됩니다. 모바일에서는 세로 레이아웃, 태블릿/데스크탑에서는 4컬럼 그리드 레이아웃으로 표시됩니다.',
      },
    },
  },
};

export const WithoutRequestMessage: Story = {
  args: {
    purchaseRequest: {
      ...mockPurchaseRequest,
      requestMessage: undefined,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '요청 메시지가 없는 경우를 보여줍니다. 요청 메시지 섹션은 표시되지 않습니다.',
      },
    },
  },
};

export const WithRejectReason: Story = {
  args: {
    purchaseRequest: {
      ...mockPurchaseRequest,
      status: 'REJECTED',
      rejectReason: '예산 초과로 인한 반려입니다.',
      approver: {
        id: 'approver-1',
        name: '관리자',
        email: 'admin@example.com',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '반려된 구매 요청의 경우를 보여줍니다. 상태가 REJECTED이고 결과 메시지(반려 사유)가 표시됩니다.',
      },
    },
  },
};

export const WithoutApprover: Story = {
  args: {
    purchaseRequest: {
      ...mockPurchaseRequest,
      status: 'PENDING',
      approver: undefined,
    },
  },
  parameters: {
    docs: {
      description: {
        story: '승인자가 아직 없는 경우를 보여줍니다. 담당자와 승인 날짜는 "-"로 표시됩니다.',
      },
    },
  },
};

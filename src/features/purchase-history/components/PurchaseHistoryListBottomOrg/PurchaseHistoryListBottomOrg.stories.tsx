import type { Meta, StoryObj } from '@storybook/nextjs';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import PurchaseHistoryListOrg from './PurchaseHistoryListBottomOrg';

const meta = {
  title: 'Features/PurchaseHistory/Organisms/PurchaseHistoryListOrg',
  component: PurchaseHistoryListOrg,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/company-1/purchase-history',
        params: {
          companyId: 'company-1',
        },
      },
    },
    docs: {
      description: {
        component:
          '구매 내역 리스트를 표시하는 Organism 컴포넌트입니다.\n\n**주요 기능:**\n- 구매 내역 배열을 받아 테이블 형태로 표시\n- 데스크톱에서는 고정 헤더와 함께 테이블 행으로 렌더링\n- 모바일/태블릿에서는 각 아이템이 카드 형태로 표시\n- 각 행 클릭 시 상세 페이지로 이동\n\n**구성 요소:**\n- **데스크톱 헤더**: 번호, 구매 요청일, 요청인, 구매 물품, 총 금액, 구매 승인일, 담당자, 번호 컬럼\n- **PurchaseHistoryRowOrg**: 각 구매 내역 아이템을 렌더링하는 행 컴포넌트\n- **반응형 레이아웃**: 화면 크기에 따라 다른 레이아웃 적용\n\n**사용 시나리오:**\n- Section 레벨에서 API로 받아온 구매 내역 배열을 전달받아 렌더링\n- 페이지네이션과 함께 사용하여 대량의 구매 내역을 효율적으로 표시',
      },
    },
  },
} satisfies Meta<typeof PurchaseHistoryListOrg>;

export default meta;

type Story = StoryObj<typeof PurchaseHistoryListOrg>;

const createPurchaseItem = (
  id: string,
  status: PurchaseRequestItem['status'],
  itemCount: number,
  totalPrice: number,
  createdAt: string,
  updatedAt: string,
  urgent: boolean,
  requesterName: string,
  approver?: PurchaseRequestItem['approver']
): PurchaseRequestItem => ({
  id,
  createdAt,
  updatedAt,
  itemsTotalPrice: totalPrice,
  shippingFee: 0,
  finalTotalPrice: totalPrice,
  totalPrice,
  status,
  purchaseItems: Array.from({ length: itemCount }, (_, index) => ({
    id: `item-${id}-${index}`,
    quantity: index === 0 ? 2 : 1,
    priceSnapshot: totalPrice / itemCount,
    itemTotal: (index === 0 ? 2 : 1) * (totalPrice / itemCount),
    products: {
      id: index + 1,
      name: index === 0 ? '코카콜라 제로' : `상품 ${index + 1}`,
    },
  })),
  requester: {
    id: `requester-${id}`,
    name: requesterName,
    email: `${requesterName.toLowerCase()}@example.com`,
  },
  approver,
  urgent,
});

const approvers = {
  김코드: {
    id: 'approver-1',
    name: '김코드',
    email: 'code@example.com',
  },
  박관리: {
    id: 'approver-2',
    name: '박관리',
    email: 'manager@example.com',
  },
};

export const Default: Story = {
  args: {
    items: [
      createPurchaseItem(
        '1',
        'APPROVED',
        2,
        21000,
        '2025-07-05T00:00:00.000Z',
        '2025-07-07T00:00:00.000Z',
        false,
        '김스낵',
        approvers.김코드
      ),
      createPurchaseItem(
        '2',
        'APPROVED',
        3,
        45000,
        '2025-07-03T00:00:00.000Z',
        '2025-07-03T06:00:00.000Z',
        true,
        '이개발',
        approvers.김코드
      ),
      createPurchaseItem(
        '3',
        'PENDING',
        1,
        15000,
        '2025-07-08T00:00:00.000Z',
        '2025-07-08T00:00:00.000Z',
        false,
        '박디자인'
      ),
    ],
    companyId: 'company-1',
    currentPage: 1,
    totalPages: 1,
    onPageChange: () => {
      // eslint-disable-next-line no-console
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 구매 내역 리스트입니다. 3개의 구매 내역을 표시합니다.\n\n**데스크톱 레이아웃:**\n- 상단에 고정 헤더가 표시됩니다 (`bg-gray-50`, `border-b-2 border-gray-300`)\n- 헤더 높이는 `h-60` (60px)로 설정\n- 각 행은 `PurchaseHistoryRowOrg` 컴포넌트로 렌더링됩니다\n- 그리드 컬럼: `[120px_160px_1fr_140px_120px_100px]`\n  - 구매 요청일(120px), 요청인(160px), 구매 물품(1fr), 총 금액(140px), 구매 승인일(120px), 담당자(100px)\n- 컬럼 간 간격은 `gap-16` (16px)\n\n**모바일/태블릿 레이아웃:**\n- 헤더는 숨겨지고 (`hidden desktop:grid`)\n- 각 아이템이 독립적인 카드로 표시됩니다\n- 카드 내부에 필드명이 함께 표시되어 헤더가 불필요합니다\n\n**포함된 케이스:**\n1. **승인된 일반 요청**: 김스낵의 2개 상품 구매 (21,000원)\n2. **긴급 승인 요청**: 이개발의 3개 상품 긴급 구매 (45,000원) - 같은 날 6시간 내 승인\n3. **승인 대기 요청**: 박디자인의 1개 상품 구매 (15,000원) - 담당자 미배정\n\n**인터랙션:**\n- 각 행 클릭 시 `/{companyId}/purchase-history/{itemId}` 경로로 이동\n- 키보드 접근성 지원 (Tab으로 포커스 이동, Enter/Space로 활성화)\n- Hover 시 배경색 변경 (`hover:bg-gray-50`)',
      },
    },
  },
};

export const EmptyList: Story = {
  args: {
    items: [],
    companyId: 'company-1',
    currentPage: 1,
    totalPages: 1,
    onPageChange: () => {
      // eslint-disable-next-line no-console
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '빈 리스트 상태입니다. 구매 내역이 없을 때의 UI를 보여줍니다.\n\n**현재 동작:**\n- 데스크톱에서는 헤더만 표시되고 아이템이 없습니다\n- 모바일/태블릿에서는 아무것도 표시되지 않습니다\n\n**개선 고려사항:**\n- 향후 "구매 내역이 없습니다" 같은 EmptyState 컴포넌트를 추가할 수 있습니다\n- 빈 상태일 때도 헤더를 숨기거나, 안내 메시지를 표시하는 것이 UX 개선에 도움이 될 수 있습니다\n\n**실무 활용:**\n- 신규 회사나 사용자의 초기 상태\n- 필터링 결과가 없을 때\n- 특정 기간에 구매 내역이 없는 경우',
      },
    },
  },
};

export const UrgentRequest: Story = {
  args: {
    items: [
      createPurchaseItem(
        '1',
        'APPROVED',
        2,
        21000,
        '2025-07-05T00:00:00.000Z',
        '2025-07-05T06:00:00.000Z',
        true,
        '김스낵',
        approvers.김코드
      ),
      createPurchaseItem(
        '2',
        'APPROVED',
        3,
        45000,
        '2025-07-03T00:00:00.000Z',
        '2025-07-03T06:00:00.000Z',
        true,
        '이개발',
        approvers.김코드
      ),
      createPurchaseItem(
        '3',
        'PENDING',
        1,
        15000,
        '2025-07-08T00:00:00.000Z',
        '2025-07-08T00:00:00.000Z',
        true,
        '박디자인'
      ),
    ],
    companyId: 'company-1',
    currentPage: 1,
    totalPages: 1,
    onPageChange: () => {
      // eslint-disable-next-line no-console
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '긴급 요청이 포함된 구매 내역 리스트입니다. 모든 아이템이 urgent=true로 설정되어 있습니다.\n\n**긴급 요청 표시:**\n- 각 행의 요청인 옆에 StatusTag 컴포넌트로 "즉시 요청" 태그가 표시됩니다\n- 태그 스타일: 배경색 `bg-[#F2F6FF]`, 텍스트 색상 `text-[#4C8AE1]`\n- 태그 크기: `text-12`로 작게 표시되어 주요 정보를 방해하지 않음\n\n**포함된 케이스:**\n1. **긴급 승인 완료**: 김스낵의 긴급 요청 - 같은 날 6시간 내 승인 처리\n2. **긴급 승인 완료**: 이개발의 긴급 요청 - 같은 날 6시간 내 승인 처리\n3. **긴급 승인 대기**: 박디자인의 긴급 요청 - 아직 승인 대기 중\n\n**데스크톱 레이아웃:**\n- 요청인 컬럼에서 이름과 긴급 태그가 `flex items-center gap-8`로 수평 정렬\n- 긴급 태그가 여러 행에 표시되어 시각적으로 강조됨\n\n**모바일/태블릿 레이아웃:**\n- 각 카드의 요청인 필드에 긴급 태그가 함께 표시\n- RequesterWithUrgentTag 컴포넌트를 통해 일관된 표시\n\n**실무 활용:**\n- 긴급 요청만 필터링하여 확인\n- 긴급 요청의 처리 속도 모니터링\n- 우선순위가 높은 구매 건 관리',
      },
    },
  },
};

export const LongList: Story = {
  args: {
    items: Array.from({ length: 10 }, (_, i) =>
      createPurchaseItem(
        `${i + 1}`,
        i % 3 === 0 ? 'PENDING' : 'APPROVED',
        Math.floor(Math.random() * 5) + 1,
        Math.floor(Math.random() * 100000) + 10000,
        `2025-07-${String(i + 1).padStart(2, '0')}T00:00:00.000Z`,
        `2025-07-${String(i + 2).padStart(2, '0')}T00:00:00.000Z`,
        i % 4 === 0,
        `사용자${i + 1}`,
        i % 3 === 0 ? undefined : Object.values(approvers)[i % 3]
      )
    ),
    companyId: 'company-1',
    currentPage: 1,
    totalPages: 3,
    onPageChange: () => {
      // eslint-disable-next-line no-console
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '10개의 구매 내역을 표시하는 긴 리스트입니다.\n\n**스크롤 동작:**\n- 데스크톱에서는 테이블 형태로 긴 리스트가 스크롤됩니다\n- 헤더는 고정되지 않으며 함께 스크롤됩니다 (sticky header는 미구현)\n- 각 행의 높이는 `h-100` (100px)로 고정되어 일관된 레이아웃 유지\n\n**다양한 상태 포함:**\n- **PENDING 상태**: 3개마다 1개씩 (인덱스 0, 3, 6, 9)\n- **긴급 요청**: 4개마다 1개씩 (인덱스 0, 4, 8)\n- **승인자 없음**: PENDING 상태와 동일하게 3개마다 1개\n- **랜덤 금액**: 10,000원 ~ 100,000원 사이\n- **랜덤 상품 수**: 1개 ~ 5개\n\n**성능 고려사항:**\n- 현재는 모든 아이템이 한 번에 렌더링됩니다\n- 실제 서비스에서는 10개 이상의 데이터가 있을 때 페이지네이션이 필요합니다\n- 가상 스크롤링(virtual scrolling)을 고려할 수 있습니다\n\n**실무 활용:**\n- 월별 또는 분기별 구매 내역 조회\n- 대량의 구매 내역을 한눈에 확인\n- 스크롤을 통한 과거 내역 탐색',
      },
    },
  },
};

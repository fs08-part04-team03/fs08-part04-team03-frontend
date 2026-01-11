import type { Meta, StoryObj } from '@storybook/nextjs';
import type { PurchaseRequestItem } from '@/features/purchase/api/purchase.api';
import { COMMON_SORT_OPTIONS } from '@/constants/sort';
import PurchaseHistoryTem from './PurchaseHistoryTem';

const meta = {
  title: 'Features/PurchaseHistory/Template/PurchaseHistoryTem',
  component: PurchaseHistoryTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/company-1/purchase-history',
        params: {},
      },
    },
    docs: {
      description: {
        component:
          '구매 내역 확인 페이지의 전체 템플릿 컴포넌트입니다.\n\n**구성 요소:**\n- **PurchaseHistoryListTopOrg**: 상단 통계 섹션 (이번 달 예산, 지출액, 올해 총 지출액)\n- **PurchaseHistoryListBottomOrg**: 하단 구매 내역 리스트 및 페이지네이션\n\n**주요 기능:**\n- 예산 및 지출 통계 표시\n- 구매 내역 리스트 표시\n- 정렬 기능 제공\n- 페이지네이션 지원\n\n**반응형 레이아웃:**\n- 모바일: 세로 배치, 카드 형태로 정보 표시\n- 태블릿: 그리드 레이아웃으로 정보 구조화\n- 데스크톱: 테이블 형태로 한눈에 정보 확인',
      },
    },
  },
} satisfies Meta<typeof PurchaseHistoryTem>;

export default meta;

type Story = StoryObj<typeof PurchaseHistoryTem>;

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
    thisMonthBudget: 1000000,
    lastMonthBudget: 2000000,
    thisMonthSpending: 126000,
    lastMonthSpending: 2000000,
    thisYearTotalSpending: 10000000,
    lastYearTotalSpending: 4000000,
    selectedSort: COMMON_SORT_OPTIONS[0],
    onSortChange: () => {
      // eslint-disable-next-line no-console
    },
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
          '기본 구매 내역 확인 페이지입니다.\n\n**상단 통계:**\n- 이번 달 예산: 1,000,000원\n- 이번 달 지출액: 126,000원 (진행률 13%)\n- 올해 총 지출액: 10,000,000원 (작년보다 6,000,000원 증가)\n\n**구매 내역 리스트:**\n- 3개의 구매 내역 표시\n- 승인된 일반 요청, 긴급 요청, 승인 대기 요청 포함\n\n**레이아웃:**\n- 상단 통계 카드와 하단 리스트가 세로로 배치\n- 컴포넌트 간 간격: 모바일 24px, 태블릿 32px, 데스크톱 40px',
      },
    },
  },
};

export const WithPagination: Story = {
  args: {
    thisMonthBudget: 1000000,
    lastMonthBudget: 2000000,
    thisMonthSpending: 500000,
    lastMonthSpending: 150000,
    thisYearTotalSpending: 5000000,
    lastYearTotalSpending: 6000000,
    selectedSort: COMMON_SORT_OPTIONS[0],
    onSortChange: () => {
      // eslint-disable-next-line no-console
    },
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
        i % 3 === 0 ? undefined : Object.values(approvers)[(i % 3) - 1]
      )
    ),
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
          '페이지네이션이 있는 구매 내역 확인 페이지입니다.\n\n**특징:**\n- 10개의 구매 내역 표시\n- 총 3페이지로 구성\n- 하단에 페이지네이션 컴포넌트 표시\n\n**페이지네이션:**\n- 현재 페이지: 1\n- 전체 페이지: 3\n- Prev/Next 버튼으로 페이지 이동 가능',
      },
    },
  },
};

export const EmptyList: Story = {
  args: {
    thisMonthBudget: 1000000,
    lastMonthBudget: 1000000,
    thisMonthSpending: 0,
    lastMonthSpending: 0,
    thisYearTotalSpending: 0,
    lastYearTotalSpending: 0,
    selectedSort: COMMON_SORT_OPTIONS[0],
    onSortChange: () => {
      // eslint-disable-next-line no-console
    },
    items: [],
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
          '구매 내역이 없는 상태입니다.\n\n**상단 통계:**\n- PurchaseHistoryListTopOrg 컴포넌트 표시\n- 모든 지출액이 0원\n- 예산은 설정되어 있지만 사용하지 않은 상태\n\n**하단 영역:**\n- PurchaseHistoryListOrg는 숨김\n- StatusNotice 컴포넌트로 빈 상태 메시지 표시\n- 제목: "구매 내역이 없어요"\n- 설명: "구매 요청을 승인하고\\n상품을 주문해 보세요"\n- 버튼: "상품으로 이동" - 클릭 시 상품 리스트 페이지로 이동',
      },
    },
  },
};

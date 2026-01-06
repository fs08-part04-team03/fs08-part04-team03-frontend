import type { Meta, StoryObj } from '@storybook/nextjs';
import { COMMON_SORT_OPTIONS } from '@/constants/sort';
import PurchaseHistoryListTopOrg from './PurchaseHistoryListTopOrg';

const meta = {
  title: 'Features/PurchaseHistory/Organisms/PurchaseHistoryListTopOrg',
  component: PurchaseHistoryListTopOrg,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '구매 내역 확인 페이지의 상단 통계 섹션 컴포넌트입니다. 예산 및 지출 관련 통계를 카드 형태로 표시합니다.\n\n**주요 기능:**\n- 이번 달 예산, 이번 달 지출액, 올해 총 지출액을 3개의 카드로 표시\n- 이번 달 지출액 카드에는 진행률 표시바(ProgressBar) 포함\n- 정렬 드롭다운을 통해 구매 내역 정렬 기능 제공\n- 작년 대비 지출 비교 메시지 표시\n\n**반응형 레이아웃:**\n- **모바일**: 카드가 세로로 1열 배치 (`grid-cols-1`)\n- **태블릿/데스크탑**: 카드가 가로로 3열 배치 (`tablet:grid-cols-3 desktop:grid-cols-3`)\n- 카드 간 간격: 모바일 `gap-12`, 태블릿 `gap-16`, 데스크탑 `gap-20`\n\n**카드 구성:**\n- 각 카드는 `bg-white rounded-8 border border-gray-200` 스타일\n- 패딩: 모바일 `p-16`, 태블릿 `p-20`, 데스크탑 `p-24`\n- 제목, 금액, 설명 텍스트로 구성\n\n**사용 시나리오:**\n- 구매 내역 페이지 상단에 배치되어 전체적인 예산 현황을 한눈에 파악\n- 관리자가 월별 예산 사용률을 모니터링\n- 연간 지출 추이를 확인하여 예산 계획 수립에 활용',
      },
    },
  },
  argTypes: {
    thisMonthBudget: {
      control: 'number',
      description: '이번 달 예산 (원 단위)',
    },
    lastMonthBudget: {
      control: 'number',
      description: '지난 달 예산 (원 단위)',
    },
    thisMonthSpending: {
      control: 'number',
      description: '이번 달 지출액 (원 단위)',
    },
    lastMonthSpending: {
      control: 'number',
      description: '지난 달 지출액 (원 단위)',
    },
    thisYearTotalSpending: {
      control: 'number',
      description: '올해 총 지출액 (원 단위)',
    },
    lastYearTotalSpending: {
      control: 'number',
      description: '작년 총 지출액 (원 단위)',
    },
    selectedSort: {
      control: 'object',
      description: '선택된 정렬 옵션 (COMMON_SORT_OPTIONS 중 하나)',
    },
    onSortChange: {
      action: 'sort changed',
      description: '정렬 옵션 변경 핸들러',
    },
  },
} satisfies Meta<typeof PurchaseHistoryListTopOrg>;

export default meta;

type Story = StoryObj<typeof PurchaseHistoryListTopOrg>;

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
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 구매 내역 통계를 표시합니다.\n\n**이번 달 예산 카드:**\n- 예산: 1,000,000원 (100만원)\n- 지난 달 예산: 2,000,000원 (200만원)\n- "지난 달 예산은 2,000,000원 이었어요" 메시지 표시\n- 폰트 크기: 모바일 `text-24`, 태블릿 `text-28`, 데스크탑 `text-32`\n\n**이번 달 지출액 카드:**\n- 지출액: 126,000원\n- 지난 달 지출액: 2,000,000원\n- 진행률 계산: `Math.round((126000 / 1000000) * 100) = 13%`\n- ProgressBar 컴포넌트로 진행률 시각화\n- 남은 예산: `Math.max(0, 1000000 - 126000) = 874,000원`\n- 지난 달 남은 예산: `Math.max(0, 2000000 - 2000000) = 0원`\n- ProgressBar에 currentBudget, lastBudget 전달하여 비교 표시\n\n**올해 총 지출액 카드:**\n- 올해 총 지출: 10,000,000원 (1,000만원)\n- 작년 총 지출: 4,000,000원 (400만원)\n- 차이: 6,000,000원 (600만원)\n- "작년보다 6,000,000원 더 지출했어요" 메시지 표시\n- yearOverYearDiff > 0 조건으로 증가 메시지 표시\n\n**정렬 드롭다운:**\n- 우측 상단에 배치 (`flex items-center justify-between`)\n- COMMON_SORT_OPTIONS[0] (기본값: 최신순) 선택됨\n- variant="small"로 작은 크기 드롭다운 사용',
      },
    },
  },
};

export const LowSpending: Story = {
  args: {
    thisMonthBudget: 1000000,
    lastMonthBudget: 2000000,
    thisMonthSpending: 50000,
    lastMonthSpending: 150000,
    thisYearTotalSpending: 5000000,
    lastYearTotalSpending: 6000000,
    selectedSort: COMMON_SORT_OPTIONS[0],
    onSortChange: () => {
      // eslint-disable-next-line no-console
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '지출액이 낮은 경우를 보여줍니다.\n\n**이번 달 지출액 카드:**\n- 지출액: 50,000원\n- 진행률: `(50000 / 1000000) * 100 = 5%`\n- 예산 대비 매우 낮은 사용률로 ProgressBar가 거의 비어있음\n- 남은 예산: 950,000원 (95% 남음)\n\n**올해 총 지출액 카드:**\n- 올해 총 지출: 5,000,000원\n- 작년 총 지출: 6,000,000원\n- 차이: -1,000,000원 (100만원 절감)\n- yearOverYearDiff < 0 조건으로 "작년보다 1,000,000원 덜 지출했어요" 메시지 표시\n- 절감 효과를 강조하는 긍정적인 메시지\n\n**실무 활용:**\n- 예산 절감 성과 확인\n- 효율적인 예산 관리 사례\n- 분기 초 또는 월 초 상태',
      },
    },
  },
};

export const HighSpending: Story = {
  args: {
    thisMonthBudget: 1000000,
    lastMonthBudget: 800000,
    thisMonthSpending: 950000,
    lastMonthSpending: 750000,
    thisYearTotalSpending: 15000000,
    lastYearTotalSpending: 10000000,
    selectedSort: COMMON_SORT_OPTIONS[0],
    onSortChange: () => {
      // eslint-disable-next-line no-console
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '지출액이 높은 경우를 보여줍니다.\n\n**이번 달 지출액 카드:**\n- 지출액: 950,000원\n- 진행률: `(950000 / 1000000) * 100 = 95%`\n- 예산의 95% 사용으로 ProgressBar가 거의 가득 참\n- 남은 예산: 50,000원 (5% 남음)\n- 지난 달 남은 예산: 50,000원 (800000 - 750000)\n- 예산 초과 위험 상태를 시각적으로 경고\n\n**올해 총 지출액 카드:**\n- 올해 총 지출: 15,000,000원 (1,500만원)\n- 작년 총 지출: 10,000,000원 (1,000만원)\n- 차이: 5,000,000원 (500만원 증가)\n- "작년보다 5,000,000원 더 지출했어요" 메시지 표시\n\n**실무 활용:**\n- 예산 초과 위험 경고\n- 지출 패턴 분석\n- 추가 예산 요청 근거 자료',
      },
    },
  },
};

export const SameAsLastYear: Story = {
  args: {
    thisMonthBudget: 1000000,
    lastMonthBudget: 1000000,
    thisMonthSpending: 500000,
    lastMonthSpending: 500000,
    thisYearTotalSpending: 5000000,
    lastYearTotalSpending: 5000000,
    selectedSort: COMMON_SORT_OPTIONS[0],
    onSortChange: () => {
      // eslint-disable-next-line no-console
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '작년과 동일한 지출액을 보여줍니다.\n\n**올해 총 지출액 카드:**\n- 올해 총 지출: 5,000,000원\n- 작년 총 지출: 5,000,000원\n- 차이: 0원\n- yearOverYearDiff === 0 조건으로 "작년과 동일하게 지출했어요" 메시지 표시\n- 안정적인 지출 패턴을 나타냄\n\n**이번 달/지난 달 예산:**\n- 동일한 예산(1,000,000원)과 지출액(500,000원)으로 일관된 패턴 표시\n- 진행률: 50%로 중간 수준\n\n**실무 활용:**\n- 예측 가능한 지출 패턴 확인\n- 예산 계획의 정확성 검증\n- 안정적인 재무 상태 표시',
      },
    },
  },
};

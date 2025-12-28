import type { Meta, StoryObj } from '@storybook/nextjs';
import type { Option } from '@/components/atoms/DropDown/DropDown';
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
          '구매 내역 확인 페이지의 상단 통계 섹션 컴포넌트입니다. 이번 달 예산, 이번 달 지출액, 올해 총 지출액을 카드 형태로 표시합니다.\n\n**주요 기능:**\n- 모바일: 카드가 세로로 1열 배치됩니다.\n- 태블릿/데스크탑: 카드가 가로로 3열 배치됩니다.\n- 이번 달 지출액 카드에는 진행률 표시바가 포함됩니다.\n- 정렬 드롭다운을 통해 구매 내역 정렬 기능을 제공합니다 (최신순, 낮은 가격순, 높은 가격순).',
      },
    },
  },
  argTypes: {
    thisMonthBudget: {
      control: 'number',
      description: '이번 달 예산',
    },
    lastMonthBudget: {
      control: 'number',
      description: '지난 달 예산',
    },
    thisMonthSpending: {
      control: 'number',
      description: '이번 달 지출액',
    },
    lastMonthSpending: {
      control: 'number',
      description: '지난 달 지출액',
    },
    thisYearTotalSpending: {
      control: 'number',
      description: '올해 총 지출액',
    },
    lastYearTotalSpending: {
      control: 'number',
      description: '작년 총 지출액',
    },
    selectedSort: {
      control: 'object',
      description: '선택된 정렬 옵션',
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
    onSortChange: (option: Option) => {
      // eslint-disable-next-line no-console
      console.log('정렬 변경:', option);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '기본 구매 내역 통계를 표시합니다. 이번 달 예산은 1,000,000원, 지출액은 126,000원이며, 진행률 표시바가 표시됩니다. 올해 총 지출액은 작년보다 6,000,000원 더 지출한 상태입니다.',
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
    onSortChange: (option: Option) => {
      // eslint-disable-next-line no-console
      console.log('정렬 변경:', option);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '지출액이 낮은 경우를 보여줍니다. 이번 달 지출액이 예산 대비 매우 낮고(5%), 작년보다 덜 지출한 상태입니다.',
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
    onSortChange: (option: Option) => {
      // eslint-disable-next-line no-console
      console.log('정렬 변경:', option);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '지출액이 높은 경우를 보여줍니다. 이번 달 지출액이 예산의 95%에 달하며, 진행률 표시바가 거의 가득 찬 상태입니다. 작년보다 5,000,000원 더 지출했습니다.',
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
    onSortChange: (option: Option) => {
      // eslint-disable-next-line no-console
      console.log('정렬 변경:', option);
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          '작년과 동일한 지출액을 보여줍니다. 올해 총 지출액이 작년과 정확히 같아 "작년과 동일하게 지출했어요" 메시지가 표시됩니다.',
      },
    },
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs';
import BudgetFormOrg from './BudgetFormOrg';

const meta: Meta<typeof BudgetFormOrg> = {
  title: 'Features/Admin/Budget/BudgetFormOrg',
  component: BudgetFormOrg,
  argTypes: {
    initialThisMonthBudget: {
      control: { type: 'number' },
      description: '초기 이번 달 예산 설정값입니다.',
    },
    initialMonthlyStartBudget: {
      control: { type: 'number' },
      description: '초기 매달 시작 예산 설정값입니다.',
    },
    onSubmit: {
      description:
        '수정하기 버튼 클릭 시 호출되는 콜백 함수입니다. 입력된 예산 정보를 객체로 전달합니다.',
    },
  },
  args: {
    onSubmit: () => alert('수정하기 클릭됨'),
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
### 개요
관리자 페이지의 예산 설정 폼 컴포넌트입니다.

### 주요 특징
*   모바일, 태블릿, 데스크탑 등 모든 환경에서 반응형을 제공합니다.
*   입력 편의성을 위해 한글 포맷팅 기능을 내장합니다.

### 인터랙션
*   수정하기 버튼 클릭: \`onSubmit\` 콜백 함수를 호출합니다.
        `,
      },
    },
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BudgetFormOrg>;

/**
 * **기본 상태 (Default)**
 *
 * - 초기값이 없는 상태입니다.
 * - 반응형 뷰포트를 조절하며 각 브레이크포인트에서의 변화를 확인할 수 있습니다.
 */
export const Default: Story = {
  render: (args) => (
    <BudgetFormOrg
      initialThisMonthBudget={args.initialThisMonthBudget}
      initialMonthlyStartBudget={args.initialMonthlyStartBudget}
      onSubmit={args.onSubmit}
    />
  ),
};

/**
 * **데이터가 있는 상태 (With Data)**
 *
 * - 초기 예산 데이터가 주입된 상태입니다.
 * - 천 단위 콤마 포맷팅이 적용되어 표시됩니다.
 */
export const WithData: Story = {
  args: {
    initialThisMonthBudget: 1500000,
    initialMonthlyStartBudget: 2000000,
  },
  render: (args) => (
    <BudgetFormOrg
      initialThisMonthBudget={args.initialThisMonthBudget}
      initialMonthlyStartBudget={args.initialMonthlyStartBudget}
      onSubmit={args.onSubmit}
    />
  ),
};

import type { Meta, StoryObj } from '@storybook/nextjs';
import BudgetFormOrg from './BudgetFormOrg';

const meta: Meta<typeof BudgetFormOrg> = {
  title: 'Features/Admin/Budget/BudgetFormOrg',
  component: BudgetFormOrg,
  argTypes: {
    onSubmit: {
      action: 'submitted',
      description:
        '수정하기 버튼 클릭 시 호출되는 콜백 함수입니다. 입력된 예산 정보를 객체로 전달합니다.',
    },
  },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '관리자 페이지의 예산 설정 폼 \n\n - 모바일, 태블릿, 데스크탑 등 모든 환경에서 반응형을 제공 \n\n - 입력 편의성을 위해 한글 포맷팅 기능을 내장',
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
 * - 반응형 뷰포트를 조절하며 각 브레이크포인트에서의 변화를 확인할 수 있습니다.
 */
export const Default: Story = {
  render: () => <BudgetFormOrg />,
};

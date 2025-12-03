import type { Meta, StoryObj } from '@storybook/nextjs';
import StepBreadcrumb from './StepBreadcrumb';

const meta = {
  title: 'Molecules/StepBreadcrumb',
  component: StepBreadcrumb,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    steps: {
      control: 'object',
      description: '단계 배열',
    },
    currentStep: {
      control: 'number',
      description: '현재 단계 (1-based index)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof StepBreadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

const checkoutSteps = [{ label: ' Shopping Cart' }, { label: ' Order Confirmed' }];

export const Step1: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 1,
  },
};

export const Step2: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 2,
  },
};

export const FourSteps: Story = {
  args: {
    steps: [{ label: '정보 입력' }, { label: '검토' }, { label: '결제' }, { label: '완료' }],
    currentStep: 2,
  },
};

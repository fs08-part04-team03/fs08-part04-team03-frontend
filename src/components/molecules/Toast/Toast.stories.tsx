import type { Meta, StoryObj } from '@storybook/nextjs';
import { Toast } from './Toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['error', 'success'],
    },
    amount: {
      control: 'text',
    },
    message: {
      control: 'text',
    },
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof Toast>;

/** ERROR TOAST */
export const ErrorToast: Story = {
  args: {
    variant: 'error',
    amount: '42000',
    message: '예산이 부족합니다. 수량을 줄이거나 항목을 제거해주세요.',
  },
};

/** SUCCESS TOAST */
export const SuccessToast: Story = {
  args: {
    variant: 'success',
    message: '예산이 변경되었습니다.',
  },
};

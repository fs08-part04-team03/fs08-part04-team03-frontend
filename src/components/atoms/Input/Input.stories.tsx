import type { Meta, StoryObj } from '@storybook/nextjs';
import Input from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['normal', 'typing', 'disable', 'completed', 'error'],
    },
    showIcon: {
      control: 'boolean',
    },
    icon: {
      control: false,
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  args: {
    variant: 'normal',
    text: '비밀번호 입력',
  },
};

export const Typing: Story = {
  args: {
    variant: 'typing',
    label: '비밀번호',
    value: 'hongseungjeon',
  },
};

export const Disable: Story = {
  args: {
    variant: 'disable',
    label: '비밀번호',
    value: '********',
  },
};

export const Completed: Story = {
  args: {
    variant: 'completed',
    label: '비밀번호',
    value: '********',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    label: '비밀번호',
    value: 'hongseungjeon',
    errorMessage: '비밀번호를 다시 확인해 주세요.',
  },
};

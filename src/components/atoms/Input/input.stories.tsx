import type { Meta, StoryObj } from '@storybook/nextjs';
import Input from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
    },
    placeholder: {
      control: 'text',
    },
    error: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '입력하세요',
  },
};

export const Error: Story = {
  args: {
    placeholder: '비밀번호를 입력하세요',
    error: true,
    value: 'wrong password',
  },
};
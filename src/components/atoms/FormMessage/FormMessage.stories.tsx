import type { Meta, StoryObj } from '@storybook/nextjs';
import FormMessage from './FormMessage';

const meta = {
  title: 'Atoms/FormMessage',
  component: FormMessage,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '메시지 내용',
      defaultValue: '입력값을 다시 확인해주세요.',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof FormMessage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '입력값을 다시 확인해주세요.',
  },
};

export const LongMessage: Story = {
  args: {
    children: '비밀번호는 8자 이상, 영문 대소문자와 숫자를 모두 포함해야 합니다.',
  },
};


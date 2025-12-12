import type { Meta, StoryObj } from '@storybook/nextjs';
import Label from './Label';

const meta = {
  title: 'Atoms/Label',
  component: Label,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '라벨 텍스트',
      defaultValue: '라벨 텍스트',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '이메일',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: '비밀번호',
    className: 'text-gray-700',
  },
};

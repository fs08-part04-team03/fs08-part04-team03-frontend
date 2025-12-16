import type { Meta, StoryObj } from '@storybook/nextjs';
import StatusTag from './StatusTag';

const meta = {
  title: 'Atoms/StatusTag',
  component: StatusTag,
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '태그에 표시할 텍스트',
      defaultValue: '상태',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof StatusTag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '대기',
  },
};

export const CustomText: Story = {
  args: {
    children: '완료',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: '지연',
    className: 'bg-gray-200 text-gray-900',
  },
};


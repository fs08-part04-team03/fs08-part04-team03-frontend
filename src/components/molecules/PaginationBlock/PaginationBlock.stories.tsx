import type { Meta, StoryObj } from '@storybook/nextjs';
import PaginationBlock from './PaginationBlock';

const meta: Meta<typeof PaginationBlock> = {
  title: 'Molecules/PaginationBlock',
  component: PaginationBlock,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    current: {
      control: { type: 'number' },
      description: '현재 페이지 번호',
    },
    total: {
      control: { type: 'number' },
      description: '전체 페이지 수',
    },
    onPrev: { action: 'Prev clicked' },
    onNext: { action: 'Next clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof PaginationBlock>;

export const Default: Story = {
  args: {
    current: 1,
    total: 10,
  },
};

export const MiddlePage: Story = {
  args: {
    current: 5,
    total: 10,
  },
};

export const LastPage: Story = {
  args: {
    current: 10,
    total: 10,
  },
};

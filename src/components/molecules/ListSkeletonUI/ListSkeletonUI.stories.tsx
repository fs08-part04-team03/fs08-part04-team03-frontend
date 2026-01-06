import type { Meta, StoryObj } from '@storybook/nextjs';
import ListSkeletonUI from './ListSkeletonUI';

const meta: Meta<typeof ListSkeletonUI> = {
  title: 'Molecules/ListSkeletonUI',
  component: ListSkeletonUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    rows: {
      control: 'number',
      description: '스켈레톤 행 개수',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rows: 5,
  },
};

export const ThreeRows: Story = {
  args: {
    rows: 3,
  },
};

export const TenRows: Story = {
  args: {
    rows: 10,
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs';
import { SkeletonUI } from './SkeletonUI';

const meta = {
  title: 'Atoms/SkeletonUI/Skeleton',
  component: SkeletonUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof SkeletonUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <SkeletonUI className="w-200 h-20" />,
};

export const Circle: Story = {
  render: () => <SkeletonUI className="w-48 h-48 rounded-full" />,
};

export const TextLines: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-300">
      <SkeletonUI className="h-16 w-full" />
      <SkeletonUI className="h-16 w-4/5" />
      <SkeletonUI className="h-16 w-3/5" />
    </div>
  ),
};

export const Card: Story = {
  render: () => (
    <div className="flex flex-col gap-12 w-300">
      <SkeletonUI className="h-150 w-full" />
      <div className="flex flex-col gap-8">
        <SkeletonUI className="h-20 w-3/4" />
        <SkeletonUI className="h-16 w-1/2" />
      </div>
    </div>
  ),
};

export const Avatar: Story = {
  render: () => (
    <div className="flex items-center gap-12">
      <SkeletonUI className="w-40 h-40 rounded-full" />
      <div className="flex flex-col gap-6">
        <SkeletonUI className="h-16 w-120" />
        <SkeletonUI className="h-14 w-80" />
      </div>
    </div>
  ),
};

export const Table: Story = {
  render: () => (
    <div className="flex flex-col gap-8 w-600">
      <SkeletonUI className="h-40 w-full" />
      <SkeletonUI className="h-32 w-full" />
      <SkeletonUI className="h-32 w-full" />
      <SkeletonUI className="h-32 w-full" />
      <SkeletonUI className="h-32 w-full" />
    </div>
  ),
};

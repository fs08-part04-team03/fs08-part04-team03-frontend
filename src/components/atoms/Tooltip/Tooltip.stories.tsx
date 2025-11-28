import type { Meta, StoryObj } from '@storybook/nextjs';
import { Tooltip } from './Tooltip';
import Button from '../Button/Button';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    content: {
      control: 'text',
    },
    className: {
      control: 'text',
    },
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default Example
export const Default: Story = {
  args: {
    content: '툴팁 내용',
    children: <Button variant="primary">호버하세요</Button>,
  },
  render: (args) => (
    <div className="flex justify-center items-center min-h-200">
      <Tooltip content={args.content} className={args.className}>
        {args.children}
      </Tooltip>
    </div>
  ),
};

// Long Text Example
export const LongText: Story = {
  args: {
    content: '이것은 매우 긴 툴팁 텍스트입니다. 여러 줄에 걸쳐 표시될 수 있습니다.',
    children: <Button variant="secondary">긴 텍스트 툴팁</Button>,
  },
  render: (args) => (
    <div className="flex justify-center items-center min-h-200">
      <Tooltip content={args.content}>{args.children}</Tooltip>
    </div>
  ),
};

// Multiple Lines Example
export const MultipleLines: Story = {
  args: {
    content: (
      <>
        <p className="text-16 font-extrabold tracking-tight">첫 번째 줄</p>
        <p className="text-14 font-normal tracking--0.35">두 번째 줄</p>
        <p className="text-14 font-normal tracking--0.35">세 번째 줄</p>
      </>
    ),
    children: <Button variant="primary">여러 줄 툴팁</Button>,
  },
  render: (args) => (
    <div className="flex justify-center items-center min-h-200">
      <Tooltip content={args.content}>{args.children}</Tooltip>
    </div>
  ),
};

// Custom Styling
export const CustomClassName: Story = {
  args: {
    content: '커스텀 스타일 툴팁',
    children: <Button variant="secondary">커스텀 스타일</Button>,
    className: 'bg-secondary-500 text-white',
  },
  render: (args) => (
    <div className="flex justify-center items-center min-h-200">
      <Tooltip content={args.content} className={args.className}>
        {args.children}
      </Tooltip>
    </div>
  ),
};

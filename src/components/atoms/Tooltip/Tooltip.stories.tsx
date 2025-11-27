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
    disabled: {
      control: 'boolean',
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

// Basic Examples
export const LongText: Story = {
  args: {
    content: '이것은 매우 긴 툴팁 텍스트입니다. 여러 줄에 걸쳐 표시될 수 있습니다.',
    children: <Button variant="secondary">텍스트 툴팁</Button>,
  },
  render: (args) => (
    <Tooltip content={args.content} disabled={args.disabled} className={args.className}>
      {args.children}
    </Tooltip>
  ),
};

// States
export const Disabled: Story = {
  args: {
    content: '',
    children: <Button variant="primary">버튼</Button>,
    disabled: true,
  },
  render: () => (
    <Tooltip content="이 툴팁은 비활성화되어 있습니다" disabled>
      <Button variant="primary" inactive>
        비활성화된 버튼
      </Button>
    </Tooltip>
  ),
};

// Custom Styling
export const CustomClassName: Story = {
  args: {
    content: '',
    children: <Button variant="secondary">버튼</Button>,
    className: 'bg-blue-500 text-white',
  },
  render: () => (
    <Tooltip content="커스텀 스타일 툴팁" className="bg-blue-500 text-white">
      <Button variant="secondary">커스텀 스타일</Button>
    </Tooltip>
  ),
};

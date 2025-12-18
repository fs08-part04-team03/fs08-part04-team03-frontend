import type { Meta, StoryObj } from '@storybook/nextjs';
import StatusTag from './StatusTag';

const meta = {
  title: 'Atoms/StatusTag',
  component: StatusTag,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '상태를 표시하는 태그 컴포넌트입니다. 4가지 variant를 지원하며, 각 variant는 자동으로 해당하는 아이콘(15px)을 표시합니다.\n\n- `approved`: 승인 상태 (파란색 배경 `bg-blue-100`, 파란색 텍스트 `text-blue-200`, check-circle 아이콘)\n- `rejected`: 거절 상태 (검은색 배경 `bg-black-100`, 회색 텍스트 `text-gray-50`, close-circle 아이콘)\n- `urgent`: 긴급 상태 (빨간색 배경 `bg-red-100`, 빨간색 텍스트 `text-red`, urgent 아이콘)\n- `pending`: 대기 상태 (회색 배경 `bg-gray-100`, 진한 회색 텍스트 `text-gray-950`, time 아이콘, 기본값)',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['approved', 'rejected', 'urgent', 'pending'],
      description: '상태 태그 variant',
      table: {
        type: { summary: "'approved' | 'rejected' | 'urgent' | 'pending'" },
        defaultValue: { summary: 'pending' },
      },
    },
    children: {
      control: 'text',
      description: '태그에 표시할 텍스트',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof StatusTag>;

export default meta;

type Story = StoryObj<typeof StatusTag>;

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-24">
      <div className="flex items-center gap-16">
        <span className="text-14 text-gray-700 w-80 font-medium">승인 (approved):</span>
        <StatusTag variant="approved">승인</StatusTag>
        <span className="text-12 text-gray-500 ml-8">
          bg-blue-100, text-blue-200, check-circle.svg
        </span>
      </div>
      <div className="flex items-center gap-16">
        <span className="text-14 text-gray-700 w-80 font-medium">거절 (rejected):</span>
        <StatusTag variant="rejected">거절</StatusTag>
        <span className="text-12 text-gray-500 ml-8">
          bg-black-100, text-gray-50, close-circle.svg
        </span>
      </div>
      <div className="flex items-center gap-16">
        <span className="text-14 text-gray-700 w-80 font-medium">긴급 (urgent):</span>
        <StatusTag variant="urgent">긴급</StatusTag>
        <span className="text-12 text-gray-500 ml-8">bg-red-100, text-red-200, urgent.svg</span>
      </div>
      <div className="flex items-center gap-16">
        <span className="text-14 text-gray-700 w-80 font-medium">대기 (pending):</span>
        <StatusTag variant="pending">대기</StatusTag>
        <span className="text-12 text-gray-500 ml-8">bg-gray-100, text-gray-950, time.svg</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          '모든 variant를 한 번에 확인할 수 있습니다. 각 variant는 자동으로 해당하는 아이콘(15px × 15px)을 텍스트 앞에 표시합니다.',
      },
    },
  },
};

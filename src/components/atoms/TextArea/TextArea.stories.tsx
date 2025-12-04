import type { Meta, StoryObj } from '@storybook/nextjs';
import TextArea from './TextArea';

const meta = {
  title: 'Atoms/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: '입력 필드의 placeholder 텍스트',
    },
    error: {
      control: 'boolean',
      description: '에러 상태 표시 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '문의 내용을 입력해주세요.',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: '문의 내용을 입력해주세요.',
    defaultValue: '기본으로 입력된 텍스트입니다.',
  },
};

export const WithError: Story = {
  args: {
    placeholder: '문의 내용을 입력해주세요.',
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '문의 내용을 입력해주세요.',
    defaultValue: '입력이 비활성화된 상태입니다.',
    disabled: true,
  },
};


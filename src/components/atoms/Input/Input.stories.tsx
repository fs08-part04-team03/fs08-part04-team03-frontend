import type { Meta, StoryObj } from '@storybook/nextjs';
import Input from './Input';

const meta = {
  title: 'Atoms/Input',
  component: Input,
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
    type: {
      control: 'text',
      description: '입력 필드 타입',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '입력하세요',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: '비밀번호',
    defaultValue: '비밀번호를 입력해주세요',
  },
};

export const Error: Story = {
  args: {
    placeholder: '비밀번호',
    defaultValue: '비밀번호를 입력해주세요',
    error: true,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '비밀번호',
    defaultValue: '********',
    disabled: true,
  },
};

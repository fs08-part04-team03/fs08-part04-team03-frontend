import type { Meta, StoryObj } from '@storybook/nextjs';
import Button from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'radio',
      options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl', 'signup'],
    },
    inactive: {
      control: 'boolean',
    },
    rightIcon: {
      control: false,
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary 버튼',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary 버튼',
    variant: 'secondary',
    size: 'md',
  },
};
export const Signup: Story = {
  args: {
    children: 'Signup 버튼',
    variant: 'primary',
    size: 'signup',
  },
};

export const WithRightIcon: Story = {
  args: {
    children: '아이콘 포함',
    // extra 의존성 안 타려고 간단한 텍스트 아이콘만 사용
    rightIcon: <span className="text-base">★</span>,
  },
};

export const Inactive: Story = {
  args: {
    children: 'Inactive 버튼',
    inactive: true,
  },
};

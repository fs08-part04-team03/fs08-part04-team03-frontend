import type { Meta, StoryObj } from '@storybook/nextjs';
import Button, { MoreButton, SignupButton } from './Button';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'signup'],
    },
    size: {
      control: 'radio',
      options: [
        '5xs',
        '4xs',
        '3xs',
        '2xs',
        'xs',
        'sm',
        'base',
        'md',
        'lg',
        'xl',
        '2xl',
        '3xl',
        'signup',
      ],
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
export const More: Story = {
  args: {
    children: '더보기',
    variant: 'secondary',
    size: 'md',
  },
};

export const Signup: Story = {
  args: {
    children: 'Signup 버튼',
    variant: 'signup',
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

// MoreButton 컴포넌트 스토리
export const MoreButtonStory: Story = {
  render: (args) => (
    <MoreButton
      size={args.size}
      inactive={args.inactive}
      className={args.className}
      onClick={args.onClick}
      onFocus={args.onFocus}
      onBlur={args.onBlur}
      id={args.id}
      aria-label={args['aria-label']}
    />
  ),
  args: {
    size: 'md',
  },
};

// SignupButton 컴포넌트 스토리
export const SignupButtonStory: Story = {
  render: (args) => (
    <SignupButton
      inactive={args.inactive}
      rightIcon={args.rightIcon}
      className={args.className}
      onClick={args.onClick}
      onFocus={args.onFocus}
      onBlur={args.onBlur}
      id={args.id}
      aria-label={args['aria-label']}
    >
      {args.children}
    </SignupButton>
  ),
  args: {
    children: '상품등록',
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs';
import Image from 'next/image';
import Button, { SignupButton } from './Button';

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
      options: ['sm', 'md', 'lg'],
    },
    fullWidth: {
      control: 'boolean',
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

// Variants
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
    variant: 'signup',
  },
};

// Sizes
export const Small: Story = {
  args: {
    children: 'Small 버튼',
    size: 'sm',
    variant: 'primary',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium 버튼',
    size: 'md',
    variant: 'primary',
  },
};

export const Large: Story = {
  args: {
    children: 'Large 버튼',
    size: 'lg',
    variant: 'primary',
  },
};

// States
export const Inactive: Story = {
  args: {
    children: 'Inactive 버튼',
    inactive: true,
    variant: 'primary',
  },
};

export const InactiveSecondary: Story = {
  args: {
    children: 'Inactive Secondary 버튼',
    variant: 'secondary',
    inactive: true,
  },
};

export const WithRightIcon: Story = {
  args: {
    children: '아이콘 포함',
    rightIcon: <span className="text-base">★</span>,
    variant: 'primary',
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width 버튼',
    fullWidth: true,
    variant: 'primary',
  },
};

// Special Buttons
export const SignupButtonExample: Story = {
  render: () => (
    <SignupButton
      rightIcon={
        <Image src="/icons/arrow-right-up.svg" alt="" width={16} height={16} className="shrink-0" />
      }
    >
      Signup Now
    </SignupButton>
  ),
};

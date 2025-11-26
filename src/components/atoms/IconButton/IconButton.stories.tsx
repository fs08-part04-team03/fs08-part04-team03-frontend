import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import Image from 'next/image';
import { IconButton } from './IconButton';

const meta = {
  title: 'Atoms/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'filled', 'outline'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

// Variants
export const Ghost: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: <Image src="/icons/close-circle.svg" alt="Close" width={24} height={24} />,
    'aria-label': 'Close',
  },
};

export const Filled: Story = {
  args: {
    variant: 'filled',
    size: 'md',
    children: <Image src="/icons/close-white.svg" alt="Close" width={24} height={24} />,
    'aria-label': 'Close',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'md',
    children: <Image src="/icons/close-circle.svg" alt="Close" width={24} height={24} />,
    'aria-label': 'Close',
  },
};

// Sizes
export const Small: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    children: <Image src="/icons/arrow-up.svg" alt="Arrow up" width={14} height={8} />,
    'aria-label': 'Arrow up',
  },
};

export const Medium: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: <Image src="/icons/arrow-up.svg" alt="Arrow up" width={14} height={8} />,
    'aria-label': 'Arrow up',
  },
};

export const Large: Story = {
  args: {
    variant: 'default',
    size: 'lg',
    children: <Image src="/icons/arrow-up.svg" alt="Arrow up" width={14} height={8} />,
    'aria-label': 'Arrow up',
  },
};

// States
export const Disabled: Story = {
  args: {
    variant: 'default',
    size: 'md',
    disabled: true,
    children: <Image src="/icons/close-circle.svg" alt="Close" width={24} height={24} />,
    'aria-label': 'Close',
  },
};

// Different Icons
export const WithHeartIcon: Story = {
  render: (args) => {
    const [isLiked, setIsLiked] = React.useState(false);
    return (
      <IconButton
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...args}
        variant="default"
        onClick={() => setIsLiked(!isLiked)}
        aria-label={isLiked ? 'Unlike' : 'Like'}
      >
        <Image
          src={isLiked ? '/icons/heart.svg' : '/icons/heart-outline.svg'}
          alt={isLiked ? 'Liked' : 'Like'}
          width={24}
          height={24}
        />
      </IconButton>
    );
  },
  args: {
    size: 'md',
    children: <Image src="/icons/heart-outline.svg" alt="Like" width={24} height={24} />,
  },
};

export const WithSearchIcon: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: <Image src="/icons/search-icon.svg" alt="Search" width={24} height={24} />,
    'aria-label': 'Search',
  },
};

export const WithHamburgerIcon: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: <Image src="/icons/hamburger.svg" alt="Menu" width={24} height={24} />,
    'aria-label': 'Menu',
  },
};

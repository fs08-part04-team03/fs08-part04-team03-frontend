import type { Meta, StoryObj } from '@storybook/nextjs';
import { Avatar } from './Avatar';

const meta = {
  title: 'Atoms/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: [24, 32],
    },
    bgColor: {
      control: 'radio',
      options: ['gray-100', 'gray-50'],
    },
    src: {
      control: 'text',
    },
    alt: {
      control: 'text',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Size24: Story = {
  args: {
    size: 24,
  },
};

export const Size32: Story = {
  args: {
    size: 32,
  },
};

export const DefaultIcon: Story = {
  args: {
    size: 32,
  },
};

export const BgColorGray100: Story = {
  args: {
    size: 32,
    bgColor: 'gray-100',
  },
};

export const BgColorGray50: Story = {
  args: {
    size: 32,
    bgColor: 'gray-50',
  },
};

export const Clickable: Story = {
  args: {
    size: 32,
    onClick: () => {},
  },
};

export const WithImage: Story = {
  args: {
    size: 32,
    src: '/images/test-profile-image.jpg',
    alt: 'User Avatar',
  },
};

export const Size24WithImage: Story = {
  args: {
    size: 24,
    src: '/images/test-profile-image.jpg',
    alt: 'User Avatar',
  },
};

export const Size32WithImage: Story = {
  args: {
    size: 32,
    src: '/images/test-profile-image.jpg',
    alt: 'User Avatar',
  },
};

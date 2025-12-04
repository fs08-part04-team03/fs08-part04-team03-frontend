import type { Meta, StoryObj } from '@storybook/nextjs';
import PriceText from './PriceText';

const meta = {
  title: 'Atoms/PriceText',
  component: PriceText,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: '가격 값 (숫자)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof PriceText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 10000,
  },
};

export const SmallPrice: Story = {
  args: {
    value: 1000,
  },
};

export const MediumPrice: Story = {
  args: {
    value: 50000,
  },
};

export const LargePrice: Story = {
  args: {
    value: 1000000,
  },
};

export const VeryLargePrice: Story = {
  args: {
    value: 10000000,
  },
};

export const WithCustomClassName: Story = {
  args: {
    value: 50000,
    className: 'text-24',
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs';
import DateText from './DateText';

const meta = {
  title: 'Atoms/DateText',
  component: DateText,
  tags: ['autodocs'],
  argTypes: {
    date: {
      control: 'text',
      description: '날짜 (ISO 문자열 또는 Date 객체)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof DateText>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: '2025-06-03T00:00:00.000Z',
  },
};

export const DifferentDate: Story = {
  args: {
    date: '2024-12-25T00:00:00.000Z',
  },
};

export const DateObject: Story = {
  args: {
    date: new Date('2025-01-15'),
  },
};

export const WithCustomClassName: Story = {
  args: {
    date: '2025-06-03T00:00:00.000Z',
    className: 'text-18 font-bold',
  },
};

export const InvalidDate: Story = {
  args: {
    date: 'invalid-date',
  },
};

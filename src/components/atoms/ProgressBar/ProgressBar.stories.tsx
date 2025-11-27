import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import ProgressBar from './ProgressBar';

const meta: Meta<typeof ProgressBar> = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value (0~100)',
      defaultValue: 50,
    },
    currentBudget: {
      control: { type: 'number' },
      description: '이번 달 남은 예산',
      defaultValue: 1500000,
    },
    lastBudget: {
      control: { type: 'number' },
      description: '지난 달 남은 예산',
      defaultValue: 1200000,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    value: 75,
    currentBudget: 1500000,
    lastBudget: 1200000,
  },
};

export const Zero: Story = {
  args: {
    value: 0,
    currentBudget: 800000,
    lastBudget: 1000000,
  },
};

export const Half: Story = {
  args: {
    value: 50,
    currentBudget: 1100000,
    lastBudget: 1400000,
  },
};

export const Full: Story = {
  args: {
    value: 100,
    currentBudget: 2000000,
    lastBudget: 1800000,
  },
};

export const Dynamic: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    return (
      <div className="space-y-4">
        <ProgressBar
          value={value}
          currentBudget={args.currentBudget}
          lastBudget={args.lastBudget}
        />
        <input
          type="range"
          min={0}
          max={100}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="w-full"
        />
      </div>
    );
  },
  args: {
    value: 25,
    currentBudget: 1000000,
    lastBudget: 900000,
  },
};

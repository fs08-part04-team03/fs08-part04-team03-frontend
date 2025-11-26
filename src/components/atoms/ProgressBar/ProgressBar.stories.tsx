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
  },
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: { value: 50 },
};

export const Zero: Story = {
  args: { value: 0 },
};

export const Half: Story = {
  args: { value: 50 },
};

export const Full: Story = {
  args: { value: 100 },
};

export const Dynamic: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value);
    return (
      <div className="space-y-4">
        <ProgressBar value={value} />
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
  args: { value: 25 },
};

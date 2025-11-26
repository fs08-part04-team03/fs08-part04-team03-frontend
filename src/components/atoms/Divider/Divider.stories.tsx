import type { Meta, StoryObj } from '@storybook/nextjs';
import { Divider } from './Divider';

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['thin', 'thick'],
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

// Variants
export const Thin: Story = {
  args: {
    variant: 'thin',
    orientation: 'horizontal',
  },
};

export const Thick: Story = {
  args: {
    variant: 'thick',
    orientation: 'horizontal',
  },
};

// Orientations
export const Horizontal: Story = {
  args: {
    variant: 'thin',
    orientation: 'horizontal',
  },
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center gap-4" style={{ height: '100px' }}>
      <span>Left</span>
      <Divider orientation="vertical" variant="thin" />
      <span>Right</span>
    </div>
  ),
};

export const VerticalThick: Story = {
  render: () => (
    <div className="flex items-center gap-4" style={{ height: '100px' }}>
      <span>Left</span>
      <Divider orientation="vertical" variant="thick" />
      <span>Right</span>
    </div>
  ),
};

// Examples
export const ThinHorizontal: Story = {
  args: {
    variant: 'thin',
    orientation: 'horizontal',
  },
};

export const ThickHorizontal: Story = {
  args: {
    variant: 'thick',
    orientation: 'horizontal',
  },
};

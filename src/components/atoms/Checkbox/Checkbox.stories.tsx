import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import Checkbox, { CheckboxProps } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// 기본 스토리
export const Default: Story = {
  render: (args: CheckboxProps) => {
    const [checked, setChecked] = useState(args.checked ?? false);
    return (
      <Checkbox
        checked={checked}
        disabled={args.disabled}
        className={args.className}
        onChange={(newState) => {
          setChecked(newState);
          args.onChange?.(newState);
        }}
      />
    );
  },
  args: { checked: false, disabled: false },
};

// 체크된 상태
export const Checked: Story = {
  render: (args: CheckboxProps) => {
    const [checked, setChecked] = useState(args.checked ?? true);
    return (
      <Checkbox
        checked={checked}
        disabled={args.disabled}
        className={args.className}
        onChange={(newState) => {
          setChecked(newState);
          args.onChange?.(newState);
        }}
      />
    );
  },
  args: { checked: true, disabled: false },
};

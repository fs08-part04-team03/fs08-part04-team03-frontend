'use client';

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
    'aria-label': { control: 'text', description: '접근성을 위한 라벨' },
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
        aria-label={args['aria-label']}
        onChange={(newState) => {
          setChecked(newState);
          args.onChange?.(newState);
        }}
      />
    );
  },
  args: { checked: false, disabled: false, 'aria-label': '기본 체크박스' },
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
        aria-label={args['aria-label']}
        onChange={(newState) => {
          setChecked(newState);
          args.onChange?.(newState);
        }}
      />
    );
  },
  args: { checked: true, disabled: false, 'aria-label': '체크된 체크박스' },
};

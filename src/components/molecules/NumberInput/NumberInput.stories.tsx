import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { NumberInput } from './NumberInput';

const meta = {
  title: 'Molecules/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '수량을 선택할 수 있는 컴포넌트입니다. 오른쪽의 위/아래 화살표 버튼으로 수량을 조정하거나 직접 입력할 수 있습니다.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['default', 'secondary'],
      description: 'variant 타입',
    },
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
    value: {
      control: 'number',
      description: '현재 수량 값',
    },
    min: {
      control: 'number',
      description: '최소 수량',
    },
    max: {
      control: 'number',
      description: '최대 수량',
    },
    onQuantityChange: {
      action: 'quantity-changed',
      description: '수량 변경 시 호출되는 콜백',
    },
  },
} satisfies Meta<typeof NumberInput>;

export default meta;

type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  render: (args) => {
    const [quantity, setQuantity] = useState(args.value ?? 1);

    return (
      <NumberInput
        variant={args.variant}
        value={quantity}
        onQuantityChange={(option) => {
          const numValue = Number(option.key);
          if (!Number.isNaN(numValue)) {
            setQuantity(numValue);
          }
          args.onQuantityChange?.(option);
        }}
        min={args.min}
        max={args.max}
        className={args.className}
      />
    );
  },
  args: {
    variant: 'default',
    value: 1,
    min: 1,
    max: 999,
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [quantity, setQuantity] = useState(args.value ?? 1);

    return (
      <NumberInput
        variant={args.variant}
        value={quantity}
        onQuantityChange={(option) => {
          const numValue = Number(option.key);
          if (!Number.isNaN(numValue)) {
            setQuantity(numValue);
          }
          args.onQuantityChange?.(option);
        }}
        label={args.label}
        min={args.min}
        max={args.max}
        className={args.className}
      />
    );
  },
  args: {
    variant: 'default',
    value: 1,
    label: '수량',
    min: 1,
    max: 999,
  },
};

export const Secondary: Story = {
  render: (args) => {
    const [quantity, setQuantity] = useState(args.value ?? 1);

    return (
      <NumberInput
        variant={args.variant}
        value={quantity}
        onQuantityChange={(option) => {
          const numValue = Number(option.key);
          if (!Number.isNaN(numValue)) {
            setQuantity(numValue);
          }
          args.onQuantityChange?.(option);
        }}
        min={args.min}
        max={args.max}
        className={args.className}
      />
    );
  },
  args: {
    variant: 'secondary',
    value: 1,
    min: 1,
    max: 999,
  },
};

export const SecondaryWithLabel: Story = {
  render: (args) => {
    const [quantity, setQuantity] = useState(args.value ?? 1);

    return (
      <NumberInput
        variant={args.variant}
        value={quantity}
        onQuantityChange={(option) => {
          const numValue = Number(option.key);
          if (!Number.isNaN(numValue)) {
            setQuantity(numValue);
          }
          args.onQuantityChange?.(option);
        }}
        label={args.label}
        min={args.min}
        max={args.max}
        className={args.className}
      />
    );
  },
  args: {
    variant: 'secondary',
    value: 1,
    label: '수량',
    min: 1,
    max: 999,
  },
};

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { QuantitySelector } from './QuantitySelector';

const meta = {
  title: 'Molecules/QuantitySelector',
  component: QuantitySelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '수량을 선택할 수 있는 드롭다운 컴포넌트입니다. 1~9까지 선택 가능하며, 10+를 선택하면 직접 입력할 수 있습니다.',
      },
    },
  },
  argTypes: {
    onQuantityChange: {
      action: 'quantity-changed',
      description: '수량 변경 시 호출되는 콜백',
    },
  },
} satisfies Meta<typeof QuantitySelector>;

export default meta;

type Story = StoryObj<typeof QuantitySelector>;

export const Default: Story = {
  render: (args) => {
    const [quantity, setQuantity] = useState(args.value ?? 1);

    return (
      <QuantitySelector
        value={quantity}
        onQuantityChange={(option) => {
          const numValue = Number(option.key);
          if (!Number.isNaN(numValue)) {
            setQuantity(numValue);
          }
          args.onQuantityChange?.(option);
        }}
        className={args.className}
      />
    );
  },
  args: {
    value: 1,
  },
};

export const WithValue: Story = {
  render: (args) => {
    const [quantity, setQuantity] = useState(args.value ?? 5);

    return (
      <QuantitySelector
        value={quantity}
        onQuantityChange={(option) => {
          const numValue = Number(option.key);
          if (!Number.isNaN(numValue)) {
            setQuantity(numValue);
          }
          args.onQuantityChange?.(option);
        }}
        className={args.className}
      />
    );
  },
  args: {
    value: 5,
  },
};

export const WithLabel: Story = {
  render: (args) => {
    const [quantity, setQuantity] = useState(args.value ?? 1);

    return (
      <QuantitySelector
        value={quantity}
        onQuantityChange={(option) => {
          const numValue = Number(option.key);
          if (!Number.isNaN(numValue)) {
            setQuantity(numValue);
          }
          args.onQuantityChange?.(option);
        }}
        label={args.label}
        className={args.className}
      />
    );
  },
  args: {
    value: 1,
    label: '수량',
  },
};

export const SecondaryWithLabel: Story = {
  render: (args) => {
    const [quantity, setQuantity] = useState(args.value ?? 1);

    return (
      <div className="w-full h-200 flex items-center justify-center">
        <QuantitySelector
          value={quantity}
          onQuantityChange={(option) => {
            const numValue = Number(option.key);
            if (!Number.isNaN(numValue)) {
              setQuantity(numValue);
            }
            args.onQuantityChange?.(option);
          }}
          variant={args.variant}
          label={args.label}
          className={args.className}
        />
      </div>
    );
  },
  args: {
    value: 1,
    variant: 'secondary',
    label: '수량',
  },
};

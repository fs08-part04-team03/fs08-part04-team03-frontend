import type { Meta, StoryObj } from '@storybook/nextjs';
import DropDown, { type SelectVariant } from './DropDown';

const meta: Meta<typeof DropDown> = {
  title: 'Atoms/DropDown',
  component: DropDown,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'] satisfies SelectVariant[],
    },
    disabled: {
      control: 'boolean',
    },
    items: {
      control: 'object',
    },
    placeholder: {
      control: 'text',
    },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof DropDown>;

export const Small: Story = {
  args: {
    placeholder: '선택해 주세요',
    variant: 'small',
    disabled: false,
    items: [
      { key: '1', label: '옵션 1' },
      { key: '2', label: '옵션 2' },
      { key: '3', label: '옵션 3' },
      { key: '4', label: '옵션 4' },
      { key: '5', label: '옵션 5' },
      { key: '6', label: '옵션 6' },
    ],
  },
};

export const Medium: Story = {
  args: {
    placeholder: '선택해 주세요',
    variant: 'medium',
    disabled: false,
    items: [
      { key: '1', label: '옵션 1' },
      { key: '2', label: '옵션 2' },
      { key: '3', label: '옵션 3' },
      { key: '4', label: '옵션 4' },
      { key: '5', label: '옵션 5' },
      { key: '6', label: '옵션 6' },
    ],
  },
};

export const Large: Story = {
  args: {
    placeholder: '선택해 주세요',
    variant: 'large',
    disabled: false,
    items: [
      { key: '1', label: '옵션 1' },
      { key: '2', label: '옵션 2' },
      { key: '3', label: '옵션 3' },
      { key: '4', label: '옵션 4' },
      { key: '5', label: '옵션 5' },
      { key: '6', label: '옵션 6' },
    ],
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '비활성화됨',
    variant: 'medium',
    disabled: true,
    items: [
      { key: 'x', label: '선택 불가 1' },
      { key: 'y', label: '선택 불가 2' },
    ],
  },
};

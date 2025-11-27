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
    buttonClassName: {
      control: 'text', // 버튼 클래스 오버라이드 가능
    },
    dropdownClassName: {
      control: 'text', // 드롭다운 리스트 클래스 오버라이드 가능
    },
    optionClassName: {
      control: 'text', // 옵션 항목 클래스 오버라이드 가능
    },
  },
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof DropDown>;

// ✅ 중복 제거된 items
const defaultItems = [
  { key: '1', label: '옵션 1' },
  { key: '2', label: '옵션 2' },
  { key: '3', label: '옵션 3' },
  { key: '4', label: '옵션 4' },
  { key: '5', label: '옵션 5' },
  { key: '6', label: '옵션 6' },
];

export const Small: Story = {
  args: {
    placeholder: '선택',
    variant: 'small',
    disabled: false,
    items: defaultItems,
    buttonClassName: '', // 버튼 클래스 오버라이드
    dropdownClassName: '', // 드롭다운 리스트 클래스 오버라이드
    optionClassName: '', // 옵션 항목 클래스 오버라이드
  },
};

export const Medium: Story = {
  args: {
    placeholder: '선택',
    variant: 'medium',
    disabled: false,
    items: defaultItems,
    buttonClassName: '',
    dropdownClassName: '',
    optionClassName: '',
  },
};

export const Large: Story = {
  args: {
    placeholder: '선택',
    variant: 'large',
    disabled: false,
    items: defaultItems,
    buttonClassName: '',
    dropdownClassName: '',
    optionClassName: '',
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
    buttonClassName: '',
    dropdownClassName: '',
    optionClassName: '',
  },
};

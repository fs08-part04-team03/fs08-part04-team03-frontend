import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import TextAreaField from './TextAreaField';

const meta: Meta<typeof TextAreaField> = {
  title: 'Molecules/TextAreaField',
  component: TextAreaField,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    label: {
      control: 'text',
      description: '라벨 텍스트',
    },
    placeholder: {
      control: 'text',
      description: 'placeholder 텍스트',
    },
    error: {
      control: 'boolean',
      description: '에러 상태',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 상태',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const Wrapper = () => {
      const [value, setValue] = useState('');
      return (
        <TextAreaField
          label="메시지"
          placeholder="메시지를 입력해주세요."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    };
    return <Wrapper />;
  },
};

export const WithoutLabel: Story = {
  render: () => {
    const Wrapper = () => {
      const [value, setValue] = useState('');
      return (
        <TextAreaField
          placeholder="내용을 입력해주세요."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    };
    return <Wrapper />;
  },
};

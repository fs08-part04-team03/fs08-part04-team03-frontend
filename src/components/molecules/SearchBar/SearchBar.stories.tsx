import type { Meta, StoryObj } from '@storybook/nextjs';
import SearchBar from './SearchBar';

const meta = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    placeholder: {
      control: 'text',
      description: '검색 입력 필드의 placeholder 텍스트',
    },
    defaultValue: {
      control: 'text',
      description: '초기 검색어 값',
    },
    onSearch: {
      action: 'searched',
      description: '검색 실행 시 호출되는 콜백 함수',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스',
    },
  },
} satisfies Meta<typeof SearchBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
  },
};

export const CustomWidth: Story = {
  args: {
    placeholder: '검색어를 입력하세요',
    className: 'max-w-md',
  },
};

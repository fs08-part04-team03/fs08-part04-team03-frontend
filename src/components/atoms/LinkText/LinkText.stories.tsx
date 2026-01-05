import type { Meta, StoryObj } from '@storybook/nextjs';
import LinkText from './LinkText';

const meta = {
  title: 'Atoms/LinkText',
  component: LinkText,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    url: {
      control: 'text',
      description: '표시할 URL',
    },
    className: {
      control: 'text',
      description: '텍스트 크기 클래스',
    },
    clickable: {
      control: 'boolean',
      description: '클릭 가능 여부',
    },
  },
} satisfies Meta<typeof LinkText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    url: 'https://www.codeit.com/item123',
    className: 'text-16 tracking--0.4 text-gray-950',
    clickable: true,
  },
};

export const WithoutProtocol: Story = {
  args: {
    url: 'www.coupanf.com/products/item123',
    className: 'text-16 tracking--0.4 text-gray-950',
    clickable: true,
  },
};

export const CoKrDomain: Story = {
  args: {
    url: 'https://www.example.co.kr/products/item123',
    className: 'text-16 tracking--0.4 text-gray-950',
    clickable: true,
  },
};

export const NotClickable: Story = {
  args: {
    url: 'https://www.coupanf.com/products/item123',
    className: 'text-16 tracking--0.4 text-gray-950',
    clickable: false,
  },
};

export const MobileSize: Story = {
  args: {
    url: 'https://www.coupanf.com/products/item123',
    className: 'text-14 tracking--0.35 text-gray-600',
    clickable: true,
  },
};

import type { Meta, StoryObj } from '@storybook/nextjs';
import { CartButton } from './CartButton';

const meta = {
  title: 'Molecules/CartButton',
  component: CartButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '장바구니 아이콘과 숫자 뱃지를 표시하는 버튼 컴포넌트입니다.',
      },
    },
  },
  argTypes: {
    onClick: {
      action: 'click',
      description: '장바구니 버튼 클릭 시 호출되는 콜백',
    },
  },
} satisfies Meta<typeof CartButton>;

export default meta;

type Story = StoryObj<typeof CartButton>;

export const Default: Story = {
  args: {
    companyId: 'company-1',
    count: 0,
  },
};

export const WithItems: Story = {
  args: {
    companyId: 'company-1',
    count: 5,
  },
};

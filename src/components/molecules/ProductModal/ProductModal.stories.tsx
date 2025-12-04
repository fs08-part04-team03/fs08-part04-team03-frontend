import type { Meta, StoryObj } from '@storybook/nextjs';
import ProductModal from './ProductModal';

const meta: Meta<typeof ProductModal> = {
  title: 'Molecules/ProductModal',
  component: ProductModal,
  parameters: {
    layout: 'centered',
  },
  args: {
    open: true,
    onClose: () => alert('닫기 클릭됨'),
    onSubmit: () => alert('등록하기 클릭됨'),
  },
};

export default meta;
type Story = StoryObj<typeof ProductModal>;

export const Default: Story = {
  args: {
    open: true,
  },
};

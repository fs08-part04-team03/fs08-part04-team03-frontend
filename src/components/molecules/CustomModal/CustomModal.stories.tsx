import type { Meta, StoryObj } from '@storybook/nextjs';
import CustomModal from './CustomModal';

const meta: Meta<typeof CustomModal> = {
  title: 'Molecules/Modal/CustomModal',
  component: CustomModal,
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof CustomModal>;

// DELETE
export const Delete: Story = {
  args: {
    open: true,
    type: 'delete',
    productName: '샘플 상품',
    cancelCount: 3,
    onClose: () => {},
    onConfirm: () => {},
  },
};

// CANCEL
export const Cancel: Story = {
  args: {
    open: true,
    type: 'cancel',
    productName: '샘플 상품',
    cancelCount: 3,
    onClose: () => {},
    onConfirm: () => {},
  },
};

// APPROVED
export const Approved: Story = {
  args: {
    open: true,
    type: 'approved',
    onClose: () => {},
    onHome: () => {},
    onOrder: () => {},
  },
};

// REJECTED
export const Rejected: Story = {
  args: {
    open: true,
    type: 'rejected',
    onClose: () => {},
    onHome: () => {},
    onOrder: () => {},
  },
};

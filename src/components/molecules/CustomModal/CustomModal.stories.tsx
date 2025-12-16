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
    onClose: () => alert('닫기 클릭됨'),
    onConfirm: () => alert('상품 삭제 클릭'),
  },
};

// CANCEL
export const Cancel: Story = {
  args: {
    open: true,
    type: 'cancel',
    productName: '샘플 상품',
    cancelCount: 3,
    onClose: () => alert('닫기 클릭됨'),
    onConfirm: () => alert('요청 취소 클릭'),
  },
};

// APPROVED
export const Approved: Story = {
  args: {
    open: true,
    type: 'approved',
    onClose: () => alert('닫기 클릭됨'),
    onHome: () => alert('홈으로 클릭'),
    onOrder: () => alert('구매 내역 보기 클릭'),
  },
};

// REJECTED
export const Rejected: Story = {
  args: {
    open: true,
    type: 'rejected',
    onClose: () => alert('닫기 클릭됨'),
    onHome: () => alert('홈으로 클릭'),
    onOrder: () => alert('구매 요청 내역 보기 클릭'),
  },
};

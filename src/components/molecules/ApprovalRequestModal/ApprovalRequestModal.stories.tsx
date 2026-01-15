import type { Meta, StoryObj } from '@storybook/nextjs';
import ApprovalRequestModal from './ApprovalRequestModal';

const meta: Meta<typeof ApprovalRequestModal> = {
  title: 'Molecules/Modal/ApprovalRequestModal',
  component: ApprovalRequestModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClose: { action: 'onClose' },
    onSubmit: { action: 'onSubmit' },
    action: {
      control: { type: 'radio' },
      options: ['approve', 'reject'],
      description: '모달 타입: 승인(approve) / 반려(reject)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ApprovalRequestModal>;

/* -----------------------------
 * 공통 샘플 데이터 추출
 * ----------------------------- */
const sampleUser = {
  name: '김민수',
  company: { name: 'UUU COMPANY' },
  avatarSrc: '/images/test-profile-image.jpg',
};

const sampleItems = [
  { id: 1, title: 'A4 복사용지 80g', price: 3500, quantity: 2 },
  { id: 2, title: '샤프 펜슬 0.5mm', price: 1500, quantity: 3 },
];

/* -----------------------------
 * 승인 모달 스토리
 * ----------------------------- */
export const Approve: Story = {
  args: {
    open: true,
    action: 'approve',
    user: sampleUser,
    items: sampleItems,
    deliveryFee: 3000,
    budget: 120000,
    onClose: () => {},
    onSubmit: () => {},
  },
};

/* -----------------------------
 * 반려 모달 스토리
 * ----------------------------- */
export const Reject: Story = {
  args: {
    open: true,
    action: 'reject',
    user: sampleUser,
    items: sampleItems,
    deliveryFee: 3000,
    budget: 120000,
    onClose: () => {},
    onSubmit: () => {},
  },
};

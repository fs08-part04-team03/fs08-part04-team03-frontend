import type { Meta, StoryObj } from '@storybook/nextjs';
import InviteMemberModal from './InviteMemberModal';

const meta: Meta<typeof InviteMemberModal> = {
  title: 'Molecules/Modal/InviteMemberModal',
  component: InviteMemberModal,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    open: true,
    onClose: () => alert('닫기 클릭'),
    onSubmit: () => alert('초대하기 클릭'),
  },
  argTypes: {
    open: {
      control: 'boolean',
      description: '모달 열림 여부',
    },
    onClose: { action: 'close', description: '닫기 버튼 클릭' },
    onSubmit: { action: 'submit', description: '초대하기 버튼 클릭' },
  },
};

export default meta;

type Story = StoryObj<typeof InviteMemberModal>;

export const Default: Story = {};

// 열려있는 버전
export const Open: Story = {
  args: {
    open: true,
  },
};

// 닫혀있는 버전
export const Closed: Story = {
  args: {
    open: false,
  },
};

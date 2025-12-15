import type { Meta, StoryObj } from '@storybook/nextjs';
import InviteSignupForm from './InviteSignupForm';

const meta = {
  title: 'Features/Auth/InviteSignupForm',
  component: InviteSignupForm,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/invite/[token]',
      },
    },
    docs: {
      description: {
        component:
          '초대받은 사용자의 회원가입 폼 컴포넌트입니다. 이메일은 백엔드에서 제공되므로 읽기 전용이며, 비밀번호와 비밀번호 확인만 입력받습니다.',
      },
    },
  },
} satisfies Meta<typeof InviteSignupForm>;

export default meta;

type Story = StoryObj<typeof InviteSignupForm>;

// 기본 스토리
export const Default: Story = {
  args: {
    name: '홍길동',
    email: 'hong@example.com',
  },
};

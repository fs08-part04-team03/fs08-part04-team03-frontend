import type { Meta, StoryObj } from '@storybook/nextjs';
import InviteSignupTem from './InviteSignupTem';

const meta = {
  title: 'Features/Auth/Template/InviteSignupTem',
  component: InviteSignupTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/invite',
        query: { token: 'dummy-token-123' },
      },
    },
    docs: {
      description: {
        component:
          '초대 회원가입 템플릿 컴포넌트입니다. useInviteSignupForm 훅을 내부에서 사용하여 초대 회원가입 폼을 렌더링합니다. 이메일은 백엔드에서 제공되므로 읽기 전용이며, 비밀번호와 비밀번호 확인만 입력받습니다.',
      },
    },
  },
} satisfies Meta<typeof InviteSignupTem>;

export default meta;

type Story = StoryObj<typeof InviteSignupTem>;

// 기본 스토리
export const Default: Story = {
  args: {
    name: '홍길동',
    email: 'hong@example.com',
    token: 'dummy-token',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 초대 회원가입 템플릿입니다. 비밀번호와 비밀번호 확인을 입력받습니다.',
      },
    },
  },
};

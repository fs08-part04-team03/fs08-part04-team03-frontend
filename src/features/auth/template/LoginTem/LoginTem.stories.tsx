import type { Meta, StoryObj } from '@storybook/nextjs';
import LoginTem from './LoginTem';

const meta = {
  title: 'Features/Auth/Template/LoginTem',
  component: LoginTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/login',
      },
    },
    docs: {
      description: {
        component:
          '로그인 템플릿 컴포넌트입니다. useLoginForm 훅을 내부에서 사용하여 로그인 폼을 렌더링합니다.',
      },
    },
  },
} satisfies Meta<typeof LoginTem>;

export default meta;

type Story = StoryObj<typeof LoginTem>;

// 기본 스토리
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 로그인 템플릿입니다. 이메일과 비밀번호를 입력받습니다.',
      },
    },
  },
};

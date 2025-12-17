import type { Meta, StoryObj } from '@storybook/nextjs';
import LoginFormOrg from './LoginFormOrg';

const meta = {
  title: 'Features/Auth/LoginFormOrg',
  component: LoginFormOrg,
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
        component: '로그인 폼 컴포넌트입니다. 이메일과 비밀번호를 입력받아 로그인을 처리합니다.',
      },
    },
  },
} satisfies Meta<typeof LoginFormOrg>;

export default meta;

type Story = StoryObj<typeof LoginFormOrg>;

// 기본 스토리
export const Default: Story = {};

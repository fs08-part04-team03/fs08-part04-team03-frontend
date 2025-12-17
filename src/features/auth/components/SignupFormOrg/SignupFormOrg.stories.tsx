import type { Meta, StoryObj } from '@storybook/nextjs';
import SignupFormOrg from './SignupFormOrg';

const meta = {
  title: 'Features/Auth/SignupFormOrg',
  component: SignupFormOrg,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/signup',
      },
    },
    docs: {
      description: {
        component:
          '일반 회원가입 폼 컴포넌트입니다. 이름, 이메일, 비밀번호, 비밀번호 확인, 회사명, 사업자 번호를 입력받아 회원가입을 처리합니다.',
      },
    },
  },
} satisfies Meta<typeof SignupFormOrg>;

export default meta;

type Story = StoryObj<typeof SignupFormOrg>;

// 일반 회원가입 스토리 (최고가입자)
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '일반 회원가입 폼입니다. 이름, 이메일, 비밀번호, 비밀번호 확인, 회사명, 사업자 번호를 입력받습니다.',
      },
    },
  },
};

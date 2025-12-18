import type { Meta, StoryObj } from '@storybook/nextjs';
import SignupTem from './SignupTem';

const meta = {
  title: 'Features/Auth/Template/SignupTem',
  component: SignupTem,
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
          '회원가입 템플릿 컴포넌트입니다. useSignupForm 훅을 내부에서 사용하여 회원가입 폼을 렌더링합니다.',
      },
    },
  },
} satisfies Meta<typeof SignupTem>;

export default meta;

type Story = StoryObj<typeof SignupTem>;

// 기본 스토리
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          '기본 회원가입 템플릿입니다. 이름, 이메일, 비밀번호, 비밀번호 확인, 회사명, 사업자 번호를 입력받습니다.',
      },
    },
  },
};

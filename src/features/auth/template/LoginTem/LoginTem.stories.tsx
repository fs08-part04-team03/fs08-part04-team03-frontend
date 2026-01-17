/* eslint-disable import/no-unresolved, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, react/jsx-props-no-spreading */
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/features/auth/schemas/login.schema';
import type { ToastVariant } from '@/features/auth/types/auth-form.types';
import LoginTem from './LoginTem';

// Mock function for Storybook (replaces @storybook/test fn)
const fn = () => () => {};

const meta = {
  title: 'Features/Auth/Template/LoginTem',
  component: LoginTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/login',
      },
    },
    docs: {
      description: {
        component:
          '로그인 UI 템플릿 컴포넌트입니다. 순수 UI만 담당하며, 모든 비즈니스 로직(폼 상태, 제출 핸들러, 에러 처리)은 Props로 전달받습니다. React Hook Form의 control과 handleSubmit을 외부에서 주입받아 사용합니다.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-gray-50">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoginTem>;

export default meta;

// Storybook에서 사용할 Legacy Props 타입 (일부 속성만 선택)
type StoryArgs = Partial<{
  onSubmit: (values: LoginInput) => void | Promise<void>;
  showToast: boolean;
  toastVariant: ToastVariant;
  toastMessage: string;
  setShowToast: (show: boolean) => void;
}>;

type Story = StoryObj<typeof LoginTem> & {
  args?: StoryArgs;
};

// Wrapper component to provide form context
const LoginTemWithForm = (args: StoryArgs) => {
  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <LoginTem
      control={form.control}
      handleSubmit={form.handleSubmit}
      isValid={form.formState.isValid}
      onSubmit={args?.onSubmit ?? fn()}
      showToast={args?.showToast ?? false}
      toastVariant={args?.toastVariant ?? 'error'}
      toastMessage={args?.toastMessage ?? ''}
      setShowToast={args?.setShowToast ?? fn()}
    />
  );
};

/**
 * 기본 로그인 템플릿
 *
 * 이메일과 비밀번호 입력 필드를 제공합니다.
 * 모든 필드가 비어있는 초기 상태에서 시작합니다.
 */
export const Default: Story = {
  render: (args) => <LoginTemWithForm {...(args as StoryArgs)} />,
  args: {
    showToast: false,
    toastVariant: 'error',
    toastMessage: '',
    onSubmit: fn(),
    setShowToast: fn(),
  },
};

/**
 * Toast 알림 - 로그인 실패
 *
 * 로그인 실패 시 Toast 알림이 화면 상단에 표시됩니다.
 * Toast는 3초 후 자동으로 사라집니다.
 */
export const WithErrorToast: Story = {
  render: (args) => <LoginTemWithForm {...(args as StoryArgs)} />,
  args: {
    showToast: true,
    toastVariant: 'error',
    toastMessage: '이메일 또는 비밀번호가 올바르지 않습니다.',
    onSubmit: fn(),
    setShowToast: fn(),
  },
};

/**
 * Toast 알림 - 네트워크 오류
 *
 * 네트워크 오류 발생 시 Toast 알림이 표시됩니다.
 */
export const WithNetworkErrorToast: Story = {
  render: (args) => <LoginTemWithForm {...(args as StoryArgs)} />,
  args: {
    showToast: true,
    toastVariant: 'error',
    toastMessage: '네트워크 오류가 발생했습니다. 다시 시도해 주세요.',
    onSubmit: fn(),
    setShowToast: fn(),
  },
};

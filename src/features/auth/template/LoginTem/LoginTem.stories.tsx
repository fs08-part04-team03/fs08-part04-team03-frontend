/* eslint-disable import/no-unresolved, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, react/jsx-props-no-spreading */
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fn } from '@storybook/test';
import { loginSchema, type LoginInput } from '@/features/auth/schemas/login.schema';
import LoginTem from './LoginTem';

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

type Story = StoryObj<typeof LoginTem>;

// Wrapper component to provide form context
const LoginTemWithForm = (args: Partial<Story['args']>) => {
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
      serverError={args?.serverError ?? null}
      onSubmit={args?.onSubmit ?? fn()}
      showToast={args?.showToast ?? false}
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
  render: (args) => <LoginTemWithForm {...args} />,
  args: {
    serverError: null,
    showToast: false,
    toastMessage: '',
    onSubmit: fn(),
    setShowToast: fn(),
  },
};

/**
 * 서버 에러 상태
 *
 * 로그인 실패 시 서버에서 반환된 에러 메시지가 표시됩니다.
 * 에러 박스는 레이아웃 점프를 방지하기 위해 항상 공간을 확보합니다.
 */
export const WithServerError: Story = {
  render: (args) => <LoginTemWithForm {...args} />,
  args: {
    serverError: '이메일 또는 비밀번호가 올바르지 않습니다.',
    showToast: false,
    toastMessage: '',
    onSubmit: fn(),
    setShowToast: fn(),
  },
};

/**
 * Toast 알림 표시
 *
 * 로그인 성공/실패 시 Toast 알림이 화면 상단에 표시됩니다.
 * Toast는 3초 후 자동으로 사라집니다.
 */
export const WithToast: Story = {
  render: (args) => <LoginTemWithForm {...args} />,
  args: {
    serverError: null,
    showToast: true,
    toastMessage: '로그인에 실패했습니다. 다시 시도해 주세요.',
    onSubmit: fn(),
    setShowToast: fn(),
  },
};

/**
 * 에러와 Toast 동시 표시
 *
 * 서버 에러와 Toast 알림이 동시에 표시되는 상태입니다.
 * 일반적으로 로그인 실패 직후의 상태를 나타냅니다.
 */
export const WithErrorAndToast: Story = {
  render: (args) => <LoginTemWithForm {...args} />,
  args: {
    serverError: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
    showToast: true,
    toastMessage: '네트워크 오류가 발생했습니다.',
    onSubmit: fn(),
    setShowToast: fn(),
  },
};

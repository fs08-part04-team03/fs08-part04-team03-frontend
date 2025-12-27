/* eslint-disable import/no-unresolved, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, react/jsx-props-no-spreading */
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { signupSchema, type SignupInput } from '@/features/auth/schemas/signup.schema';
import SignupTem from './SignupTem';

const meta = {
  title: 'Features/Auth/Template/SignupTem',
  component: SignupTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/signup',
      },
    },
    docs: {
      description: {
        component:
          '회원가입 UI 템플릿 컴포넌트입니다. 순수 UI만 담당하며, 모든 비즈니스 로직(폼 상태, 제출 핸들러, 에러 처리, 이미지 업로드)은 Props로 전달받습니다. 기업 담당자 회원가입과 초대 회원가입 모두 이 템플릿을 사용할 수 있도록 유연하게 설계되었습니다.',
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
} satisfies Meta<typeof SignupTem>;

export default meta;

type Story = StoryObj<typeof SignupTem>;

// Wrapper component to provide form context
const SignupTemWithForm = (args: Partial<Story['args']>) => {
  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      companyName: '',
      businessNumber: '',
    },
  });

  const [preview, setPreview] = useState<string | null>(args?.preview ?? null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  return (
    <SignupTem
      control={form.control}
      handleSubmit={form.handleSubmit}
      isValid={form.formState.isValid}
      serverError={args?.serverError ?? null}
      onSubmit={args?.onSubmit ?? fn()}
      showToast={args?.showToast ?? false}
      toastMessage={args?.toastMessage ?? ''}
      setShowToast={args?.setShowToast ?? fn()}
      preview={preview}
      onImageChange={args?.onImageChange ?? handleImageChange}
      title={args?.title}
      subtitle={args?.subtitle}
      submitButtonText={args?.submitButtonText}
    />
  );
};

/**
 * 기본 회원가입 템플릿
 *
 * 기업 담당자 회원가입 폼을 제공합니다.
 * - 프로필 이미지 (선택)
 * - 이름, 이메일, 비밀번호, 비밀번호 확인
 * - 회사명, 사업자 번호
 *
 * 모든 필드가 비어있는 초기 상태에서 시작합니다.
 */
export const Default: Story = {
  render: (args) => <SignupTemWithForm {...args} />,
  args: {
    serverError: null,
    showToast: false,
    toastMessage: '',
    preview: null,
    onSubmit: fn(),
    setShowToast: fn(),
    onImageChange: fn(),
  },
};

/**
 * 프로필 이미지 미리보기
 *
 * 사용자가 프로필 이미지를 업로드한 상태를 보여줍니다.
 * 이미지 업로드는 선택 사항이며, 140x140px 크기로 표시됩니다.
 */
export const WithImagePreview: Story = {
  render: (args) => <SignupTemWithForm {...args} />,
  args: {
    serverError: null,
    showToast: false,
    toastMessage: '',
    preview: 'https://picsum.photos/200/200',
    onSubmit: fn(),
    setShowToast: fn(),
    onImageChange: fn(),
  },
};

/**
 * 서버 에러 상태
 *
 * 회원가입 실패 시 서버에서 반환된 에러 메시지가 표시됩니다.
 * 에러 박스는 레이아웃 점프를 방지하기 위해 항상 공간을 확보합니다.
 */
export const WithServerError: Story = {
  render: (args) => <SignupTemWithForm {...args} />,
  args: {
    serverError: '이미 사용 중인 이메일입니다.',
    showToast: false,
    toastMessage: '',
    preview: null,
    onSubmit: fn(),
    setShowToast: fn(),
    onImageChange: fn(),
  },
};

/**
 * Toast 알림 표시
 *
 * 회원가입 성공/실패 또는 이미지 업로드 실패 시 Toast 알림이 화면 상단에 표시됩니다.
 * Toast는 3초 후 자동으로 사라집니다.
 */
export const WithToast: Story = {
  render: (args) => <SignupTemWithForm {...args} />,
  args: {
    serverError: null,
    showToast: true,
    toastMessage: '이미지 업로드에 실패했습니다. 다시 시도해 주세요.',
    preview: null,
    onSubmit: fn(),
    setShowToast: fn(),
    onImageChange: fn(),
  },
};

/**
 * 커스텀 제목과 설명
 *
 * title, subtitle, submitButtonText Props를 통해
 * 다른 용도로 재사용할 수 있습니다.
 */
export const CustomContent: Story = {
  render: (args) => <SignupTemWithForm {...args} />,
  args: {
    serverError: null,
    showToast: false,
    toastMessage: '',
    preview: null,
    title: '관리자 계정 생성',
    subtitle: '관리자 권한으로 가입하시려면 아래 정보를 입력해 주세요.',
    submitButtonText: '계정 생성',
    onSubmit: fn(),
    setShowToast: fn(),
    onImageChange: fn(),
  },
};

/**
 * 복합 상태 (이미지 + 에러 + Toast)
 *
 * 여러 상태가 동시에 활성화된 복합적인 시나리오입니다.
 * 실제 사용 시 발생할 수 있는 상황을 시뮬레이션합니다.
 */
export const ComplexState: Story = {
  render: (args) => <SignupTemWithForm {...args} />,
  args: {
    serverError: '사업자 번호 형식이 올바르지 않습니다.',
    showToast: true,
    toastMessage: '입력 정보를 확인해 주세요.',
    preview: 'https://picsum.photos/200/200',
    onSubmit: fn(),
    setShowToast: fn(),
    onImageChange: fn(),
  },
};

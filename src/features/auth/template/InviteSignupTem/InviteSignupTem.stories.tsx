/* eslint-disable import/no-unresolved, react/destructuring-assignment, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, react/jsx-props-no-spreading */
import type { Meta, StoryObj } from '@storybook/nextjs';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { inviteSignupSchema, type InviteSignupInput } from '@/features/auth/schemas/signup.schema';
import InviteSignupTem from './InviteSignupTem';

// Mock function for Storybook (replaces @storybook/test fn)
const fn = () => () => {};

const meta = {
  title: 'Features/Auth/Template/InviteSignupTem',
  component: InviteSignupTem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
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
          '초대 회원가입 UI 템플릿 컴포넌트입니다. 순수 UI만 담당하며, 모든 비즈니스 로직(폼 상태, 제출 핸들러, 에러 처리, 이미지 업로드)은 Props로 전달받습니다. 이메일은 초대 정보에서 가져오므로 읽기 전용이며, 사용자는 비밀번호만 입력합니다. 프로필 이미지 업로드는 선택 사항입니다.',
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
} satisfies Meta<typeof InviteSignupTem>;

export default meta;

type Story = StoryObj<typeof InviteSignupTem>;

// Wrapper component to provide form context
const InviteSignupTemWithForm = (args: Partial<Story['args']>) => {
  const form = useForm<InviteSignupInput>({
    resolver: zodResolver(inviteSignupSchema),
    mode: 'onTouched',
    defaultValues: {
      email: args?.name ? `${args.name}@example.com` : 'user@example.com',
      password: '',
      confirmPassword: '',
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
    <InviteSignupTem
      control={form.control}
      handleSubmit={form.handleSubmit}
      isValid={form.formState.isValid}
      onSubmit={args?.onSubmit ?? fn()}
      showToast={args?.showToast ?? false}
      toastMessage={args?.toastMessage ?? ''}
      setShowToast={args?.setShowToast ?? fn()}
      preview={preview}
      onImageChange={args?.onImageChange ?? handleImageChange}
      name={args?.name ?? '홍길동'}
    />
  );
};

/**
 * 기본 초대 회원가입 템플릿
 *
 * 초대된 사용자를 위한 회원가입 폼을 제공합니다.
 * - 환영 메시지 (이름 표시)
 * - 프로필 이미지 업로드 (선택)
 * - 이메일 (읽기 전용, 초대 정보에서 자동 입력)
 * - 비밀번호, 비밀번호 확인
 *
 * 모든 필드가 초기 상태에서 시작합니다.
 */
export const Default: Story = {
  render: (args) => <InviteSignupTemWithForm {...args} />,
  args: {
    name: '홍길동',
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
  render: (args) => <InviteSignupTemWithForm {...args} />,
  args: {
    name: '김철수',
    showToast: false,
    toastMessage: '',
    preview: 'https://picsum.photos/200/200',
    onSubmit: fn(),
    setShowToast: fn(),
    onImageChange: fn(),
  },
};

/**
 * 서버 에러 상태 (Toast로 표시)
 *
 * 회원가입 실패 시 서버에서 반환된 에러 메시지가 Toast로 표시됩니다.
 * 서버 통신 에러는 Toast로만 표시되며, 폼 상단에는 표시되지 않습니다.
 */
export const WithServerError: Story = {
  render: (args) => <InviteSignupTemWithForm {...args} />,
  args: {
    name: '이영희',
    showToast: true,
    toastMessage: '초대 토큰이 만료되었습니다. 관리자에게 문의해 주세요.',
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
  render: (args) => <InviteSignupTemWithForm {...args} />,
  args: {
    name: '박민수',
    showToast: true,
    toastMessage: '이미지 업로드에 실패했습니다. 다시 시도해 주세요.',
    preview: null,
    onSubmit: fn(),
    setShowToast: fn(),
    onImageChange: fn(),
  },
};

/**
 * 긴 이름 테스트
 *
 * 긴 사용자 이름이 UI에 어떻게 표시되는지 확인합니다.
 * 환영 메시지에 이름이 포함되므로 레이아웃이 깨지지 않는지 검증합니다.
 */
export const WithLongName: Story = {
  render: (args) => <InviteSignupTemWithForm {...args} />,
  args: {
    name: '알렉산더 막시밀리안 요한',
    showToast: false,
    toastMessage: '',
    preview: null,
    onSubmit: fn(),
    setShowToast: fn(),
    onImageChange: fn(),
  },
};

/**
 * 복합 상태 (이미지 + Toast)
 *
 * 여러 상태가 동시에 활성화된 복합적인 시나리오입니다.
 * 실제 사용 시 발생할 수 있는 상황을 시뮬레이션합니다.
 */
export const ComplexState: Story = {
  render: (args) => <InviteSignupTemWithForm {...args} />,
  args: {
    name: '정수현',
    showToast: true,
    toastMessage: '입력 정보를 확인해 주세요.',
    preview: 'https://picsum.photos/200/200',
    onSubmit: fn(),
    setShowToast: fn(),
    onImageChange: fn(),
  },
};

/**
 * 네트워크 에러 시나리오
 *
 * 초대 토큰 검증 중 네트워크 에러가 발생한 상황을 시뮬레이션합니다.
 * 서버 에러는 Toast로만 표시됩니다.
 */
export const NetworkError: Story = {
  render: (args) => <InviteSignupTemWithForm {...args} />,
  args: {
    name: '최지훈',
    showToast: true,
    toastMessage: '요청 시간이 초과되었습니다. 다시 시도해주세요.',
    preview: null,
    onSubmit: fn(),
    setShowToast: fn(),
    onImageChange: fn(),
  },
};

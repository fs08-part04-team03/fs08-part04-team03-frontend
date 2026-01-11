'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/features/auth/schemas/login.schema';
import LoginTem from '@/features/auth/template/LoginTem/LoginTem';
import { useToast } from '@/hooks/useToast';
import { useLogin } from '@/features/auth/queries/auth.queries';
import { useAuthRedirect } from '@/features/auth/hooks/useAuthRedirect';

/**
 * LoginSection
 * 로그인 비즈니스 로직을 담당하는 섹션 컴포넌트
 * - form 상태 관리
 * - API 호출
 * - 인증 정보 저장
 * - Toast 관리
 * - 리다이렉트
 */
const LoginSection = () => {
  // useToast 훅 사용
  const { showToast, toastVariant, toastMessage, closeToast } = useToast();

  const loginMutation = useLogin();
  const { redirectToProducts } = useAuthRedirect();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginInput): Promise<void> => {
    loginMutation.mutate(values, {
      onSuccess: (data) => {
        redirectToProducts(data.user);
      },
    });
  };

  return (
    <LoginTem
      control={form.control}
      handleSubmit={form.handleSubmit}
      isValid={form.formState.isValid}
      onSubmit={onSubmit}
      showToast={showToast}
      toastVariant={toastVariant}
      toastMessage={toastMessage}
      setShowToast={closeToast}
    />
  );
};

export default LoginSection;

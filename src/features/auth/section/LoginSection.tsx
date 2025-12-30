'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/features/auth/schemas/login.schema';
import { login } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/lib/store/authStore';
import LoginTem from '@/features/auth/template/LoginTem/LoginTem';
import { useToast } from '@/hooks/useToast';
import { logger } from '@/utils/logger';

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
  const router = useRouter();
  const { setAuth } = useAuthStore();

  // useToast 훅 사용
  const { showToast, toastMessage, triggerToast, closeToast } = useToast();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginInput): Promise<void> => {
    try {
      logger.info('[Login] 로그인 시도 시작');

      const { user, accessToken } = await login({
        email: values.email,
        password: values.password,
      });

      logger.info('[Login] 로그인 API 성공:', { hasAccessToken: !!accessToken });

      // 인증 정보 저장 (zustand - 클라이언트 상태 관리)
      setAuth({ user, accessToken });

      logger.info('[Login] 인증 정보 저장 완료:', {
        userId: user.id,
        role: user.role,
        companyId: user.companyId,
      });

      // 상품 리스트 페이지로 리다이렉트
      const redirectPath = `/${user.companyId}/products`;
      logger.info('[Login] 리다이렉트 시도:', redirectPath);
      router.push(redirectPath);
    } catch (error) {
      logger.error('[Login] 로그인 실패:', error);
      const errorMessage =
        error instanceof Error ? error.message : '이메일 또는 비밀번호가 올바르지 않습니다.';
      triggerToast('custom', errorMessage);
    }
  };

  return (
    <LoginTem
      control={form.control}
      handleSubmit={form.handleSubmit}
      isValid={form.formState.isValid}
      onSubmit={onSubmit}
      showToast={showToast}
      toastMessage={toastMessage}
      setShowToast={closeToast}
    />
  );
};

export default LoginSection;

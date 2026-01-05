'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/features/auth/schemas/login.schema';
import { login } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/lib/store/authStore';
import { setAuthCookies } from '@/utils/cookies';
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
  const { showToast, toastVariant, toastMessage, triggerToast, closeToast } = useToast();

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

      // 쿠키에 인증 정보 저장 (서버 인증 경로에서 사용) - 서버 측에서 안전하게 설정
      // 쿠키 설정을 먼저 수행하여 실패 시 상태 저장을 방지
      try {
        await setAuthCookies(user.role, user.companyId, accessToken);
        logger.info('[Login] 쿠키 저장 완료');
      } catch (cookieError) {
        logger.error('[Login] 쿠키 저장 실패:', cookieError);
        throw new Error('인증 정보 저장에 실패했습니다. 다시 시도해주세요.');
      }

      // 인증 정보 저장 (zustand - 클라이언트 상태 관리)
      setAuth({ user, accessToken });

      // localStorage에 저장되었는지 확인 (보안을 위해 실제 데이터는 로깅하지 않음)
      if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
        const stored = localStorage.getItem('auth-storage');
        logger.info('[Login] localStorage 저장 확인:', {
          hasStored: !!stored,
        });
      }

      logger.info('[Login] 인증 정보 저장 완료:', {
        hasUserId: !!user.id,
        role: user.role,
        hasCompanyId: !!user.companyId,
        hasAccessToken: !!accessToken,
      });

      // 상품 리스트 페이지로 리다이렉트
      const redirectPath = `/${user.companyId}/products`;
      logger.info('[Login] 리다이렉트 시도 - 상품 페이지로 이동');
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
      toastVariant={toastVariant}
      toastMessage={toastMessage}
      setShowToast={closeToast}
    />
  );
};

export default LoginSection;

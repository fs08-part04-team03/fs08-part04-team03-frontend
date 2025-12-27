'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, type LoginInput } from '@/features/auth/schemas/login.schema';
import { login } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/lib/store/authStore';
import { setAuthCookies } from '@/utils/cookies';
import LoginTem from '@/features/auth/template/LoginTem/LoginTem';

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
  const [serverError, setServerError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const router = useRouter();
  const { setAuth } = useAuthStore();

  // 토스트 자동 닫기 (3초 후)
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [showToast]);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginInput): Promise<void> => {
    setServerError(null);

    try {
      // eslint-disable-next-line no-console
      console.log('[Login] 로그인 시도 시작:', { email: values.email });
      const { user, accessToken } = await login({
        email: values.email,
        password: values.password,
      });

      // eslint-disable-next-line no-console
      console.log('[Login] 로그인 API 성공:', { user, hasAccessToken: !!accessToken });

      // 인증 정보 저장 (zustand)
      setAuth({ user, accessToken });
      // eslint-disable-next-line no-console
      console.log('[Login] 인증 정보 저장 완료');

      // 쿠키에 인증 정보 저장 (middleware에서 사용) - 서버 측에서 안전하게 설정
      // accessToken을 함께 전송하여 서버 측에서 검증 가능하도록 함
      await setAuthCookies(user.role, user.companyId, accessToken);
      // eslint-disable-next-line no-console
      console.log('[Login] 쿠키 저장 완료:', {
        role: user.role,
        companyId: user.companyId,
      });

      // 상품 리스트 페이지로 리다이렉트
      const redirectPath = `/${user.companyId}/products`;
      // eslint-disable-next-line no-console
      console.log('[Login] 리다이렉트 시도:', redirectPath);
      router.push(redirectPath);
      // eslint-disable-next-line no-console
      console.log('[Login] router.push 호출 완료');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[Login] 로그인 실패:', error);
      const errorMessage =
        error instanceof Error ? error.message : '이메일 또는 비밀번호가 올바르지 않습니다.';
      setToastMessage(errorMessage);
      setShowToast(true);
      setServerError(errorMessage);
    }
  };

  return (
    <LoginTem
      control={form.control}
      handleSubmit={form.handleSubmit}
      isValid={form.formState.isValid}
      serverError={serverError}
      onSubmit={onSubmit}
      showToast={showToast}
      toastMessage={toastMessage}
      setShowToast={setShowToast}
    />
  );
};

export default LoginSection;

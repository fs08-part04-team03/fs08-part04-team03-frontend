'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, type LoginInput } from '@/features/auth/schemas/login.schema';
import { login } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/lib/store/authStore';

export const useLoginForm = () => {
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
    try {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[Login] 로그인 시도 시작');
      }
      const { user, accessToken } = await login({
        email: values.email,
        password: values.password,
      });

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[Login] 로그인 API 성공:', { hasAccessToken: !!accessToken });
      }

      // 인증 정보 저장 (zustand - 클라이언트 상태 관리)
      setAuth({ user, accessToken });

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[Login] 인증 정보 저장 완료:', {
          userId: user.id,
          role: user.role,
          companyId: user.companyId,
        });
      }

      // 상품 리스트 페이지로 리다이렉트
      const redirectPath = `/${user.companyId}/products`;
      router.push(redirectPath);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('[Login] 로그인 실패:', error);
      }
      const errorMessage =
        error instanceof Error ? error.message : '이메일 또는 비밀번호가 올바르지 않습니다.';
      setToastMessage(errorMessage);
      setShowToast(true);
    }
  };

  return { ...form, onSubmit, showToast, toastMessage, setShowToast };
};

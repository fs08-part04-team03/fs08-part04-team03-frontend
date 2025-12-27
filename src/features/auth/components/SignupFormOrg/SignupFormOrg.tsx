'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupSchema, type SignupInput } from '@/features/auth/schemas/signup.schema';
import { signup } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/lib/store/authStore';

export const useSignupForm = () => {
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

  const onSubmit = async (values: SignupInput): Promise<void> => {
    setServerError(null);

    try {
      // eslint-disable-next-line no-console
      console.log('[Signup] 회원가입 시도 시작:', { email: values.email, name: values.name });
      const { user, accessToken } = await signup({
        name: values.name,
        email: values.email,
        password: values.password,
        companyName: values.companyName,
        businessNumber: values.businessNumber,
      });

      // eslint-disable-next-line no-console
      console.log('[Signup] 회원가입 API 성공:', { user, hasAccessToken: !!accessToken });

      // 인증 정보 저장 (zustand)
      setAuth({ user, accessToken });
      // eslint-disable-next-line no-console
      console.log('[Signup] 인증 정보 저장 완료');

      // 쿠키에 인증 정보 저장 (middleware에서 사용)
      document.cookie = `mock-role=${user.role}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7일
      document.cookie = `mock-company-id=${user.companyId}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7일
      // eslint-disable-next-line no-console
      console.log('[Signup] 쿠키 저장 완료:', {
        role: user.role,
        companyId: user.companyId,
      });

      // 상품 리스트 페이지로 리다이렉트
      const redirectPath = `/${user.companyId}/products`;
      // eslint-disable-next-line no-console
      console.log('[Signup] 리다이렉트 시도:', redirectPath);
      router.push(redirectPath);
      // eslint-disable-next-line no-console
      console.log('[Signup] router.push 호출 완료');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[Signup] 회원가입 실패:', error);
      const errorMessage =
        error instanceof Error ? error.message : '회원가입에 실패했습니다. 다시 시도해 주세요.';
      setToastMessage(errorMessage);
      setShowToast(true);
      setServerError(errorMessage);
    }
  };

  return { ...form, serverError, setServerError, onSubmit, showToast, toastMessage, setShowToast };
};

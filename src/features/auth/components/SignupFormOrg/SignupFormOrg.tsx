'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PATHNAME } from '@/constants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signupSchema, type SignupInput } from '@/features/auth/schemas/signup.schema';
import { signup } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/lib/store/authStore';
import { logger } from '@/utils/logger';

export const useSignupForm = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

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
    try {
      logger.info('[Signup] 회원가입 시도 시작');
      const { user, accessToken } = await signup({
        name: values.name,
        email: values.email,
        password: values.password,
        passwordConfirm: values.confirmPassword,
        companyName: values.companyName,
        businessNumber: values.businessNumber,
      });

      logger.info('[Signup] 회원가입 API 성공', { hasAccessToken: !!accessToken });

      // 인증 정보 저장 (zustand - 클라이언트 상태 관리)
      setAuth({ user, accessToken });

      logger.info('[Signup] 인증 정보 저장 완료', {
        role: user.role,
      });

      // 상품 리스트 페이지로 리다이렉트
      router.push(PATHNAME.PRODUCTS(user.companyId));
    } catch (error) {
      logger.error('[Signup] 회원가입 실패', {
        message: error instanceof Error ? error.message : '알 수 없는 오류',
      });
      const errorMessage =
        error instanceof Error ? error.message : '회원가입에 실패했습니다. 다시 시도해 주세요.';
      setToastMessage(errorMessage);
      setShowToast(true);
    }
  };

  return { ...form, onSubmit, showToast, toastMessage, setShowToast };
};

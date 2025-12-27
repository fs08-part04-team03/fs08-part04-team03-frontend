'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { inviteSignupSchema, type InviteSignupInput } from '@/features/auth/schemas/signup.schema';
import { inviteSignup } from '@/features/auth/api/auth.api';
import { useAuthStore } from '@/lib/store/authStore';
import { setAuthCookies } from '@/utils/cookies';

export const useInviteSignupForm = (email: string, token: string) => {
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

  const form = useForm<InviteSignupInput>({
    resolver: zodResolver(inviteSignupSchema),
    mode: 'onTouched',
    defaultValues: {
      email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: InviteSignupInput): Promise<void> => {
    setServerError(null);

    try {
      // eslint-disable-next-line no-console
      console.log('[InviteSignup] 초대 회원가입 시도 시작:', { email: values.email });
      const { user, accessToken } = await inviteSignup({
        email: values.email,
        password: values.password,
        inviteToken: token,
      });

      // eslint-disable-next-line no-console
      console.log('[InviteSignup] 초대 회원가입 API 성공:', {
        user,
        hasAccessToken: !!accessToken,
      });

      // 인증 정보 저장 (zustand)
      setAuth({ user, accessToken });
      // eslint-disable-next-line no-console
      console.log('[InviteSignup] 인증 정보 저장 완료');

      // 쿠키에 인증 정보 저장 (middleware에서 사용) - 서버 측에서 안전하게 설정
      // accessToken을 함께 전송하여 서버 측에서 검증 가능하도록 함
      await setAuthCookies(user.role, user.companyId, accessToken);
      // eslint-disable-next-line no-console
      console.log('[InviteSignup] 쿠키 저장 완료:', {
        role: user.role,
        companyId: user.companyId,
      });

      // 상품 리스트 페이지로 리다이렉트
      const redirectPath = `/${user.companyId}/products`;
      // eslint-disable-next-line no-console
      console.log('[InviteSignup] 리다이렉트 시도:', redirectPath);
      router.push(redirectPath);
      // eslint-disable-next-line no-console
      console.log('[InviteSignup] router.push 호출 완료');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('[InviteSignup] 초대 회원가입 실패:', error);
      const errorMessage =
        error instanceof Error ? error.message : '회원가입에 실패했습니다. 다시 시도해 주세요.';
      setToastMessage(errorMessage);
      setShowToast(true);
      setServerError(errorMessage);
    }
  };

  return { ...form, serverError, setServerError, onSubmit, showToast, toastMessage, setShowToast };
};

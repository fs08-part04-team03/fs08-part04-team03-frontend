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
    try {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[InviteSignup] 초대 회원가입 시도 시작:', { email: values.email });
      }
      const { user, accessToken } = await inviteSignup({
        email: values.email,
        password: values.password,
        inviteToken: token,
      });

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[InviteSignup] 초대 회원가입 API 성공:', {
          user,
          hasAccessToken: !!accessToken,
        });
      }

      // 쿠키에 인증 정보 저장 (서버 인증 경로에서 사용) - 서버 측에서 안전하게 설정
      // 쿠키 설정을 먼저 수행하여 실패 시 상태 저장을 방지
      // accessToken을 함께 전송하여 서버 측에서 검증 가능하도록 함
      try {
        await setAuthCookies(user.role, user.companyId, accessToken);
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.log('[InviteSignup] 쿠키 저장 완료');
        }
      } catch (cookieError) {
        // 쿠키 설정 실패 시 에러 처리
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[InviteSignup] 쿠키 저장 실패:', cookieError);
        }
        throw new Error('인증 정보 저장에 실패했습니다. 다시 시도해주세요.');
      }

      // 인증 정보 저장 (zustand - 클라이언트 상태 관리)
      setAuth({ user, accessToken });

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.log('[InviteSignup] 인증 정보 저장 완료:', {
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
        console.error('[InviteSignup] 초대 회원가입 실패:', error);
      }
      const errorMessage =
        error instanceof Error ? error.message : '회원가입에 실패했습니다. 다시 시도해 주세요.';
      setToastMessage(errorMessage);
      setShowToast(true);
    }
  };

  return { ...form, onSubmit, showToast, toastMessage, setShowToast };
};

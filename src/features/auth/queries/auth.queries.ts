'use client';

import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getInviteInfo,
  login,
  signup,
  inviteSignup,
  logout,
  isCompanySelectionRequiredError,
} from '@/features/auth/api/auth.api';
import type { LoginInput } from '@/features/auth/schemas/login.schema';
import type { SignupInput, InviteSignupInput } from '@/features/auth/schemas/signup.schema';
import { useToast } from '@/hooks/useToast';
import { useAuthStore } from '@/lib/store/authStore';
import { logger } from '@/utils/logger';
import { STALE_TIME } from '@/constants/staleTime';
import type { User } from '@/lib/store/authStore';
import { authKeys } from './auth.keys';

/**
 * 초대 정보 조회 훅
 */
export function useInviteInfo(inviteUrl: string, options?: { enabled?: boolean }) {
  const { enabled = true } = options || {};

  return useQuery({
    queryKey: authKeys.invite(inviteUrl),
    queryFn: () => getInviteInfo(inviteUrl),
    enabled: enabled && !!inviteUrl,
    retry: false, // 실패 시 재시도 안 함
    staleTime: STALE_TIME.NONE, // 초대 정보는 항상 최신 데이터
  });
}

/**
 * 로그인 mutation 훅
 */
export function useLogin() {
  const { setAuth } = useAuthStore();
  const { triggerToast } = useToast();

  return useMutation<{ user: User; accessToken: string }, Error, LoginInput>({
    mutationFn: async (credentials: LoginInput) => {
      const result = await login(credentials);
      return result;
    },
    onSuccess: (data) => {
      const { user, accessToken } = data;
      setAuth({ user, accessToken });

      // localStorage에 저장되었는지 확인 (개발 환경에서만)
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
    },
    onError: (err: unknown) => {
      // CompanySelectionRequiredError는 Toast로 표시 X (LoginSection에서 처리)
      if (isCompanySelectionRequiredError(err)) {
        return;
      }
      const message =
        err instanceof Error ? err.message : '이메일 또는 비밀번호가 올바르지 않습니다.';
      triggerToast('custom', message);
      logger.error('[Login] 로그인 실패:', err);
    },
  });
}

/**
 * 회원가입 mutation 훅
 */
export function useSignup() {
  const { setAuth } = useAuthStore();
  const { triggerToast } = useToast();

  return useMutation<
    { user: User; accessToken: string },
    Error,
    Omit<SignupInput, 'confirmPassword'> & { passwordConfirm: string }
  >({
    mutationFn: (signupData: Omit<SignupInput, 'confirmPassword'> & { passwordConfirm: string }) =>
      signup(signupData),
    onSuccess: (data) => {
      const { user, accessToken } = data;
      setAuth({ user, accessToken });
      logger.info('[Signup] 회원가입 성공', {
        hasUserId: !!user.id,
        role: user.role,
        hasCompanyId: !!user.companyId,
      });
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '회원가입에 실패했습니다.';
      triggerToast('error', message);
      logger.error('[Signup] 회원가입 실패:', err);
    },
  });
}

/**
 * 초대 회원가입 mutation 훅
 */
export function useInviteSignup() {
  const { setAuth } = useAuthStore();
  const { triggerToast } = useToast();

  return useMutation<
    { user: User; accessToken: string },
    Error,
    Omit<InviteSignupInput, 'confirmPassword'> & { inviteToken: string }
  >({
    mutationFn: (
      signupData: Omit<InviteSignupInput, 'confirmPassword'> & { inviteToken: string }
    ) => inviteSignup(signupData),
    onSuccess: (data) => {
      const { user, accessToken } = data;
      setAuth({ user, accessToken });
      logger.info('[InviteSignup] 초대 회원가입 성공', {
        hasUserId: !!user.id,
        role: user.role,
        hasCompanyId: !!user.companyId,
      });
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '회원가입에 실패했습니다.';
      triggerToast('error', message);
      logger.error('[InviteSignup] 초대 회원가입 실패:', err);
    },
  });
}

/**
 * 로그아웃 mutation 훅
 */
export function useLogout() {
  const { clearAuth } = useAuthStore();
  const { triggerToast } = useToast();

  return useMutation<void, Error, void>({
    mutationFn: () => logout(),
    onSuccess: () => {
      clearAuth();
      logger.info('[Logout] 로그아웃 성공');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '로그아웃에 실패했습니다.';
      triggerToast('error', message);
      logger.error('[Logout] 로그아웃 실패:', err);
      // 에러가 발생해도 클라이언트 상태는 정리
      clearAuth();
    },
  });
}

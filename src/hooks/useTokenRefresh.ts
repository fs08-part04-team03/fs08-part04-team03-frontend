'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { tryRefreshToken } from '@/utils/api';
import { logger } from '@/utils/logger';

/**
 * 토큰 자동 갱신 훅
 * - Refresh interval: 4분 (기본값, accessToken 5분 만료 전에 갱신)
 * - Refresh token 만료 시간: 백엔드 .env의 JWT_REFRESH_EXPIRY 설정값 (기본값: 1h)
 * - Refresh token 만료 시 (401 에러) 자동 로그아웃 처리
 * - Rehydration 후 accessToken이 없으면 refresh 시도 (한 번만)
 */
export function useTokenRefresh(refreshInterval: number = 4 * 60 * 1000) {
  const { accessToken, user, isHydrated } = useAuthStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const inFlightRef = useRef(false); // 중복 refresh 방지
  const mountedRef = useRef(false); // 언마운트 레이스 방지
  const rehydrationAttemptedRef = useRef(false); // rehydration 후 refresh 시도 여부

  useEffect(() => {
    mountedRef.current = true;

    // rehydration이 완료되지 않았으면 대기
    if (!isHydrated) {
      return () => {
        mountedRef.current = false;
      };
    }

    // rehydration 후 accessToken이 없으면 refresh 시도 (한 번만)
    // 단, user 정보가 있는 경우에만 시도 (로그인했던 이력이 있는 경우)
    // user 정보도 없으면 이미 로그인하지 않은 상태이므로 토큰 갱신 시도하지 않음
    if (!accessToken && !user && !rehydrationAttemptedRef.current) {
      // 로그인하지 않은 상태이므로 토큰 갱신 시도하지 않음
      rehydrationAttemptedRef.current = true;
      return () => {
        mountedRef.current = false;
      };
    }

    // user 정보는 있지만 accessToken이 없는 경우 (예: localStorage에서 user는 복원되었지만 accessToken은 만료된 경우)
    if (!accessToken && user && !rehydrationAttemptedRef.current) {
      rehydrationAttemptedRef.current = true;
      const attemptRefresh = async () => {
        if (inFlightRef.current) return;
        inFlightRef.current = true;

        try {
          logger.info('[Token Refresh] Rehydration 후 토큰 갱신 시도 (user 정보는 있음)');
          const newToken = await tryRefreshToken();
          if (newToken) {
            logger.info('[Token Refresh] Rehydration 후 토큰 갱신 성공');
          } else {
            // refresh token 만료/없음(401)
            // 포커스 복귀/백그라운드 타이밍에 자동 로그아웃처럼 보이는 현상을 막기 위해
            // 여기서 localStorage를 지우지 않고, 이후 사용자 액션(API 호출/가드)에서 로그인 유도
            logger.warn('[Token Refresh] Rehydration 후 토큰 갱신 실패 - refresh token 만료/없음');
          }
        } catch (error: unknown) {
          logger.warn('[Token Refresh] Rehydration 후 토큰 갱신 중 예외 발생', {
            hasError: true,
            errorType: error instanceof Error ? error.constructor.name : 'Unknown',
          });
          // 일시 장애는 자동 로그아웃(스토리지 삭제)하지 않음
        } finally {
          inFlightRef.current = false;
        }
      };
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      attemptRefresh();
      return () => {
        mountedRef.current = false;
      };
    }

    // accessToken 또는 user가 없으면 주기적 refresh 중단
    if (!accessToken || !user) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return () => {
        mountedRef.current = false;
      };
    }

    const refreshToken = async () => {
      if (inFlightRef.current) return;
      inFlightRef.current = true;

      try {
        const newToken = await tryRefreshToken();
        if (!newToken) {
          // refresh token이 만료되었거나 없음 (401 에러)
          // 주기적 갱신 타이밍에 자동 로그아웃처럼 보이는 현상을 막기 위해
          // 여기서 localStorage를 지우거나 강제 리다이렉트하지 않음
          logger.warn('[Token Refresh] Refresh token 만료 - 다음 사용자 액션에서 로그인 유도');
        }
      } catch (error: unknown) {
        logger.warn('Token refresh failed', {
          hasError: true,
          errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        });
        // 일시 장애는 자동 로그아웃(스토리지 삭제)하지 않음
      } finally {
        // 언마운트 이후라도 플래그는 정리 (메모리/상태 누수 방지)
        inFlightRef.current = false;
      }
    };

    // 마운트 시 즉시 한 번 실행
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refreshToken();

    intervalRef.current = setInterval(() => {
      if (!mountedRef.current) return;
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      refreshToken();
    }, refreshInterval);

    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [accessToken, user, isHydrated, refreshInterval]);
}

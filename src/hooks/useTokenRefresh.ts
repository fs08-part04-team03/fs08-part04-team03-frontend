'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { tryRefreshToken } from '@/utils/api';
import { logger } from '@/utils/logger';

/**
 * 토큰 자동 갱신 훅
 * - Refresh interval: 4분 (기본값, accessToken 5분 만료 전에 갱신)
 * - Refresh token 만료 시간: 백엔드 .env의 JWT_REFRESH_EXPIRY 설정값 (기본값: 1h)
 * - Refresh token 만료 시 (401 에러) 다음 사용자 액션에서 로그인 유도
 * - 초기화(refreshToken으로 복원)는 useAuthInitializer에서 처리됨
 */
export function useTokenRefresh(refreshInterval: number = 4 * 60 * 1000) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const inFlightRef = useRef(false); // 중복 refresh 방지
  const mountedRef = useRef(false); // 언마운트 레이스 방지

  useEffect(() => {
    mountedRef.current = true;

    // 초기화가 완료되지 않았으면 대기
    if (!isInitialized) {
      return () => {
        mountedRef.current = false;
      };
    }

    // accessToken 또는 user가 없으면 주기적 refresh 중단
    // (로그인하지 않은 상태이므로 갱신할 토큰이 없음)
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
          // 여기서 강제 리다이렉트하지 않음
          logger.warn('[Token Refresh] Refresh token 만료 - 다음 사용자 액션에서 로그인 유도');
        }
      } catch (error: unknown) {
        logger.warn('Token refresh failed', {
          hasError: true,
          errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        });
        // 일시 장애는 자동 로그아웃하지 않음
      } finally {
        // 언마운트 이후라도 플래그는 정리 (메모리/상태 누수 방지)
        inFlightRef.current = false;
      }
    };

    // 마운트 시 즉시 한 번 실행 (accessToken 갱신)
    refreshToken().catch(() => {
      // refreshToken 내부에서 try/catch로 처리하지만,
      // eslint(no-void) 규칙을 피하고 예외 누수를 방지하기 위해 방어적으로 catch 처리
    });

    intervalRef.current = setInterval(() => {
      if (!mountedRef.current) return;
      refreshToken().catch(() => {
        // 위와 동일한 이유로 catch 처리
      });
    }, refreshInterval);

    return () => {
      mountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [accessToken, user, isInitialized, refreshInterval]);
}

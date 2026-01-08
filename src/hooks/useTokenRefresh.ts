'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { tryRefreshToken } from '@/utils/api';
import { logger } from '@/utils/logger';

export function useTokenRefresh(refreshInterval: number = 4 * 60 * 1000) {
  const { accessToken, user, isHydrated } = useAuthStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const inFlightRef = useRef(false); // 중복 refresh 방지
  const mountedRef = useRef(false); // 언마운트 레이스 방지

  useEffect(() => {
    mountedRef.current = true;

    // isHydrated가 완료되지 않았으면 대기
    if (!isHydrated) {
      return () => {
        mountedRef.current = false;
      };
    }

    // user가 없으면 리프레시 토큰 시도를 할 수 없음 (로그아웃 상태)
    if (!user) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return () => {
        mountedRef.current = false;
      };
    }

    const refreshToken = async () => {
      if (inFlightRef.current) {
        if (process.env.NODE_ENV === 'development') {
          logger.info('[useTokenRefresh] 이미 진행 중인 리프레시 토큰 요청이 있어 스킵');
        }
        return;
      }
      inFlightRef.current = true;

      if (process.env.NODE_ENV === 'development') {
        logger.info('[useTokenRefresh] 리프레시 토큰 갱신 시도 시작');
      }

      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        const newToken = await tryRefreshToken();
        if (process.env.NODE_ENV === 'development') {
          logger.info('[useTokenRefresh] 리프레시 토큰 갱신 완료', {
            hasNewToken: !!newToken,
          });
        }
      } catch (error: unknown) {
        logger.warn('[useTokenRefresh] Token refresh failed', {
          hasError: true,
          errorType: error instanceof Error ? error.constructor.name : 'Unknown',
          errorMessage: error instanceof Error ? error.message : String(error),
        });
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

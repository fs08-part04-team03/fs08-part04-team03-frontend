'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { tryRefreshToken } from '@/utils/api';

export function useTokenRefresh(refreshInterval: number = 4 * 60 * 1000) {
  const { accessToken, user } = useAuthStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const inFlightRef = useRef(false); // 중복 refresh 방지
  const mountedRef = useRef(false); // 언마운트 레이스 방지

  useEffect(() => {
    mountedRef.current = true;

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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        await tryRefreshToken();
      } catch (error: unknown) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          if (error instanceof Error) {
            console.warn('[useTokenRefresh] Token refresh failed:', error.message);
          } else {
            console.warn('[useTokenRefresh] Token refresh failed:', error);
          }
        }
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
  }, [accessToken, user, refreshInterval]);
}

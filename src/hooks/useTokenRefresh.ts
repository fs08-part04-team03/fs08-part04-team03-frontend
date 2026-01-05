'use client';

import { useEffect, useRef } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import { tryRefreshToken } from '@/utils/api';

/**
 * Access token 자동 갱신 훅
 *
 * - Access token이 만료되기 전에 자동으로 갱신합니다
 * - 기본적으로 4분마다 갱신 (5분 만료 기준)
 * - 로그인된 사용자에게만 작동합니다
 *
 * @param refreshInterval - 갱신 간격 (밀리초), 기본값: 4분 (240000ms)
 */
export function useTokenRefresh(refreshInterval: number = 4 * 60 * 1000) {
  const { accessToken, user } = useAuthStore();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 로그인되지 않은 경우 갱신하지 않음
    if (!accessToken || !user) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return undefined;
    }

    // 토큰 갱신 함수
    const refreshToken = async () => {
      try {
        await tryRefreshToken();
      } catch (error) {
        // 갱신 실패는 조용히 무시 (401 에러 처리는 fetchWithAuth에서 담당)
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.warn('[useTokenRefresh] Token refresh failed:', error);
        }
      }
    };

    // 주기적으로 토큰 갱신
    intervalRef.current = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      refreshToken();
    }, refreshInterval);

    // 컴포넌트 언마운트 시 interval 정리
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [accessToken, user, refreshInterval]);
}

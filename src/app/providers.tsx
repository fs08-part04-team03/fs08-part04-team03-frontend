'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect } from 'react';
import { useTokenRefresh } from '@/hooks/useTokenRefresh';
import { useAuthStore } from '@/lib/store/authStore';
import { logger } from '@/utils/logger';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // 기본값: 엄격한 정책 (명시적 요청까지 자동 갱신/재시도 안 함)
        // - 각 기능별로 필요한 경우만 데이터 갱신 활성화
        // - HTTP 계층에서 토큰 갱신/429 대응 등 기술적 재시도 처리
        // - useQuery 호출 시 필요에 따라 재정의 권장
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
            gcTime: 10 * 60 * 1000, // 10분간 가비지 컬렉션 방지 (캐시 메모리 유지)
            refetchOnWindowFocus: false,
            refetchOnMount: false, // 마운트 시 자동 refetch 방지
            refetchOnReconnect: false, // 재연결 시 자동 refetch 방지
            retry: 0, // 재시도 완전 비활성화 (TOO_MANY_REQUESTS 방지)
            networkMode: 'online', // 온라인일 때만 쿼리 실행
          },
          mutations: {
            retry: 0, // mutation은 재시도 없음
            networkMode: 'online',
          },
        },
      })
  );

  const { isHydrated, user, setAuth } = useAuthStore();

  // 마운트 시 localStorage에서 인증 정보 복원 확인 (fallback)
  useEffect(() => {
    if (!isHydrated || user) return; // 이미 복원되었거나 사용자가 있으면 스킵

    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('auth-storage');
        if (stored) {
          const parsedData = JSON.parse(stored) as {
            state?: { user?: unknown; accessToken?: string };
            version?: number;
          };

          if (parsedData?.state?.user && !user) {
            logger.info('[Providers] localStorage에서 인증 정보 발견, 복원 시도');
            setAuth({
              user: parsedData.state.user as Parameters<typeof setAuth>[0]['user'],
              accessToken: parsedData.state.accessToken || null,
            });
            logger.info('[Providers] 인증 정보 복원 완료');
          }
        }
      } catch (error) {
        logger.error('[Providers] localStorage 복원 실패:', error);
      }
    }
  }, [isHydrated, user, setAuth]);

  // Access token 자동 갱신 (4분마다, 5분 만료 기준)
  useTokenRefresh();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

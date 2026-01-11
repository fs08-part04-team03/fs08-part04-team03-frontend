'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { useTokenRefresh } from '@/hooks/useTokenRefresh';
import { STALE_TIME } from '@/constants/staleTime';

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
            staleTime: STALE_TIME.FIVE_MINUTES, // 5분간 캐시 유지
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

  // Access token 자동 갱신
  // - Refresh interval: 4분 (accessToken 5분 만료 전에 갱신)
  // - Refresh token 만료: 백엔드 .env의 JWT_REFRESH_EXPIRY 설정값 (기본값: 1h)
  // - Refresh token 만료 시 자동 로그아웃 처리
  useTokenRefresh();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* 프로덕션에서는 ReactQueryDevtools 제거 (번들 크기 감소) */}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
};

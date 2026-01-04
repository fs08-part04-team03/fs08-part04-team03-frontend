'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
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

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

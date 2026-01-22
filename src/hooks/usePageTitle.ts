'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store/authStore';

interface UsePageTitleOptions {
  /** 유저 이름을 제목에 포함할지 여부 (기본값: false) */
  includeUserName?: boolean;
}

/**
 * 페이지 제목을 동적으로 설정하는 훅
 * 기본 형식: {회사이름} - {페이지이름}
 * includeUserName=true: {회사이름} - {유저이름} {페이지이름}
 *
 * @param pageName - 페이지 이름 (예: '상품 목록', 'Dashboard')
 * @param options - 옵션 (includeUserName: 유저 이름 포함 여부)
 */
export function usePageTitle(pageName: string, options?: UsePageTitleOptions) {
  const user = useAuthStore((state) => state.user);
  const accessToken = useAuthStore((state) => state.accessToken);
  const includeUserName = options?.includeUserName ?? false;

  useEffect(() => {
    // user가 있고 accessToken이 있으면 회사 정보 조회
    const updateTitle = async () => {
      if (user?.companyId && accessToken) {
        try {
          const response = await fetch('/api/v1/company', {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
            credentials: 'include',
          });

          if (response.ok) {
            const data = (await response.json()) as { data?: { name?: string } };
            const companyName = data.data?.name;

            if (companyName) {
              if (includeUserName && user.name) {
                document.title = `${companyName} - ${user.name} ${pageName}`;
              } else {
                document.title = `${companyName} - ${pageName}`;
              }
              return;
            }
          }
        } catch {
          // 에러 시 기본 제목 사용
        }
      }

      // 회사 정보가 없으면 기본 제목
      if (includeUserName && user?.name) {
        document.title = `${user.name} ${pageName}`;
      } else {
        document.title = pageName;
      }
    };

    updateTitle().catch(() => {
      // 에러 무시
    });
  }, [user, accessToken, pageName, includeUserName]);
}

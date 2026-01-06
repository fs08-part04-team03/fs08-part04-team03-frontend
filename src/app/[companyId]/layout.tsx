// src/app/[companyId]/layout.tsx
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { cache } from 'react';

import AuthGuard from '@/components/auth/AuthGuard';
import HeaderShell from '@/components/organisms/HeaderShell/HeaderShell';
import { getApiUrl, getApiTimeout } from '@/utils/api';
import { logger } from '@/utils/logger';

export const dynamic = 'force-dynamic';

interface Company {
  name: string;
}

/**
 * 회사 정보 API 응답 타입
 * GET /api/v1/company 응답 형식
 */
interface CompanyApiResponse {
  success: boolean;
  data: {
    id: string;
    name: string;
  };
  message: string;
}

/**
 * 현재 로그인 컨텍스트(쿠키 accessToken) 기준으로 회사 정보 조회
 * - 서버 컴포넌트에서 쿠키를 읽어 인증된 사용자의 회사 정보를 가져옵니다.
 * - React cache()로 래핑하여 동일한 렌더링 사이클 내에서 요청 중복 제거
 */
const fetchMyCompany = cache(async (): Promise<Company> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return { name: '회사' };
  }

  try {
    const apiUrl = getApiUrl();
    const timeout = getApiTimeout();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${apiUrl}/api/v1/company`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        // 5분간 캐시 유지 (TOO_MANY_REQUESTS 방지)
        next: { revalidate: 300 },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        logger.error('API call failed in fetchMyCompany', {
          status: response.status,
          statusText: response.statusText,
        });
        // 429 에러 시에도 기본값 반환하여 UI 깨짐 방지
        return { name: '회사' };
      }

      const result = (await response.json()) as CompanyApiResponse;

      // API 응답 형식: { success: true, data: { id, name }, message }
      if (result.success && result.data?.name) {
        return { name: result.data.name };
      }

      logger.warn('Unexpected response format in fetchMyCompany', {
        hasSuccess: result.success,
        hasData: !!result.data,
      });
      return { name: '회사' };
    } catch (fetchError) {
      clearTimeout(timeoutId);
      logger.error('Fetch failed in fetchMyCompany', {
        hasError: true,
        errorType: fetchError instanceof Error ? fetchError.constructor.name : 'Unknown',
      });
      // 네트워크 에러 시 기본값 반환 (사용자에게는 에러를 표시하지 않음)
      return { name: '회사' };
    }
  } catch (error) {
    logger.error('Exception in fetchMyCompany', {
      hasError: true,
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
    });
    return { name: '회사' };
  }
});

/**
 * companyId 스코프 전체에 적용되는 메타데이터 템플릿
 * - 하위 페이지에서 metadata.title = '상품관리'를 주면,
 *   `${companyName} · 상품관리 | SNACK`로 자동 조합됩니다.
 */
export async function generateMetadata(): Promise<Metadata> {
  const company = await fetchMyCompany();

  return {
    title: {
      template: `${company.name} · %s | SNACK`,
      default: `${company.name} | SNACK`,
    },
    description: `${company.name}의 간식 구매 내역을 한 곳에서 통합 관리하세요. 구매 기록, 예산, 카테고리별 상품 데이터를 손쉽게 확인할 수 있습니다.`,
  };
}

const CompanyLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <AuthGuard companyId={companyId}>
      <HeaderShell />
      <main className="container mx-auto px-16 tablet:px-24 desktop:max-w-1200 min-w-371">
        {children}
      </main>
    </AuthGuard>
  );
};

export default CompanyLayout;

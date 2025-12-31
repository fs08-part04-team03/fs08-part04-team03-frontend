import { getApiUrl, getApiTimeout } from '@/utils/api';
import { useAuthStore } from '@/lib/store/authStore';

/**
 * 회사 정보 인터페이스
 */
export interface Company {
  id: string;
  name: string;
}

/**
 * 회사 정보 조회 API 응답 형식
 */
interface CompanyApiResponse {
  success: boolean;
  data: Company;
  message: string;
}

/**
 * 현재 로그인한 사용자의 회사 정보 조회
 * - 엔드포인트: GET /api/v1/company
 * - 로그인한 사용자의 회사 정보를 반환
 * - Authorization 헤더에 JWT 토큰 필요
 *
 * @param accessToken - JWT 액세스 토큰
 * @returns 회사 정보 (id, name)
 * @throws {Error} 인증 실패 또는 서버 오류 시
 */
export async function getCompany(accessToken: string): Promise<Company> {
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
      credentials: 'include', // 쿠키 기반 인증을 위해 필요
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // 401 Unauthorized 에러 처리
    if (response.status === 401) {
      const { clearAuth } = useAuthStore.getState();
      clearAuth();
      // 리다이렉트를 약간 지연시켜 React Query가 에러를 처리할 수 있도록 함
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          window.location.href = '/login';
        }, 100);
      }
      throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
    }

    if (!response.ok) {
      throw new Error('회사 정보를 가져오는데 실패했습니다.');
    }

    const result = (await response.json()) as CompanyApiResponse;
    return result.data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다.');
    }
    throw error;
  }
}

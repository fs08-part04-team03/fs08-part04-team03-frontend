import { fetchWithAuth } from '@/utils/api';
import { COMPANY_API_PATHS } from '@/features/profile/constants/company.api';

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
  try {
    const response = await fetchWithAuth(
      COMPANY_API_PATHS.GET_COMPANY,
      {
        method: 'GET',
      },
      accessToken
    );

    if (!response.ok) {
      const errorData = (await response.json().catch(() => null)) as { message?: string } | null;
      throw new Error(errorData?.message || '회사 정보를 가져오는데 실패했습니다.');
    }

    const result = (await response.json()) as CompanyApiResponse;
    return result.data;
  } catch (error) {
    // 네트워크 에러 또는 기타 에러 처리
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('네트워크 연결에 실패했습니다. 인터넷 연결을 확인해주세요.');
    }
    // 기타 에러는 그대로 throw
    throw error;
  }
}

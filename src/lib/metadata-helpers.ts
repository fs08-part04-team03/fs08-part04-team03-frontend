import { cookies } from 'next/headers';
import { getApiUrl, getApiTimeout } from '@/utils/api';

/**
 * 회사 정보 타입
 */
export interface Company {
  id: string;
  name: string;
}

/**
 * 사용자 정보 타입
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  companyId: string;
}

/**
 * 회사 정보 API 응답 타입
 */
interface CompanyApiResponse {
  success: boolean;
  data: Company;
  message: string;
}

/**
 * 사용자 정보 API 응답 타입
 */
interface UserApiResponse {
  success: boolean;
  data: User;
  message: string;
}

/**
 * 서버 컴포넌트에서 쿠키의 accessToken을 가져오는 헬퍼 함수
 */
async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value;
}

/**
 * 서버 컴포넌트에서 회사 정보를 가져오는 함수
 * - 메타데이터 생성에 사용
 */
export async function fetchCompanyForMetadata(): Promise<{ name: string }> {
  const accessToken = await getAccessToken();

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
        cache: 'no-store',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[fetchCompanyForMetadata] API 응답 실패:', {
            status: response.status,
            statusText: response.statusText,
          });
        }
        return { name: '회사' };
      }

      const result = (await response.json()) as CompanyApiResponse;

      if (result.success && result.data?.name) {
        return { name: result.data.name };
      }

      return { name: '회사' };
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('[fetchCompanyForMetadata] fetch 실패:', fetchError);
      }
      return { name: '회사' };
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('[fetchCompanyForMetadata] 예외 발생:', error);
    }
    return { name: '회사' };
  }
}

/**
 * 서버 컴포넌트에서 사용자 정보를 가져오는 함수
 * - 메타데이터 생성에 사용
 * - localStorage가 아닌 쿠키의 accessToken으로 API 호출
 */
export async function fetchUserForMetadata(): Promise<{ name: string } | null> {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return null;
  }

  try {
    const apiUrl = getApiUrl();

    // JWT 토큰 디코딩하여 사용자 정보 추출 (간단한 방법)
    // JWT는 Base64로 인코딩되어 있으므로 디코딩해서 사용자 정보를 얻을 수 있습니다
    const tokenParts = accessToken.split('.');
    if (tokenParts.length !== 3 || !tokenParts[1]) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(tokenParts[1], 'base64').toString('utf-8')) as {
      name?: string;
    };

    // JWT payload에 사용자 이름이 있다면 반환
    if (payload.name) {
      return { name: payload.name };
    }

    // JWT에 이름이 없다면 API 호출 (백엔드에 GET /api/v1/user/me 같은 엔드포인트가 있다고 가정)
    const timeout = getApiTimeout();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(`${apiUrl}/api/v1/user/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[fetchUserForMetadata] API 응답 실패:', {
            status: response.status,
            statusText: response.statusText,
          });
        }
        return null;
      }

      const result = (await response.json()) as UserApiResponse;

      if (result.success && result.data?.name) {
        return { name: result.data.name };
      }

      return null;
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('[fetchUserForMetadata] fetch 실패:', fetchError);
      }
      return null;
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('[fetchUserForMetadata] 예외 발생:', error);
    }
    return null;
  }
}

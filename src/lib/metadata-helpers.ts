import { cookies } from 'next/headers';

import { DEFAULT_API_URL } from '@/features/auth/utils/constants';

/**
 * 서버 컴포넌트에서 메타데이터(title/description)를 만들 때 사용하는 헬퍼들입니다.
 *
 * refreshToken(httpOnly 쿠키)을 사용해서 회사 정보를 조회합니다.
 */
export async function fetchCompanyForMetadata(): Promise<{ name: string }> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return { name: '' }; // 로그인 안 된 상태
    }

    // refreshToken으로 accessToken 갱신
    const refreshResponse = await fetch(`${DEFAULT_API_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `refreshToken=${refreshToken}`,
      },
      body: JSON.stringify({}),
      cache: 'no-store',
    });

    if (!refreshResponse.ok) {
      return { name: '' };
    }

    const refreshData = (await refreshResponse.json()) as {
      data?: { accessToken?: string; user?: { companyId?: string } };
    };
    const accessToken = refreshData.data?.accessToken;

    if (!accessToken) {
      return { name: '' };
    }

    // 회사 정보 조회
    const companyResponse = await fetch(`${DEFAULT_API_URL}/api/v1/company`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      cache: 'no-store',
    });

    if (!companyResponse.ok) {
      return { name: '' };
    }

    const companyData = (await companyResponse.json()) as {
      data?: { name?: string };
    };

    return { name: companyData.data?.name || '' };
  } catch {
    return { name: '' };
  }
}

export function fetchUserForMetadata(): Promise<{ name: string } | null> {
  return Promise.resolve(null);
}

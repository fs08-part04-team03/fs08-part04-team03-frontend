import { getApiUrl, getApiTimeout } from '@/utils/api';

/**
 * 프로필 업데이트 입력 데이터 (레거시)
 */
export interface UpdateProfileInput {
  companyName: string;
  password?: string;
}

/**
 * 프로필 업데이트 응답 데이터 (레거시)
 */
export interface UpdateProfileResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  companyId: string;
}

/**
 * 관리자 프로필 업데이트 입력 데이터
 * - 회사명과 비밀번호를 선택적으로 변경 가능
 */
export interface UpdateAdminProfileInput {
  companyName?: string;
  password?: string;
}

/**
 * 일반 사용자/매니저 프로필 업데이트 입력 데이터
 * - 비밀번호만 변경 가능
 */
export interface UpdateUserProfileInput {
  password?: string;
}

/**
 * API 에러 응답 형식
 */
interface ApiErrorResponse {
  success: boolean;
  message: string;
  errorCode?: string;
}

/**
 * API 성공 응답 형식 (제네릭)
 */
interface ApiSuccessResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export async function updateProfile(
  userId: string,
  data: UpdateProfileInput
): Promise<UpdateProfileResponse> {
  const apiUrl = getApiUrl();
  const timeout = getApiTimeout();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const requestBody: { companyName: string; password?: string } = {
      companyName: data.companyName,
    };

    // 비밀번호가 입력된 경우에만 포함
    if (data.password && data.password.trim() !== '') {
      requestBody.password = data.password;
    }

    const response = await fetch(`${apiUrl}/api/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
      credentials: 'include',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = (await response.json().catch(() => null)) as ApiErrorResponse | null;
      throw new Error(errorData?.message || '프로필 변경에 실패했습니다.');
    }

    const result = (await response.json()) as ApiSuccessResponse<UpdateProfileResponse>;
    return result.data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다.');
    }
    throw error;
  }
}

export async function updateCompanyName(companyId: string, companyName: string): Promise<void> {
  const apiUrl = getApiUrl();
  const timeout = getApiTimeout();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${apiUrl}/api/companies/${companyId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: companyName }),
      signal: controller.signal,
      credentials: 'include',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = (await response.json().catch(() => null)) as ApiErrorResponse | null;

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('[updateCompanyName] API 에러:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
          url: `${apiUrl}/api/companies/${companyId}`,
        });
      }

      throw new Error(errorData?.message || `기업명 변경에 실패했습니다. (${response.status})`);
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다.');
    }
    throw error;
  }
}

export async function updatePassword(userId: string, password: string): Promise<void> {
  const apiUrl = getApiUrl();
  const timeout = getApiTimeout();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${apiUrl}/api/users/${userId}/password`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
      signal: controller.signal,
      credentials: 'include',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = (await response.json().catch(() => null)) as ApiErrorResponse | null;

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('[updatePassword] API 에러:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
          url: `${apiUrl}/api/users/${userId}/password`,
        });
      }

      throw new Error(errorData?.message || `비밀번호 변경에 실패했습니다. (${response.status})`);
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다.');
    }
    throw error;
  }
}

/**
 * 관리자 프로필 업데이트
 * - 엔드포인트: PATCH /api/v1/user/admin/profile
 * - 권한: ADMIN만 사용 가능
 * - 회사명과 비밀번호를 선택적으로 변경 가능
 *
 * @param data - 변경할 프로필 데이터 (companyName, password 중 하나 이상 필수)
 * @param accessToken - JWT 액세스 토큰
 * @throws {Error} 인증 실패, 권한 없음, 또는 서버 오류 시
 */
export async function updateAdminProfile(
  data: UpdateAdminProfileInput,
  accessToken: string
): Promise<void> {
  const apiUrl = getApiUrl();
  const timeout = getApiTimeout();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const requestBody: { companyName?: string; password?: string } = {};

    if (data.companyName && data.companyName.trim() !== '') {
      requestBody.companyName = data.companyName;
    }

    if (data.password && data.password.trim() !== '') {
      requestBody.password = data.password;
    }

    const response = await fetch(`${apiUrl}/api/v1/user/admin/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
      credentials: 'include',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const responseText = await response.text();
      let errorData: ApiErrorResponse | null = null;

      try {
        errorData = JSON.parse(responseText) as ApiErrorResponse;
      } catch {
        // Response is not JSON
      }

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('[updateAdminProfile] API 에러:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
          responseText,
          requestBody,
          url: `${apiUrl}/api/v1/user/admin/profile`,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken.substring(0, 20)}...`,
          },
        });
      }

      throw new Error(errorData?.message || `프로필 변경에 실패했습니다. (${response.status})`);
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다.');
    }
    throw error;
  }
}

/**
 * 일반 사용자/매니저 프로필 업데이트
 * - 엔드포인트: PATCH /api/v1/user/me/profile
 * - 권한: USER, MANAGER가 사용 가능
 * - 비밀번호만 변경 가능
 *
 * @param data - 변경할 비밀번호 데이터
 * @param accessToken - JWT 액세스 토큰
 * @throws {Error} 인증 실패 또는 서버 오류 시
 */
export async function updateUserProfile(
  data: UpdateUserProfileInput,
  accessToken: string
): Promise<void> {
  const apiUrl = getApiUrl();
  const timeout = getApiTimeout();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const requestBody: { password?: string } = {};

    if (data.password && data.password.trim() !== '') {
      requestBody.password = data.password;
    }

    const response = await fetch(`${apiUrl}/api/v1/user/me/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
      credentials: 'include',
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = (await response.json().catch(() => null)) as ApiErrorResponse | null;

      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('[updateUserProfile] API 에러:', {
          status: response.status,
          statusText: response.statusText,
          errorData,
          url: `${apiUrl}/api/v1/user/me/profile`,
        });
      }

      throw new Error(errorData?.message || `프로필 변경에 실패했습니다. (${response.status})`);
    }
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다.');
    }
    throw error;
  }
}

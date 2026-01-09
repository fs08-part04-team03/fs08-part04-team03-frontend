import { getApiUrl, getApiTimeout, fetchWithAuth } from '@/utils/api';
import { logger } from '@/utils/logger';

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

/**
 * 내 프로필 조회 응답 데이터
 */
export interface GetMyProfileResponse {
  id: string;
  companyId: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  profileImage?: string; // 프로필 이미지 URL 또는 키
  createdAt: string;
  updatedAt: string;
}

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
 * 내 프로필 조회
 * - 엔드포인트: GET /api/v1/user/me
 * - 권한: USER 이상
 * - 현재 로그인한 사용자의 프로필 정보를 반환
 *
 * @returns 사용자 프로필 정보 (profileImage 포함)
 * @throws {Error} 인증 실패 또는 서버 오류 시
 */
export async function getMyProfile(): Promise<GetMyProfileResponse> {
  try {
    const response = await fetchWithAuth('/api/v1/user/me', {
      method: 'GET',
    });

    if (!response.ok) {
      const errorData = (await response.json().catch(() => null)) as ApiErrorResponse | null;
      throw new Error(errorData?.message || '프로필 조회에 실패했습니다.');
    }

    const result = (await response.json()) as ApiSuccessResponse<GetMyProfileResponse>;

    return result.data;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('네트워크 연결에 실패했습니다. 인터넷 연결을 확인해주세요.');
    }
    throw error;
  }
}

/**
 * 관리자 프로필 업데이트 입력 데이터
 * - 회사명과 비밀번호를 선택적으로 변경 가능
 */
export interface UpdateAdminProfileInput {
  companyName?: string;
  password?: string;
  imageFile?: File; // 프로필 이미지 파일 (선택, 최대 5MB, jpg/jpeg/png/gif/webp)
}

/**
 * 일반 사용자/매니저 프로필 업데이트 입력 데이터
 * - 비밀번호와 프로필 이미지 변경 가능
 * - 최소 하나 이상의 필드 필요
 */
export interface UpdateUserProfileInput {
  newPassword?: string; // 새 비밀번호
  newPasswordConfirm?: string; // 새 비밀번호 확인 (newPassword와 함께 필수)
  imageFile?: File; // 프로필 이미지 파일 (선택, 최대 5MB, jpg/jpeg/png/gif/webp)
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

      logger.error('API error in updateCompanyName', {
        status: response.status,
        statusText: response.statusText,
        hasErrorData: !!errorData,
      });

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

      logger.error('API error in updatePassword', {
        status: response.status,
        statusText: response.statusText,
        hasErrorData: !!errorData,
      });

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
    // 최소 하나 이상의 필드 필요
    const hasCompanyName = !!data.companyName && data.companyName.trim() !== '';
    const hasPassword = !!data.password && data.password.trim() !== '';
    const hasImage = !!data.imageFile;

    if (!hasCompanyName && !hasPassword && !hasImage) {
      throw new Error('변경할 내용을 입력해주세요.');
    }

    // FormData로 전송 (multipart/form-data)
    const formData = new FormData();

    if (hasCompanyName) {
      formData.append('companyName', data.companyName!);
    }
    if (hasPassword) {
      formData.append('password', data.password!);
    }
    if (hasImage && data.imageFile) {
      // 이미지 파일을 전송 (API 스펙에 따르면 image 필드는 파일을 받음)
      formData.append('image', data.imageFile);
    }

    const headers: HeadersInit = {
      Authorization: `Bearer ${accessToken}`,
      // FormData는 Content-Type을 자동으로 설정하므로 명시하지 않음
    };

    const response = await fetch(`${apiUrl}/api/v1/user/admin/profile`, {
      method: 'PATCH',
      headers,
      body: formData,
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

      logger.error('API error in updateAdminProfile', {
        status: response.status,
        statusText: response.statusText,
        hasErrorData: !!errorData,
        responseText,
        hasImageFile: !!data.imageFile,
        hasPassword: !!data.password,
        hasCompanyName: !!data.companyName,
      });

      const errorMessage = errorData?.message || `프로필 변경에 실패했습니다. (${response.status})`;
      throw new Error(errorMessage);
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
 * - 비밀번호 변경 또는 프로필 이미지 업로드 (또는 둘 다 가능)
 * - 최소 하나 이상의 필드 필요
 * - multipart/form-data 형식으로 전송
 *
 * @param data - 변경할 프로필 데이터 (newPassword, newPasswordConfirm, imageFile 중 최소 하나 이상)
 * @param accessToken - JWT 액세스 토큰
 * @returns 업데이트된 프로필 정보
 * @throws {Error} 인증 실패 또는 서버 오류 시
 */
export async function updateUserProfile(
  data: UpdateUserProfileInput,
  accessToken: string
): Promise<GetMyProfileResponse> {
  const apiUrl = getApiUrl();
  const timeout = getApiTimeout();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // 최소 하나 이상의 필드 필요
    const hasPassword = !!data.newPassword && data.newPassword.trim() !== '';
    const hasImage = !!data.imageFile;

    if (!hasPassword && !hasImage) {
      throw new Error('변경할 내용을 입력해주세요. (비밀번호 또는 이미지)');
    }

    // newPassword가 있으면 newPasswordConfirm도 필수
    if (hasPassword && !data.newPasswordConfirm) {
      throw new Error('비밀번호 확인을 입력해주세요.');
    }

    // FormData로 전송 (multipart/form-data)
    const formData = new FormData();

    if (hasPassword) {
      formData.append('newPassword', data.newPassword!);
      formData.append('newPasswordConfirm', data.newPasswordConfirm!);
    }

    // 이미지 파일을 전송 (API 스펙에 따르면 image 필드는 파일을 받음)
    if (hasImage && data.imageFile) {
      formData.append('image', data.imageFile);
    }

    const headers: HeadersInit = {
      Authorization: `Bearer ${accessToken}`,
      // FormData는 Content-Type을 자동으로 설정하므로 명시하지 않음
    };

    const response = await fetch(`${apiUrl}/api/v1/user/me/profile`, {
      method: 'PATCH',
      headers,
      body: formData,
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

      logger.error('API error in updateUserProfile', {
        status: response.status,
        statusText: response.statusText,
        hasErrorData: !!errorData,
        responseText,
        hasImageFile: !!data.imageFile,
        hasPassword,
      });

      const errorMessage = errorData?.message || `프로필 변경에 실패했습니다. (${response.status})`;
      throw new Error(errorMessage);
    }

    const result = (await response.json()) as ApiSuccessResponse<GetMyProfileResponse>;

    return result.data;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다.');
    }
    throw error;
  }
}

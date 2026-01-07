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

    // 개발 환경에서 로깅
    if (process.env.NODE_ENV === 'development') {
      logger.info('[getMyProfile] 프로필 조회 성공', {
        hasProfileImage: !!result.data?.profileImage,
        profileImage: result.data?.profileImage,
      });
    }

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
  image?: string;
  imageFile?: File; // ✅ FormData로 전송할 이미지 파일
  removeImage?: boolean; // ✅ 이미지 삭제 여부
}

/**
 * 일반 사용자/매니저 프로필 업데이트 입력 데이터
 * - 비밀번호만 변경 가능
 */
export interface UpdateUserProfileInput {
  password?: string;
  image?: string;
  imageFile?: File; // ✅ FormData로 전송할 이미지 파일
  removeImage?: boolean; // ✅ 이미지 삭제 여부
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
    // FormData가 필요한 경우: imageFile이 있거나 removeImage가 true인 경우
    const needsFormData = !!data.imageFile || data.removeImage === true;
    let requestBody: BodyInit;
    const headers: HeadersInit = {
      Authorization: `Bearer ${accessToken}`,
    };

    if (needsFormData) {
      // FormData로 전송 (이미지 파일 포함 또는 이미지 삭제)
      const formData = new FormData();
      if (data.companyName && data.companyName.trim() !== '') {
        formData.append('companyName', data.companyName);
      }
      if (data.password && data.password.trim() !== '') {
        formData.append('password', data.password);
      }
      if (data.imageFile) {
        formData.append('image', data.imageFile);
      }
      if (data.removeImage) {
        formData.append('removeImage', 'true');
      }
      requestBody = formData;
      // FormData는 Content-Type을 자동으로 설정하므로 명시하지 않음
    } else {
      // JSON으로 전송 (이미지 파일 없음)
      const jsonBody: { companyName?: string; password?: string; image?: string } = {};
      if (data.companyName && data.companyName.trim() !== '') {
        jsonBody.companyName = data.companyName;
      }
      if (data.password && data.password.trim() !== '') {
        jsonBody.password = data.password;
      }
      if (data.image) {
        jsonBody.image = data.image;
      }
      requestBody = JSON.stringify(jsonBody);
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${apiUrl}/api/v1/user/admin/profile`, {
      method: 'PATCH',
      headers,
      body: requestBody,
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
        removeImage: data.removeImage,
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
    // FormData가 필요한 경우: imageFile이 있거나 removeImage가 true인 경우
    const needsFormData = !!data.imageFile || data.removeImage === true;
    let requestBody: BodyInit;
    const headers: HeadersInit = {
      Authorization: `Bearer ${accessToken}`,
    };

    if (needsFormData) {
      // FormData로 전송 (이미지 파일 포함 또는 이미지 삭제)
      const formData = new FormData();
      if (data.password && data.password.trim() !== '') {
        formData.append('password', data.password);
      }
      if (data.imageFile) {
        formData.append('image', data.imageFile);
      }
      if (data.removeImage) {
        formData.append('removeImage', 'true');
      }
      requestBody = formData;
      // FormData는 Content-Type을 자동으로 설정하므로 명시하지 않음
    } else {
      // JSON으로 전송 (이미지 파일 없음)
      const jsonBody: { password?: string; image?: string } = {};
      if (data.password && data.password.trim() !== '') {
        jsonBody.password = data.password;
      }
      if (data.image) {
        jsonBody.image = data.image;
      }
      requestBody = JSON.stringify(jsonBody);
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${apiUrl}/api/v1/user/me/profile`, {
      method: 'PATCH',
      headers,
      body: requestBody,
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
        removeImage: data.removeImage,
        hasPassword: !!data.password,
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

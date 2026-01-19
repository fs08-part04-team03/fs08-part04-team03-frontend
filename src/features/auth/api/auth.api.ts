import type { LoginInput } from '@/features/auth/schemas/login.schema';
import type { SignupInput, InviteSignupInput } from '@/features/auth/schemas/signup.schema';
import type { User } from '@/lib/store/authStore';
import { useAuthStore } from '@/lib/store/authStore';
import { AUTH_API_PATHS, HTTP_HEADERS } from '@/features/auth/utils/constants';
import { getApiTimeout, getApiUrl } from '@/utils/api';
import { logger } from '@/utils/logger';

/**
 * 회원가입 API 요청 타입
 * confirmPassword를 passwordConfirm으로 변환
 */
type SignupRequest = Omit<SignupInput, 'confirmPassword'> & {
  passwordConfirm: string;
  profileImage?: string; // 프로필 이미지 키 (S3 업로드 후 받은 키)
};

/**
 * 백엔드 API 응답 타입 (성공)
 */
interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

/**
 * 백엔드 API 응답 타입 (실패)
 */
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Array<{ field: string; message: string }>;
  };
}

/**
 * 백엔드 API 응답 타입 (통합)
 */
type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * API 응답이 에러인지 확인하는 타입 가드
 */
function isApiErrorResponse(response: ApiResponse<unknown>): response is ApiErrorResponse {
  return !response.success;
}

/**
 * 회사 선택이 필요한 경우 발생하는 에러 타입
 */
export interface CompanySelectionRequiredError extends Error {
  companies: Array<{ id: string; name: string }>;
}

/**
 * 회사 선택 필요 에러 생성 함수
 */
export function createCompanySelectionRequiredError(
  companies: Array<{ id: string; name: string }>
): CompanySelectionRequiredError {
  const error = new Error('회사 선택이 필요합니다.') as CompanySelectionRequiredError;
  error.name = 'CompanySelectionRequiredError';
  error.companies = companies;
  return error;
}

/**
 * 회사 선택 필요 에러인지 확인하는 타입 가드
 */
export function isCompanySelectionRequiredError(
  error: unknown
): error is CompanySelectionRequiredError {
  return (
    error instanceof Error && error.name === 'CompanySelectionRequiredError' && 'companies' in error
  );
}

/**
 * 회사 선택 필요 응답 타입
 */
interface CompanySelectionErrorResponse {
  success: false;
  error: {
    code: 'AUTH_COMPANY_SELECTION_REQUIRED';
    message: string;
    details: {
      requiresCompanySelection: true;
      companies: Array<{ id: string; name: string }>;
    };
  };
}

/**
 * 회사 선택 필요 응답인지 확인하는 타입 가드
 */
function isCompanySelectionRequired(response: unknown): response is CompanySelectionErrorResponse {
  const r = response as CompanySelectionErrorResponse;
  return (
    r?.success === false &&
    r?.error?.code === 'AUTH_COMPANY_SELECTION_REQUIRED' &&
    r?.error?.details?.requiresCompanySelection === true &&
    Array.isArray(r?.error?.details?.companies)
  );
}

/**
 * 로그인 응답 데이터 타입
 * Note: company 필드는 선택적입니다. 로그인 시 회사 정보가 포함되지 않을 수 있습니다.
 */
interface LoginResponseData {
  user: {
    id: string;
    companyId: string;
    email: string;
    name: string;
    role: string; // 'MANAGER', 'USER', 'ADMIN' 등
  };
  company?: {
    id: string;
    name: string;
    businessNumber: string;
  };
  accessToken: string;
}

/**
 * 회원가입 응답 데이터 타입
 * Note: 회원가입 시에는 항상 company 정보가 포함됩니다.
 */
interface SignupResponseData {
  user: {
    id: string;
    companyId: string;
    email: string;
    name: string;
    role: string;
  };
  company: {
    id: string;
    name: string;
    businessNumber: string;
  };
  accessToken: string;
}

/**
 * 백엔드 role을 클라이언트 role로 변환
 */
function normalizeRole(role: string): 'user' | 'manager' | 'admin' {
  const upperRole = role.toUpperCase();
  if (upperRole === 'MANAGER') return 'manager';
  if (upperRole === 'ADMIN') return 'admin';
  return 'user';
}

/**
 * 로그인 API 호출
 */
export async function login(credentials: LoginInput): Promise<{ user: User; accessToken: string }> {
  const timeout = getApiTimeout();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // 브라우저 환경에서는 Next.js proxy(/api)를 사용하여 same-origin 요청으로 만듭니다
    const isBrowserEnv = typeof window !== 'undefined';
    const apiUrl = isBrowserEnv ? '' : getApiUrl();

    const requestUrl = isBrowserEnv
      ? AUTH_API_PATHS.LOGIN // 상대 경로 (/api/v1/auth/login)
      : new URL(AUTH_API_PATHS.LOGIN, apiUrl).toString();

    const response = await fetch(requestUrl, {
      method: 'POST',
      headers: { 'Content-Type': HTTP_HEADERS.CONTENT_TYPE_JSON },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
        ...(credentials.companyId && { companyId: credentials.companyId }),
      }),
      signal: controller.signal,
      credentials: 'include',
    });

    // 미가입(사용자 없음) → 명확한 안내
    if (response.status === 404) {
      throw new Error('등록되지 않은 계정입니다. 회원가입 후 로그인해주세요.');
    }

    // 로그인 실패(자격 증명 오류) → 일반 안내
    if (response.status === 401) {
      throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    // 그 외는 장애로 취급 (409는 회사 선택 필요 에러일 수 있으므로 제외)
    if (!response.ok && response.status !== 409) {
      throw new Error('일시적인 장애가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      throw new Error('일시적인 장애가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }

    const result = (await response.json()) as ApiResponse<LoginResponseData>;

    // 회사 선택 필요 응답 처리
    if (isCompanySelectionRequired(result)) {
      throw createCompanySelectionRequiredError(result.error.details.companies);
    }
    if (!result.success || !result.data?.accessToken || !result.data?.user) {
      throw new Error('일시적인 장애가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }

    return {
      user: {
        id: result.data.user.id,
        email: result.data.user.email,
        name: result.data.user.name,
        role: normalizeRole(result.data.user.role),
        companyId: result.data.user.companyId,
      },
      accessToken: result.data.accessToken,
    };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      const timeoutSeconds = Math.ceil(timeout / 1000);
      throw new Error(
        `요청 시간이 초과되었습니다. (${timeoutSeconds}초) 서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.`
      );
    }

    // 네트워크 단절/서버 미가동 등
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * 회원가입 API 호출
 */
export async function signup(
  signupData: SignupRequest
): Promise<{ user: User; accessToken: string }> {
  // 타임아웃 설정 (환경 변수 또는 기본값)
  const timeout = getApiTimeout();

  // AbortController 생성 및 타임아웃 설정
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  let response: Response;
  try {
    // JSON으로 전송 (이미지는 S3에 업로드된 후 키를 받아서 전달)
    const requestBody = JSON.stringify({
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      passwordConfirm: signupData.passwordConfirm,
      companyName: signupData.companyName,
      businessNumber: signupData.businessNumber,
      ...(signupData.profileImage && { profileImage: signupData.profileImage }), // 이미지 키 전달
    });
    const headers: HeadersInit = {
      'Content-Type': HTTP_HEADERS.CONTENT_TYPE_JSON,
    };

    // 디버깅: 요청 내용 확인 (개발 환경에서만)
    if (process.env.NODE_ENV === 'development') {
      logger.info('[Signup] 요청 내용 확인', {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password ? '***' : undefined,
        passwordConfirm: signupData.passwordConfirm ? '***' : undefined,
        companyName: signupData.companyName,
        businessNumber: signupData.businessNumber,
        hasProfileImage: !!signupData.profileImage,
      });
    }

    // 브라우저 환경에서는 Next.js proxy(/api)를 사용하여 same-origin 요청으로 만듭니다
    const isBrowserEnv = typeof window !== 'undefined';
    const apiUrl = isBrowserEnv ? '' : getApiUrl();

    const requestUrl = isBrowserEnv
      ? AUTH_API_PATHS.ADMIN_REGISTER // 상대 경로 (/api/v1/auth/admin/register)
      : new URL(AUTH_API_PATHS.ADMIN_REGISTER, apiUrl).toString();

    response = await fetch(requestUrl, {
      method: 'POST',
      headers,
      body: requestBody,
      signal: controller.signal,
      credentials: 'include', // CSRF 토큰을 위한 쿠키 포함
    });
  } catch (error) {
    // 타임아웃 또는 중단 에러 처리
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다. 다시 시도해주세요.');
    }
    logger.error('Signup API request failed', {
      hasError: true,
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      errorName: error instanceof Error ? error.name : 'Unknown',
    });
    // Failed to fetch 에러 처리
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      const errorMessage =
        '서버에 연결할 수 없습니다.\n\n' +
        '가능한 원인:\n' +
        '1. 백엔드 서버가 실행되지 않았습니다.\n' +
        '2. CORS 설정 문제일 수 있습니다.\n' +
        '3. 네트워크 연결 문제일 수 있습니다.\n\n' +
        '브라우저 개발자 도구의 Network 탭에서 자세한 에러를 확인해주세요.';
      throw new Error(errorMessage);
    }
    throw error;
  }

  // 응답을 받은 후 타임아웃 타이머 정리
  clearTimeout(timeoutId);

  // 응답 본문을 먼저 읽어서 확인
  const responseText = await response.text();

  // 응답이 JSON인지 확인 (FormData 전송 시에도 JSON 응답을 받음)
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes(HTTP_HEADERS.CONTENT_TYPE_JSON)) {
    logger.error('Signup API response format error', {
      status: response.status,
      statusText: response.statusText,
      hasContentType: !!contentType,
    });
    throw new Error('서버 응답 형식이 올바르지 않습니다.');
  }

  let result: ApiResponse<SignupResponseData>;
  try {
    result = JSON.parse(responseText) as ApiResponse<SignupResponseData>;
  } catch (parseError) {
    logger.error('Signup JSON parsing error', {
      hasError: true,
      errorType: parseError instanceof Error ? parseError.constructor.name : 'Unknown',
      status: response.status,
      statusText: response.statusText,
    });
    throw new Error('서버 응답을 파싱할 수 없습니다.');
  }

  if (!result.success || !response.ok) {
    // 에러 응답 처리
    const errorMessage = isApiErrorResponse(result)
      ? result.error.message
      : '회원가입에 실패했습니다.';

    const errorDetails =
      isApiErrorResponse(result) && result.error.details
        ? result.error.details.map((d) => `${d.field}: ${d.message}`).join(', ')
        : undefined;

    logger.error('Signup failed', {
      status: response.status,
      statusText: response.statusText,
      hasErrorMessage: !!errorMessage,
      hasErrorDetails: !!errorDetails,
    });

    const fullErrorMessage = errorDetails ? `${errorMessage} (${errorDetails})` : errorMessage;

    throw new Error(fullErrorMessage);
  }

  return {
    user: {
      id: result.data.user.id,
      email: result.data.user.email,
      name: result.data.user.name,
      role: normalizeRole(result.data.user.role),
      companyId: result.data.user.companyId,
    },
    accessToken: result.data.accessToken,
  };
}

/**
 * 초대 정보 응답 데이터 타입
 */
interface InviteInfoResponseData {
  name: string;
  email: string;
}

/**
 * 초대 정보 조회 API 호출
 * @param inviteUrl - 초대 URL (예: "https://your-domain.com/invite?token=...")
 */
export async function getInviteInfo(inviteUrl: string): Promise<InviteInfoResponseData> {
  // API URL 설정 (환경 변수 또는 기본 배포 서버 URL)
  const apiUrl = getApiUrl();

  // 타임아웃 설정 (환경 변수 또는 기본값)
  const timeout = getApiTimeout();

  // AbortController 생성 및 타임아웃 설정
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  let response: Response;
  try {
    response = await fetch(new URL(AUTH_API_PATHS.INVITATION_VERIFY_URL, apiUrl).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': HTTP_HEADERS.CONTENT_TYPE_JSON,
      },
      body: JSON.stringify({
        inviteUrl,
      }),
      signal: controller.signal,
      credentials: 'include', // CSRF 토큰을 위한 쿠키 포함
    });
  } catch (error) {
    // 타임아웃 또는 중단 에러 처리
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다. 다시 시도해주세요.');
    }
    throw error;
  }

  // 응답을 받은 후 타임아웃 타이머 정리
  clearTimeout(timeoutId);

  // 응답 본문을 먼저 읽어서 확인
  const responseText = await response.text();

  // 응답이 JSON인지 확인
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes(HTTP_HEADERS.CONTENT_TYPE_JSON)) {
    logger.error('API response format error in getInviteInfo', {
      status: response.status,
      statusText: response.statusText,
      hasContentType: !!contentType,
    });
    throw new Error('서버 응답 형식이 올바르지 않습니다.');
  }

  let result: ApiResponse<InviteInfoResponseData>;
  try {
    result = JSON.parse(responseText) as ApiResponse<InviteInfoResponseData>;
  } catch (parseError) {
    logger.error('JSON parsing error in getInviteInfo', {
      hasError: true,
      errorType: parseError instanceof Error ? parseError.constructor.name : 'Unknown',
    });
    throw new Error('서버 응답을 파싱할 수 없습니다.');
  }

  if (!result.success || !response.ok) {
    const errorMessage = isApiErrorResponse(result)
      ? result.error.message
      : '초대 정보를 가져오는데 실패했습니다.';
    throw new Error(errorMessage);
  }

  return result.data;
}

/**
 * 초대 회원가입 API 요청 타입 (confirmPassword 제외)
 */
type InviteSignupRequest = Omit<InviteSignupInput, 'confirmPassword'> & {
  inviteToken: string; // 초대 토큰
  profileImage?: string; // 프로필 이미지 키 (S3 업로드 후 받은 키)
};

/**
 * 초대 회원가입 응답 데이터 타입
 */
interface InviteSignupResponseData {
  user: {
    id: string;
    companyId: string;
    email: string;
    name: string;
    role: string;
  };
  accessToken: string;
}

/**
 * 초대 회원가입 API 호출
 */
export async function inviteSignup(
  signupData: InviteSignupRequest
): Promise<{ user: User; accessToken: string }> {
  // API URL 설정 (환경 변수 또는 기본 배포 서버 URL)
  const apiUrl = getApiUrl();

  // 타임아웃 설정 (환경 변수 또는 기본값)
  const timeout = getApiTimeout();

  // AbortController 생성 및 타임아웃 설정
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  let response: Response;
  try {
    // JSON으로 전송 (이미지는 S3에 업로드된 후 키를 받아서 전달)
    const requestBody = JSON.stringify({
      email: signupData.email,
      password: signupData.password,
      inviteUrl: signupData.inviteToken, // 백엔드 API는 inviteUrl 필드명 사용
      ...(signupData.profileImage && { profileImage: signupData.profileImage }), // 이미지 키 전달
    });
    const headers: HeadersInit = {
      'Content-Type': HTTP_HEADERS.CONTENT_TYPE_JSON,
    };

    // 디버깅: 요청 내용 확인 (개발 환경에서만)
    if (process.env.NODE_ENV === 'development') {
      logger.info('[InviteSignup] 요청 내용 확인', {
        email: signupData.email,
        password: signupData.password ? '***' : undefined,
        inviteToken: signupData.inviteToken,
        hasProfileImage: !!signupData.profileImage,
      });
    }

    response = await fetch(new URL(AUTH_API_PATHS.REGISTER, apiUrl).toString(), {
      method: 'POST',
      headers,
      body: requestBody,
      signal: controller.signal,
      credentials: 'include', // CSRF 토큰을 위한 쿠키 포함
    });
  } catch (error) {
    // 타임아웃 또는 중단 에러 처리
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다. 다시 시도해주세요.');
    }
    logger.error('Invite signup API request failed', {
      hasError: true,
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      errorName: error instanceof Error ? error.name : 'Unknown',
    });
    // Failed to fetch 에러 처리
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      const errorMessage =
        '서버에 연결할 수 없습니다.\n\n' +
        '가능한 원인:\n' +
        '1. 백엔드 서버가 실행되지 않았습니다.\n' +
        '2. CORS 설정 문제일 수 있습니다.\n' +
        '3. 네트워크 연결 문제일 수 있습니다.\n\n' +
        '브라우저 개발자 도구의 Network 탭에서 자세한 에러를 확인해주세요.';
      throw new Error(errorMessage);
    }
    throw error;
  }

  // 응답을 받은 후 타임아웃 타이머 정리
  clearTimeout(timeoutId);

  // 응답이 JSON인지 확인
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes(HTTP_HEADERS.CONTENT_TYPE_JSON)) {
    await response.text(); // 응답 본문 소비
    throw new Error('서버 응답 형식이 올바르지 않습니다.');
  }

  let result: ApiResponse<InviteSignupResponseData>;
  try {
    result = (await response.json()) as ApiResponse<InviteSignupResponseData>;
  } catch {
    throw new Error('서버 응답을 파싱할 수 없습니다.');
  }

  if (!result.success || !response.ok) {
    const errorMessage = isApiErrorResponse(result)
      ? result.error.message
      : '회원가입에 실패했습니다.';

    const errorDetails =
      isApiErrorResponse(result) && result.error.details
        ? result.error.details.map((d) => `${d.field}: ${d.message}`).join(', ')
        : undefined;

    logger.error('Invite signup failed', {
      status: response.status,
      statusText: response.statusText,
      hasErrorMessage: !!errorMessage,
      hasErrorDetails: !!errorDetails,
    });

    const fullErrorMessage = errorDetails ? `${errorMessage} (${errorDetails})` : errorMessage;
    throw new Error(fullErrorMessage);
  }

  return {
    user: {
      id: result.data.user.id,
      email: result.data.user.email,
      name: result.data.user.name,
      role: normalizeRole(result.data.user.role),
      companyId: result.data.user.companyId,
    },
    accessToken: result.data.accessToken,
  };
}

/**
 * 로그아웃 API 호출
 */
export async function logout(): Promise<void> {
  // 타임아웃 설정 (환경 변수 또는 기본값)
  const timeout = getApiTimeout();

  // AbortController 생성 및 타임아웃 설정
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  // accessToken 가져오기
  const { accessToken } = useAuthStore.getState();

  let response: Response;
  try {
    // 브라우저 환경에서는 Next.js proxy(/api)를 사용하여 same-origin 요청으로 만듭니다
    const isBrowserEnv = typeof window !== 'undefined';
    const apiUrl = isBrowserEnv ? '' : getApiUrl();

    const requestUrl = isBrowserEnv
      ? AUTH_API_PATHS.LOGOUT // 상대 경로 (/api/v1/auth/logout)
      : new URL(AUTH_API_PATHS.LOGOUT, apiUrl).toString();

    response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': HTTP_HEADERS.CONTENT_TYPE_JSON,
        ...(accessToken && { Authorization: `${HTTP_HEADERS.AUTHORIZATION_PREFIX}${accessToken}` }),
      },
      signal: controller.signal,
      credentials: 'include', // CSRF 토큰을 위한 쿠키 포함
    });
  } catch (error) {
    // 타임아웃 또는 중단 에러 처리
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다. 다시 시도해주세요.');
    }
    throw error;
  }

  // 응답을 받은 후 타임아웃 타이머 정리
  clearTimeout(timeoutId);

  // 응답이 JSON인지 확인
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    let result: ApiResponse<unknown>;
    try {
      result = (await response.json()) as ApiResponse<unknown>;
      if (!result.success || !response.ok) {
        const errorMessage = isApiErrorResponse(result)
          ? result.error.message
          : '로그아웃에 실패했습니다.';
        throw new Error(errorMessage);
      }
    } catch (parseError) {
      if (parseError instanceof Error) {
        throw parseError;
      }
      throw new Error('서버 응답을 파싱할 수 없습니다.');
    }
  } else if (!response.ok) {
    await response.text(); // 응답 본문 소비
    throw new Error('로그아웃에 실패했습니다.');
  }
}

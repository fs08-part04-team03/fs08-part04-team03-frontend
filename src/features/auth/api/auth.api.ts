import type { LoginInput, RefreshTokenInput } from '@/features/auth/schemas/login.schema';
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
  // 실제 API 호출
  // API URL 설정 (환경 변수 또는 기본 배포 서버 URL)
  const apiUrl = getApiUrl();

  // 타임아웃 설정 (환경 변수 또는 기본값)
  const timeout = getApiTimeout();

  // AbortController 생성 및 타임아웃 설정
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  const requestUrl = `${apiUrl}${AUTH_API_PATHS.LOGIN}`;
  const requestBody = {
    email: credentials.email,
    password: credentials.password,
  };

  // 개발 환경에서 요청 정보 로그 제거 (의미 없는 디버그 로그)

  let response: Response;
  try {
    response = await fetch(requestUrl, {
      method: 'POST',
      headers: {
        'Content-Type': HTTP_HEADERS.CONTENT_TYPE_JSON,
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
      credentials: 'include', // CSRF 토큰을 위한 쿠키 포함
    });
  } catch (error) {
    // 타임아웃 또는 중단 에러 처리
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      const timeoutSeconds = Math.ceil(timeout / 1000);
      throw new Error(
        `요청 시간이 초과되었습니다. (${timeoutSeconds}초) 서버 응답이 지연되고 있습니다. 잠시 후 다시 시도해주세요.`
      );
    }
    logger.error('Login API request failed', {
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

  // 로그인 응답 헤더 확인 (refreshToken 쿠키 설정 확인)
  const setCookieHeader = response.headers.get('set-cookie');

  // Set-Cookie 헤더 분석
  let cookieAnalysis = null;
  let refreshTokenCookieInfo = null;
  if (setCookieHeader) {
    const cookieParts = setCookieHeader.split(';').map((p) => p.trim());
    const cookieName = cookieParts[0]?.split('=')[0] || '';

    // refreshToken 쿠키인지 확인
    const isRefreshTokenCookie = cookieName.toLowerCase().includes('refresh');

    cookieAnalysis = {
      cookieName,
      isRefreshTokenCookie,
      hasHttpOnly: setCookieHeader.toLowerCase().includes('httponly'),
      hasSecure: setCookieHeader.toLowerCase().includes('secure'),
      hasSameSite: setCookieHeader.toLowerCase().includes('samesite'),
      sameSiteValue: setCookieHeader.match(/samesite=([^;]+)/i)?.[1] || null,
      hasPath: setCookieHeader.toLowerCase().includes('path='),
      pathValue: setCookieHeader.match(/path=([^;]+)/i)?.[1] || null,
      hasDomain: setCookieHeader.toLowerCase().includes('domain='),
      domainValue: setCookieHeader.match(/domain=([^;]+)/i)?.[1] || null,
      hasMaxAge: setCookieHeader.toLowerCase().includes('max-age='),
      maxAgeValue: setCookieHeader.match(/max-age=(\d+)/i)?.[1] || null,
      hasExpires: setCookieHeader.toLowerCase().includes('expires='),
      expiresValue: setCookieHeader.match(/expires=([^;]+)/i)?.[1] || null,
    };

    // refreshToken 쿠키인 경우 상세 정보 저장
    if (isRefreshTokenCookie) {
      refreshTokenCookieInfo = cookieAnalysis;
    }
  }

  // 여러 Set-Cookie 헤더가 있을 수 있으므로 모든 헤더 확인
  const allSetCookieHeaders: string[] = [];
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === 'set-cookie') {
      allSetCookieHeaders.push(value);
    }
  });

  logger.info('[Login] 로그인 응답 헤더 확인', {
    status: response.status,
    hasSetCookieHeader: !!setCookieHeader,
    setCookieHeaderCount: allSetCookieHeaders.length,
    setCookieHeader: setCookieHeader ? setCookieHeader.substring(0, 500) : null, // 처음 500자만 (보안)
    cookieAnalysis,
    refreshTokenCookieInfo,
    allSetCookieHeaders: allSetCookieHeaders.map((h, i) => ({
      index: i,
      name: h.split('=')[0],
      preview: h.substring(0, 150), // 처음 150자만
    })),
    // 중요: refreshToken 쿠키가 설정되었는지 확인
    hasRefreshTokenCookie: refreshTokenCookieInfo !== null,
  });

  // 429 Too Many Requests 에러는 상태 코드를 먼저 확인 (응답 본문 파싱 전)
  if (response.status === 429) {
    const retryAfter = response.headers.get('Retry-After');
    let errorMessage = '너무 많은 요청입니다. 잠시 후 다시 시도해주세요.';

    // Retry-After 헤더가 있으면 더 구체적인 안내 제공
    if (retryAfter) {
      const retrySeconds = Number.parseInt(retryAfter, 10);
      if (Number.isFinite(retrySeconds)) {
        const retryMinutes = Math.ceil(retrySeconds / 60);
        errorMessage += ` (약 ${retryMinutes}분 후 재시도 가능)`;
      }
    }

    throw new Error(errorMessage);
  }

  // 응답 본문을 먼저 읽어서 확인
  const responseText = await response.text();

  // 응답이 JSON인지 확인
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes(HTTP_HEADERS.CONTENT_TYPE_JSON)) {
    logger.error('Login API response format error', {
      status: response.status,
      statusText: response.statusText,
      hasContentType: !!contentType,
    });
    throw new Error('서버 응답 형식이 올바르지 않습니다.');
  }

  let result: ApiResponse<LoginResponseData>;
  try {
    result = JSON.parse(responseText) as ApiResponse<LoginResponseData>;
  } catch (parseError) {
    logger.error('Login JSON parsing error', {
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
      : '로그인에 실패했습니다.';

    const errorDetails =
      isApiErrorResponse(result) && result.error.details
        ? result.error.details.map((d) => `${d.field}: ${d.message}`).join(', ')
        : undefined;

    logger.error('Login failed', {
      status: response.status,
      statusText: response.statusText,
      hasErrorMessage: !!errorMessage,
      hasErrorDetails: !!errorDetails,
    });

    // 에러 메시지에 상세 정보 포함
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
 * 회원가입 API 호출
 */
export async function signup(
  signupData: SignupRequest
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

    response = await fetch(`${apiUrl}${AUTH_API_PATHS.ADMIN_REGISTER}`, {
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
    response = await fetch(`${apiUrl}${AUTH_API_PATHS.INVITATION_VERIFY_URL}`, {
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

    response = await fetch(`${apiUrl}${AUTH_API_PATHS.REGISTER}`, {
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
 * 토큰 재발급 응답 데이터 타입
 */
interface RefreshTokenResponseData {
  accessToken: string;
}

/**
 * 토큰 재발급 API 호출
 */
export async function refreshToken(
  refreshTokenInput: RefreshTokenInput
): Promise<{ accessToken: string }> {
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
    response = await fetch(`${apiUrl}${AUTH_API_PATHS.REFRESH}`, {
      method: 'POST',
      headers: {
        'Content-Type': HTTP_HEADERS.CONTENT_TYPE_JSON,
      },
      body: JSON.stringify({
        refreshToken: refreshTokenInput.refreshToken,
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

  // 응답이 JSON인지 확인
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes(HTTP_HEADERS.CONTENT_TYPE_JSON)) {
    await response.text(); // 응답 본문 소비
    throw new Error('서버 응답 형식이 올바르지 않습니다.');
  }

  let result: ApiResponse<RefreshTokenResponseData>;
  try {
    result = (await response.json()) as ApiResponse<RefreshTokenResponseData>;
  } catch {
    throw new Error('서버 응답을 파싱할 수 없습니다.');
  }

  if (!result.success || !response.ok) {
    const errorMessage = isApiErrorResponse(result)
      ? result.error.message
      : '토큰 재발급에 실패했습니다.';
    throw new Error(errorMessage);
  }

  return {
    accessToken: result.data.accessToken,
  };
}

/**
 * 로그아웃 API 호출
 */
export async function logout(): Promise<void> {
  // API URL 설정 (환경 변수 또는 기본 배포 서버 URL)
  const apiUrl = getApiUrl();

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
    response = await fetch(`${apiUrl}${AUTH_API_PATHS.LOGOUT}`, {
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

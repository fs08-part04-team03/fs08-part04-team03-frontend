import type { LoginInput, RefreshTokenInput } from '@/features/auth/schemas/login.schema';
import type { SignupInput, InviteSignupInput } from '@/features/auth/schemas/signup.schema';
import type { User } from '@/lib/store/authStore';
import { useAuthStore } from '@/lib/store/authStore';
import { AUTH_API_PATHS, HTTP_HEADERS } from '@/constants/auth.constants';
import { getApiTimeout, getApiUrl } from '@/utils/api';
import {
  MOCK_TEST_CREDENTIALS,
  MOCK_LOGIN_RESPONSE,
  MOCK_MANAGER_LOGIN_RESPONSE,
  MOCK_ADMIN_LOGIN_RESPONSE,
  MOCK_SIGNUP_RESPONSE,
  MOCK_INVITE_SIGNUP_RESPONSE,
} from '@/mocks/auth.mock';

/**
 * 회원가입 API 요청 타입 (confirmPassword 제외)
 */
type SignupRequest = Omit<SignupInput, 'confirmPassword'>;

/**
 * 백엔드 API 응답 타입
 */
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

/**
 * 로그인 응답 데이터 타입
 */
interface LoginResponseData {
  user: {
    id: string;
    companyId: string;
    email: string;
    name: string;
    role: string; // 'MANAGER', 'USER', 'ADMIN' 등
  };
  accessToken: string;
}

/**
 * 회원가입 응답 데이터 타입
 */
interface SignupResponseData {
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
  // 개발 환경에서 mock 데이터 사용 여부 확인
  const useMockData =
    process.env.NODE_ENV === 'development' &&
    (process.env.NEXT_PUBLIC_USE_MOCK === 'true' || process.env.NEXT_PUBLIC_USE_MOCK === '1');

  // Mock 데이터 사용 시
  if (useMockData) {
    // eslint-disable-next-line no-console
    console.log('[Mock] 로그인 요청:', { email: credentials.email, password: '***' });

    // Mock 데이터와 매칭
    if (
      credentials.email === MOCK_TEST_CREDENTIALS.USER.email &&
      credentials.password === MOCK_TEST_CREDENTIALS.USER.password
    ) {
      const mockResponse = MOCK_LOGIN_RESPONSE.data;
      return {
        user: {
          id: mockResponse.user.id,
          email: mockResponse.user.email,
          role: normalizeRole(mockResponse.user.role),
          companyId: mockResponse.user.companyId,
        },
        accessToken: mockResponse.accessToken,
      };
    }

    if (
      credentials.email === MOCK_TEST_CREDENTIALS.MANAGER.email &&
      credentials.password === MOCK_TEST_CREDENTIALS.MANAGER.password
    ) {
      const mockResponse = MOCK_MANAGER_LOGIN_RESPONSE.data;
      return {
        user: {
          id: mockResponse.user.id,
          email: mockResponse.user.email,
          role: normalizeRole(mockResponse.user.role),
          companyId: mockResponse.user.companyId,
        },
        accessToken: mockResponse.accessToken,
      };
    }

    if (
      credentials.email === MOCK_TEST_CREDENTIALS.ADMIN.email &&
      credentials.password === MOCK_TEST_CREDENTIALS.ADMIN.password
    ) {
      const mockResponse = MOCK_ADMIN_LOGIN_RESPONSE.data;
      return {
        user: {
          id: mockResponse.user.id,
          email: mockResponse.user.email,
          role: normalizeRole(mockResponse.user.role),
          companyId: mockResponse.user.companyId,
        },
        accessToken: mockResponse.accessToken,
      };
    }

    // Mock 데이터와 매칭되지 않으면 에러
    throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
  }

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

  // 개발 환경에서만 요청 정보 로그
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.log('로그인 API 요청:', {
      url: requestUrl,
      method: 'POST',
      body: { ...requestBody, password: '***' }, // 비밀번호는 마스킹
    });
  }

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
      throw new Error('요청 시간이 초과되었습니다. 다시 시도해주세요.');
    }
    // 개발 환경에서만 에러 로그
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('로그인 API 요청 실패:', {
        error,
        errorName: error instanceof Error ? error.name : 'Unknown',
        errorMessage: error instanceof Error ? error.message : String(error),
        url: requestUrl,
      });
    }
    // Failed to fetch 에러 처리 - 개발 환경에서 mock 데이터로 fallback
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn('[Fallback] 백엔드 서버에 연결할 수 없어 mock 데이터를 사용합니다.', {
          email: credentials.email,
        });
        // Mock 데이터로 fallback
        if (
          credentials.email === MOCK_TEST_CREDENTIALS.USER.email &&
          credentials.password === MOCK_TEST_CREDENTIALS.USER.password
        ) {
          // eslint-disable-next-line no-console
          console.log('[Fallback] 일반 사용자로 로그인 성공');
          const mockResponse = MOCK_LOGIN_RESPONSE.data;
          return {
            user: {
              id: mockResponse.user.id,
              email: mockResponse.user.email,
              role: normalizeRole(mockResponse.user.role),
              companyId: mockResponse.user.companyId,
            },
            accessToken: mockResponse.accessToken,
          };
        }

        if (
          credentials.email === MOCK_TEST_CREDENTIALS.MANAGER.email &&
          credentials.password === MOCK_TEST_CREDENTIALS.MANAGER.password
        ) {
          // eslint-disable-next-line no-console
          console.log('[Fallback] 매니저로 로그인 성공');
          const mockResponse = MOCK_MANAGER_LOGIN_RESPONSE.data;
          return {
            user: {
              id: mockResponse.user.id,
              email: mockResponse.user.email,
              role: normalizeRole(mockResponse.user.role),
              companyId: mockResponse.user.companyId,
            },
            accessToken: mockResponse.accessToken,
          };
        }

        if (
          credentials.email === MOCK_TEST_CREDENTIALS.ADMIN.email &&
          credentials.password === MOCK_TEST_CREDENTIALS.ADMIN.password
        ) {
          // eslint-disable-next-line no-console
          console.log('[Fallback] 관리자로 로그인 성공');
          const mockResponse = MOCK_ADMIN_LOGIN_RESPONSE.data;
          return {
            user: {
              id: mockResponse.user.id,
              email: mockResponse.user.email,
              role: normalizeRole(mockResponse.user.role),
              companyId: mockResponse.user.companyId,
            },
            accessToken: mockResponse.accessToken,
          };
        }

        // eslint-disable-next-line no-console
        console.error('[Fallback] Mock 데이터와 매칭되지 않음:', {
          email: credentials.email,
          availableEmails: [
            MOCK_TEST_CREDENTIALS.USER.email,
            MOCK_TEST_CREDENTIALS.MANAGER.email,
            MOCK_TEST_CREDENTIALS.ADMIN.email,
          ],
        });
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      }

      const errorMessage =
        '서버에 연결할 수 없습니다.\n\n' +
        '가능한 원인:\n' +
        '1. 백엔드 서버가 실행되지 않았습니다. (http://localhost:4000)\n' +
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

  // 응답이 JSON인지 확인
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes(HTTP_HEADERS.CONTENT_TYPE_JSON)) {
    // 개발 환경에서만 상세 에러 로그
    // eslint-disable-next-line no-console
    console.error('로그인 API 응답 형식 오류:', {
      status: response.status,
      statusText: response.statusText,
      contentType,
      body: responseText,
      url: `${apiUrl}${AUTH_API_PATHS.LOGIN}`,
    });
    throw new Error('서버 응답 형식이 올바르지 않습니다.');
  }

  let result: ApiResponse<LoginResponseData>;
  try {
    result = JSON.parse(responseText) as ApiResponse<LoginResponseData>;
  } catch (parseError) {
    // 개발 환경에서만 상세 에러 로그
    // eslint-disable-next-line no-console
    console.error('로그인 JSON 파싱 오류:', {
      parseError,
      responseText,
      status: response.status,
      statusText: response.statusText,
    });
    throw new Error('서버 응답을 파싱할 수 없습니다.');
  }

  if (!result.success || !response.ok) {
    // 개발 환경에서만 상세 에러 로그
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('로그인 실패 응답:', {
        success: result.success,
        responseOk: response.ok,
        status: response.status,
        statusText: response.statusText,
        message: result.message,
        data: result.data,
      });

      // 500 에러 또는 서버 에러 시 mock 데이터로 fallback
      // eslint-disable-next-line no-console
      console.log('[Debug] Fallback 체크:', {
        status: response.status,
        statusCheck: response.status >= 500,
        isDevelopment: process.env.NODE_ENV === 'development',
      });

      if (response.status >= 500) {
        // eslint-disable-next-line no-console
        console.warn('[Fallback] 백엔드 서버 에러 발생, mock 데이터를 사용합니다.', {
          status: response.status,
          email: credentials.email,
        });
        // Mock 데이터로 fallback
        if (
          credentials.email === MOCK_TEST_CREDENTIALS.USER.email &&
          credentials.password === MOCK_TEST_CREDENTIALS.USER.password
        ) {
          // eslint-disable-next-line no-console
          console.log('[Fallback] 일반 사용자로 로그인 성공');
          const mockResponse = MOCK_LOGIN_RESPONSE.data;
          return {
            user: {
              id: mockResponse.user.id,
              email: mockResponse.user.email,
              role: normalizeRole(mockResponse.user.role),
              companyId: mockResponse.user.companyId,
            },
            accessToken: mockResponse.accessToken,
          };
        }

        if (
          credentials.email === MOCK_TEST_CREDENTIALS.MANAGER.email &&
          credentials.password === MOCK_TEST_CREDENTIALS.MANAGER.password
        ) {
          // eslint-disable-next-line no-console
          console.log('[Fallback] 매니저로 로그인 성공');
          const mockResponse = MOCK_MANAGER_LOGIN_RESPONSE.data;
          return {
            user: {
              id: mockResponse.user.id,
              email: mockResponse.user.email,
              role: normalizeRole(mockResponse.user.role),
              companyId: mockResponse.user.companyId,
            },
            accessToken: mockResponse.accessToken,
          };
        }

        if (
          credentials.email === MOCK_TEST_CREDENTIALS.ADMIN.email &&
          credentials.password === MOCK_TEST_CREDENTIALS.ADMIN.password
        ) {
          // eslint-disable-next-line no-console
          console.log('[Fallback] 관리자로 로그인 성공');
          const mockResponse = MOCK_ADMIN_LOGIN_RESPONSE.data;
          return {
            user: {
              id: mockResponse.user.id,
              email: mockResponse.user.email,
              role: normalizeRole(mockResponse.user.role),
              companyId: mockResponse.user.companyId,
            },
            accessToken: mockResponse.accessToken,
          };
        }

        // eslint-disable-next-line no-console
        console.error('[Fallback] Mock 데이터와 매칭되지 않음:', {
          email: credentials.email,
          availableEmails: [
            MOCK_TEST_CREDENTIALS.USER.email,
            MOCK_TEST_CREDENTIALS.MANAGER.email,
            MOCK_TEST_CREDENTIALS.ADMIN.email,
          ],
        });
        throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    }
    throw new Error(result.message || '로그인에 실패했습니다.');
  }

  return {
    user: {
      id: result.data.user.id,
      email: result.data.user.email,
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
    response = await fetch(`${apiUrl}${AUTH_API_PATHS.ADMIN_REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': HTTP_HEADERS.CONTENT_TYPE_JSON,
      },
      body: JSON.stringify({
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        companyName: signupData.companyName,
        businessNumber: signupData.businessNumber,
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
    // 개발 환경에서만 에러 로그
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('회원가입 API 요청 실패:', {
        error,
        errorName: error instanceof Error ? error.name : 'Unknown',
        errorMessage: error instanceof Error ? error.message : String(error),
        url: `${apiUrl}${AUTH_API_PATHS.ADMIN_REGISTER}`,
      });
    }
    // Failed to fetch 에러 처리 - 개발 환경에서 mock 데이터로 fallback
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(
          '[Fallback] 백엔드 서버에 연결할 수 없어 mock 데이터를 사용합니다. (회원가입)',
          {
            email: signupData.email,
          }
        );
        // Mock 회원가입 응답 사용
        const mockResponse = MOCK_SIGNUP_RESPONSE.data;
        return {
          user: {
            id: mockResponse.user.id,
            email: signupData.email, // 입력한 이메일 사용
            role: normalizeRole(mockResponse.user.role),
            companyId: mockResponse.user.companyId,
          },
          accessToken: mockResponse.accessToken,
        };
      }

      const errorMessage =
        '서버에 연결할 수 없습니다.\n\n' +
        '가능한 원인:\n' +
        '1. 백엔드 서버가 실행되지 않았습니다. (http://localhost:4000)\n' +
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

  // 응답이 JSON인지 확인
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes(HTTP_HEADERS.CONTENT_TYPE_JSON)) {
    // 개발 환경에서만 상세 에러 로그
    // eslint-disable-next-line no-console
    console.error('회원가입 API 응답 형식 오류:', {
      status: response.status,
      statusText: response.statusText,
      contentType,
      body: responseText,
      url: `${apiUrl}${AUTH_API_PATHS.ADMIN_REGISTER}`,
    });
    throw new Error('서버 응답 형식이 올바르지 않습니다.');
  }

  let result: ApiResponse<SignupResponseData>;
  try {
    result = JSON.parse(responseText) as ApiResponse<SignupResponseData>;
  } catch (parseError) {
    // 개발 환경에서만 상세 에러 로그
    // eslint-disable-next-line no-console
    console.error('회원가입 JSON 파싱 오류:', {
      parseError,
      responseText,
      status: response.status,
      statusText: response.statusText,
    });
    throw new Error('서버 응답을 파싱할 수 없습니다.');
  }

  if (!result.success || !response.ok) {
    // 개발 환경에서만 상세 에러 로그
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('회원가입 실패 응답:', {
        success: result.success,
        responseOk: response.ok,
        status: response.status,
        statusText: response.statusText,
        message: result.message,
      });

      // 500 에러 또는 서버 에러 시 mock 데이터로 fallback
      if (response.status >= 500) {
        // eslint-disable-next-line no-console
        console.warn('[Fallback] 백엔드 서버 에러 발생, mock 데이터를 사용합니다. (회원가입)', {
          status: response.status,
          email: signupData.email,
        });
        // Mock 회원가입 응답 사용
        const mockResponse = MOCK_SIGNUP_RESPONSE.data;
        return {
          user: {
            id: mockResponse.user.id,
            email: signupData.email, // 입력한 이메일 사용
            role: normalizeRole(mockResponse.user.role),
            companyId: mockResponse.user.companyId,
          },
          accessToken: mockResponse.accessToken,
        };
      }
    }
    throw new Error(result.message || '회원가입에 실패했습니다.');
  }

  return {
    user: {
      id: result.data.user.id,
      email: result.data.user.email,
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
 * @param inviteUrl - 초대 URL (예: "http://localhost:3000/invite?token=...")
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
    // 개발 환경에서만 상세 에러 로그
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('API 응답 형식 오류:', {
        status: response.status,
        statusText: response.statusText,
        contentType,
        body: responseText,
      });
    }
    throw new Error('서버 응답 형식이 올바르지 않습니다.');
  }

  let result: ApiResponse<InviteInfoResponseData>;
  try {
    result = JSON.parse(responseText) as ApiResponse<InviteInfoResponseData>;
  } catch (parseError) {
    // 개발 환경에서만 상세 에러 로그
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('JSON 파싱 오류:', {
        parseError,
        responseText,
      });
    }
    throw new Error('서버 응답을 파싱할 수 없습니다.');
  }

  if (!result.success || !response.ok) {
    throw new Error(result.message || '초대 정보를 가져오는데 실패했습니다.');
  }

  return result.data;
}

/**
 * 초대 회원가입 API 요청 타입 (confirmPassword 제외)
 */
type InviteSignupRequest = Omit<InviteSignupInput, 'confirmPassword'> & {
  inviteToken: string; // 초대 토큰
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
    response = await fetch(`${apiUrl}${AUTH_API_PATHS.REGISTER}`, {
      method: 'POST',
      headers: {
        'Content-Type': HTTP_HEADERS.CONTENT_TYPE_JSON,
      },
      body: JSON.stringify({
        email: signupData.email,
        password: signupData.password,
        inviteToken: signupData.inviteToken,
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
    // 개발 환경에서만 에러 로그
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('초대 회원가입 API 요청 실패:', {
        error,
        errorName: error instanceof Error ? error.name : 'Unknown',
        errorMessage: error instanceof Error ? error.message : String(error),
        url: `${apiUrl}${AUTH_API_PATHS.REGISTER}`,
      });
    }
    // Failed to fetch 에러 처리 - 개발 환경에서 mock 데이터로 fallback
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.warn(
          '[Fallback] 백엔드 서버에 연결할 수 없어 mock 데이터를 사용합니다. (초대 회원가입)',
          {
            email: signupData.email,
          }
        );
        // Mock 초대 회원가입 응답 사용
        const mockResponse = MOCK_INVITE_SIGNUP_RESPONSE.data;
        return {
          user: {
            id: mockResponse.user.id,
            email: signupData.email, // 입력한 이메일 사용
            role: normalizeRole(mockResponse.user.role),
            companyId: mockResponse.user.companyId,
          },
          accessToken: mockResponse.accessToken,
        };
      }

      const errorMessage =
        '서버에 연결할 수 없습니다.\n\n' +
        '가능한 원인:\n' +
        '1. 백엔드 서버가 실행되지 않았습니다. (http://localhost:4000)\n' +
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
    // 개발 환경에서만 상세 에러 로그
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.error('초대 회원가입 실패 응답:', {
        success: result.success,
        responseOk: response.ok,
        status: response.status,
        statusText: response.statusText,
        message: result.message,
      });

      // 500 에러 또는 서버 에러 시 mock 데이터로 fallback
      if (response.status >= 500) {
        // eslint-disable-next-line no-console
        console.warn(
          '[Fallback] 백엔드 서버 에러 발생, mock 데이터를 사용합니다. (초대 회원가입)',
          {
            status: response.status,
            email: signupData.email,
          }
        );
        // Mock 초대 회원가입 응답 사용
        const mockResponse = MOCK_INVITE_SIGNUP_RESPONSE.data;
        return {
          user: {
            id: mockResponse.user.id,
            email: signupData.email, // 입력한 이메일 사용
            role: normalizeRole(mockResponse.user.role),
            companyId: mockResponse.user.companyId,
          },
          accessToken: mockResponse.accessToken,
        };
      }
    }
    throw new Error(result.message || '회원가입에 실패했습니다.');
  }

  return {
    user: {
      id: result.data.user.id,
      email: result.data.user.email,
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
    throw new Error(result.message || '토큰 재발급에 실패했습니다.');
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
        throw new Error(result.message || '로그아웃에 실패했습니다.');
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

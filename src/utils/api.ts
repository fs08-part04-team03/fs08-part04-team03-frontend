import {
  DEFAULT_API_URL,
  DEFAULT_TIMEOUT,
  ENV_KEYS,
  AUTH_API_PATHS,
} from '@/features/auth/utils/constants';
import { useAuthStore } from '@/lib/store/authStore';

/**
 * 인증 만료 에러 클래스
 * API 응답에서 인증 만료를 감지했을 때 throw됩니다.
 * 상위 레벨의 fetchWithAuth나 전역 인터셉터에서 catch하여 처리해야 합니다.
 */
export class AuthExpiredError extends Error {
  public readonly status: number;

  public readonly response: Response | null;

  public readonly responseData: unknown;

  constructor(
    message: string,
    status: number,
    response: Response | null = null,
    responseData: unknown = null
  ) {
    super(message);
    this.name = 'AuthExpiredError';
    this.status = status;
    this.response = response;
    this.responseData = responseData;
  }
}

/**
 * API URL 가져오기 (환경 변수 또는 기본 배포 서버 URL)
 * Next.js에서 클라이언트 사이드에서 process.env 접근 시 안전하게 처리
 */
export function getApiUrl(): string {
  // Next.js에서 NEXT_PUBLIC_ 접두사가 붙은 환경 변수는 빌드 시점에 번들에 포함됨
  // 클라이언트 사이드에서는 process.env.NEXT_PUBLIC_* 형태로 직접 접근해야 함
  const envApiUrl =
    typeof window !== 'undefined'
      ? process.env.NEXT_PUBLIC_API_URL // 클라이언트 사이드: 직접 접근
      : process.env[ENV_KEYS.API_URL]; // 서버 사이드: 상수 키 사용

  const apiUrl = envApiUrl || DEFAULT_API_URL;

  // 개발 환경에서만 API URL 로그 출력 (주석 처리하여 로그 비활성화)
  // if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  //   // eslint-disable-next-line no-console
  //   console.log('[API URL]', {
  //     envApiUrl,
  //     defaultApiUrl: DEFAULT_API_URL,
  //     finalApiUrl: apiUrl,
  //   });
  // }

  return apiUrl;
}

/**
 * API 타임아웃 가져오기 (환경 변수 또는 기본값)
 */
export function getApiTimeout(): number {
  // Next.js에서 클라이언트 사이드에서는 process.env.NEXT_PUBLIC_* 형태로 직접 접근해야 함
  const envTimeout =
    typeof window !== 'undefined'
      ? process.env.NEXT_PUBLIC_API_TIMEOUT // 클라이언트 사이드: 직접 접근
      : process.env[ENV_KEYS.API_TIMEOUT]; // 서버 사이드: 상수 키 사용

  const timeout = envTimeout ? Number.parseInt(envTimeout, 10) : DEFAULT_TIMEOUT;

  // 개발 환경에서만 타임아웃 로그 출력 (주석 처리하여 로그 비활성화)
  // if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  //   // eslint-disable-next-line no-console
  //   console.log('[API Timeout]', {
  //     envTimeout,
  //     defaultTimeout: DEFAULT_TIMEOUT,
  //     finalTimeout: timeout,
  //   });
  // }

  return timeout;
}

/**
 * refreshToken을 사용하여 토큰 갱신 시도
 * refreshToken이 httpOnly 쿠키에 있다면 백엔드가 자동으로 확인합니다
 */
async function tryRefreshToken(): Promise<string | null> {
  const apiUrl = getApiUrl();
  const timeout = getApiTimeout();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // refreshToken이 httpOnly 쿠키에 있다면 body 없이 쿠키만 전송
    // 백엔드가 쿠키의 refreshToken을 자동으로 확인하고 새 accessToken 발급
    const response = await fetch(`${apiUrl}${AUTH_API_PATHS.REFRESH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), // 빈 body 또는 refreshToken (백엔드 구현에 따라)
      credentials: 'include', // httpOnly 쿠키 포함
      signal: controller.signal,
    });

    if (response.ok) {
      clearTimeout(timeoutId);
      const result = (await response.json()) as {
        success: boolean;
        data?: { accessToken: string };
      };
      if (result.success && result.data?.accessToken) {
        // 새 accessToken을 store에 저장
        const { setAuth, user } = useAuthStore.getState();
        if (user) {
          setAuth({ user, accessToken: result.data.accessToken });
          return result.data.accessToken;
        }
      }
    } else {
      clearTimeout(timeoutId);
    }
  } catch {
    clearTimeout(timeoutId);
    // refreshToken 갱신 실패는 무시 (로그아웃 처리로 진행)
  }

  return null;
}

/**
 * 401 에러 처리 및 리다이렉트
 * refreshToken으로 토큰 갱신을 먼저 시도하고, 실패 시 로그아웃 처리
 */
export async function handle401Error(): Promise<void> {
  // refreshToken으로 토큰 갱신 시도
  const newToken = await tryRefreshToken();

  // 토큰 갱신 실패 시 로그아웃 처리
  if (!newToken) {
    const { clearAuth } = useAuthStore.getState();
    clearAuth();
    // 리다이렉트를 약간 지연시켜 React Query가 에러를 처리할 수 있도록 함
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.location.href = '/login';
      }, 100);
    }
  }
}

/**
 * 인증이 필요한 API 요청을 위한 공통 fetch 함수
 * - credentials: 'include' 자동 추가
 * - 401 에러 자동 처리
 * - 타임아웃 처리
 *
 * @param url - API 엔드포인트 URL (절대 경로 또는 상대 경로)
 * @param options - fetch 옵션
 * @param accessToken - JWT 액세스 토큰 (없으면 store에서 가져옴)
 * @returns Promise<Response>
 */
export async function fetchWithAuth(
  url: string,
  options?: RequestInit,
  accessToken?: string
): Promise<Response> {
  const apiUrl = getApiUrl();
  const timeout = getApiTimeout();
  const requestOptions = options || {};

  // accessToken이 제공되지 않으면 store에서 가져옴
  const token = accessToken || useAuthStore.getState().accessToken;
  if (!token) {
    throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const finalUrl = `${apiUrl}${url}`;

  try {
    const response = await fetch(finalUrl, {
      ...requestOptions,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        ...requestOptions.headers,
      },
      credentials: 'include', // 쿠키 기반 인증을 위해 필요
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // 429 에러 로깅 (TOO_MANY_REQUESTS 디버깅용)
    if (response.status === 429) {
      if (process.env.NODE_ENV === 'development') {
        // eslint-disable-next-line no-console
        console.error('[fetchWithAuth] TOO_MANY_REQUESTS:', {
          url: finalUrl,
          method: requestOptions.method || 'GET',
          status: response.status,
        });
      }
    }

    // 401 Unauthorized 에러 처리
    if (response.status === 401) {
      await handle401Error();
      // 토큰 갱신 후 원래 요청 재시도
      const newToken = useAuthStore.getState().accessToken;
      if (newToken && newToken !== token) {
        // 새 토큰으로 원래 요청 재시도
        const retryController = new AbortController();
        const retryTimeoutId = setTimeout(() => retryController.abort(), timeout);
        try {
          const retryResponse = await fetch(finalUrl, {
            ...requestOptions,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${newToken}`,
              ...requestOptions.headers,
            },
            credentials: 'include',
            signal: retryController.signal,
          });
          clearTimeout(retryTimeoutId);
          if (retryResponse.status === 401) {
            // 재시도 후에도 401이면 로그아웃 처리
            const { clearAuth } = useAuthStore.getState();
            clearAuth();
            if (typeof window !== 'undefined') {
              setTimeout(() => {
                window.location.href = '/login';
              }, 100);
            }
            throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
          }
          return retryResponse;
        } catch (retryError) {
          clearTimeout(retryTimeoutId);
          throw retryError;
        }
      }
      throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('요청 시간이 초과되었습니다.');
    }
    throw error;
  }
}

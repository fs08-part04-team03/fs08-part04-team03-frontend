import {
  DEFAULT_API_URL,
  DEFAULT_TIMEOUT,
  ENV_KEYS,
  AUTH_API_PATHS,
} from '@/features/auth/utils/constants';
import { useAuthStore } from '@/lib/store/authStore';
import { logger } from '@/utils/logger';

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
 * 이미지 URL 구성 (비동기)
 * S3 키를 사용하여 signed URL을 가져옵니다.
 * 클라이언트 사이드에서만 사용해야 합니다.
 * @param imageKey - 이미지 S3 key (예: products/xxx.png)
 * @returns signed URL 또는 undefined
 */
// buildImageUrl은 fetchWithAuth 정의 이후에 선언합니다. (eslint no-use-before-define 회피)

/**
 * 브라우저 환경인지 확인
 */
function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

/**
 * URL을 결합하는 헬퍼 함수
 * @param base - 기본 URL (빈 문자열이면 상대 경로)
 * @param path - 경로
 * @returns 결합된 URL
 */
function joinUrl(base: string, path: string): string {
  if (!base) return path; // base가 없으면 상대 경로 반환
  return `${base.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`;
}

/**
 * CSRF 토큰 가져오기 (브라우저 환경용)
 * 네트워크 일시 장애를 고려하여 재시도 로직 포함
 */
/**
 * refreshToken을 사용하여 토큰 갱신 시도
 * refreshToken이 httpOnly 쿠키에 있다면 백엔드가 자동으로 확인합니다
 */
export async function tryRefreshToken(): Promise<string | null> {
  const timeout = getApiTimeout();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const isBrowserEnv = isBrowser();

    // 브라우저 환경에서는 Next.js proxy(/api)를 사용하여 same-origin 요청으로 만듭니다
    // 이렇게 하면 쿠키가 자동으로 전달됩니다
    const backendOrigin = isBrowserEnv
      ? '' // 상대 경로 사용 (Next.js API Route 사용)
      : process.env.BACKEND_ORIGIN || process.env.BACKEND_API_URL || getApiUrl();

    const refreshPath = isBrowserEnv ? '/api/auth/refresh' : AUTH_API_PATHS.REFRESH;
    const refreshUrl = joinUrl(backendOrigin, refreshPath);

    // 쿠키 디버깅: 현재 브라우저의 쿠키 확인
    let cookieDebugInfo: Record<string, unknown> = {};
    if (isBrowserEnv) {
      const allCookies = document.cookie;
      const cookieNames = allCookies
        .split(';')
        .map((c) => c.trim().split('=')[0])
        .filter(Boolean);

      cookieDebugInfo = {
        hasCookies: allCookies.length > 0,
        cookieCount: cookieNames.length,
        // refreshToken은 HttpOnly이므로 document.cookie로 볼 수 없음
        visibleCookieNames: cookieNames.filter(
          (name) => name && !name.toLowerCase().includes('token')
        ),
        note: 'refreshToken은 HttpOnly이므로 여기에 표시되지 않지만, credentials: include로 자동 전송됨',
      };
    }

    logger.info('[Token Refresh] 토큰 갱신 요청 시작', {
      refreshUrl,
      isBrowserEnv,
      backendOrigin,
      hasCredentials: true, // credentials: 'include' 사용 (필수!)
      cookieDebugInfo,
      crossOrigin: isBrowserEnv && window.location.origin !== backendOrigin,
      currentOrigin: isBrowserEnv ? window.location.origin : 'server',
      note: '브라우저/서버 모두 refreshToken(httpOnly 쿠키) 기반으로 refresh 요청',
    });

    let response: Response;
    try {
      response = await fetch(refreshUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}), // 빈 body - refreshToken은 httpOnly 쿠키에서 읽음
        credentials: 'include', // 필수: 쿠키 자동 전송 (refreshToken 쿠키 포함)
        signal: controller.signal,
      });
    } catch (error) {
      // 네트워크/타임아웃 등 "일시 장애"는 null로 처리하면 자동 로그아웃을 유발하므로 예외로 전파
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('토큰 갱신 요청 시간이 초과되었습니다.');
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }

    logger.info('[Token Refresh] 토큰 갱신 응답 받음', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    });

    // 401: refresh token이 없거나 만료(= 로그아웃 처리 대상)
    if (response.status === 401) return null;

    // 403: 정책/CSRF/CORS 등 설정 문제일 수 있음. 자동 로그아웃(스토리지 삭제)을 유발하면 안 됨.
    if (response.status === 403) {
      throw new Error('토큰 갱신이 거부되었습니다. 잠시 후 다시 시도해주세요.');
    }

    if (response.ok) {
      const rawResult: unknown = await response.json();

      // 토큰 값은 로그에 포함하지 않음
      if (process.env.NODE_ENV === 'development') {
        logger.info('[Token Refresh] 백엔드 응답 구조:', {
          hasSuccess: typeof rawResult === 'object' && rawResult !== null && 'success' in rawResult,
          hasData: typeof rawResult === 'object' && rawResult !== null && 'data' in rawResult,
          hasAccessToken: !!(rawResult as { data?: { accessToken?: string } })?.data?.accessToken,
          hasTopLevelAccessToken:
            typeof rawResult === 'object' && rawResult !== null && 'accessToken' in rawResult,
        });
      }

      const result = rawResult as {
        success: boolean;
        data?: {
          accessToken: string;
          user?: {
            id: string;
            companyId: string;
            email: string;
            name: string;
            role: string;
            profileImage?: string;
          };
        };
        // 백엔드가 다른 형식으로 반환할 경우를 위한 fallback
        accessToken?: string;
      };

      // 백엔드 응답 형식 호환성: data.accessToken 또는 accessToken 직접 확인
      const accessToken = result.data?.accessToken || result.accessToken;

      if (accessToken) {
        // 새 accessToken을 store에 저장
        const { setAuth, user: existingUser } = useAuthStore.getState();

        // 백엔드에서 user 정보도 함께 반환하는 경우
        if (result.data?.user) {
          // 백엔드 role을 클라이언트 role로 변환
          const normalizeRole = (role: string): 'user' | 'manager' | 'admin' => {
            const upperRole = role.toUpperCase();
            if (upperRole === 'MANAGER') return 'manager';
            if (upperRole === 'ADMIN') return 'admin';
            return 'user';
          };

          const newUser = {
            id: result.data.user.id,
            email: result.data.user.email,
            name: result.data.user.name,
            role: normalizeRole(result.data.user.role),
            companyId: result.data.user.companyId,
            image: result.data.user.profileImage, // profileImage를 image로 매핑
          };
          setAuth({ user: newUser, accessToken });

          logger.info('[Token Refresh] 토큰 갱신 성공 (user 정보 포함)');
          return accessToken;
        }

        // 백엔드에서 user 정보를 반환하지 않는 경우, 기존 user 정보 사용
        if (existingUser) {
          setAuth({ user: existingUser, accessToken });

          logger.info('[Token Refresh] 토큰 갱신 성공 (기존 user 정보 사용)');
          return accessToken;
        }

        // user 정보가 없는 경우 (rehydration 후 첫 갱신)
        // 기존 user 정보가 있으면 유지 (주기적 토큰 갱신이 계속되도록)
        // 주의: user: null로 설정하면 useTokenRefresh의 주기적 갱신이 중단됨
        // existingUser를 다시 가져와서 타입 에러 방지
        const { user: currentUser } = useAuthStore.getState();
        if (currentUser) {
          logger.warn(
            '[Token Refresh] 토큰 갱신 성공했지만 백엔드 응답에 user 정보가 없음. 기존 user 정보 유지.'
          );
          setAuth({ user: currentUser, accessToken });
          return accessToken;
        }

        // 기존 user 정보도 없는 경우 (로그인하지 않은 상태)
        logger.warn(
          '[Token Refresh] 토큰 갱신 성공했지만 user 정보가 없음 (백엔드 응답에 user 포함 여부 확인 필요)'
        );
        // accessToken만 저장 (user는 나중에 다른 API 호출로 가져올 수 있음)
        // user 정보가 없으면 쿠키 업데이트 불가 (role, companyId 필요)
        // 주의: 이 경우 useTokenRefresh의 주기적 갱신이 중단될 수 있음
        setAuth({ user: null, accessToken });
        return accessToken;
      }
      logger.warn('[Token Refresh] 응답 형식이 올바르지 않음', {
        success: result.success,
        hasAccessToken: !!result.data?.accessToken,
      });
      throw new Error('토큰 갱신 응답 형식이 올바르지 않습니다.');
    } else {
      // 에러 응답 본문 읽기
      let errorText = '';
      let errorJson: unknown = null;
      try {
        errorText = await response.text();
        // JSON 형식인지 확인
        if (errorText.trim().startsWith('{')) {
          try {
            errorJson = JSON.parse(errorText) as unknown;
          } catch {
            // JSON 파싱 실패는 무시
          }
        }
      } catch {
        errorText = 'Failed to read error response';
      }

      // 401, 403이 아닌 다른 에러는 로깅
      logger.error('[Token Refresh] 토큰 갱신 실패', {
        status: response.status,
        statusText: response.statusText,
        errorText: errorText.substring(0, 300), // 처음 300자만
        errorJson,
      });
      throw new Error('토큰 갱신에 실패했습니다.');
    }
  } catch (error) {
    logger.warn('[Token Refresh] 토큰 갱신 중 예외 발생', {
      hasError: true,
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      errorMessage: error instanceof Error ? error.message : String(error),
    });
    // null 반환은 "진짜 만료(401)"만을 의미해야 하므로, 예외는 상위로 전파
    throw error;
  }
}

/**
 * 401 에러 처리 및 리다이렉트
 * refreshToken으로 토큰 갱신을 먼저 시도하고, 실패 시 로그아웃 처리
 */
export async function handle401Error(): Promise<'refreshed' | 'expired' | 'failed'> {
  logger.info('[401 Error Handler] 토큰 갱신 시도 시작');
  try {
    const newToken = await tryRefreshToken();
    if (newToken) {
      logger.info('[401 Error Handler] 토큰 갱신 성공');
      return 'refreshed';
    }
    // newToken === null => refresh token 만료/없음
    logger.warn('[401 Error Handler] 토큰 갱신 실패 - refresh token 만료/없음');
    return 'expired';
  } catch (error) {
    logger.warn('[401 Error Handler] 토큰 갱신 실패(일시 장애) - 자동 로그아웃 방지', {
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      errorMessage: error instanceof Error ? error.message : String(error),
    });
    return 'failed';
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
  const timeout = getApiTimeout();
  const requestOptions = options || {};

  // accessToken이 제공되지 않으면 store에서 가져옴
  // accessToken이 없더라도 refreshToken(httpOnly 쿠키)이 유효하면 재발급으로 복구 가능
  let token = accessToken || useAuthStore.getState().accessToken;
  if (!token) {
    const refreshed = await tryRefreshToken();
    token = refreshed || useAuthStore.getState().accessToken;
  }
  if (!token) throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  // 브라우저 환경에서는 Next.js proxy(/api)를 사용하여 same-origin 요청으로 만듭니다
  // 서버 사이드에서는 백엔드 절대 URL로 직접 호출
  const isBrowserEnv = isBrowser();
  const backendOrigin = isBrowserEnv
    ? '' // 상대 경로 사용 (Next.js rewrites가 /api를 백엔드로 프록시)
    : process.env.BACKEND_ORIGIN || process.env.BACKEND_API_URL || getApiUrl();

  const finalUrl =
    url.startsWith('http://') || url.startsWith('https://') ? url : joinUrl(backendOrigin, url);

  // FormData인 경우 Content-Type을 설정하지 않음 (브라우저가 자동으로 boundary 포함)
  const isFormData = requestOptions.body instanceof FormData;
  // Authorization 헤더는 항상 최종 값이어야 하므로 마지막에 스프레드
  const defaultHeaders: HeadersInit = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...requestOptions.headers,
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(finalUrl, {
      ...requestOptions,
      headers: defaultHeaders,
      credentials: 'include', // 쿠키 기반 인증을 위해 필요
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // 429 에러 로깅 (TOO_MANY_REQUESTS 디버깅용)
    if (response.status === 429) {
      logger.warn('Rate limit exceeded (429)', {
        method: requestOptions.method || 'GET',
        status: response.status,
      });
    }

    // 401 Unauthorized 에러 처리
    if (response.status === 401) {
      const refreshResult = await handle401Error();
      if (refreshResult === 'expired') {
        // refresh token 만료/없음인 경우에만 localStorage를 비우고 로그인으로 보냄
        // const { clearAuth } = useAuthStore.getState();
        // clearAuth();
        // if (typeof window !== 'undefined') {
        //   queueMicrotask(() => {
        //     window.location.href = '/login';
        //   });
        // }
        throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
      }
      if (refreshResult === 'failed') {
        // 네트워크/일시 장애: 로그아웃(스토리지 삭제)하지 않고 에러만 전파
        throw new Error('인증 갱신에 실패했습니다. 네트워크 상태를 확인해주세요.');
      }
      // 토큰 갱신 후 원래 요청 재시도
      const newToken = useAuthStore.getState().accessToken;
      if (newToken && newToken !== token) {
        // 새 토큰으로 원래 요청 재시도
        const retryController = new AbortController();
        const retryTimeoutId = setTimeout(() => retryController.abort(), timeout);
        try {
          // Authorization 헤더는 항상 최종 값이어야 하므로 마지막에 스프레드
          const retryHeaders: HeadersInit = {
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
            ...requestOptions.headers,
            Authorization: `Bearer ${newToken}`,
          };
          const retryResponse = await fetch(finalUrl, {
            ...requestOptions,
            headers: retryHeaders,
            credentials: 'include',
            signal: retryController.signal,
          });
          clearTimeout(retryTimeoutId);
          if (retryResponse.status === 401) {
            // 재시도 후에도 401이면 로그아웃 처리
            // const { clearAuth } = useAuthStore.getState();
            // clearAuth();
            // queueMicrotask를 사용하여 현재 스택이 모두 실행된 후 리다이렉트
            // React Query가 에러를 처리할 시간을 주면서 성능 경고를 방지
            // if (typeof window !== 'undefined') {
            //   queueMicrotask(() => {
            //     window.location.href = '/login';
            //   });
            // }
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

// buildImageUrl 제거됨:
// 백엔드가 항상 접근 가능한 완전한 이미지 URL을 내려주는 계약을 사용합니다.

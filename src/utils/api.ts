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
export async function buildImageUrl(
  imageKey: string | null | undefined
): Promise<string | undefined> {
  if (!imageKey) return undefined;

  // 서버 사이드에서는 이 함수를 호출하지 않아야 함
  if (typeof window === 'undefined') {
    logger.warn('buildImageUrl called on server-side', { imageKey });
    return undefined;
  }

  try {
    // S3 키를 쿼리 파라미터로 전달하여 Next.js API 라우트를 통해 조회
    // 브라우저에서는 상대 경로 사용 (Next.js rewrites를 통해)
    const encodedKey = encodeURIComponent(imageKey);
    const imageUrl = `/api/product/image?key=${encodedKey}`;
    const response = await fetch(imageUrl, {
      method: 'GET',
      credentials: 'include',
      headers: {
        // fetchWithAuth 대신 직접 헤더 설정
        ...(useAuthStore.getState().accessToken
          ? { Authorization: `Bearer ${useAuthStore.getState().accessToken}` }
          : {}),
      },
    });

    if (!response.ok) {
      logger.warn('Failed to fetch image URL', { imageKey, status: response.status });
      return undefined;
    }

    // 응답이 이미지 스트림인 경우(프록시가 직접 반환)에는 프록시 URL을 그대로 사용
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.startsWith('image/')) {
      return imageUrl;
    }

    // JSON 응답인 경우(signed URL 제공) 처리
    const result = (await response.json()) as {
      success: boolean;
      data?: { url: string };
    };
    if (result.success && result.data?.url) {
      return result.data.url;
    }

    logger.warn('Invalid image URL response', { imageKey, result });
    return undefined;
  } catch (error) {
    logger.error('Error in buildImageUrl', {
      hasError: true,
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      imageKey,
    });
    return undefined;
  }
}

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
 */
async function getCsrfTokenForBrowser(backendOrigin: string): Promise<string | null> {
  try {
    const csrfUrl = `${backendOrigin}${AUTH_API_PATHS.CSRF}`;
    const response = await fetch(csrfUrl, {
      method: 'GET',
      credentials: 'include', // 필수: 쿠키 자동 전송
    });

    if (!response.ok) {
      logger.warn('[CSRF] CSRF 토큰 가져오기 실패', {
        status: response.status,
        statusText: response.statusText,
        url: csrfUrl,
      });
      return null;
    }

    const result = (await response.json()) as { csrfToken?: string };
    if (result.csrfToken) {
      logger.info('[CSRF] CSRF 토큰 가져오기 성공');
      return result.csrfToken;
    }

    logger.warn('[CSRF] CSRF 토큰이 응답에 없음');
    return null;
  } catch (error) {
    logger.error('[CSRF] CSRF 토큰 가져오기 중 예외 발생', {
      hasError: true,
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      errorMessage: error instanceof Error ? error.message : String(error),
    });
    return null;
  }
}

/**
 * refreshToken을 사용하여 토큰 갱신 시도
 * refreshToken이 httpOnly 쿠키에 있다면 백엔드가 자동으로 확인합니다
 *
 * 브라우저 환경에서는 백엔드 절대 URL을 직접 사용하여 credentials: 'include'로 쿠키 자동 전송
 */
export async function tryRefreshToken(): Promise<string | null> {
  const timeout = getApiTimeout();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const isBrowserEnv = isBrowser();
    const backendOrigin = process.env.BACKEND_ORIGIN || process.env.BACKEND_API_URL || getApiUrl();

    // 브라우저에서는 백엔드 절대 URL 직접 사용 (credentials: 'include'로 쿠키 자동 전송)
    // 서버 사이드에서는 절대 URL 사용
    let refreshUrl: string;
    let csrfToken: string | null = null;

    if (isBrowserEnv) {
      // 1단계: CSRF 토큰 가져오기
      csrfToken = await getCsrfTokenForBrowser(backendOrigin);
      if (!csrfToken) {
        logger.warn('[Token Refresh] CSRF 토큰을 가져올 수 없어 토큰 갱신 실패');
        return null;
      }

      // 2단계: 백엔드 절대 URL 사용 (경로에 /v1 포함)
      refreshUrl = `${backendOrigin}${AUTH_API_PATHS.REFRESH}`;
    } else {
      // 서버 사이드에서는 절대 URL 사용
      refreshUrl = joinUrl(backendOrigin, AUTH_API_PATHS.REFRESH);
    }

    // 브라우저에서 쿠키 확인 (개발 환경에서만)
    let cookieInfo = null;
    if (isBrowserEnv && typeof document !== 'undefined') {
      const allCookies = document.cookie;
      // HttpOnly 쿠키는 document.cookie로 읽을 수 없으므로,
      // refreshToken, XSRF-TOKEN, SESSION_ID는 항상 false일 수 있음
      // 하지만 다른 쿠키가 있는지 확인하여 쿠키 자체가 작동하는지 확인
      const cookieNames = allCookies
        .split(';')
        .map((c) => c.split('=')[0]?.trim() ?? '')
        .filter(Boolean);
      cookieInfo = {
        hasCookies: allCookies.length > 0,
        cookieCount: cookieNames.length,
        // 쿠키 이름만 로깅 (값은 로깅하지 않음)
        // HttpOnly 쿠키(refreshToken, XSRF-TOKEN, SESSION_ID)는 document.cookie로 읽을 수 없으므로 안전
        cookieNames: cookieNames.filter(
          (name) => !name.toLowerCase().includes('token') && !name.toLowerCase().includes('session')
        ), // 토큰/세션 관련 쿠키 이름은 필터링
        // HttpOnly 쿠키는 document.cookie로 읽을 수 없으므로 항상 false일 수 있음
        // 실제 확인은 브라우저 개발자 도구 → Application → Cookies에서 해야 함
        note: 'HttpOnly 쿠키(refreshToken, XSRF-TOKEN, SESSION_ID)는 document.cookie로 읽을 수 없습니다. 브라우저 개발자 도구에서 확인하세요.',
      };
    }

    logger.info('[Token Refresh] 토큰 갱신 요청 시작', {
      refreshUrl,
      isBrowserEnv,
      backendOrigin,
      hasCredentials: true, // credentials: 'include' 사용 (필수!)
      hasCsrfToken: !!csrfToken,
      cookieInfo,
      note: isBrowserEnv
        ? '브라우저에서는 백엔드 절대 URL 직접 사용 (credentials: "include"로 쿠키 자동 전송)'
        : '서버 사이드에서는 백엔드 URL 직접 사용',
    });

    const response = await fetch(refreshUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 브라우저 환경에서는 CSRF 토큰 헤더 필수
        ...(isBrowserEnv && csrfToken ? { 'X-CSRF-Token': csrfToken } : {}),
      },
      body: JSON.stringify({}), // 빈 body - refreshToken은 httpOnly 쿠키에서 읽음
      credentials: 'include', // 필수: 쿠키 자동 전송 (refreshToken 쿠키 포함)
      signal: controller.signal,
    });

    logger.info('[Token Refresh] 토큰 갱신 응답 받음', {
      status: response.status,
      statusText: response.statusText,
      ok: response.ok,
    });

    if (response.ok) {
      clearTimeout(timeoutId);
      const result = (await response.json()) as {
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
      };
      if (result.success && result.data?.accessToken) {
        // 새 accessToken을 store에 저장
        const { setAuth, user: existingUser } = useAuthStore.getState();

        // 백엔드에서 user 정보도 함께 반환하는 경우
        if (result.data.user) {
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
          setAuth({ user: newUser, accessToken: result.data.accessToken });

          // 쿠키에도 새 accessToken 저장 (서버 사이드 컴포넌트에서 사용하기 위해)
          if (isBrowserEnv) {
            try {
              const { setAuthCookies } = await import('@/utils/cookies');
              await setAuthCookies(newUser.role, newUser.companyId, result.data.accessToken);
              logger.info('[Token Refresh] 토큰 갱신 성공 (user 정보 포함, 쿠키 업데이트 완료)');
            } catch (cookieError) {
              logger.warn('[Token Refresh] 쿠키 업데이트 실패 (store에는 저장됨)', {
                hasError: true,
                errorType: cookieError instanceof Error ? cookieError.constructor.name : 'Unknown',
              });
            }
          } else {
            logger.info(
              '[Token Refresh] 토큰 갱신 성공 (user 정보 포함, 서버 사이드에서는 쿠키 업데이트 불필요)'
            );
          }
          return result.data.accessToken;
        }

        // 백엔드에서 user 정보를 반환하지 않는 경우, 기존 user 정보 사용
        if (existingUser) {
          setAuth({ user: existingUser, accessToken: result.data.accessToken });

          // 쿠키에도 새 accessToken 저장 (서버 사이드 컴포넌트에서 사용하기 위해)
          if (isBrowserEnv) {
            try {
              const { setAuthCookies } = await import('@/utils/cookies');
              await setAuthCookies(
                existingUser.role,
                existingUser.companyId,
                result.data.accessToken
              );
              logger.info(
                '[Token Refresh] 토큰 갱신 성공 (기존 user 정보 사용, 쿠키 업데이트 완료)'
              );
            } catch (cookieError) {
              logger.warn('[Token Refresh] 쿠키 업데이트 실패 (store에는 저장됨)', {
                hasError: true,
                errorType: cookieError instanceof Error ? cookieError.constructor.name : 'Unknown',
              });
            }
          } else {
            logger.info(
              '[Token Refresh] 토큰 갱신 성공 (기존 user 정보 사용, 서버 사이드에서는 쿠키 업데이트 불필요)'
            );
          }
          return result.data.accessToken;
        }

        // user 정보가 없는 경우 (rehydration 후 첫 갱신)
        logger.warn(
          '[Token Refresh] 토큰 갱신 성공했지만 user 정보가 없음 (백엔드 응답에 user 포함 여부 확인 필요)'
        );
        // accessToken만 저장 (user는 나중에 다른 API 호출로 가져올 수 있음)
        // user 정보가 없으면 쿠키 업데이트 불가 (role, companyId 필요)
        setAuth({ user: null, accessToken: result.data.accessToken });
        return result.data.accessToken;
      }
      logger.warn('[Token Refresh] 응답 형식이 올바르지 않음', {
        success: result.success,
        hasAccessToken: !!result.data?.accessToken,
      });
    } else {
      clearTimeout(timeoutId);
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

      // 401 에러는 refresh token이 만료되었거나 없을 때
      if (response.status === 401) {
        logger.warn('[Token Refresh] 401 에러 - refresh token 만료 또는 없음', {
          errorText: errorText.substring(0, 300), // 처음 300자만
          errorJson,
          cookieInfo, // 쿠키 정보도 함께 로깅
          refreshUrl,
        });
        return null;
      }
      // 403 에러는 CSRF 토큰 불일치 또는 누락 (Next.js API Route에서 처리)
      if (response.status === 403) {
        logger.warn('[Token Refresh] 403 에러 - CSRF 토큰 불일치 또는 누락', {
          errorText: errorText.substring(0, 300), // 처음 300자만
          errorJson,
          cookieInfo,
        });
        return null;
      }
      // 401, 403이 아닌 다른 에러는 로깅
      logger.error('[Token Refresh] 토큰 갱신 실패', {
        status: response.status,
        statusText: response.statusText,
        errorText: errorText.substring(0, 300), // 처음 300자만
        errorJson,
      });
    }
  } catch (error) {
    clearTimeout(timeoutId);
    // 네트워크 에러나 타임아웃 등
    if (error instanceof Error && error.name === 'AbortError') {
      logger.warn('[Token Refresh] 타임아웃 발생');
    } else {
      logger.error('[Token Refresh] 토큰 갱신 중 예외 발생', {
        hasError: true,
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        errorMessage: error instanceof Error ? error.message : String(error),
      });
    }
  }

  return null;
}

/**
 * 401 에러 처리 및 리다이렉트
 * refreshToken으로 토큰 갱신을 먼저 시도하고, 실패 시 로그아웃 처리
 */
export async function handle401Error(): Promise<void> {
  logger.info('[401 Error Handler] 토큰 갱신 시도 시작');
  // refreshToken으로 토큰 갱신 시도
  const newToken = await tryRefreshToken();

  // 토큰 갱신 실패 시 로그아웃 처리
  if (!newToken) {
    logger.warn('[401 Error Handler] 토큰 갱신 실패 - 로그아웃 처리');
    const { clearAuth } = useAuthStore.getState();
    clearAuth();
    // 리다이렉트를 약간 지연시켜 React Query가 에러를 처리할 수 있도록 함
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.location.href = '/login';
      }, 100);
    }
  } else {
    logger.info('[401 Error Handler] 토큰 갱신 성공');
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
  const token = accessToken || useAuthStore.getState().accessToken;
  if (!token) {
    throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  // 브라우저에서는 항상 상대 URL만 사용 (Next.js rewrites를 통해)
  // 서버 사이드에서는 절대 URL 사용 (환경 변수에서 가져오기)
  const isBrowserEnv = isBrowser();
  const backendOrigin = process.env.BACKEND_ORIGIN || process.env.BACKEND_API_URL || getApiUrl();

  // 브라우저에서는 절대 URL을 상대 경로로 변환
  let path = url;
  if (isBrowserEnv) {
    // 브라우저에서는 절대 URL이어도 상대 경로로 변환
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // 절대 URL에서 경로만 추출
      try {
        const urlObj = new URL(url);
        path = urlObj.pathname + urlObj.search;
      } catch {
        // URL 파싱 실패 시 원본 사용
        path = url;
      }
    }
    // 상대 경로로 정규화 (앞에 /가 없으면 추가)
    path = path.startsWith('/') ? path : `/${path}`;
  } else if (url.startsWith('http://') || url.startsWith('https://')) {
    // 서버 사이드에서 절대 URL인 경우 pathname 추출
    try {
      const urlObj = new URL(url);
      path = urlObj.pathname + urlObj.search;
    } catch {
      // URL 파싱 실패 시 원본 사용
      path = url;
    }
  } else {
    // 서버 사이드에서 상대 경로인 경우 backendOrigin과 결합
    path = joinUrl(backendOrigin, url);
  }

  const finalUrl = path;

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
      await handle401Error();
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

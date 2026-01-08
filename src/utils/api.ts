import {
  DEFAULT_API_URL,
  DEFAULT_TIMEOUT,
  ENV_KEYS,
  AUTH_API_PATHS,
} from '@/features/auth/utils/constants';
import { useAuthStore, type User } from '@/lib/store/authStore';
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
      // 404 에러는 이미지가 존재하지 않음을 의미 (이미 삭제되었거나 잘못된 키)
      // 이 경우 undefined를 반환하여 fallback 이미지를 표시하도록 함
      if (response.status === 404) {
        logger.warn('Image not found (404)', {
          imageKey,
          status: response.status,
          message: '이미지가 존재하지 않습니다. 이미 삭제되었거나 잘못된 키일 수 있습니다.',
        });
      } else {
        logger.warn('Failed to fetch image URL', { imageKey, status: response.status });
      }
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
 * refreshToken을 사용하여 토큰 갱신 시도
 * refreshToken이 httpOnly 쿠키에 있다면 백엔드가 자동으로 확인합니다
 */
export async function tryRefreshToken(): Promise<string | null> {
  const timeout = getApiTimeout();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // refreshToken이 httpOnly 쿠키에 있다면 body 없이 쿠키만 전송
    // 백엔드가 쿠키의 refreshToken을 자동으로 확인하고 새 accessToken 발급
    // 브라우저에서는 상대 경로를 사용하여 Next.js rewrites를 거치도록 함 (CORS 회피)
    // 서버 사이드에서는 절대 URL 사용
    const isBrowserEnv = isBrowser();
    const backendOrigin = process.env.BACKEND_ORIGIN || process.env.BACKEND_API_URL || getApiUrl();

    let refreshUrl: string;
    if (isBrowserEnv) {
      // 브라우저에서는 항상 상대 경로 사용
      refreshUrl = AUTH_API_PATHS.REFRESH.startsWith('/')
        ? AUTH_API_PATHS.REFRESH
        : `/${AUTH_API_PATHS.REFRESH}`;
    } else {
      // 서버 사이드에서는 절대 URL 사용
      refreshUrl = joinUrl(backendOrigin, AUTH_API_PATHS.REFRESH);
    }

    if (process.env.NODE_ENV === 'development') {
      logger.info('[tryRefreshToken] 리프레시 토큰 요청 시작', {
        refreshUrl,
        isBrowser: isBrowserEnv,
        // httpOnly 쿠키는 JavaScript에서 읽을 수 없으므로
        // 실제 쿠키 전송 여부는 브라우저 개발자 도구의 Network 탭에서 확인해야 함
      });
    }

    // 요청 전 현재 도메인과 URL 확인 (개발 환경)
    if (process.env.NODE_ENV === 'development') {
      if (typeof window !== 'undefined') {
        logger.info('[tryRefreshToken] 요청 정보', {
          refreshUrl,
          currentOrigin: window.location.origin,
          currentHost: window.location.host,
          isRelativePath: refreshUrl.startsWith('/'),
          // httpOnly 쿠키는 JavaScript에서 읽을 수 없지만,
          // 브라우저 개발자 도구에서 확인 가능
        });
      }
    }

    const response = await fetch(refreshUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}), // 빈 body - 백엔드가 쿠키에서 refreshToken을 읽어야 함
      credentials: 'include', // httpOnly 쿠키 포함 (SameSite 설정에 따라 전송 여부 결정)
      signal: controller.signal,
    });

    if (process.env.NODE_ENV === 'development') {
      // 응답 헤더에서 쿠키 관련 정보 확인
      const setCookieHeaders = response.headers.get('set-cookie');
      logger.info('[tryRefreshToken] 응답 헤더 확인', {
        status: response.status,
        hasSetCookie: !!setCookieHeaders,
        // 실제 쿠키 값은 보안상 로깅하지 않음
        // 중요: 브라우저 개발자 도구 > Network 탭 > refresh 요청 > Headers에서
        // Request Headers의 Cookie 섹션에 refreshToken이 있는지 확인하세요
      });
    }

    if (response.ok) {
      clearTimeout(timeoutId);
      const result = (await response.json()) as {
        success: boolean;
        data?: { accessToken: string };
      };

      if (process.env.NODE_ENV === 'development') {
        logger.info('[tryRefreshToken] 응답 수신', {
          success: result.success,
          hasAccessToken: !!result.data?.accessToken,
        });
      }

      if (result.success && result.data?.accessToken) {
        // 새 accessToken을 store에 저장
        const { setAuth, user } = useAuthStore.getState();

        // user가 없으면 localStorage에서 복원 시도
        let userToSave = user;
        if (!userToSave && typeof window !== 'undefined') {
          try {
            const stored = localStorage.getItem('auth-storage');
            if (stored) {
              const parsedData = JSON.parse(stored) as {
                state?: { user?: unknown; accessToken?: string };
              };
              if (parsedData?.state?.user) {
                userToSave = parsedData.state.user as User;
                if (process.env.NODE_ENV === 'development') {
                  logger.info('[tryRefreshToken] localStorage에서 user 정보 복원');
                }
              }
            }
          } catch (storageError) {
            if (process.env.NODE_ENV === 'development') {
              logger.warn('[tryRefreshToken] localStorage에서 user 복원 실패', storageError);
            }
          }
        }

        if (userToSave) {
          setAuth({ user: userToSave, accessToken: result.data.accessToken });
          if (process.env.NODE_ENV === 'development') {
            logger.info('[tryRefreshToken] 리프레시 토큰 발급 성공');
          }
          return result.data.accessToken;
        }
        if (process.env.NODE_ENV === 'development') {
          logger.warn('[tryRefreshToken] 사용자 정보가 없어 토큰 저장 실패');
        }
      } else if (process.env.NODE_ENV === 'development') {
        logger.warn('[tryRefreshToken] 응답은 성공했지만 accessToken이 없음', {
          success: result.success,
          hasData: !!result.data,
        });
      }
    } else {
      clearTimeout(timeoutId);
      const responseText = await response
        .clone()
        .text()
        .catch(() => 'Failed to read response');

      if (process.env.NODE_ENV === 'development') {
        logger.warn('[tryRefreshToken] 리프레시 토큰 요청 실패', {
          status: response.status,
          statusText: response.statusText,
          responseText: responseText.substring(0, 200),
          url: refreshUrl,
        });

        // 401 에러의 경우 쿠키 전송 문제일 수 있음
        if (response.status === 401) {
          logger.warn('[tryRefreshToken] 401 에러 - 가능한 원인:', {
            message: 'refreshToken 쿠키가 전송되지 않았거나 만료되었을 수 있습니다.',
            checkPoints: [
              '브라우저 개발자 도구 > Network 탭에서 refresh 요청의 Request Headers > Cookie 확인',
              'Application 탭 > Cookies에서 refreshToken 쿠키 존재 여부 확인',
              '로그인 응답의 Set-Cookie 헤더에서 refreshToken 쿠키 설정 여부 확인',
              '쿠키의 도메인/경로/SameSite 설정 확인',
            ],
          });
        }
      }

      // 401 에러는 refresh token이 만료되었거나 없을 때 정상적인 동작
      // 조용히 처리 (에러를 던지지 않음, 프로덕션에서는 로그도 남기지 않음)
      if (response.status === 401) {
        return null;
      }
      // 401이 아닌 다른 에러는 조용히 처리
    }
  } catch (error) {
    clearTimeout(timeoutId);

    if (process.env.NODE_ENV === 'development') {
      logger.error('[tryRefreshToken] 리프레시 토큰 요청 중 에러 발생', {
        hasError: true,
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        errorMessage: error instanceof Error ? error.message : String(error),
      });
    }
    // refreshToken 갱신 실패는 무시 (로그아웃 처리로 진행)
    // 네트워크 에러 등은 조용히 처리
  }

  return null;
}

/**
 * 401 에러 처리 및 리다이렉트
 * refreshToken으로 토큰 갱신을 먼저 시도하고, 실패 시 로그아웃 처리
 * 단, 새로고침 직후나 마운트 시에는 사용자가 명시적으로 로그아웃하지 않는 한
 * 자동 로그아웃을 방지하기 위해 localStorage에 사용자 정보가 있으면 유지
 */
export async function handle401Error(): Promise<void> {
  // 개발 환경에서 401 에러 상세 로깅
  if (process.env.NODE_ENV === 'development') {
    logger.info('[handle401Error] 401 에러 발생, 토큰 갱신 시도');
  }

  // refreshToken으로 토큰 갱신 시도
  const newToken = await tryRefreshToken();

  // 토큰 갱신 실패 시
  if (!newToken) {
    // localStorage에 사용자 정보가 있는지 확인
    // (새로고침 직후 refreshToken 쿠키가 없을 수 있으므로)
    let hasStoredUser = false;
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('auth-storage');
        if (stored) {
          const parsedData = JSON.parse(stored) as { state?: { user?: unknown } };
          hasStoredUser = !!parsedData?.state?.user;
        }
      } catch {
        // 파싱 실패는 무시
      }
    }

    // localStorage에 사용자 정보가 없거나, 명시적인 API 요청 실패인 경우에만 로그아웃
    if (!hasStoredUser) {
      if (process.env.NODE_ENV === 'development') {
        logger.warn('[handle401Error] 토큰 갱신 실패 및 저장된 사용자 정보 없음, 로그아웃 처리');
      }
      const { clearAuth } = useAuthStore.getState();
      clearAuth();
      // 리다이렉트를 약간 지연시켜 React Query가 에러를 처리할 수 있도록 함
      if (typeof window !== 'undefined') {
        setTimeout(() => {
          window.location.href = '/login';
        }, 100);
      }
    } else if (process.env.NODE_ENV === 'development') {
      logger.info(
        '[handle401Error] 토큰 갱신 실패했지만 localStorage에 사용자 정보가 있어 로그인 상태 유지'
      );
    }
  } else if (process.env.NODE_ENV === 'development') {
    logger.info('[handle401Error] 토큰 갱신 성공');
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
  } else {
    // 서버 사이드에서는 절대 URL 사용
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
      // 개발 환경에서 401 에러 상세 로깅
      if (process.env.NODE_ENV === 'development') {
        const responseText = await response
          .clone()
          .text()
          .catch(() => 'Failed to read response');
        logger.error('[fetchWithAuth] 401 에러 발생:', {
          url: finalUrl,
          method: requestOptions.method || 'GET',
          hasToken: !!token,
          responseText: responseText.substring(0, 200), // 처음 200자만
        });
      }

      await handle401Error();
      // 토큰 갱신 후 원래 요청 재시도
      const newToken = useAuthStore.getState().accessToken;
      if (newToken && newToken !== token) {
        if (process.env.NODE_ENV === 'development') {
          logger.info('[fetchWithAuth] 새 토큰으로 재시도');
        }
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

import { DEFAULT_API_URL, DEFAULT_TIMEOUT, ENV_KEYS } from '@/features/auth/utils/constants';

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

  // 개발 환경에서만 API URL 로그 출력
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    // eslint-disable-next-line no-console
    console.log('[API URL]', {
      envApiUrl,
      defaultApiUrl: DEFAULT_API_URL,
      finalApiUrl: apiUrl,
    });
  }

  return apiUrl;
}

/**
 * API 타임아웃 가져오기 (환경 변수 또는 기본값)
 */
export function getApiTimeout(): number {
  return Number.parseInt(process.env[ENV_KEYS.API_TIMEOUT] || String(DEFAULT_TIMEOUT), 10);
}

/**
 * Auth API 관련 상수
 */

// 환경 변수 키
export const ENV_KEYS = {
  API_URL: 'NEXT_PUBLIC_API_URL',
  API_TIMEOUT: 'NEXT_PUBLIC_API_TIMEOUT',
} as const;

// 기본값
export const DEFAULT_TIMEOUT = 30000; // 30초 (Render.com 무료 플랜의 cold start 대응)

// 개발 환경 기본 URL (환경 변수가 없을 때 사용)
// 주의: 프로덕션 환경에서는 반드시 NEXT_PUBLIC_API_URL 환경 변수를 HTTPS URL로 설정하세요
// 개발 환경에서도 가능하면 HTTPS를 사용하는 것을 권장합니다 (보안)
export const DEFAULT_API_URL = 'https://snock.tplinkdns.com:4000';

// API 경로
export const AUTH_API_PATHS = {
  LOGIN: '/api/v1/auth/login',
  ADMIN_REGISTER: '/api/v1/auth/admin/register',
  REGISTER: '/api/v1/auth/register',
  REFRESH: '/api/v1/auth/refresh',
  LOGOUT: '/api/v1/auth/logout',
  INVITATION_VERIFY_URL: '/api/v1/auth/invitation/verifyUrl',
  CSRF: '/api/v1/auth/csrf',
} as const;

// HTTP 헤더
export const HTTP_HEADERS = {
  CONTENT_TYPE_JSON: 'application/json',
  AUTHORIZATION_PREFIX: 'Bearer ',
} as const;

/**
 * Auth API 관련 상수
 */

// 환경 변수 키
export const ENV_KEYS = {
  API_URL: 'NEXT_PUBLIC_API_URL',
  API_TIMEOUT: 'NEXT_PUBLIC_API_TIMEOUT',
} as const;

// 기본값
export const DEFAULT_TIMEOUT = 10000; // 10초

// 배포 서버 기본 URL (환경 변수가 없을 때 사용)
export const DEFAULT_API_URL = 'https://fs08-part04-team03-backend.onrender.com';

// API 경로
export const AUTH_API_PATHS = {
  LOGIN: '/api/v1/auth/login',
  ADMIN_REGISTER: '/api/v1/auth/admin/register',
  REGISTER: '/api/v1/auth/register',
  REFRESH: '/api/v1/auth/refresh',
  LOGOUT: '/api/v1/auth/logout',
  INVITATION_VERIFY_URL: '/api/v1/auth/invitation/verifyUrl',
} as const;

// HTTP 헤더
export const HTTP_HEADERS = {
  CONTENT_TYPE_JSON: 'application/json',
  AUTHORIZATION_PREFIX: 'Bearer ',
} as const;

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
export const DEFAULT_API_URL = process.env.BACKEND_API_URL || 'https://snock.tplinkdns.com:4000';

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

// 이미지 파일 관련 상수
export const IMAGE_CONSTRAINTS = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'] as const,
  MAX_SIZE_MB: 5,
} as const;

export const IMAGE_ERROR_MESSAGES = {
  SIZE_EXCEEDED: `이미지 크기는 ${IMAGE_CONSTRAINTS.MAX_SIZE_MB}MB 이하여야 합니다.`,
  INVALID_TYPE: '지원되는 형식: JPEG, JPG, PNG, GIF, WEBP',
} as const;

// 프로필 이미지 업데이트 관련 상수
export const PROFILE_IMAGE_UPDATE = {
  DELAY_MS: 500, // 인증 정보 반영 대기 시간
} as const;

export const PROFILE_IMAGE_ERROR_MESSAGES = {
  UPDATE_FAILED_403:
    '회원가입은 완료되었습니다. 프로필 이미지는 나중에 프로필 설정에서 업데이트할 수 있습니다.',
  UPDATE_FAILED:
    '회원가입은 완료되었지만 프로필 이미지 업데이트에 실패했습니다. 나중에 프로필 설정에서 업데이트할 수 있습니다.',
} as const;

// 리다이렉트 경로 패턴
export const AUTH_REDIRECT_PATHS = {
  PRODUCTS: (companyId: string) => `/${companyId}/products`,
} as const;

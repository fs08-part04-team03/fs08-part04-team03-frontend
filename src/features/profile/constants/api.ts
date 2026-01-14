/**
 * Profile API 경로 상수
 */
export const PROFILE_API_PATHS = {
  // 내 프로필 조회
  GET_MY_PROFILE: '/api/v1/user/me',

  // 프로필 업데이트
  UPDATE_ADMIN_PROFILE: '/api/v1/user/admin/profile',
  UPDATE_MY_PROFILE: '/api/v1/user/me/profile',
} as const;

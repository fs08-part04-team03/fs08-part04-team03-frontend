/**
 * Admin Users API 경로 상수
 */
export const ADMIN_USER_API_PATHS = {
  // 사용자 목록 조회
  GET_USERS: '/api/v1/user',

  // 사용자 권한 변경
  UPDATE_USER_ROLE: (userId: string) => `/api/v1/user/admin/${userId}/role`,

  // 사용자 활성/비활성 전환
  UPDATE_USER_STATUS: (userId: string) => `/api/v1/user/admin/${userId}/status`,

  // 회원 초대
  INVITE_USER: '/api/v1/auth/invitation/create',
} as const;

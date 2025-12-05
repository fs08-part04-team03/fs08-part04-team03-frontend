/** 인증된 사용자의 역할 */
export type UserRole = 'user' | 'manager' | 'admin';

// 필요하다면 역할 라벨, 설명도 같이 정의
export const ROLE_LABEL: Record<UserRole, string> = {
  user: '사용자',
  manager: '관리자',
  admin: '최고관리자',
};

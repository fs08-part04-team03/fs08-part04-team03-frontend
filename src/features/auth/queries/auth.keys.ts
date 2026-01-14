/**
 * Auth 도메인 React Query Key 상수
 * 순수 객체/함수만 포함
 */

export const authKeys = {
  /**
   * 초대 정보 조회
   * @param inviteUrl - 초대 URL
   */
  invite: (inviteUrl: string) => ['invite', inviteUrl] as const,
};

/**
 * Profile Query Keys
 *
 * 프로필 관련 React Query keys 정의
 */

export const profileKeys = {
  all: ['profile'] as const,
  myProfile: () => [...profileKeys.all, 'myProfile'] as const,
  company: () => ['company'] as const,
} as const;

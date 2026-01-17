'use client';

import { useQuery } from '@tanstack/react-query';
import { getMyProfile, type GetMyProfileResponse } from '@/features/profile/api/profile.api';
import { getCompany, type Company } from '@/features/profile/api/company.api';
import { useAuthStore } from '@/lib/store/authStore';
import { QUERY_DEFAULTS } from '@/lib/query/queryDefaults';
import { profileKeys } from './profile.keys';

/**
 * 내 프로필 조회 훅
 * - GNB, 프로필 페이지 등에서 사용
 */
export function useMyProfile(options?: { enabled?: boolean }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const { enabled = true } = options || {};

  return useQuery<GetMyProfileResponse>({
    ...QUERY_DEFAULTS.cached,
    queryKey: profileKeys.myProfile(),
    queryFn: () => getMyProfile(),
    enabled: enabled && !!user && !!accessToken,
  });
}

/**
 * 회사 정보 조회 훅
 * - GNB, 회사명 표시 등에서 사용
 */
export function useCompany(options?: { enabled?: boolean }) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { enabled = true } = options || {};

  return useQuery<Company>({
    ...QUERY_DEFAULTS.cached,
    queryKey: profileKeys.company(),
    queryFn: () => {
      if (!accessToken) throw new Error('No access token');
      return getCompany(accessToken);
    },
    enabled: enabled && !!accessToken,
    placeholderData: { id: '', name: 'SNACK' },
  });
}

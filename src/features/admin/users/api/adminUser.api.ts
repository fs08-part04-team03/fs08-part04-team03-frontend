import { useAuthStore } from '@/lib/store/authStore';
import { ADMIN_USER_API_PATHS } from '@/features/admin/users/constants/api';

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  pagination?: Pagination;
}

/**
 * 공통 API 요청 헬퍼 함수
 */
async function fetchWithAuth<T>(url: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl) {
    throw new Error('NEXT_PUBLIC_API_URL 환경 변수가 설정되지 않았습니다.');
  }

  const { accessToken } = useAuthStore.getState();
  if (!accessToken) {
    throw new Error('인증 토큰이 없습니다. 로그인이 필요합니다.');
  }

  const response = await fetch(`${apiUrl}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(errorData.message || '요청에 실패했습니다.');
  }

  return (await response.json()) as ApiResponse<T>;
}

export type UserRole = 'USER' | 'MANAGER' | 'ADMIN';
export const VALID_USER_ROLES: UserRole[] = ['USER', 'MANAGER', 'ADMIN'];

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  avatarUrl?: string;
}

type GetUsersResponse = User[];

/**
 * 회사 소속 사용자 목록 조회/검색
 * GET /api/v1/user
 */
export interface GetUsersParams {
  page?: number;
  limit?: number;
  query?: string;
  role?: string;
  isActive?: boolean;
}

export const getUsers = async ({
  page = 1,
  limit = 5,
  query,
  role,
  isActive = true,
}: GetUsersParams = {}) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (query) params.append('q', query);
  if (role) params.append('role', role);
  if (isActive !== undefined) params.append('isActive', isActive.toString());

  return fetchWithAuth<GetUsersResponse>(`${ADMIN_USER_API_PATHS.GET_USERS}?${params.toString()}`, {
    method: 'GET',
  });
};

/**
 * 사용자 권한 변경 (ADMIN)
 * PATCH /api/v1/user/admin/{id}/role
 */
export const updateUserRole = async (userId: string, role: UserRole) =>
  fetchWithAuth<void>(ADMIN_USER_API_PATHS.UPDATE_USER_ROLE(userId), {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  });

/**
 * 사용자 활성/비활성 전환 (ADMIN)
 * PATCH /api/v1/user/admin/{id}/status
 */
export const updateUserStatus = async (userId: string, isActive: boolean) =>
  fetchWithAuth<void>(ADMIN_USER_API_PATHS.UPDATE_USER_STATUS(userId), {
    method: 'PATCH',
    body: JSON.stringify({ isActive }),
  });

/**
 * 회원 초대
 * POST /api/v1/auth/invitation/create
 */
export const inviteUser = async (companyId: string, email: string, name: string, role: UserRole) =>
  fetchWithAuth<void>(ADMIN_USER_API_PATHS.INVITE_USER, {
    method: 'POST',
    body: JSON.stringify({ companyId, email, name, role }),
  });

import { fetchWithAuth } from '@/utils/api';
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

  const response = await fetchWithAuth(`${ADMIN_USER_API_PATHS.GET_USERS}?${params.toString()}`, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(errorData.message || '사용자 목록을 불러오는데 실패했습니다.');
  }

  return response.json() as Promise<ApiResponse<GetUsersResponse>>;
};

/**
 * 사용자 권한 변경 (ADMIN)
 * PATCH /api/v1/user/admin/{id}/role
 */
export const updateUserRole = async (userId: string, role: UserRole) => {
  const response = await fetchWithAuth(ADMIN_USER_API_PATHS.UPDATE_USER_ROLE(userId), {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(errorData.message || '권한 변경에 실패했습니다.');
  }

  return response.json() as Promise<ApiResponse<void>>;
};

/**
 * 사용자 활성/비활성 전환 (ADMIN)
 * PATCH /api/v1/user/admin/{id}/status
 */
export const updateUserStatus = async (userId: string, isActive: boolean) => {
  const response = await fetchWithAuth(ADMIN_USER_API_PATHS.UPDATE_USER_STATUS(userId), {
    method: 'PATCH',
    body: JSON.stringify({ isActive }),
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(errorData.message || '상태 변경에 실패했습니다.');
  }

  return response.json() as Promise<ApiResponse<void>>;
};

/**
 * 회원 초대
 * POST /api/v1/auth/invitation/create
 */
export const inviteUser = async (
  companyId: string,
  email: string,
  name: string,
  role: UserRole
) => {
  const response = await fetchWithAuth(ADMIN_USER_API_PATHS.INVITE_USER, {
    method: 'POST',
    body: JSON.stringify({ companyId, email, name, role }),
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(errorData.message || '초대에 실패했습니다.');
  }

  return response.json() as Promise<ApiResponse<void>>;
};

import { useAuthStore } from '@/lib/store/authStore';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
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
    credentials: 'include',
  });

  // 401 Unauthorized 에러 처리
  if (response.status === 401) {
    const { clearAuth } = useAuthStore.getState();
    clearAuth();
    // 리다이렉트를 약간 지연시켜 React Query가 에러를 처리할 수 있도록 함
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.location.href = '/login';
      }, 100);
    }
    throw new Error('인증이 만료되었습니다. 다시 로그인해주세요.');
  }

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(errorData.message || '요청에 실패했습니다.');
  }

  return (await response.json()) as ApiResponse<T>;
}

/**
 * 대시보드 API 응답 타입
 */
export interface DashboardApiResponse {
  expenses: {
    thisMonth: number;
    lastMonth: number;
    thisYear: number;
    lastYear: number;
    total: number;
  };
  budget: {
    thisMonthBudget: number;
    remainingBudget: number;
  };
  newUsers: Array<{
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'MANAGER' | 'ADMIN';
    createdAt: string;
  }>;
  userChanges: Array<{
    id: string;
    name: string;
    email: string;
    changeType: 'withdraw' | 'roleChange';
    beforeRole?: 'USER' | 'MANAGER' | 'ADMIN';
    afterRole?: 'USER' | 'MANAGER' | 'ADMIN';
    changedAt: string;
  }>;
  snacksList: Array<{
    rank: number;
    name: string;
    price: number;
    totalQuantity: number;
    purchaseCount: number;
  }>;
  monthlyExpenses: Array<{
    year: number;
    month: number;
    totalExpenses: number;
  }>;
}

/**
 * 구매 관리 대시보드 정보 조회
 * GET /api/v1/purchase/admin/purchaseDashboard
 */
export const getPurchaseDashboard = async () =>
  fetchWithAuth<DashboardApiResponse>('/api/v1/purchase/admin/purchaseDashboard', {
    method: 'GET',
  });

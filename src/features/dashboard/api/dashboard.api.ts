import { fetchWithAuth } from '@/utils/api';
import { DASHBOARD_API_PATHS } from '@/features/dashboard/constants/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

/**
 * 공통 API 요청 헬퍼 함수
 * utils/api.ts의 fetchWithAuth를 래핑하여 JSON 응답을 파싱합니다.
 */
async function fetchDashboardData<T>(
  url: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const response = await fetchWithAuth(url, options);

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
  fetchDashboardData<DashboardApiResponse>(DASHBOARD_API_PATHS.GET_PURCHASE_DASHBOARD, {
    method: 'GET',
  });

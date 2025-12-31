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
    credentials: 'include', // 쿠키 기반 인증을 위해 필요
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
 * 이번 달 예산 조회 - API Response Data Types
 */
export interface BudgetResponse {
  id: string;
  companyId: string;
  year: number;
  month: number;
  amount: number;
  updatedAt: string;
}

/**
 * 이번 달 예산 조회
 * GET /api/v1/budget?year=YYYY&month=M
 */
export const getBudget = async (year: string, month: string) =>
  fetchWithAuth<BudgetResponse[]>(`/api/v1/budget?year=${year}&month=${month}`, {
    method: 'GET',
  });

/**
 * 이번 달 예산 등록/수정
 * PATCH /api/v1/budget
 */
interface UpdateBudgetRequest {
  year: string;
  month: string;
  amount: number;
}

export const updateBudget = async (amount: number) => {
  const now = new Date();
  const year = now.getFullYear().toString();
  const month = (now.getMonth() + 1).toString();

  const body: UpdateBudgetRequest = {
    year,
    month,
    amount,
  };

  return fetchWithAuth('/api/v1/budget', {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};

/**
 * 매달 시작 예산 조회 - API Response Data Types
 */
export interface BudgetCriteriaResponse {
  companyId: string;
  amount: number;
}

/**
 * 매달 시작 예산 조회
 * GET /api/v1/budget/criteria
 */
export const getBudgetCriteria = async () =>
  fetchWithAuth<BudgetCriteriaResponse>('/api/v1/budget/criteria', {
    method: 'GET',
  });

/**
 * 매달 시작 예산 등록/수정
 * PATCH /api/v1/budget/criteria
 */
interface UpdateBudgetCriteriaRequest {
  amount: number;
}

export const updateBudgetCriteria = async (amount: number) => {
  const body: UpdateBudgetCriteriaRequest = {
    amount,
  };

  return fetchWithAuth('/api/v1/budget/criteria', {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
};

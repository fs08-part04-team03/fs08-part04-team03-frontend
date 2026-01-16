import { fetchWithAuth } from '@/utils/api';
import { ADMIN_BUDGET_API_PATHS } from '@/features/admin/budget/constants/api';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
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
export const getBudget = async (year: string, month: string) => {
  const response = await fetchWithAuth(
    `${ADMIN_BUDGET_API_PATHS.GET_BUDGET}?year=${year}&month=${month}`,
    {
      method: 'GET',
    }
  );

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(errorData.message || '예산 조회에 실패했습니다.');
  }

  return response.json() as Promise<ApiResponse<BudgetResponse[]>>;
};

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

  const response = await fetchWithAuth(ADMIN_BUDGET_API_PATHS.UPDATE_BUDGET, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(errorData.message || '예산 수정에 실패했습니다.');
  }

  return response.json() as Promise<ApiResponse<void>>;
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
export const getBudgetCriteria = async () => {
  const response = await fetchWithAuth(ADMIN_BUDGET_API_PATHS.GET_BUDGET_CRITERIA, {
    method: 'GET',
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(errorData.message || '예산 기준 조회에 실패했습니다.');
  }

  return response.json() as Promise<ApiResponse<BudgetCriteriaResponse>>;
};

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

  const response = await fetchWithAuth(ADMIN_BUDGET_API_PATHS.UPDATE_BUDGET_CRITERIA, {
    method: 'PATCH',
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorData = (await response.json().catch(() => ({}))) as { message?: string };
    throw new Error(errorData.message || '예산 기준 수정에 실패했습니다.');
  }

  return response.json() as Promise<ApiResponse<void>>;
};

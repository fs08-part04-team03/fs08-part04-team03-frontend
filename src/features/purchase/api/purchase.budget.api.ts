/**
 * Purchase 도메인 - 예산 API
 */

import { PURCHASE_API_PATHS } from '@/features/purchase/constants/api';
import { fetchWithAuth } from './purchase.utils';
import type { PurchaseDashboardResponse } from './purchase.admin.api';

/**
 * 예산 조회 API 응답 타입 (배열)
 * 백엔드 API는 월별 예산 목록을 배열로 반환합니다.
 */
export interface BudgetItem {
  id: string;
  companyId: string;
  year: number;
  month: number;
  amount: number;
  updatedAt: string;
}

/**
 * 예산 조회 응답 타입
 * 백엔드에서 계산된 모든 값들을 포함합니다.
 */
export interface GetBudgetResponse {
  budget: number; // 이번 달 예산
  monthlySpending: number; // 이번 달 지출액
  remainingBudget: number; // 남은 예산
  spendingPercentage: number; // 진행률 (%)
  lastMonthBudget: number; // 지난 달 예산
  lastMonthSpending: number; // 지난 달 지출액
  lastBudget: number; // 지난 달 남은 예산
  thisYearTotalSpending: number; // 올해 총 지출액
  lastYearTotalSpending: number; // 작년 총 지출액
}

/**
 * 주어진 회사의 예산과 지출 요약을 조회합니다.
 * 백엔드에서 계산된 모든 값들을 그대로 반환합니다.
 *
 * purchaseDashboard 엔드포인트를 사용하여 예산 정보를 조회합니다.
 *
 * @param _companyId - (사용하지 않음) 호환성을 위해 유지, 토큰에서 회사 정보를 자동으로 추출
 * @returns 백엔드에서 계산된 예산 및 지출 정보를 포함한 객체
 */
export async function getBudget(_companyId: string): Promise<GetBudgetResponse> {
  // purchaseDashboard 엔드포인트 사용
  const dashboardResult = await fetchWithAuth<PurchaseDashboardResponse>(
    PURCHASE_API_PATHS.ADMIN_PURCHASE_DASHBOARD,
    {
      method: 'GET',
    }
  );

  const dashboard = dashboardResult.data;

  // 진행률 계산 (이번 달 지출액 / 이번 달 예산 * 100)
  const spendingPercentage =
    dashboard.budget.thisMonthBudget > 0
      ? (dashboard.expenses.thisMonth / dashboard.budget.thisMonthBudget) * 100
      : 0;

  // PurchaseDashboardResponse를 GetBudgetResponse로 변환
  const budgetResponse: GetBudgetResponse = {
    budget: dashboard.budget.thisMonthBudget, // 이번 달 예산
    monthlySpending: dashboard.expenses.thisMonth, // 이번 달 지출액
    remainingBudget: dashboard.budget.remainingBudget, // 남은 예산
    spendingPercentage, // 진행률 (계산)
    lastMonthBudget: 0, // 지난 달 예산 (백엔드에서 제공하지 않음)
    lastMonthSpending: dashboard.expenses.lastMonth, // 지난 달 지출액
    lastBudget: 0, // 지난 달 남은 예산 (백엔드에서 제공하지 않음)
    thisYearTotalSpending: dashboard.expenses.thisYear, // 올해 총 지출액
    lastYearTotalSpending: dashboard.expenses.lastYear, // 작년 총 지출액
  };

  return budgetResponse;
}

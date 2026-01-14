/**
 * Admin Budget API 경로 상수
 */
export const ADMIN_BUDGET_API_PATHS = {
  // 예산 조회
  GET_BUDGET: '/api/v1/budget',

  // 예산 등록/수정
  UPDATE_BUDGET: '/api/v1/budget',

  // 매달 시작 예산 조회
  GET_BUDGET_CRITERIA: '/api/v1/budget/criteria',

  // 매달 시작 예산 등록/수정
  UPDATE_BUDGET_CRITERIA: '/api/v1/budget/criteria',
} as const;

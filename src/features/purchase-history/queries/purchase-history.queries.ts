'use client';

import { useQuery } from '@tanstack/react-query';
import {
  managePurchaseRequests,
  getPurchaseRequestDetail,
  getBudget,
  type ManagePurchaseRequestsParams,
  type PurchaseRequestItem,
  type GetBudgetResponse,
} from '@/features/purchase/api/purchase.api';
import { QUERY_DEFAULTS } from '@/lib/query/queryDefaults';
import { QUERY_STALE_TIME_BUDGET } from '@/constants';
import { logger } from '@/utils/logger';
import { PURCHASE_HISTORY_DEFAULTS } from '../constants/defaults';
import { purchaseHistoryKeys } from './purchase-history.keys';

/**
 * 구매 내역 목록 조회 훅
 */
export function usePurchaseHistory(params?: {
  sortBy?: 'createdAt' | 'totalPrice';
  order?: 'asc' | 'desc';
  page?: number;
  enabled?: boolean;
}) {
  const { sortBy, order, page = 1, enabled = true } = params || {};

  return useQuery({
    ...QUERY_DEFAULTS.cached,
    queryKey: purchaseHistoryKeys.list(sortBy, order, page),
    queryFn: async () => {
      logger.info('[PurchaseHistory] 구매 내역 조회 시작:', {
        sortBy,
        order,
        page,
        status: 'APPROVED',
      });

      const requestParams: ManagePurchaseRequestsParams = {
        page,
        limit: PURCHASE_HISTORY_DEFAULTS.PAGE_SIZE,
        sortBy,
        order,
        status: 'APPROVED',
      };

      const response = await managePurchaseRequests(requestParams);

      logger.info('[PurchaseHistory] 구매 내역 조회 성공:', {
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
      });

      return response;
    },
    enabled,
  });
}

/**
 * 구매 내역 상세 조회 훅
 */
export function usePurchaseHistoryDetail(orderId: string, options?: { enabled?: boolean }) {
  const { enabled = true } = options || {};

  return useQuery<PurchaseRequestItem>({
    ...QUERY_DEFAULTS.cached,
    queryKey: purchaseHistoryKeys.detail(orderId),
    queryFn: async () => {
      logger.info('[PurchaseHistoryDetail] 구매 내역 상세 조회 시작:', { orderId });

      const detail = await getPurchaseRequestDetail(orderId);

      logger.info('[PurchaseHistoryDetail] 구매 내역 상세 조회 성공:', {
        id: detail.id,
        status: detail.status,
      });

      return detail;
    },
    enabled: enabled && !!orderId,
    retry: false, // 404 에러는 재시도하지 않음
  });
}

/**
 * 예산 조회 훅
 */
export function usePurchaseHistoryBudget(companyId: string, options?: { enabled?: boolean }) {
  const { enabled = true } = options || {};

  return useQuery<GetBudgetResponse>({
    queryKey: purchaseHistoryKeys.budget(companyId),
    queryFn: async () => {
      if (!companyId) {
        throw new Error('Company ID is required');
      }

      logger.info('[PurchaseHistory] 예산 정보 조회 시작');

      const result = await getBudget(companyId);

      logger.info('[PurchaseHistory] 예산 정보 조회 성공', {
        hasBudget: !!result.budget,
        hasSpending: !!result.monthlySpending,
      });

      return result;
    },
    enabled: enabled && !!companyId,
    staleTime: QUERY_STALE_TIME_BUDGET,
  });
}

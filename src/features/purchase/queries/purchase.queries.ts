'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  managePurchaseRequests,
  getPurchaseRequestDetail,
  approvePurchaseRequest,
  rejectPurchaseRequest,
  getMyPurchases,
  getMyPurchaseDetail,
  cancelPurchaseRequest,
  getBudget,
  requestPurchase,
  urgentRequestPurchase,
} from '@/features/purchase/api/purchase.api';
import { STALE_TIME } from '@/constants/staleTime';
import { QUERY_STALE_TIME_BUDGET } from '@/constants/timing';
import { useToast } from '@/hooks/useToast';
import { logger } from '@/utils/logger';

import type {
  ManagePurchaseRequestsResponse,
  PurchaseRequestItem,
  GetMyPurchasesResponse,
  GetBudgetResponse,
  RequestPurchaseResponseData,
  RequestPurchaseRequest,
  UrgentRequestPurchaseRequest,
} from '@/features/purchase/api/purchase.api';

import { purchaseKeys } from './purchase.keys';

export { purchaseKeys };

/**
 * 구매 요청 목록 조회 훅 (관리자)
 */
export function usePurchaseRequests(params?: {
  page?: number;
  size?: number;
  status?: string;
  sortBy?: 'createdAt' | 'totalPrice';
  order?: 'asc' | 'desc';
  enabled?: boolean;
}) {
  const { page, size, status, sortBy, order, enabled = true } = params || {};

  return useQuery<ManagePurchaseRequestsResponse>({
    queryKey: purchaseKeys.list(page, size, status, sortBy, order),
    queryFn: () =>
      managePurchaseRequests({
        page,
        size,
        status,
        sortBy,
        order,
      }),
    retry: false, // 401 에러 시 재시도 방지
    refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
    staleTime: STALE_TIME.FIVE_MINUTES, // 5분간 캐시 유지
    enabled,
  });
}

/**
 * 구매 요청 상세 조회 훅
 */
export function usePurchaseRequestDetail(
  requestId: string | undefined,
  options?: { enabled?: boolean }
) {
  const { enabled = true } = options || {};

  return useQuery<PurchaseRequestItem>({
    queryKey: purchaseKeys.detail(requestId || ''),
    queryFn: async () => {
      if (!requestId) {
        throw new Error('Request ID is required');
      }
      return getPurchaseRequestDetail(requestId);
    },
    enabled: enabled && !!requestId,
    staleTime: STALE_TIME.FIVE_MINUTES, // 5분간 캐시 유지
    retry: false, // 404 에러는 재시도하지 않음
  });
}

/**
 * 모달용 구매 요청 상세 조회 훅
 */
export function usePurchaseRequestDetailForModal(requestId: string | null, enabled: boolean) {
  return useQuery<PurchaseRequestItem>({
    queryKey: purchaseKeys.detailForModal(requestId),
    queryFn: async () => {
      if (!requestId) {
        throw new Error('Request ID is required');
      }
      return getPurchaseRequestDetail(requestId);
    },
    enabled: enabled && !!requestId,
    staleTime: STALE_TIME.NONE, // 모달용이므로 캐시 없이 항상 최신 데이터
    retry: false,
  });
}

/**
 * 내 구매 요청 목록 조회 훅
 */
export function useMyPurchases(params?: {
  page?: number;
  size?: number;
  status?: string;
  sort?: string;
  enabled?: boolean;
}) {
  const { page, size, status, sort, enabled = true } = params || {};

  return useQuery<GetMyPurchasesResponse>({
    queryKey: purchaseKeys.myPurchases(page, size, status, sort),
    queryFn: async () => {
      try {
        // 정렬 옵션을 API 스펙에 맞게 변환
        let sortBy: 'createdAt' | 'updatedAt' | 'totalPrice' | undefined = 'createdAt';
        let order: 'asc' | 'desc' = 'desc';

        if (sort === 'LATEST' || !sort) {
          sortBy = 'createdAt';
          order = 'desc';
        } else if (sort === 'PRICE_LOW') {
          sortBy = 'totalPrice';
          order = 'asc';
        } else if (sort === 'PRICE_HIGH') {
          sortBy = 'totalPrice';
          order = 'desc';
        }

        const response = await getMyPurchases({
          page,
          limit: size,
          sortBy,
          order,
          status,
        });

        return response;
      } catch (error) {
        logger.error('[MyPurchaseRequestList] API 호출 실패:', {
          error: error instanceof Error ? error.message : String(error),
          page,
          size,
          status,
          sort,
        });
        throw error;
      }
    },
    retry: false, // 401 에러 시 재시도 방지
    refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지
    staleTime: STALE_TIME.FIVE_MINUTES, // 5분간 캐시 유지
    enabled,
  });
}

/**
 * 내 구매 요청 상세 조회 훅
 */
export function useMyPurchaseDetail(
  requestId: string | undefined,
  options?: { enabled?: boolean }
) {
  const { enabled = true } = options || {};

  return useQuery<PurchaseRequestItem>({
    queryKey: purchaseKeys.myDetail(requestId || ''),
    queryFn: async () => {
      if (!requestId) {
        throw new Error('Request ID is required');
      }
      // 개발 환경에서만 로깅 (보안)
      if (process.env.NODE_ENV === 'development') {
        logger.info('[MyPurchaseRequestDetail] 구매 요청 상세 조회 시작:', { requestId });
      }
      return getMyPurchaseDetail(requestId);
    },
    enabled: enabled && !!requestId,
    retry: false, // 401 에러 시 재시도 방지
    refetchOnWindowFocus: false, // 창 포커스 시 재요청 방지 (구매 요청 상세 데이터는 승인/거절 상태 변경 가능하므로 자동 갱신 비활성화)
    staleTime: STALE_TIME.FIVE_MINUTES, // 5분간 캐시 유지
  });
}

/**
 * 예산 조회 훅
 */
export function usePurchaseBudget(companyId: string | undefined, options?: { enabled?: boolean }) {
  const { enabled = true } = options || {};

  return useQuery<GetBudgetResponse>({
    queryKey: purchaseKeys.budget(companyId || ''),
    queryFn: async () => {
      if (!companyId) {
        throw new Error('Company ID is required');
      }
      const result = await getBudget(companyId);
      return result;
    },
    enabled: enabled && !!companyId,
    staleTime: QUERY_STALE_TIME_BUDGET,
    retry: false,
    refetchOnWindowFocus: false,
  });
}

/**
 * 구매 요청 승인 mutation 훅
 */
export function useApprovePurchaseRequest() {
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  return useMutation<PurchaseRequestItem, Error, { purchaseRequestId: string; companyId?: string }>(
    {
      mutationFn: async ({ purchaseRequestId }) => approvePurchaseRequest(purchaseRequestId),
      onSuccess: async (_, variables) => {
        const { purchaseRequestId, companyId } = variables;

        // 관련 쿼리 캐시 무효화
        await queryClient.invalidateQueries({ queryKey: purchaseKeys.detail(purchaseRequestId) });
        await queryClient.invalidateQueries({ queryKey: purchaseKeys.all });
        if (companyId) {
          await queryClient.invalidateQueries({ queryKey: purchaseKeys.budget(companyId) });
        }
      },
      onError: (err: unknown) => {
        const message = err instanceof Error ? err.message : '구매 요청 승인에 실패했습니다.';
        triggerToast('error', message);
        logger.error('구매 요청 승인 실패:', err);
      },
    }
  );
}

/**
 * 구매 요청 반려 mutation 훅
 */
export function useRejectPurchaseRequest() {
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  return useMutation<PurchaseRequestItem, Error, { purchaseRequestId: string; reason: string }>({
    mutationFn: async ({ purchaseRequestId, reason }) =>
      rejectPurchaseRequest(purchaseRequestId, { reason }),
    onSuccess: async (_, variables) => {
      const { purchaseRequestId } = variables;

      // 관련 쿼리 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: purchaseKeys.detail(purchaseRequestId) });
      await queryClient.invalidateQueries({ queryKey: purchaseKeys.all });
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '구매 요청 반려에 실패했습니다.';
      triggerToast('error', message);
      logger.error('구매 요청 반려 실패:', err);
    },
  });
}

/**
 * 구매 요청 취소 mutation 훅
 */
export function useCancelPurchaseRequest() {
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  return useMutation<void, Error, { purchaseRequestId: string }>({
    mutationFn: async ({ purchaseRequestId }) => {
      await cancelPurchaseRequest(purchaseRequestId);
    },
    onSuccess: async (_, variables) => {
      const { purchaseRequestId } = variables;

      // 관련 쿼리 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: purchaseKeys.myPurchases() });
      await queryClient.invalidateQueries({ queryKey: purchaseKeys.detail(purchaseRequestId) });
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '구매 요청 취소에 실패했습니다.';
      triggerToast('error', message);
      logger.error('구매 요청 취소 실패:', err);
    },
  });
}

/**
 * 구매 요청 생성 mutation 훅
 */
export function useRequestPurchase() {
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  return useMutation<RequestPurchaseResponseData, Error, RequestPurchaseRequest>({
    mutationFn: async (request) => requestPurchase(request),
    onSuccess: async () => {
      // 사용자의 구매 요청 목록 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: purchaseKeys.myPurchases() });
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '구매 요청에 실패했습니다.';
      triggerToast('error', message);
      logger.error('구매 요청 생성 실패:', err);
    },
  });
}

/**
 * 긴급 구매 요청 생성 mutation 훅
 */
export function useUrgentRequestPurchase() {
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  return useMutation<RequestPurchaseResponseData, Error, UrgentRequestPurchaseRequest>({
    mutationFn: async (request) => urgentRequestPurchase(request),
    onSuccess: async () => {
      // 사용자의 구매 요청 목록 캐시 무효화
      await queryClient.invalidateQueries({ queryKey: purchaseKeys.myPurchases() });
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '긴급 구매 요청에 실패했습니다.';
      triggerToast('error', message);
      logger.error('긴급 구매 요청 생성 실패:', err);
    },
  });
}

/**
 * Tanstack Query 공통 옵션
 * 모든 쿼리 훅에서 일관된 옵션을 사용하기 위한 기본값
 */

import { STALE_TIME } from '@/constants/staleTime';

/**
 * 쿼리 기본 옵션 타입
 */
interface QueryDefaultOptions {
  staleTime: number;
  refetchOnMount: boolean;
  refetchOnWindowFocus: boolean;
  retry: number;
}

/**
 * 쿼리 용도별 기본 옵션
 */
export const QUERY_DEFAULTS = {
  /**
   * 목록 조회용 (자주 변경되는 데이터)
   * - staleTime: 1분
   * - 마운트 시 refetch
   * - 윈도우 포커스 시 refetch 비활성화
   */
  list: {
    staleTime: STALE_TIME.ONE_MINUTE,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 0,
  } satisfies QueryDefaultOptions,

  /**
   * 상세 조회용 (최신 데이터 필요)
   * - staleTime: 없음 (항상 fresh)
   * - 마운트 시 refetch
   * - 윈도우 포커스 시 refetch 비활성화
   */
  detail: {
    staleTime: STALE_TIME.NONE,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 0,
  } satisfies QueryDefaultOptions,

  /**
   * 짧은 캐시용 (장바구니 등 자주 변경되지만 캐시가 필요한 데이터)
   * - staleTime: 30초
   * - 마운트 시 refetch
   * - 윈도우 포커스 시 refetch 비활성화
   */
  short: {
    staleTime: STALE_TIME.SHORT,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retry: 0,
  } satisfies QueryDefaultOptions,

  /**
   * 캐시용 (자주 변경되지 않는 데이터)
   * - staleTime: 5분
   * - 마운트 시 refetch 비활성화
   * - 윈도우 포커스 시 refetch 비활성화
   */
  cached: {
    staleTime: STALE_TIME.FIVE_MINUTES,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: 1,
  } satisfies QueryDefaultOptions,

  /**
   * 실시간 데이터용 (GNB 장바구니 카운트 등)
   * - staleTime: 없음
   * - 마운트 시 refetch
   * - 윈도우 포커스 시 refetch
   */
  realtime: {
    staleTime: STALE_TIME.NONE,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    retry: 0,
  } satisfies QueryDefaultOptions,
} as const;

/**
 * Mutation 기본 옵션
 */
export const MUTATION_DEFAULTS = {
  retry: 0,
} as const;

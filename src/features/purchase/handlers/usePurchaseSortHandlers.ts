import { useCallback } from 'react';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import { logger } from '@/utils/logger';

/**
 * 정렬 파라미터 변환 함수
 */
export const getSortParams = (
  frontendSort: string | undefined
): {
  sortBy: 'createdAt' | 'totalPrice';
  order?: 'asc' | 'desc';
} => {
  if (!frontendSort || frontendSort === 'createdAt') {
    // 최신순: createdAt만 보내면 됨 (기본값 desc이므로 최신순)
    return { sortBy: 'createdAt' };
  }

  if (frontendSort === 'totalPriceAsc') {
    // 낮은 가격순: totalPrice + asc
    return { sortBy: 'totalPrice', order: 'asc' };
  }

  if (frontendSort === 'totalPriceDesc') {
    // 높은 가격순: totalPrice + desc
    return { sortBy: 'totalPrice', order: 'desc' };
  }

  // 기본값: 최신순
  return { sortBy: 'createdAt' };
};

/**
 * 구매 요청 정렬 핸들러 훅 (관리자용)
 */
export const usePurchaseSortHandlers = (onSortChange: (sort: string | undefined) => void) => {
  const handleSortChange = useCallback(
    (option: Option) => {
      logger.info('[PurchaseRequestList] 정렬 변경:', { option });
      // Option의 key를 string | undefined로 변환
      const sortKey =
        option.key === 'LATEST' || option.key === 'createdAt' ? undefined : option.key;
      onSortChange(sortKey);
    },
    [onSortChange]
  );

  return {
    handleSortChange,
  };
};

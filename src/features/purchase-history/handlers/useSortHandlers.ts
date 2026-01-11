import { useCallback } from 'react';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import { logger } from '@/utils/logger';

/**
 * 정렬 파라미터 변환 함수
 */
export const getSortParams = (
  sortKey: string
): { sortBy?: 'createdAt' | 'totalPrice'; order?: 'asc' | 'desc' } => {
  if (sortKey === 'PRICE_LOW') {
    return { sortBy: 'totalPrice', order: 'asc' };
  }
  if (sortKey === 'PRICE_HIGH') {
    return { sortBy: 'totalPrice', order: 'desc' };
  }
  // LATEST 또는 기본값
  return { sortBy: 'createdAt', order: 'desc' };
};

/**
 * 정렬 변경 핸들러 훅
 */
export const useSortHandlers = (
  onSortChange: (option: Option) => void,
  onPageReset?: () => void
) => {
  const handleSortChange = useCallback(
    (option: Option) => {
      logger.info('[PurchaseHistory] 정렬 변경:', { option });
      onSortChange(option);
      onPageReset?.(); // 정렬 변경 시 첫 페이지로
    },
    [onSortChange, onPageReset]
  );

  return {
    handleSortChange,
  };
};

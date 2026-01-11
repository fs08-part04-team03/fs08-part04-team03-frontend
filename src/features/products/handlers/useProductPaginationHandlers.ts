/**
 * Products 도메인 페이지네이션 핸들러
 */

import { useState, useCallback } from 'react';
import { PRODUCT_DEFAULTS } from '@/features/products/constants/defaults';

/**
 * 상품 페이지네이션 관련 핸들러 훅
 */
export function useProductPaginationHandlers(
  onPageChange?: () => void,
  initialPage: number = PRODUCT_DEFAULTS.INITIAL_PAGE
) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      onPageChange?.();
    },
    [onPageChange]
  );

  const resetPage = useCallback(() => {
    setCurrentPage(PRODUCT_DEFAULTS.INITIAL_PAGE);
  }, []);

  return {
    currentPage,
    setCurrentPage: handlePageChange,
    resetPage,
  };
}

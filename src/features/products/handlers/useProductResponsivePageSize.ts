/**
 * Products 도메인 반응형 페이지 크기 핸들러
 */

import { useState, useEffect } from 'react';
import { PRODUCT_DEFAULTS } from '@/features/products/constants/defaults';

/**
 * 반응형 페이지 크기 계산
 */
const getPageSize = (): number => {
  if (typeof window === 'undefined') return PRODUCT_DEFAULTS.PAGE_SIZE.REGISTERED_MOBILE;
  if (window.innerWidth >= 1024) return PRODUCT_DEFAULTS.PAGE_SIZE.REGISTERED_DESKTOP; // desktop
  return PRODUCT_DEFAULTS.PAGE_SIZE.REGISTERED_MOBILE; // mobile & tablet
};

/**
 * 반응형 페이지 크기 핸들러 훅
 */
export function useProductResponsivePageSize(onPageReset?: () => void) {
  const [pageSize, setPageSize] = useState(getPageSize());

  useEffect(() => {
    const handleResize = () => {
      const newPageSize = getPageSize();
      if (newPageSize !== pageSize) {
        setPageSize(newPageSize);
        // breakpoint 변경 시 페이지 리셋
        onPageReset?.();
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [pageSize, onPageReset]);

  return pageSize;
}

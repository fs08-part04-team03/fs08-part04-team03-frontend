import { useEffect, useState } from 'react';
import {
  PRODUCT_LIST_ITEMS_PER_PAGE,
  PRODUCT_LIST_BREAKPOINTS,
} from '@/features/products/utils/constants';

/**
 * 반응형에 따라 페이지당 아이템 수를 계산하는 훅
 */
export const useItemsPerPage = () => {
  const [count, setCount] = useState<number>(PRODUCT_LIST_ITEMS_PER_PAGE.TABLET);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia(PRODUCT_LIST_BREAKPOINTS.DESKTOP).matches) {
        setCount(PRODUCT_LIST_ITEMS_PER_PAGE.DESKTOP);
      } else if (window.matchMedia(PRODUCT_LIST_BREAKPOINTS.TABLET).matches) {
        setCount(PRODUCT_LIST_ITEMS_PER_PAGE.TABLET);
      } else {
        setCount(PRODUCT_LIST_ITEMS_PER_PAGE.MOBILE);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
};

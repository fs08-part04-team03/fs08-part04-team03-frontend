import { useMemo } from 'react';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import type { TemplateProduct } from '@/features/products/utils/product.utils';

/**
 * 상품 정렬 기능을 제공하는 훅
 */
export const useProductSorting = (products: TemplateProduct[], selectedSort?: Option) => {
  const sortedProducts = useMemo(() => {
    if (!selectedSort) return products;

    switch (selectedSort.key) {
      case 'latest':
        return [...products].sort((a, b) => b.id - a.id);
      case 'sell':
        return [...products].sort((a, b) => (b.purchaseCount || 0) - (a.purchaseCount || 0));
      case 'price-asc':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...products].sort((a, b) => b.price - a.price);
      default:
        return products;
    }
  }, [products, selectedSort]);

  return sortedProducts;
};

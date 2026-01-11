import { useEffect, useMemo, useState } from 'react';
import type { TemplateProduct } from '@/features/products/utils/product.utils';

/**
 * 상품 목록 페이지네이션 기능을 제공하는 훅
 */
export const useProductPagination = (
  products: TemplateProduct[],
  itemsPerPage: number,
  selectedSort?: { key: string },
  selectedCategoryId?: number | null
) => {
  const [page, setPage] = useState(1);

  const totalPage = Math.max(1, Math.ceil(products.length / itemsPerPage));

  // 페이지가 총 페이지 수를 초과하면 조정
  useEffect(() => {
    if (page > totalPage) {
      setPage(totalPage);
    }
  }, [page, totalPage]);

  // 정렬 또는 카테고리 변경 시 첫 페이지로 리셋
  useEffect(() => {
    setPage(1);
  }, [selectedSort, selectedCategoryId]);

  const currentProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  }, [products, page, itemsPerPage]);

  const isEmpty = currentProducts.length === 0;

  return {
    page,
    setPage,
    totalPage,
    currentProducts,
    isEmpty,
  };
};

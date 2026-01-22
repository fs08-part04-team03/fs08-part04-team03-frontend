'use client';

/**
 * ProductListSection - 개선된 버전
 * Props Drilling 개선 - 통합 훅 사용
 */

import { useMemo } from 'react';
import ProductListTem from '@/features/products/template/ProductListTem/ProductListTem';
import { ERROR_MESSAGES } from '@/constants';
import {
  mapBackendProductToTemplate,
  type TemplateProduct,
} from '@/features/products/utils/product.utils';
import { useProducts } from '@/features/products/queries/product.queries';
import { useWishlist } from '@/features/wishlist/queries/wishlist.queries';
import { useProductListState } from '@/features/products/hooks/useProductListState';
import { usePageTitle } from '@/hooks/usePageTitle';

const ProductListSection = ({ companyId }: { companyId: string }) => {
  // 페이지 제목 설정
  usePageTitle('상품 목록');

  // 🎯 통합 훅 사용 - 모든 상태와 핸들러를 그룹화하여 관리
  const {
    selectedCategoryId,
    selectedSort,
    searchQuery,
    categoryState,
    sortSearchState,
    actionHandlers,
  } = useProductListState({ companyId });

  // API 호출
  const { data, isLoading, error } = useProducts({
    categoryId: selectedCategoryId,
    sort: selectedSort.key,
    searchQuery,
    enabled: !!companyId,
  });

  // 위시리스트 조회
  const { data: wishlistData } = useWishlist();

  // 상품 데이터 매핑
  const products: TemplateProduct[] = useMemo(() => {
    if (!data) return [];
    return data.data.map(mapBackendProductToTemplate);
  }, [data]);

  if (error) {
    return (
      <div className="mt-12 md:mt-20 flex items-center justify-center min-h-screen">
        <p className="text-red-600">{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  // 🎯 그룹화된 Props 준비
  const productData = {
    products: isLoading ? [] : products,
    wishlistData,
    isLoading,
  };

  return (
    <div className="mt-12 md:mt-20">
      {/* 🎯 깔끔하게 그룹화된 Props 전달 */}
      <ProductListTem
        companyId={companyId}
        categoryState={categoryState}
        sortSearchState={sortSearchState}
        productData={productData}
        actionHandlers={actionHandlers}
      />
    </div>
  );
};

export default ProductListSection;

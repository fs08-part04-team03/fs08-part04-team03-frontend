'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductListTem from '@/features/products/template/ProductListTem/ProductListTem';
import { CATEGORY_SECTIONS, BREADCRUMB_ITEMS, LOADING_MESSAGES, ERROR_MESSAGES } from '@/constants';
import { Option } from '@/components/atoms/DropDown/DropDown';
import {
  mapBackendProductToTemplate,
  type TemplateProduct,
} from '@/features/products/utils/product.utils';
import { useAuthStore } from '@/lib/store/authStore';
import { getAllProducts } from '@/features/products/api/products.api';
import { getWishlist } from '@/features/wishlist/api/wishlist.api';

const SORT_OPTIONS: Option[] = [
  { key: 'latest', label: '최신순' },
  { key: 'sell', label: '판매량순' },
  { key: 'price-asc', label: '가격 낮은순' },
  { key: 'price-desc', label: '가격 높은순' },
];

const ProductListSection = ({ companyId }: { companyId: string }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState<Option>({
    key: 'latest',
    label: '최신순',
  });

  const { accessToken } = useAuthStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', selectedCategoryId, selectedSort.key],
    queryFn: async () => {
      const result = await getAllProducts({
        sort: selectedSort.key,
        categoryId: selectedCategoryId,
        accessToken,
      });
      return result;
    },
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
    enabled: !!companyId, // companyId가 있을 때만 쿼리 실행
    refetchOnMount: true, // 마운트 시 refetch (삭제 후 리다이렉트 시 최신 데이터 보장)
  });

  // 위시리스트 목록 조회
  const { data: wishlistData } = useQuery({
    queryKey: ['wishlist'],
    queryFn: () => getWishlist(),
    staleTime: 5 * 60 * 1000, // 5분간 캐시 유지
  });

  const products: TemplateProduct[] = useMemo(() => {
    if (!data) return [];
    return data.data.map(mapBackendProductToTemplate);
  }, [data]);

  const breadcrumbItems = [
    {
      label: BREADCRUMB_ITEMS.HOME.label,
      href: BREADCRUMB_ITEMS.HOME.href(companyId),
    },
    {
      label: BREADCRUMB_ITEMS.PRODUCTS.label,
      href: BREADCRUMB_ITEMS.PRODUCTS.href(companyId),
    },
  ];

  // 로딩 중일 때
  if (isLoading) {
    return (
      <div className="mt-12 md:mt-20 flex items-center justify-center min-h-screen">
        <p>{LOADING_MESSAGES.DEFAULT}</p>
      </div>
    );
  }

  // 에러 발생 시
  if (error) {
    return (
      <div className="mt-12 md:mt-20 flex items-center justify-center min-h-screen">
        <p className="text-red-600">{ERROR_MESSAGES.FETCH_ERROR}</p>
      </div>
    );
  }

  return (
    <div className="mt-12 md:mt-20">
      <ProductListTem
        categorySections={CATEGORY_SECTIONS}
        activeSectionId={CATEGORY_SECTIONS[0]?.id ?? null}
        selectedCategoryId={selectedCategoryId}
        onChangeCategory={setSelectedCategoryId}
        breadcrumbItems={breadcrumbItems}
        sortOptions={SORT_OPTIONS}
        selectedSort={selectedSort}
        onChangeSort={setSelectedSort}
        products={products}
        companyId={companyId}
        wishlistData={wishlistData}
      />
    </div>
  );
};

export default ProductListSection;

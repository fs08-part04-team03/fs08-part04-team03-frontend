'use client';

import { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductListTem from '@/features/products/template/ProductListTem/ProductListTem';
import { CATEGORY_SECTIONS, BREADCRUMB_ITEMS } from '@/constants';
import { Option } from '@/components/atoms/DropDown/DropDown';
import {
  mapBackendProductToTemplate,
  type TemplateProduct,
  type BackendProduct,
} from '@/features/products/utils/product.utils';
import { useAuthStore } from '@/lib/store/authStore';

const SORT_OPTIONS: Option[] = [
  { key: 'latest', label: '최신순' },
  { key: 'sell', label: '판매량순' },
  { key: 'price-asc', label: '가격 낮은순' },
  { key: 'price-desc', label: '가격 높은순' },
];

/** 🔒 API 응답 타입 */
type ProductListResponse = {
  data: BackendProduct[];
  error?: {
    code?: string;
    message?: string;
  };
};

const fetchAllProducts = async (params: {
  sort?: string | null;
  categoryId?: number | null;
  accessToken?: string | null;
}): Promise<ProductListResponse> => {
  const { sort, categoryId, accessToken } = params;
  const qs = new URLSearchParams();
  qs.set('all', 'true');

  if (sort) {
    const SORT_MAP: Record<string, string> = {
      latest: 'latest',
      sell: 'sales',
      'price-asc': 'priceAsc',
      'price-desc': 'priceDesc',
      sales: 'sales',
      priceAsc: 'priceAsc',
      priceDesc: 'priceDesc',
    };
    qs.set('sort', SORT_MAP[sort] ?? sort);
  }

  if (categoryId != null) qs.set('categoryId', String(categoryId));

  const headers: Record<string, string> = { Accept: 'application/json' };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  const res = await fetch(`/api/product?${qs.toString()}`, {
    headers,
    credentials: 'include',
  });

  if (!res.ok) {
    const bodyText = await res.text();
    let parsed: ProductListResponse | null = null;

    try {
      parsed = JSON.parse(bodyText) as ProductListResponse;
    } catch {
      // ignore
    }

    const isAuthExpired = res.status === 401 || parsed?.error?.code === 'AUTH_TOKEN_EXPIRED';

    if (isAuthExpired) {
      const retryRes = await fetch(`/api/product?${qs.toString()}`, {
        headers: { Accept: 'application/json' },
        credentials: 'include',
      });

      const retryText = await retryRes.text();

      if (!retryRes.ok) {
        try {
          const retryJson = JSON.parse(retryText) as ProductListResponse;
          if (retryJson?.error?.code === 'AUTH_TOKEN_EXPIRED' || retryRes.status === 401) {
            const authStore = await import('@/lib/store/authStore');
            authStore.useAuthStore.getState().clearAuth();
          }
        } catch {
          // ignore
        }

        throw new Error(`product fetch failed: ${retryRes.status} ${retryText}`);
      }

      return JSON.parse(retryText) as ProductListResponse;
    }

    throw new Error(`product fetch failed: ${res.status} ${bodyText}`);
  }

  return (await res.json()) as ProductListResponse;
};

const ProductListSection = ({ companyId }: { companyId: string }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState<Option>({
    key: 'latest',
    label: '최신순',
  });

  const { accessToken } = useAuthStore();

  const { data, isLoading, error } = useQuery({
    queryKey: [
      'products',
      selectedCategoryId,
      selectedSort.key,
      accessToken, // ✅ 토큰 변경 시 refetch
    ],
    queryFn: () =>
      fetchAllProducts({
        sort: selectedSort.key,
        categoryId: selectedCategoryId,
        accessToken,
      }),
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

  return (
    <div>
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
      />

      {isLoading && <div className="mt-10 text-center">로딩 중...</div>}

      {error && (
        <div className="mt-10 text-center text-red-600">
          상품을 불러오는 중 오류가 발생했습니다.
        </div>
      )}
    </div>
  );
};

export default ProductListSection;

import { useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface PaginationParams {
  page: number;
  size: number;
  status?: string;
  sort?: string;
}

interface UsePaginationParamsReturn {
  params: PaginationParams;
  handlePageChange: (newPage: number) => void;
  handleSortChange: (newSort: string | undefined) => void;
  handleStatusChange: (newStatus: string | undefined) => void;
}

/**
 * URL 기반 페이지네이션 파라미터 관리 훅
 *
 * @param options - 페이지네이션 설정
 * @param options.defaultSize - 기본 페이지 크기 (기본값: 10)
 * @param options.minSize - 최소 페이지 크기 (기본값: 1)
 * @param options.maxSize - 최대 페이지 크기 (기본값: 100)
 * @param options.defaultSortKey - 기본 정렬 키 (선택)
 *
 * @returns params, handlePageChange, handleSortChange, handleStatusChange
 *
 * @example
 * ```tsx
 * const { params, handlePageChange, handleSortChange } = usePaginationParams({
 *   defaultSize: 6,
 *   defaultSortKey: 'createdAt',
 * });
 *
 * // React Query에서 사용
 * const { data } = useQuery({
 *   queryKey: ['items', params.page, params.size, params.sort],
 *   queryFn: () => fetchItems(params),
 * });
 * ```
 */
export const usePaginationParams = (
  options: {
    defaultSize?: number;
    minSize?: number;
    maxSize?: number;
    defaultSortKey?: string;
  } = {}
): UsePaginationParamsReturn => {
  const { defaultSize = 10, minSize = 1, maxSize = 100, defaultSortKey = 'createdAt' } = options;

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL에서 파라미터 파싱
  const page = Math.max(1, Number.parseInt(searchParams.get('page') || '1', 10) || 1);
  const size = Math.max(
    minSize,
    Math.min(
      maxSize,
      Number.parseInt(searchParams.get('size') || String(defaultSize), 10) || defaultSize
    )
  );
  const status = searchParams.get('status') || undefined;
  const sort = searchParams.get('sort') || undefined;

  const params: PaginationParams = {
    page,
    size,
    status,
    sort,
  };

  // 페이지 변경 핸들러
  const handlePageChange = useCallback(
    (newPage: number) => {
      const urlParams = new URLSearchParams(searchParams.toString());
      urlParams.set('page', newPage.toString());
      router.push(`${pathname}?${urlParams.toString()}`);
    },
    [searchParams, router, pathname]
  );

  // 정렬 변경 핸들러
  const handleSortChange = useCallback(
    (newSort: string | undefined) => {
      const urlParams = new URLSearchParams(searchParams.toString());
      if (newSort && newSort !== defaultSortKey) {
        urlParams.set('sort', newSort);
      } else {
        urlParams.delete('sort');
      }
      urlParams.set('page', '1');
      router.push(`${pathname}?${urlParams.toString()}`);
    },
    [searchParams, router, pathname, defaultSortKey]
  );

  // 상태 변경 핸들러
  const handleStatusChange = useCallback(
    (newStatus: string | undefined) => {
      const urlParams = new URLSearchParams(searchParams.toString());
      if (newStatus && newStatus !== 'ALL') {
        urlParams.set('status', newStatus);
      } else {
        urlParams.delete('status');
      }
      urlParams.set('page', '1');
      router.push(`${pathname}?${urlParams.toString()}`);
    },
    [searchParams, router, pathname]
  );

  return {
    params,
    handlePageChange,
    handleSortChange,
    handleStatusChange,
  };
};

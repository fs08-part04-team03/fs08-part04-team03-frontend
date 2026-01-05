import type { Option } from '@/components/atoms/DropDown/DropDown';

export const COMMON_SORT_OPTIONS: Option[] = [
  { key: 'LATEST', label: '최신순' },
  { key: 'PRICE_LOW', label: '낮은 가격순' },
  { key: 'PRICE_HIGH', label: '높은 가격순' },
] as const;

export const SALES_SORT_OPTION: Option = { key: 'SALES', label: '판매순' } as const;

// “판매순 포함” 버전이 필요한 화면에서만 사용
export const SORT_OPTIONS_WITH_SALES: Option[] = [
  ...COMMON_SORT_OPTIONS,
  SALES_SORT_OPTION,
] as const;

export const DEFAULT_SORT_KEY = 'LATEST' as const;

// 상품 등록 내역용 정렬 옵션 (전체 옵션 포함)
export const REGISTERED_PRODUCT_SORT_OPTIONS: Option[] = [
  { key: 'all', label: '전체' },
  { key: 'latest', label: '최신순' },
  { key: 'lowprice', label: '낮은 가격순' },
  { key: 'highprice', label: '높은 가격순' },
];

// 상품 등록 내역용 기본 정렬 옵션
export const DEFAULT_REGISTERED_PRODUCT_SORT: Option = REGISTERED_PRODUCT_SORT_OPTIONS[0]!;

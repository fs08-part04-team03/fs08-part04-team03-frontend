/**
 * Products 도메인 옵션 상수
 */

import type { Option } from '@/components/atoms/DropDown/DropDown';

/**
 * 상품 목록 정렬 옵션
 */
export const PRODUCT_SORT_OPTIONS: Option[] = [
  { key: 'latest', label: '최신순' },
  { key: 'sell', label: '판매량순' },
  { key: 'price-asc', label: '가격 낮은순' },
  { key: 'price-desc', label: '가격 높은순' },
] as const;

/**
 * 기본 정렬 옵션
 */
export const DEFAULT_PRODUCT_SORT: Option = { key: 'latest', label: '최신순' };

/**
 * 상품 컨텐츠 Props 타입 정의
 * Props Drilling 개선을 위한 그룹화된 타입
 */

import type { TemplateProduct } from '@/features/products/utils/product.utils';

/**
 * 상품 목록 데이터
 */
export interface ProductContentDataState {
  products: TemplateProduct[];
  isLoading: boolean;
}

/**
 * 페이지네이션 상태
 */
export interface ProductContentPaginationState {
  itemsPerPage: number;
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
}

/**
 * 검색 상태
 */
export interface ProductContentSearchState {
  searchQuery?: string;
  onSearch?: (query: string) => void;
}

/**
 * 상품 액션 핸들러
 */
export interface ProductContentActionHandlers {
  onProductClick: (productId: number) => void;
  onOpenModal: () => void;
  isProductLiked: (productId: number) => boolean;
  handleToggleLike: (productId: number, isLiked: boolean) => void;
}

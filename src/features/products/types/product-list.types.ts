/**
 * 상품 목록 Props 타입 정의
 * Props Drilling 개선을 위한 그룹화된 타입
 */

import type { GetWishlistResponse } from '@/features/wishlist/api/wishlist.api';
import type { CategoryPanelSection } from '@/components/organisms/CategoryPanel/CategoryPanel';
import type { BreadcrumbItem } from '@/components/molecules/Breadcrumb/Breadcrumb';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import type { TemplateProduct } from '@/features/products/utils/product.utils';

/**
 * 카테고리 상태
 */
export interface ProductCategoryState {
  categorySections: CategoryPanelSection[];
  activeSectionId?: number | null;
  selectedCategoryId?: number | null;
  onChangeCategory?: (value: number | null) => void;
}

/**
 * 정렬 및 검색 상태
 */
export interface ProductSortSearchState {
  breadcrumbItems: BreadcrumbItem[];
  sortOptions: Option[];
  selectedSort?: Option;
  onChangeSort?: (option: Option) => void;
  searchQuery?: string;
  onSearch?: (query: string) => void;
}

/**
 * 상품 데이터
 */
export interface ProductDataState {
  products: TemplateProduct[];
  wishlistData?: GetWishlistResponse;
  isLoading?: boolean;
}

/**
 * 상품 액션 핸들러
 */
export interface ProductActionHandlers {
  onProductClick?: (productId: number) => void;
  onProductRegister?: () => void;
}

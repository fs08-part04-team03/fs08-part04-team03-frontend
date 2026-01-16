'use client';

/**
 * 상품 목록 Template
 * Props Drilling 개선 - 그룹화된 Props 사용
 */

import { useState, lazy, Suspense } from 'react';
import { clsx } from '@/utils/clsx';
import { CategoryPanel } from '@/components/organisms/CategoryPanel/CategoryPanel';
import { ProductListHeader } from '@/features/products/template/ProductListTem/components/ProductListHeader';
import { ProductListContent } from '@/features/products/template/ProductListTem/components/ProductListContent';
import { useItemsPerPage } from '@/features/products/hooks/useItemsPerPage';
import { useWishlistToggle } from '@/features/products/hooks/useWishlistToggle';
import { useProductSorting } from '@/features/products/hooks/useProductSorting';
import { useProductPagination } from '@/features/products/hooks/useProductPagination';
import { useProductBreadcrumb } from '@/features/products/hooks/useProductBreadcrumb';
import { PRODUCT_LIST_LAYOUT } from '@/features/products/utils/constants';
import type {
  ProductCategoryState,
  ProductSortSearchState,
  ProductDataState,
  ProductActionHandlers,
} from '@/features/products/types/product-list.types';
// 동적 import로 코드 스플리팅 적용 (성능 최적화)
const ProductModal = lazy(() => import('@/components/molecules/ProductModal/ProductModal'));

/**
 * 개선된 Props 인터페이스 - 그룹화된 타입 사용
 */
interface ProductListTemProps {
  companyId: string;

  // 그룹화된 Props
  categoryState: ProductCategoryState;
  sortSearchState: ProductSortSearchState;
  productData: ProductDataState;
  actionHandlers: ProductActionHandlers;
}

/**
 * 개선된 상품 목록 Template - 깔끔하고 단순한 조립 레이어
 */
const ProductListTem = ({
  companyId,
  categoryState,
  sortSearchState,
  productData,
  actionHandlers,
}: ProductListTemProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  // 커스텀 훅 사용
  const itemsPerPage = useItemsPerPage();
  const { isProductLiked, handleToggleLike } = useWishlistToggle(productData.wishlistData);
  const sortedProducts = useProductSorting(productData.products, sortSearchState.selectedSort);
  const { page, setPage, totalPage, currentProducts } = useProductPagination(
    sortedProducts,
    itemsPerPage,
    sortSearchState.selectedSort,
    categoryState.selectedCategoryId
  );
  const breadcrumbForRender = useProductBreadcrumb(
    companyId,
    categoryState.selectedCategoryId,
    categoryState.categorySections,
    sortSearchState.breadcrumbItems,
    categoryState.onChangeCategory,
    categoryState.onChangeCategory // 소분류 변경도 같은 핸들러 사용
  );

  return (
    <div className="w-full flex justify-center">
      <div className="flex mobile:flex-col tablet:flex-row desktop:gap-40 tablet:gap-20 mobile:gap-0">
        {/* Category */}
        <div className="mobile:mt-0 tablet:mt-10 desktop:mt-80">
          <div className="mobile:overflow-x-auto mobile:scrollbar-none tablet:overflow-visible">
            <div
              className={clsx(
                'mobile:flex mobile:flex-nowrap tablet:flex-col',
                PRODUCT_LIST_LAYOUT.MOBILE_WIDTH,
                PRODUCT_LIST_LAYOUT.TABLET_WIDTH
              )}
            >
              <CategoryPanel
                sections={categoryState.categorySections}
                activeSectionId={categoryState.activeSectionId}
                selectedValue={categoryState.selectedCategoryId}
                onChange={categoryState.onChangeCategory}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          className={clsx(
            'flex flex-col w-full mx-auto',
            PRODUCT_LIST_LAYOUT.CONTENT_MOBILE,
            PRODUCT_LIST_LAYOUT.CONTENT_TABLET,
            PRODUCT_LIST_LAYOUT.CONTENT_DESKTOP
          )}
        >
          <ProductListHeader
            breadcrumbItems={breadcrumbForRender}
            sortOptions={sortSearchState.sortOptions}
            selectedSort={sortSearchState.selectedSort}
            onChangeSort={sortSearchState.onChangeSort}
            onOpenModal={() => setModalOpen(true)}
          />

          <ProductListContent
            dataState={{
              products: currentProducts,
              isLoading: productData.isLoading ?? false,
            }}
            paginationState={{
              itemsPerPage,
              page,
              totalPage,
              onPageChange: setPage,
            }}
            searchState={{
              searchQuery: sortSearchState.searchQuery,
              onSearch: sortSearchState.onSearch,
            }}
            actionHandlers={{
              onOpenModal: () => setModalOpen(true),
              isProductLiked,
              handleToggleLike,
            }}
          />
        </div>
      </div>

      {modalOpen && (
        <Suspense fallback={null}>
          <ProductModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={() => {
              setModalOpen(false);
              actionHandlers.onProductRegister?.();
            }}
            initialName=""
            initialPrice=""
            initialLink=""
            initialImage={null}
            initialCategory={null}
            initialSubCategory={null}
          />
        </Suspense>
      )}
    </div>
  );
};

export default ProductListTem;

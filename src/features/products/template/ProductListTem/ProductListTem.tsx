'use client';

import { useState, lazy, Suspense } from 'react';
import { clsx } from '@/utils/clsx';
import type { GetWishlistResponse } from '@/features/wishlist/api/wishlist.api';
import {
  CategoryPanel,
  type CategoryPanelSection,
} from '@/components/organisms/CategoryPanel/CategoryPanel';
import type { BreadcrumbItem } from '@/components/molecules/Breadcrumb/Breadcrumb';
import type { Option } from '@/components/atoms/DropDown/DropDown';
import { ProductListHeader } from '@/features/products/template/ProductListTem/components/ProductListHeader';
import { ProductListContent } from '@/features/products/template/ProductListTem/components/ProductListContent';
import { useItemsPerPage } from '@/features/products/hooks/useItemsPerPage';
import { useWishlistToggle } from '@/features/products/hooks/useWishlistToggle';
import { useProductSorting } from '@/features/products/hooks/useProductSorting';
import { useProductPagination } from '@/features/products/hooks/useProductPagination';
import { useProductBreadcrumb } from '@/features/products/hooks/useProductBreadcrumb';
import { PRODUCT_LIST_LAYOUT } from '@/features/products/utils/constants';
import type { TemplateProduct } from '@/features/products/utils/product.utils';
// 동적 import로 코드 스플리팅 적용 (성능 최적화)
const ProductModal = lazy(() => import('@/components/molecules/ProductModal/ProductModal'));

/* =====================
 * Props
 ====================== */
interface ProductListTemProps {
  categorySections: CategoryPanelSection[];
  activeSectionId?: number | null;
  selectedCategoryId?: number | null;
  onChangeCategory?: (value: number | null) => void;

  breadcrumbItems: BreadcrumbItem[];
  sortOptions: Option[];
  selectedSort?: Option;
  onChangeSort?: (option: Option) => void;

  products: TemplateProduct[];

  companyId: string;
  wishlistData?: GetWishlistResponse;
  isLoading?: boolean;
  searchQuery?: string;
  onSearch?: (query: string) => void;
  onProductClick?: (productId: number) => void;
  onProductRegister?: () => void;
}

/* =====================
 * Component
 ====================== */
const ProductListTem = ({
  categorySections,
  activeSectionId,
  selectedCategoryId,
  onChangeCategory,
  breadcrumbItems,
  sortOptions,
  selectedSort,
  onChangeSort,
  products,
  companyId,
  wishlistData,
  isLoading = false,
  searchQuery,
  onSearch,
  onProductClick,
  onProductRegister,
}: ProductListTemProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  // 커스텀 훅 사용
  const itemsPerPage = useItemsPerPage();
  const { isProductLiked, handleToggleLike } = useWishlistToggle(wishlistData);
  const sortedProducts = useProductSorting(products, selectedSort);
  const { page, setPage, totalPage, currentProducts } = useProductPagination(
    sortedProducts,
    itemsPerPage,
    selectedSort,
    selectedCategoryId
  );
  const breadcrumbForRender = useProductBreadcrumb(
    companyId,
    selectedCategoryId,
    categorySections,
    breadcrumbItems
  );

  const handleProductClickInternal = (productId: number) => {
    if (onProductClick) {
      onProductClick(productId);
    }
  };

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
                sections={categorySections}
                activeSectionId={activeSectionId}
                selectedValue={selectedCategoryId}
                onChange={onChangeCategory}
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
            sortOptions={sortOptions}
            selectedSort={selectedSort}
            onChangeSort={onChangeSort}
            onOpenModal={() => setModalOpen(true)}
          />

          <ProductListContent
            products={currentProducts}
            isLoading={isLoading}
            itemsPerPage={itemsPerPage}
            page={page}
            totalPage={totalPage}
            onPageChange={setPage}
            searchQuery={searchQuery}
            onSearch={onSearch}
            onProductClick={handleProductClickInternal}
            onOpenModal={() => setModalOpen(true)}
            isProductLiked={isProductLiked}
            handleToggleLike={handleToggleLike}
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
              onProductRegister?.();
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

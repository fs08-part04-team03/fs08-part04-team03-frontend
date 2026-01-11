'use client';

import { clsx } from '@/utils/clsx';
import { Divider } from '@/components/atoms/Divider/Divider';
import ProductCard from '@/components/molecules/ProductCard/ProductCard';
import ProductListRowSkeleton from '@/components/molecules/ProductListRowSkeleton/ProductListRowSkeleton';
import PaginationBlock from '@/components/molecules/PaginationBlock/PaginationBlock';
import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';
import SearchBar from '@/components/molecules/SearchBar/SearchBar';
import {
  PRODUCT_LIST_STYLES,
  PRODUCT_LIST_LAYOUT,
  PRODUCT_LIST_EMPTY,
  PRODUCT_LIST_SEARCH,
  PRODUCT_LIST_EMPTY_HEIGHT,
} from '@/features/products/utils/constants';
import type { TemplateProduct } from '@/features/products/utils/product.utils';

interface ProductListContentProps {
  products: TemplateProduct[];
  isLoading: boolean;
  itemsPerPage: number;
  page: number;
  totalPage: number;
  onPageChange: (page: number) => void;
  searchQuery?: string;
  onSearch?: (query: string) => void;
  onProductClick: (productId: number) => void;
  onOpenModal: () => void;
  isProductLiked: (productId: number) => boolean;
  handleToggleLike: (productId: number, isLiked: boolean) => void;
}

/**
 * 상품 목록 컨텐츠 컴포넌트 (검색바, 상품 그리드, 페이지네이션)
 */
export const ProductListContent = ({
  products,
  isLoading,
  itemsPerPage,
  page,
  totalPage,
  onPageChange,
  searchQuery,
  onSearch,
  onProductClick,
  onOpenModal,
  isProductLiked,
  handleToggleLike,
}: ProductListContentProps) => {
  const isEmpty = products.length === 0;

  return (
    <>
      <Divider className="mb-20 tablet:mb-30" />

      <div className="pb-20">
        <div
          className={clsx(
            PRODUCT_LIST_LAYOUT.SEARCH_MOBILE,
            PRODUCT_LIST_LAYOUT.SEARCH_TABLET,
            PRODUCT_LIST_LAYOUT.SEARCH_DESKTOP,
            'mr-auto'
          )}
        >
          <SearchBar
            placeholder={PRODUCT_LIST_SEARCH.PLACEHOLDER}
            defaultValue={searchQuery}
            onSearch={onSearch}
            instant
            className="w-full"
          />
        </div>
      </div>

      {isLoading && <ProductListRowSkeleton rows={itemsPerPage} />}

      {!isLoading && isEmpty && (
        <div
          className={clsx(
            'flex items-center justify-center',
            PRODUCT_LIST_EMPTY_HEIGHT.MOBILE,
            PRODUCT_LIST_EMPTY_HEIGHT.TABLET,
            PRODUCT_LIST_EMPTY_HEIGHT.DESKTOP
          )}
        >
          <StatusNotice
            title={PRODUCT_LIST_EMPTY.TITLE}
            description={PRODUCT_LIST_EMPTY.DESCRIPTION}
            buttonText={PRODUCT_LIST_EMPTY.BUTTON_TEXT}
            onButtonClick={onOpenModal}
          />
        </div>
      )}

      {!isLoading && !isEmpty && (
        <div
          className={clsx(
            PRODUCT_LIST_STYLES.GRID.BASE,
            PRODUCT_LIST_STYLES.GRID.COLUMNS,
            PRODUCT_LIST_STYLES.GRID.GAP_X,
            PRODUCT_LIST_STYLES.GRID.GAP_Y
          )}
        >
          {products.map((product, index) => {
            const liked = isProductLiked(product.id);
            // 첫 화면에 보이는 상위 8개 이미지에 priority 부여 (LCP 개선)
            // 데스크톱 기준 2행(4개씩) = 8개, 모바일/태블릿도 커버
            const isPriority = index < 8;
            return (
              <ProductCard
                key={product.id}
                variant="product"
                name={product.name}
                price={product.price}
                purchaseCount={product.purchaseCount}
                imageUrl={product.imageUrl}
                onClick={() => onProductClick(product.id)}
                liked={liked}
                onToggleLike={() => handleToggleLike(product.id, liked)}
                priority={isPriority}
              />
            );
          })}
        </div>
      )}

      <div className="flex justify-center mt-30 tablet:mt-40 desktop:mt-60">
        <PaginationBlock
          current={page}
          total={totalPage}
          onPrev={onPageChange}
          onNext={onPageChange}
        />
      </div>
    </>
  );
};

'use client';

/**
 * 상품 리스트 컨텐츠
 * Props Drilling 개선 - 그룹화된 Props 사용
 */

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
import type {
  ProductContentDataState,
  ProductContentPaginationState,
  ProductContentSearchState,
  ProductContentActionHandlers,
} from '@/features/products/types/product-content.types';

/**
 * 개선된 Props 인터페이스 - 그룹화된 타입 사용
 */
interface ProductListContentProps {
  dataState: ProductContentDataState;
  paginationState: ProductContentPaginationState;
  searchState?: ProductContentSearchState;
  actionHandlers: ProductContentActionHandlers;
}

/**
 * 개선된 상품 목록 컨텐츠 - 깔끔하고 단순한 조립 레이어
 */
export const ProductListContent = ({
  dataState,
  paginationState,
  searchState,
  actionHandlers,
}: ProductListContentProps) => {
  const { products, isLoading } = dataState;
  const { itemsPerPage, page, totalPage, onPageChange } = paginationState;
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
            defaultValue={searchState?.searchQuery}
            onSearch={searchState?.onSearch}
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
            onButtonClick={actionHandlers.onOpenModal}
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
            const liked = actionHandlers.isProductLiked(product.id);
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
                productId={product.id}
                liked={liked}
                onToggleLike={() => actionHandlers.handleToggleLike(product.id, liked)}
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

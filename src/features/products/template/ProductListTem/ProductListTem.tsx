'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { clsx } from '@/utils/clsx';
import {
  addToWishlist,
  removeFromWishlist,
  type GetWishlistResponse,
} from '@/features/wishlist/api/wishlist.api';
import { useToast } from '@/hooks/useToast';

import {
  CategoryPanel,
  CategoryPanelSection,
} from '@/components/organisms/CategoryPanel/CategoryPanel';
import Breadcrumb, { BreadcrumbItem } from '@/components/molecules/Breadcrumb/Breadcrumb';
import DropDown, { Option } from '@/components/atoms/DropDown/DropDown';
import { Divider } from '@/components/atoms/Divider/Divider';
import ProductCard from '@/components/molecules/ProductCard/ProductCard';
import ProductListRowSkeleton from '@/components/molecules/ProductListRowSkeleton/ProductListRowSkeleton';
import PaginationBlock from '@/components/molecules/PaginationBlock/PaginationBlock';
import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';
import ProductModal from '@/components/molecules/ProductModal/ProductModal';
import { BREADCRUMB_ITEMS } from '@/constants';

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

  products: Array<{
    id: number;
    name: string;
    price: number;
    categoryId?: number | null;
    imageUrl?: string;
    purchaseCount?: number;
  }>;

  companyId: string;
  wishlistData?: GetWishlistResponse;
  isLoading?: boolean;
}

/* =====================
 * Hooks
 ====================== */
const useItemsPerPage = () => {
  const [count, setCount] = useState(6);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setCount(9);
      else if (window.matchMedia('(min-width: 768px)').matches) setCount(6);
      else setCount(4);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
};

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
}: ProductListTemProps) => {
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  const itemsPerPage = useItemsPerPage();

  const handleProductClick = (productId: number) => {
    router.push(`/${companyId}/products/${productId}`);
  };

  // 위시리스트 추가 mutation
  const addWishlistMutation = useMutation({
    mutationFn: (productId: number) => addToWishlist(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      triggerToast('success', '위시리스트에 추가되었습니다.');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '위시리스트 추가에 실패했습니다.';
      triggerToast('error', message);
    },
  });

  // 위시리스트 제거 mutation
  const removeWishlistMutation = useMutation({
    mutationFn: (productId: number) => removeFromWishlist(productId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      triggerToast('success', '위시리스트에서 제거되었습니다.');
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : '위시리스트 제거에 실패했습니다.';
      triggerToast('error', message);
    },
  });

  // 위시리스트 토글 핸들러
  const handleToggleLike = useCallback(
    (productId: number, isLiked: boolean) => {
      if (isLiked) {
        removeWishlistMutation.mutate(productId);
      } else {
        addWishlistMutation.mutate(productId);
      }
    },
    [addWishlistMutation, removeWishlistMutation]
  );

  // 상품이 위시리스트에 있는지 확인
  const isProductLiked = useCallback(
    (productId: number) => {
      if (!wishlistData?.data) return false;
      return wishlistData.data.some((item) => item.product.id === productId);
    },
    [wishlistData]
  );

  /* =====================
   * Filter Products by Category
   ====================== */
  // 백엔드에서 이미 필터링된 데이터를 받아오므로 클라이언트 필터링 불필요
  const filteredProducts = products;

  /* =====================
   * Sort Products
   ====================== */
  const sortedProducts = useMemo(() => {
    if (!selectedSort) return filteredProducts;

    switch (selectedSort.key) {
      case 'latest':
        return [...filteredProducts].sort((a, b) => b.id - a.id);
      case 'sell':
        return [...filteredProducts].sort(
          (a, b) => (b.purchaseCount || 0) - (a.purchaseCount || 0)
        );
      case 'price-asc':
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      default:
        return filteredProducts;
    }
  }, [filteredProducts, selectedSort]);

  const totalPage = Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage));

  useEffect(() => {
    if (page > totalPage) setPage(totalPage);
  }, [page, totalPage]);

  useEffect(() => {
    setPage(1);
  }, [selectedSort, selectedCategoryId]);

  const currentProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return sortedProducts.slice(start, start + itemsPerPage);
  }, [sortedProducts, page, itemsPerPage]);

  const isEmpty = currentProducts.length === 0;

  const buttonClass = clsx(
    'flex items-center justify-center gap-6',
    'h-56 tablet:h-44 px-16',
    'rounded-4',
    'bg-[#222] text-white',
    'font-semibold text-[14px] tracking--0.35',
    'shadow-[0_4px_6px_rgba(0,0,0,0.02)]',
    'backdrop-blur-[15px]',
    'cursor-pointer'
  );

  /* =====================
   * Dynamic Breadcrumb
   * 카테고리 선택 시에도 맨 앞에 "상품" breadcrumb을 추가하여 필터링 없는 상품 페이지로 이동 가능
   ====================== */
  const breadcrumbForRender = useMemo<BreadcrumbItem[]>(() => {
    // "상품" breadcrumb 항목 생성 (필터링 없는 상품 페이지로 이동)
    const productsBreadcrumb: BreadcrumbItem = {
      label: BREADCRUMB_ITEMS.PRODUCTS.label,
      href: BREADCRUMB_ITEMS.PRODUCTS.href(companyId),
    };

    if (selectedCategoryId == null) return breadcrumbItems;

    const matchedSection = categorySections.find((section) =>
      section.options.some((opt) => opt.value === selectedCategoryId)
    );

    if (!matchedSection) return breadcrumbItems;

    const matchedOption = matchedSection.options.find((opt) => opt.value === selectedCategoryId);

    if (!matchedOption) return breadcrumbItems;

    // "상품" > "대분류" > "소분류" 형식으로 breadcrumb 구성
    return [
      productsBreadcrumb, // 맨 앞에 "상품" 추가
      { label: matchedSection.title },
      { label: matchedOption.label },
    ];
  }, [selectedCategoryId, categorySections, breadcrumbItems, companyId]);

  return (
    <div className="w-full flex justify-center">
      <div className="flex mobile:flex-col tablet:flex-row desktop:gap-40 tablet:gap-20 mobile:gap-0">
        {/* Category */}
        <div className="mobile:mt-0 tablet:mt-10 desktop:mt-80">
          <div className="mobile:overflow-x-auto mobile:scrollbar-none tablet:overflow-visible">
            <div className="mobile:flex mobile:flex-nowrap tablet:flex-col mobile:w-325 tablet:w-180">
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
        <div className="flex flex-col w-full mobile:w-325 tablet:w-496 desktop:w-1180 mx-auto">
          {/* Header */}
          <div className="flex flex-col pb-20">
            <div className="hidden tablet:flex items-center justify-between desktop:mt-80">
              <Breadcrumb items={breadcrumbForRender} />
              <div className="flex items-center gap-30">
                <DropDown
                  items={sortOptions}
                  variant="small"
                  selected={selectedSort}
                  onSelect={onChangeSort}
                />
                <button type="button" className={buttonClass} onClick={() => setModalOpen(true)}>
                  <img src="/icons/plus-white.svg" alt="" aria-hidden className="w-16 h-16" />
                  <span>상품 등록</span>
                </button>
              </div>
            </div>

            {/* Mobile Header */}
            <div className="flex flex-col tablet:hidden">
              <div className="pt-14 pb-10">
                <Breadcrumb items={breadcrumbForRender} />
              </div>
              <div className="flex items-center justify-between pb-20">
                <DropDown
                  items={sortOptions}
                  variant="small"
                  selected={selectedSort}
                  onSelect={onChangeSort}
                />
                <button type="button" className={buttonClass} onClick={() => setModalOpen(true)}>
                  <img src="/icons/plus-white.svg" alt="" aria-hidden className="w-16 h-16" />
                  <span>상품 등록</span>
                </button>
              </div>
            </div>
          </div>

          <Divider className="mb-20 tablet:mb-30" />

          {isLoading && <ProductListRowSkeleton rows={itemsPerPage} />}

          {!isLoading && isEmpty && (
            <div className="flex items-center justify-center h-522 tablet:h-604 desktop:h-938">
              <StatusNotice
                title="등록된 상품이 없습니다"
                description={`상품을 등록하면\n여기에 표시됩니다.`}
                buttonText="상품 등록"
                onButtonClick={() => setModalOpen(true)}
              />
            </div>
          )}

          {!isLoading && !isEmpty && (
            <div
              className={clsx(
                'grid',
                'desktop:grid-cols-3 tablet:grid-cols-3 grid-cols-2',
                'desktop:gap-x-40 tablet:gap-x-14 gap-x-16',
                'desktop:gap-y-60 tablet:gap-y-50 gap-y-40'
              )}
            >
              {currentProducts.map((product) => {
                const liked = isProductLiked(product.id);
                return (
                  <ProductCard
                    key={product.id}
                    variant="product"
                    name={product.name}
                    price={product.price}
                    purchaseCount={product.purchaseCount}
                    imageUrl={product.imageUrl}
                    onClick={() => handleProductClick(product.id)}
                    liked={liked}
                    onToggleLike={() => handleToggleLike(product.id, liked)}
                  />
                );
              })}
            </div>
          )}

          <div className="flex justify-center mt-30 tablet:mt-40 desktop:mt-60">
            <PaginationBlock
              current={page}
              total={totalPage}
              onPrev={(p) => setPage(p)}
              onNext={(p) => setPage(p)}
            />
          </div>
        </div>
      </div>

      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={() => {
          setModalOpen(false);
          // 캐시 무효화하여 새로 등록된 상품이 즉시 표시되도록 보장
          queryClient.invalidateQueries({ queryKey: ['products'] }).catch(() => {
            // 에러는 무시 (백그라운드 작업)
          });
        }}
        initialName=""
        initialPrice=""
        initialLink=""
        initialImage={null}
        initialCategory={null}
        initialSubCategory={null}
      />
    </div>
  );
};

export default ProductListTem;

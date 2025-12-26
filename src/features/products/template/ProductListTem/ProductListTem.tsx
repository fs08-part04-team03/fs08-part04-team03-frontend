'use client';

import { useEffect, useMemo, useState } from 'react';
import { clsx } from '@/utils/clsx';

import {
  CategoryPanel,
  CategoryPanelSection,
} from '@/components/organisms/CategoryPanel/CategoryPanel';
import Breadcrumb, { BreadcrumbItem } from '@/components/molecules/Breadcrumb/Breadcrumb';
import DropDown, { Option } from '@/components/atoms/DropDown/DropDown';
import { Divider } from '@/components/atoms/Divider/Divider';
import ProductCard from '@/components/molecules/ProductCard/ProductCard';
import PaginationBlock from '@/components/molecules/PaginationBlock/PaginationBlock';
import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';
import ProductModal from '@/components/molecules/ProductModal/ProductModal';

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
}: ProductListTemProps) => {
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const itemsPerPage = useItemsPerPage();

  /* =====================
   * Filter Products by Category
   ====================== */
  const filteredProducts = useMemo(() => {
    if (selectedCategoryId == null) return products;
    return products.filter((p) => p.categoryId === selectedCategoryId);
  }, [products, selectedCategoryId]);

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
   ====================== */
  const breadcrumbForRender = useMemo<BreadcrumbItem[]>(() => {
    if (selectedCategoryId == null) return breadcrumbItems;

    const matchedSection = categorySections.find((section) =>
      section.options.some((opt) => opt.value === selectedCategoryId)
    );

    if (!matchedSection) return breadcrumbItems;

    const matchedOption = matchedSection.options.find((opt) => opt.value === selectedCategoryId);

    if (!matchedOption) return breadcrumbItems;

    return [{ label: matchedSection.title }, { label: matchedOption.label }];
  }, [selectedCategoryId, categorySections, breadcrumbItems]);

  return (
    <div className="w-full flex justify-center">
      <div className="flex mobile:flex-col tablet:flex-row desktop:gap-40 tablet:gap-20 mobile:gap-0">
        {/* Category */}
        <div className="mobile:mt-20 tablet:mt-0 desktop:mt-80">
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
                  buttonClassName="w-150"
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
                  variant="medium"
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

          {isEmpty ? (
            <div className="flex items-center justify-center h-522 tablet:h-604 desktop:h-938">
              <StatusNotice
                title="등록된 상품이 없습니다"
                description={`상품을 등록하면\n여기에 표시됩니다.`}
                buttonText="상품 등록"
                onButtonClick={() => setModalOpen(true)}
              />
            </div>
          ) : (
            <div
              className={clsx(
                'grid',
                'desktop:grid-cols-3 tablet:grid-cols-3 grid-cols-2',
                'desktop:gap-x-40 tablet:gap-x-14 gap-x-16',
                'desktop:gap-y-60 tablet:gap-y-50 gap-y-40'
              )}
            >
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  variant="product"
                  name={product.name}
                  price={product.price}
                  purchaseCount={product.purchaseCount}
                  imageUrl={product.imageUrl}
                />
              ))}
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
        onSubmit={() => setModalOpen(false)}
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

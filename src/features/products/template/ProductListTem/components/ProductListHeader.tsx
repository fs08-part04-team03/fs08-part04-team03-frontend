'use client';

import { clsx } from '@/utils/clsx';
import Breadcrumb, { type BreadcrumbItem } from '@/components/molecules/Breadcrumb/Breadcrumb';
import DropDown, { type Option } from '@/components/atoms/DropDown/DropDown';
import { PRODUCT_LIST_STYLES } from '@/features/products/utils/constants';

interface ProductListHeaderProps {
  breadcrumbItems: BreadcrumbItem[];
  sortOptions: Option[];
  selectedSort?: Option;
  onChangeSort?: (option: Option) => void;
  onOpenModal: () => void;
}

/**
 * 상품 목록 헤더 컴포넌트 (Breadcrumb, 정렬 드롭다운, 상품 등록 버튼)
 */
export const ProductListHeader = ({
  breadcrumbItems,
  sortOptions,
  selectedSort,
  onChangeSort,
  onOpenModal,
}: ProductListHeaderProps) => {
  const buttonClass = clsx(
    PRODUCT_LIST_STYLES.BUTTON.BASE,
    PRODUCT_LIST_STYLES.BUTTON.HEIGHT,
    PRODUCT_LIST_STYLES.BUTTON.PADDING,
    PRODUCT_LIST_STYLES.BUTTON.ROUNDED,
    PRODUCT_LIST_STYLES.BUTTON.BACKGROUND,
    PRODUCT_LIST_STYLES.BUTTON.TEXT,
    PRODUCT_LIST_STYLES.BUTTON.FONT,
    PRODUCT_LIST_STYLES.BUTTON.SHADOW,
    PRODUCT_LIST_STYLES.BUTTON.BACKDROP,
    PRODUCT_LIST_STYLES.BUTTON.CURSOR
  );

  return (
    <div className="flex flex-col pb-20">
      {/* Desktop/Tablet Header */}
      <div className="hidden tablet:flex items-center justify-between desktop:mt-80">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex items-center gap-30">
          <DropDown
            items={sortOptions}
            variant="small"
            selected={selectedSort}
            onSelect={onChangeSort}
          />
          <button type="button" className={buttonClass} onClick={onOpenModal}>
            <img src="/icons/plus-white.svg" alt="" aria-hidden className="w-16 h-16" />
            <span>상품 등록</span>
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="flex flex-col tablet:hidden">
        <div className="pt-14 pb-10">
          <Breadcrumb items={breadcrumbItems} />
        </div>

        <div className="flex items-center justify-between pb-20">
          <DropDown
            items={sortOptions}
            variant="small"
            selected={selectedSort}
            onSelect={onChangeSort}
          />
          <button type="button" className={buttonClass} onClick={onOpenModal}>
            <img src="/icons/plus-white.svg" alt="" aria-hidden className="w-16 h-16" />
            <span>상품 등록</span>
          </button>
        </div>
      </div>
    </div>
  );
};

'use client';

import { useMemo, useState } from 'react';

import {
  CategoryPanel,
  type CategoryPanelSection,
} from '@/components/organisms/CategoryPanel/CategoryPanel';

import DetailPageLayout, {
  type DetailPageLayoutProps,
} from '@/components/organisms/DetailPageLayout/DetailPageLayout';
import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';
import { LOADING_MESSAGES } from '@/constants';

/* =====================
 * Props
 ====================== */
interface ProductDetailTemProps {
  categorySections: CategoryPanelSection[];
  detailPageProps: DetailPageLayoutProps;
  isLoading?: boolean;
  hasProduct?: boolean;
}

/* =====================
 * ProductDetailTem
 ====================== */
const ProductDetailTem = ({
  categorySections,
  detailPageProps,
  isLoading = false,
  hasProduct = true,
}: ProductDetailTemProps) => {
  const { breadcrumbItems } = detailPageProps;

  const initialSelectedCategory = useMemo(() => {
    if (!breadcrumbItems || breadcrumbItems.length === 0) {
      return null;
    }

    const lastLabel = breadcrumbItems[breadcrumbItems.length - 1]?.label;
    if (!lastLabel) {
      return null;
    }

    const matchedOption = categorySections
      .flatMap((section) => section.options)
      .find((option) => option.label === lastLabel);

    return matchedOption ? matchedOption.value : null;
  }, [breadcrumbItems, categorySections]);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(initialSelectedCategory);

  const handleCategoryChange = (value: number | null) => {
    setSelectedCategory(value);

    if (value !== null) {
      // router.push(...) 등
    }
  };

  // 로딩 중일 때는 로딩 메시지만 표시
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>{LOADING_MESSAGES.DEFAULT}</p>
      </div>
    );
  }

  // product가 없을 때는 "등록된 상품이 없습니다" 메시지 표시
  if (!hasProduct) {
    return (
      <div className="flex justify-center w-full desktop:mt-80">
        <div className="w-327 tablet:w-696 desktop:w-1400">
          <div className="flex flex-col tablet:flex-row items-start gap-20 desktop:gap-40">
            <CategoryPanel
              sections={categorySections}
              selectedValue={selectedCategory}
              onChange={handleCategoryChange}
            />
            <div className="flex items-center justify-center w-full h-522 tablet:h-604 desktop:h-938">
              <StatusNotice
                title="등록된 상품이 없습니다"
                description="상품을 등록하면\n여기에 표시됩니다."
                hideButton
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full desktop:mt-80">
      <div className="w-327 tablet:w-696 desktop:w-1400">
        <div className="flex flex-col tablet:flex-row items-start gap-20 desktop:gap-40">
          <CategoryPanel
            sections={categorySections}
            selectedValue={selectedCategory}
            onChange={handleCategoryChange}
          />

          <div className="shrink-0">
            <DetailPageLayout
              breadcrumbItems={detailPageProps.breadcrumbItems}
              productImage={detailPageProps.productImage}
              accordionPanels={detailPageProps.accordionPanels}
              className={detailPageProps.className}
              productDetailHeader={detailPageProps.productDetailHeader}
              liked={detailPageProps.liked}
              onToggleLike={detailPageProps.onToggleLike}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTem;

'use client';

import { useMemo, useState } from 'react';

import {
  CategoryPanel,
  type CategoryPanelSection,
} from '@/components/organisms/CategoryPanel/CategoryPanel';

import DetailPageLayout, {
  type DetailPageLayoutProps,
} from '@/components/organisms/DetailPageLayout/DetailPageLayout';

/* =====================
 * Props
 ====================== */
interface ProductDetailTemProps {
  categorySections: CategoryPanelSection[];
  detailPageProps: DetailPageLayoutProps;
  headerType?: 'default' | 'simple';
}

/* =====================
 * ProductDetailTem
 ====================== */
const ProductDetailTem = ({
  categorySections,
  detailPageProps,
  headerType = 'default',
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
              productDetailHeader={{
                ...detailPageProps.productDetailHeader,
                type: headerType,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailTem;

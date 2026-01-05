'use client';

import { useMemo } from 'react';
import { useRouter, useParams } from 'next/navigation';

import {
  CategoryPanel,
  type CategoryPanelSection,
} from '@/components/organisms/CategoryPanel/CategoryPanel';

import DetailPageLayout, {
  type DetailPageLayoutProps,
} from '@/components/organisms/DetailPageLayout/DetailPageLayout';
import StatusNotice from '@/components/molecules/StatusNotice/StatusNotice';
import { LOADING_MESSAGES } from '@/constants';
import { getChildById } from '@/constants/categories/categories.utils';

/* =====================
 * Props
 ====================== */
interface ProductDetailTemProps {
  categorySections: CategoryPanelSection[];
  detailPageProps: DetailPageLayoutProps;
  isLoading?: boolean;
  hasProduct?: boolean;
  productCategoryId?: number | null; // 상품의 소분류 ID
}

/* =====================
 * ProductDetailTem
 ====================== */
const ProductDetailTem = ({
  categorySections,
  detailPageProps,
  isLoading = false,
  hasProduct = true,
  productCategoryId = null,
}: ProductDetailTemProps) => {
  const router = useRouter();
  const params = useParams();
  const companyId = params?.companyId ? String(params.companyId) : '';

  // 상품의 대분류 ID 찾기
  const activeSectionId = useMemo(() => {
    if (!productCategoryId) return null;
    const childCategory = getChildById(productCategoryId);
    return childCategory?.parentId ?? null;
  }, [productCategoryId]);

  const handleCategoryChange = (value: number | null) => {
    if (value !== null && companyId) {
      // 다른 소분류 클릭 시 상품 페이지로 이동
      router.push(`/${companyId}/products?categoryId=${value}`);
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
      <div className="flex justify-center w-full tablet:mt-10 desktop:mt-80">
        <div className="w-327 tablet:w-696 desktop:w-1400">
          <div className="flex flex-col tablet:flex-row items-start gap-20 desktop:gap-40">
            <CategoryPanel
              sections={categorySections}
              activeSectionId={activeSectionId}
              selectedValue={
                typeof productCategoryId === 'string'
                  ? Number(productCategoryId)
                  : productCategoryId
              }
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
    <div className="flex justify-center w-full tablet:mt-10 desktop:mt-80">
      <div className="w-327 tablet:w-696 desktop:w-1400">
        <div className="flex flex-col tablet:flex-row items-start gap-20 desktop:gap-40">
          <CategoryPanel
            sections={categorySections}
            activeSectionId={activeSectionId}
            selectedValue={
              typeof productCategoryId === 'string' ? Number(productCategoryId) : productCategoryId
            }
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

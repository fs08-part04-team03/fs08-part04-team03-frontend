'use client';

import { useMemo, useState } from 'react';
import {
  CategoryPanel,
  type CategoryPanelSection,
} from '@/components/organisms/CategoryPanel/CategoryPanel';
import DetailPageLayout, {
  type DetailPageLayoutProps,
} from '@/components/organisms/DetailPageLayout/DetailPageLayout';
import ProductEditModal from '@/components/molecules/ProductEditModal/ProductEditModal';
import CustomModal from '@/components/molecules/CustomModal/CustomModal';
import { Option } from '@/components/atoms/DropDown/DropDown';

/* =====================
 * Props
 ====================== */
interface MyProductDetailTemProps {
  categorySections: CategoryPanelSection[];
  detailPageProps: DetailPageLayoutProps;
  headerType?: 'default' | 'simple';
}

/* =====================
 * Mock categories
 ====================== */
const categories: Option[] = [
  { key: '1', label: '스낵' },
  { key: '2', label: '음료' },
  { key: '3', label: '생수' },
  { key: '4', label: '간편식' },
  { key: '5', label: '신선식' },
  { key: '6', label: '원두커피' },
  { key: '7', label: '비품' },
];

const subCategories: Option[] = [
  { key: 'snack-snack', label: '과자' },
  { key: 'snack-cookie', label: '쿠키' },
  { key: 'snack-biscuit', label: '비스켓류' },
  { key: 'snack-chocolate', label: '초콜릿류' },
  { key: 'snack-candy', label: '캔디류' },
  { key: 'snack-jelly', label: '젤리류' },
  { key: 'snack-cereal-bar', label: '시리얼바' },
  { key: 'snack-nuts', label: '견과류' },
  { key: 'drink-soda', label: '탄산음료' },
  { key: 'drink-fruit', label: '과즙음료' },
  { key: 'drink-energy', label: '에너지음료' },
  { key: 'drink-ion', label: '이온음료' },
  { key: 'drink-health', label: '건강음료' },
  { key: 'drink-tea', label: '차류' },
  { key: 'water-water', label: '생수' },
  { key: 'water-sparkling', label: '스파클링' },
  { key: 'simple-cup-ramen', label: '컵라면' },
  { key: 'simple-sausage', label: '소시지' },
  { key: 'simple-egg', label: '계란' },
  { key: 'simple-cup-rice', label: '컵밥류' },
  { key: 'simple-cereal', label: '시리얼' },
  { key: 'fresh-fruit', label: '과일' },
  { key: 'fresh-salad', label: '샐러드' },
  { key: 'fresh-bread', label: '빵' },
  { key: 'fresh-sandwich', label: '샌드위치' },
  { key: 'fresh-yogurt', label: '요거트류' },
  { key: 'fresh-dairy', label: '유제품' },
  { key: 'coffee-drip', label: '드립커피' },
  { key: 'coffee-beans', label: '원두' },
  { key: 'coffee-capsule', label: '캡슐커피' },
  { key: 'supplies-disposable', label: '일회용품' },
  { key: 'supplies-office', label: '사무용품' },
  { key: 'supplies-cleaning', label: '청소용품' },
  { key: 'supplies-hygiene', label: '위생용품' },
];

/* =====================
 * MyProductDetailTem
 ====================== */
const MyProductDetailTem = ({
  categorySections,
  detailPageProps,
  headerType = 'default',
}: MyProductDetailTemProps) => {
  const initialSelectedCategory = useMemo(() => {
    const lastLabel =
      detailPageProps.breadcrumbItems?.[detailPageProps.breadcrumbItems.length - 1]?.label;

    if (!lastLabel) return null;

    return (
      categorySections
        .flatMap((section) => section.options)
        .find((option) => option.label === lastLabel)?.value ?? null
    );
  }, [categorySections, detailPageProps.breadcrumbItems]);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(initialSelectedCategory);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const initialCategoryOption = useMemo(() => {
    const label = detailPageProps.breadcrumbItems?.[0]?.label;
    return categories.find((cat) => cat.label === label) ?? null;
  }, [detailPageProps.breadcrumbItems]);

  const initialSubCategoryOption = useMemo(() => {
    const label = detailPageProps.breadcrumbItems?.[1]?.label;
    return subCategories.find((sub) => sub.label === label) ?? null;
  }, [detailPageProps.breadcrumbItems]);

  return (
    <div className="flex justify-center w-full desktop:mt-80">
      <div className="w-327 tablet:w-696 desktop:w-1400">
        <div className="flex flex-col tablet:flex-row items-start gap-20 desktop:gap-40">
          <CategoryPanel
            sections={categorySections}
            selectedValue={selectedCategory}
            onChange={setSelectedCategory}
          />

          <div className="shrink-0 relative">
            <DetailPageLayout
              breadcrumbItems={detailPageProps.breadcrumbItems}
              productImage={detailPageProps.productImage}
              productDetailHeader={{
                productName: detailPageProps.productDetailHeader.productName,
                price: detailPageProps.productDetailHeader.price,
                purchaseCount: detailPageProps.productDetailHeader.purchaseCount,
                type: headerType,
                onMenuClick: (action) => {
                  if (action === 'edit') setEditModalOpen(true);
                  if (action === 'delete') setDeleteModalOpen(true);
                },
              }}
            />
          </div>
        </div>
      </div>

      <ProductEditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={() => {
          console.log('상품 수정 완료');
          setEditModalOpen(false);
        }}
        initialName={detailPageProps.productDetailHeader.productName}
        initialPrice={String(detailPageProps.productDetailHeader.price)}
        initialLink=""
        initialImage={detailPageProps.productImage?.src ?? null}
        initialCategory={initialCategoryOption}
        initialSubCategory={initialSubCategoryOption}
      />

      <CustomModal
        open={deleteModalOpen}
        type="delete"
        productName={detailPageProps.productDetailHeader.productName}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          console.log('상품 삭제 완료');
          setDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default MyProductDetailTem;

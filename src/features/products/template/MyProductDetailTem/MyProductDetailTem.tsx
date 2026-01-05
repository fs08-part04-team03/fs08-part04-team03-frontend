'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import {
  CategoryPanel,
  type CategoryPanelSection,
} from '@/components/organisms/CategoryPanel/CategoryPanel';
import DetailPageLayout, {
  type DetailPageLayoutProps,
} from '@/components/organisms/DetailPageLayout/DetailPageLayout';
import ProductEditModal, {
  type ProductEditFormData,
} from '@/components/molecules/ProductEditModal/ProductEditModal';
import CustomModal from '@/components/molecules/CustomModal/CustomModal';
import { Option } from '@/components/atoms/DropDown/DropDown';
import {
  updateMyProduct,
  deleteMyProduct,
  type GetRegisteredProductsResponse,
  type GetAllProductsResponse,
} from '@/features/products/api/products.api';
import { useToast } from '@/hooks/useToast';

/* =====================
 * Props
 * ====================== */
interface MyProductDetailTemProps {
  categorySections: CategoryPanelSection[];
  detailPageProps: DetailPageLayoutProps;
  productId: string;
  companyId: string;
  canUseMenu: boolean;
}

/* =====================
 * Mock categories
 * ====================== */
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
 * ====================== */
const MyProductDetailTem = ({
  categorySections,
  detailPageProps,
  productId,
  companyId,
  canUseMenu,
}: MyProductDetailTemProps) => {
  // type을 전달하지 않으면 ProductDetailHeader에서 역할에 따라 자동 결정
  // canUseMenu는 이미 MyProductDetailSection에서 계산되어 전달됨

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

  const router = useRouter();
  const queryClient = useQueryClient();
  const { triggerToast } = useToast();

  const initialCategoryOption = useMemo(() => {
    const label = detailPageProps.breadcrumbItems?.[0]?.label;
    return categories.find((cat) => cat.label === label) ?? null;
  }, [detailPageProps.breadcrumbItems]);

  const initialSubCategoryOption = useMemo(() => {
    const label = detailPageProps.breadcrumbItems?.[1]?.label;
    return subCategories.find((sub) => sub.label === label) ?? null;
  }, [detailPageProps.breadcrumbItems]);

  const initialLink = useMemo(() => {
    const linkPanel = detailPageProps.accordionPanels?.find((panel) => panel.id === 'link');
    if (!linkPanel || linkPanel.content === '링크 없음') {
      return '';
    }
    return typeof linkPanel.content === 'string' ? linkPanel.content : '';
  }, [detailPageProps.accordionPanels]);

  const handleEditSubmit = async (data: ProductEditFormData): Promise<void> => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await updateMyProduct(productId, data);
      triggerToast('success', '상품이 수정되었습니다.');
      // 상품 상세와 목록 모두 invalidate하여 최신 데이터 보장
      await queryClient.invalidateQueries({ queryKey: ['myProduct', productId] });
      await queryClient.invalidateQueries({ queryKey: ['myRegisteredProducts'] });
      // 일반 상품 목록도 invalidate하여 수정된 상품이 목록에 반영되도록 보장
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      setEditModalOpen(false);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '상품 수정에 실패했습니다.';
      triggerToast('error', message);
    }
  };

  const handleDeleteConfirm = async (): Promise<void> => {
    const deletedId = Number(productId);

    // Optimistic Update: 즉시 UI 업데이트
    await queryClient.cancelQueries({ queryKey: ['myRegisteredProducts'] });
    await queryClient.cancelQueries({ queryKey: ['products'] });
    const previousMyRegisteredData = queryClient.getQueriesData({
      queryKey: ['myRegisteredProducts'],
    });
    const previousProductsData = queryClient.getQueriesData({ queryKey: ['products'] });

    // 내가 등록한 상품 목록에서 삭제된 상품 제거
    queryClient.setQueriesData({ queryKey: ['myRegisteredProducts'] }, (old: unknown) => {
      if (!old || typeof old !== 'object') return old;
      const data = old as GetRegisteredProductsResponse;
      if (!data.products || !Array.isArray(data.products)) return old;
      return {
        ...data,
        products: data.products.filter((p) => p.id !== deletedId),
        totalItems: data.totalItems ? data.totalItems - 1 : 0,
      };
    });

    // 일반 상품 목록에서도 삭제된 상품 제거 (Optimistic Update)
    queryClient.setQueriesData({ queryKey: ['products'] }, (old: unknown) => {
      if (!old || typeof old !== 'object') return old;
      const data = old as GetAllProductsResponse;
      if (!data.data || !Array.isArray(data.data)) return old;
      return {
        ...data,
        data: data.data.filter((p) => p.id !== deletedId),
      };
    });

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      await deleteMyProduct(productId);
      triggerToast('success', '상품이 삭제되었습니다.');
      setDeleteModalOpen(false);
      // 서버와 재동기화: invalidate로 모든 관련 쿼리 무효화
      await queryClient.invalidateQueries({ queryKey: ['myRegisteredProducts'] });
      await queryClient.invalidateQueries({ queryKey: ['myProduct', productId] });
      // 일반 상품 목록도 invalidate하여 삭제된 상품이 목록에서 제거되도록 보장
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      // 리다이렉트 후 페이지가 마운트될 때 쿼리가 활성화되면 자동으로 refetch됨
      router.push(`/${companyId}/products/my`);
    } catch (err: unknown) {
      // 실패 시 이전 상태로 롤백
      previousMyRegisteredData.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      previousProductsData.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data);
      });
      const message = err instanceof Error ? err.message : '상품 삭제에 실패했습니다.';
      triggerToast('error', message);
    }
  };

  return (
    <div className="flex justify-center w-full tablet:mt-10 desktop:mt-80">
      <div className="w-327 tablet:w-696 desktop:w-1400">
        <div className="flex flex-col tablet:flex-row items-start gap-20 desktop:gap-40">
          <CategoryPanel
            sections={categorySections}
            selectedValue={
              typeof selectedCategory === 'string' ? Number(selectedCategory) : selectedCategory
            }
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
                // type을 전달하지 않으면 ProductDetailHeader에서 역할에 따라 자동 결정
                type: undefined,
                onMenuClick: canUseMenu
                  ? (action) => {
                      if (action === 'edit') setEditModalOpen(true);
                      if (action === 'delete') setDeleteModalOpen(true);
                    }
                  : undefined,
              }}
              liked={detailPageProps.liked}
              onToggleLike={detailPageProps.onToggleLike}
            />
          </div>
        </div>
      </div>

      <ProductEditModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSubmit={handleEditSubmit}
        initialName={detailPageProps.productDetailHeader.productName}
        initialPrice={String(detailPageProps.productDetailHeader.price)}
        initialLink={initialLink}
        initialImage={detailPageProps.productImage?.src ?? null}
        initialCategory={initialCategoryOption}
        initialSubCategory={initialSubCategoryOption}
      />

      <CustomModal
        open={deleteModalOpen}
        type="delete"
        productName={detailPageProps.productDetailHeader.productName}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default MyProductDetailTem;

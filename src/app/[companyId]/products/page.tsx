import type { Metadata } from 'next';

import { AuthGuard } from '@/components/auth/AuthGuard';
import ProductListSection from '@/features/products/section/ProductListSection';

export const metadata: Metadata = {
  title: '상품 목록',
  description:
    '다양한 간식과 음료를 확인하세요. 카테고리별 필터링, 검색 기능으로 원하는 상품을 쉽게 찾고, 위시리스트와 장바구니에 담아보세요.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'SNACK | 상품 목록',
    description:
      '다양한 간식과 음료를 확인하세요. 카테고리별 필터링, 검색 기능으로 원하는 상품을 쉽게 찾고, 위시리스트와 장바구니에 담아보세요.',
    type: 'website',
    siteName: 'SNACK',
  },
};

const ProductListPage = async ({
  params,
}: {
  params: { companyId: string } | Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <AuthGuard companyId={companyId}>
      <ProductListSection companyId={companyId} />
    </AuthGuard>
  );
};

export default ProductListPage;

import type { Metadata } from 'next';

import { AuthGuard } from '@/components/auth/AuthGuard';
import ProductListSection from '@/features/products/section/ProductListSection';

export const metadata: Metadata = {
  title: '상품 관리',
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

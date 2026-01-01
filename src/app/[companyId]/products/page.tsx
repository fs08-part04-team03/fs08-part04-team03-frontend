import { AuthGuard } from '@/components/auth/AuthGuard';
import ProductListSection from '@/features/products/section/ProductListSection';

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

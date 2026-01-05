import type { Metadata } from 'next';
import ProductDetailSection from '@/features/products/section/ProductDetailSection';

export const metadata: Metadata = {
  title: '상품 상세',
};

const ProductDetailPage = () => <ProductDetailSection />;

export default ProductDetailPage;

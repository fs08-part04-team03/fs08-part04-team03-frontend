import type { Metadata } from 'next';
import MyProductDetailSection from '@/features/products/section/MyProductDetailSection';

export const metadata: Metadata = {
  title: '내가 등록한 상품 상세',
  robots: {
    index: true,
    follow: true,
  },
};

const MyProductDetailPage = () => <MyProductDetailSection />;

export default MyProductDetailPage;

import type { Metadata } from 'next';

import MyRegisteredSection from '@/features/products/section/MyRegisteredSection';

export const metadata: Metadata = {
  title: '내가 등록한 상품',
  description: '내가 등록한 상품 목록을 확인하세요.',
  robots: {
    index: true,
    follow: true,
  },
};

const MyProductListPage = () => <MyRegisteredSection />;

export default MyProductListPage;

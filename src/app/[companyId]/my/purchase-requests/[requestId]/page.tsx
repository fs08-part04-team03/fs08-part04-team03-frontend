// 내 구매 요청 상세 페이지
import type { Metadata } from 'next';

import MyPurchaseRequestDetailSection from '@/features/purchase/section/MyPurchaseRequestDetailSection';

export const metadata: Metadata = {
  title: '내 구매 요청 상세',
  description: '내 구매 요청 상세 정보를 확인하세요.',
  robots: {
    index: true,
    follow: true,
  },
};

const MyPurchaseRequestDetailPage = () => <MyPurchaseRequestDetailSection />;

export default MyPurchaseRequestDetailPage;

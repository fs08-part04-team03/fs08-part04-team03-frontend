// 내 구매 요청 목록 페이지
import type { Metadata } from 'next';

import MyPurchaseRequestListSection from '@/features/purchase/section/MyPurchaseRequestListSection';

export const metadata: Metadata = {
  title: '내 구매 요청',
  description: '내 구매 요청 내역을 확인하세요.',
  robots: { index: true, follow: true },
  openGraph: {
    title: 'SNACK | 내 구매 요청',
    description: '내 구매 요청 내역을 확인하세요.',
    type: 'website',
    siteName: 'SNACK',
  },
};

const PurchaseRequestsPage = () => <MyPurchaseRequestListSection />;

export default PurchaseRequestsPage;

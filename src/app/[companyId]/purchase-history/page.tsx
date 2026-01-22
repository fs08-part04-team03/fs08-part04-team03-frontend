import type { Metadata } from 'next';

import { RoleGuard } from '@/components/guards/RoleGuard';
import PurchaseHistorySection from '@/features/purchase-history/section/PurchaseHistorySection';
import { PAGE_KEYWORDS } from '@/lib/metadata';

export const metadata: Metadata = {
  title: '구매 내역',
  description: '구매 내역을 확인하고 과거 주문 기록을 관리하세요.',
  keywords: PAGE_KEYWORDS.purchaseHistory.join(', '),
  robots: { index: true, follow: true },
  openGraph: {
    title: 'SNACK | 구매 내역',
    description: '구매 내역을 확인하고 과거 주문 기록을 관리하세요.',
    type: 'website',
    siteName: 'SNACK',
  },
};

const PurchaseHistoryPage = () => (
  <RoleGuard requiredRole="manager">
    <PurchaseHistorySection />
  </RoleGuard>
);

export default PurchaseHistoryPage;

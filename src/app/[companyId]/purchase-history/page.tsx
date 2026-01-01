import type { Metadata } from 'next';

import { RoleGuard } from '@/components/guards/RoleGuard';
import PurchaseHistorySection from '@/features/purchase-history/section/PurchaseHistorySection';

export const metadata: Metadata = {
  title: '구매 내역',
};

const PurchaseHistoryPage = () => (
  <RoleGuard requiredRole="manager">
    <PurchaseHistorySection />
  </RoleGuard>
);

export default PurchaseHistoryPage;

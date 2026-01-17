import { RoleGuard } from '@/components/guards/RoleGuard';
import PurchaseHistorySection from '@/features/purchase-history/section/PurchaseHistorySection';
import { buildPageMetadata, PAGE_KEYWORDS } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: '구매 내역',
  description: '구매 내역을 확인하고 과거 주문 기록을 관리하세요.',
  path: '/purchase-history',
  keywords: PAGE_KEYWORDS.purchaseHistory,
});

const PurchaseHistoryPage = () => (
  <RoleGuard requiredRole="manager">
    <PurchaseHistorySection />
  </RoleGuard>
);

export default PurchaseHistoryPage;

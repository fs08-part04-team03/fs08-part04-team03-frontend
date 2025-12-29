import { RoleGuard } from '@/components/guards/RoleGuard';
import PurchaseHistorySection from '@/features/purchase-history/section/PurchaseHistorySection';

const PurchaseHistoryPage = () => (
  <RoleGuard requiredRole="manager">
    <PurchaseHistorySection />
  </RoleGuard>
);

export default PurchaseHistoryPage;

// 관리자/최고관리자 : 구매요청 관리 페이지

import { RoleGuard } from '@/components/guards/RoleGuard';
import PurchaseRequestListSection from '@/features/purchase/section/PurchaseRequestListSection';

const PurchaseRequestManagementPage = () => (
  <RoleGuard requiredRole="manager">
    <PurchaseRequestListSection />
  </RoleGuard>
);

export default PurchaseRequestManagementPage;

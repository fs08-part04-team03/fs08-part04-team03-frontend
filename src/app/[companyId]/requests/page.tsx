// 관리자/최고관리자 : 구매요청 관리 페이지
import type { Metadata } from 'next';

import { RoleGuard } from '@/components/guards/RoleGuard';
import PurchaseRequestListSection from '@/features/purchase/section/PurchaseRequestListSection';

export const metadata: Metadata = {
  title: '구매 요청 관리',
};

const PurchaseRequestManagementPage = () => (
  <RoleGuard requiredRole="manager">
    <PurchaseRequestListSection />
  </RoleGuard>
);

export default PurchaseRequestManagementPage;

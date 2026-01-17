// 관리자/최고관리자 : 구매요청 관리 페이지
import { RoleGuard } from '@/components/guards/RoleGuard';
import PurchaseRequestListSection from '@/features/purchase/section/PurchaseRequestListSection';
import { buildPageMetadata, PAGE_KEYWORDS } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: '구매 요청 관리',
  description: '팀원들의 구매 요청을 확인하고 승인/거절할 수 있습니다.',
  path: '/requests',
  keywords: PAGE_KEYWORDS.purchaseRequest,
});

const PurchaseRequestManagementPage = () => (
  <RoleGuard requiredRole="manager">
    <PurchaseRequestListSection />
  </RoleGuard>
);

export default PurchaseRequestManagementPage;

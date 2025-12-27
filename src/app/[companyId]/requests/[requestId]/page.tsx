// 구매요청 관리 디테일 페이지 : 관리자 최고관리자만 들어올수 있는 페이지
import RoleGuard from '@/components/guards/RoleGuard';
import PurchaseRequestDetailSection from '@/features/purchase/section/PurchaseRequestDetailSection';

const PurchaseRequestDetailPage = () => (
  <div>
    <RoleGuard requiredRole="manager">
      <PurchaseRequestDetailSection />
    </RoleGuard>
  </div>
);

export default PurchaseRequestDetailPage;

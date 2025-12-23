// 관리자: 구매 요청 관리 페이지

import { RoleGuard } from '@/components/guards/RoleGuard';

const PurchaseRequestFormPage = () => (
  <RoleGuard requiredRole="user">
    <div>
      <p>PurchaseRequestFormPage — 구매요청 페이지 (유저만 있는 페이지)</p>
    </div>
  </RoleGuard>
);

export default PurchaseRequestFormPage;

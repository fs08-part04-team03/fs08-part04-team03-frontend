// 사용자: 구매 요청 페이지
import type { Metadata } from 'next';

import { RoleGuard } from '@/components/guards/RoleGuard';

export const metadata: Metadata = {
  title: '구매 요청',
};

const PurchaseRequestFormPage = () => (
  <RoleGuard requiredRole="user">
    <div>
      <p>PurchaseRequestFormPage — 구매요청 페이지 (유저만 있는 페이지)</p>
    </div>
  </RoleGuard>
);

export default PurchaseRequestFormPage;

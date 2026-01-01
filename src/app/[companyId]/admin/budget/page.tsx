import type { Metadata } from 'next';

import AdminBudgetSection from '@/features/admin/budget/section/AdminBudgetSection';

export const metadata: Metadata = {
  title: '예산 관리',
};

// 어드민 - 예산 관리 페이지
const BudgetManagementPage = () => (
  <div>
    <AdminBudgetSection />
  </div>
);

export default BudgetManagementPage;

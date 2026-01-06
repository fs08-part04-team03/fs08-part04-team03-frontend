import type { Metadata } from 'next';

import AdminBudgetSection from '@/features/admin/budget/section/AdminBudgetSection';

export const metadata: Metadata = {
  title: 'SNACK 관리자 - 예산 관리',
  description: '회사 간식 예산 현황을 파악하고 효율적으로 예산을 관리하세요.',
};

// 어드민 - 예산 관리 페이지
const BudgetManagementPage = () => (
  <div>
    <AdminBudgetSection />
  </div>
);

export default BudgetManagementPage;

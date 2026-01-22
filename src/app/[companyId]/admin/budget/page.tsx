import type { Metadata } from 'next';

import AdminBudgetSection from '@/features/admin/budget/section/AdminBudgetSection';
import { PAGE_KEYWORDS } from '@/lib/metadata';

export const metadata: Metadata = {
  title: '예산 관리',
  description: '간식 예산 현황을 파악하고 효율적으로 예산을 관리하세요.',
  keywords: PAGE_KEYWORDS.budget.join(', '),
  robots: { index: true, follow: true },
  openGraph: {
    title: 'SNACK | 예산 관리',
    description: '간식 예산 현황을 파악하고 효율적으로 예산을 관리하세요.',
    type: 'website',
    siteName: 'SNACK',
  },
};

// 어드민 - 예산 관리 페이지
const BudgetManagementPage = () => (
  <div>
    <AdminBudgetSection />
  </div>
);

export default BudgetManagementPage;

import AdminBudgetSection from '@/features/admin/budget/section/AdminBudgetSection';
import { buildPageMetadata, PAGE_KEYWORDS } from '@/lib/metadata';

export const metadata = buildPageMetadata({
  title: '예산 관리',
  description: '회사 간식 예산 현황을 파악하고 효율적으로 예산을 관리하세요.',
  path: '/admin/budget',
  keywords: PAGE_KEYWORDS.dashboard,
});

// 어드민 - 예산 관리 페이지
const BudgetManagementPage = () => (
  <div>
    <AdminBudgetSection />
  </div>
);

export default BudgetManagementPage;

import type { Metadata } from 'next';

import DashboardSection from '@/features/dashboard/section/DashboardSection';

export const metadata: Metadata = {
  title: 'SNACK - Dashboard',
  description: '회사 간식 대시보드 - 구매 현황과 예산 관리를 한눈에 확인하세요.',
};

// 대시보드 페이지
const DashboardPage = ({ params }: { params: { companyId: string } }) => (
  <div>
    <DashboardSection companyId={params.companyId} />
  </div>
);

export default DashboardPage;

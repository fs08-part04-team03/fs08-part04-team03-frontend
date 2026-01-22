import type { Metadata } from 'next';

import DashboardSection from '@/features/dashboard/section/DashboardSection';
import { PAGE_KEYWORDS } from '@/lib/metadata';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: '회사 간식 대시보드. 구매 현황과 예산 관리를 한눈에 확인하세요.',
  keywords: PAGE_KEYWORDS.dashboard.join(', '),
  robots: { index: true, follow: true },
  openGraph: {
    title: 'SNACK | Dashboard',
    description: '회사 간식 대시보드. 구매 현황과 예산 관리를 한눈에 확인하세요.',
    type: 'website',
    siteName: 'SNACK',
  },
};

// 대시보드 페이지
const DashboardPage = async ({ params }: { params: Promise<{ companyId: string }> }) => {
  const { companyId } = await params;
  return (
    <div>
      <DashboardSection companyId={companyId} />
    </div>
  );
};

export default DashboardPage;

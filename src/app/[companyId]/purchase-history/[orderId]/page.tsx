import type { Metadata } from 'next';

import { RoleGuard } from '@/components/guards/RoleGuard';
import PurchaseHistoryDetailSection from '@/features/purchase-history/section/PurchaseHistoryDetailSection';

export const metadata: Metadata = {
  title: '구매 내역 상세',
  robots: {
    index: true,
    follow: true,
  },
};

interface PurchaseHistoryDetailPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

const PurchaseHistoryDetailPage = async ({ params }: PurchaseHistoryDetailPageProps) => {
  const { orderId } = await params;
  return (
    <RoleGuard requiredRole="manager">
      <PurchaseHistoryDetailSection orderId={orderId} />
    </RoleGuard>
  );
};

export default PurchaseHistoryDetailPage;

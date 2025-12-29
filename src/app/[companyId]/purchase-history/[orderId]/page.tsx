import { RoleGuard } from '@/components/guards/RoleGuard';
import PurchaseHistoryDetailSection from '@/features/purchase-history/section/PurchaseHistoryDetailSection';

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

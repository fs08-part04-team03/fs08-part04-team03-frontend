import { RoleGuard } from '@/components/guards/RoleGuard';
import PurchaseHistoryDetailSection from '@/features/purchase-history/section/PurchaseHistoryDetailSection';

interface PurchaseHistoryDetailPageProps {
  params: {
    orderId: string;
  };
}

const PurchaseHistoryDetailPage = ({ params }: PurchaseHistoryDetailPageProps) => (
  <RoleGuard requiredRole="manager">
    <PurchaseHistoryDetailSection orderId={params.orderId} />
  </RoleGuard>
);

export default PurchaseHistoryDetailPage;

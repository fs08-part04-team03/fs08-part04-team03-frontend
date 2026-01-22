import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import OrderConfirmedSection from '@/features/cart/section/OrderConfirmedSection';

export const metadata: Metadata = {
  title: '구매 요청 완료',
  robots: {
    index: false,
    follow: false,
  },
};

interface PurchaseRequestCompletedPageProps {
  params: Promise<{ companyId: string }>;
  searchParams: Promise<{ id?: string }>;
}

const PurchaseRequestCompletedPage = async ({
  params,
  searchParams,
}: PurchaseRequestCompletedPageProps) => {
  const { companyId } = await params;
  const { id } = await searchParams;

  // purchase ID가 없으면 구매 요청 목록으로 리다이렉트
  if (!id) {
    redirect(`/${companyId}/my/purchase-requests`);
  }

  return <OrderConfirmedSection id={id} />;
};

export default PurchaseRequestCompletedPage;

// 내 구매 요청 목록 페이지
import type { Metadata } from 'next';

import MyPurchaseRequestListSection from '@/features/purchase/section/MyPurchaseRequestListSection';
import { fetchCompanyForMetadata, fetchUserForMetadata } from '@/lib/metadata-helpers';

export async function generateMetadata(): Promise<Metadata> {
  const [company, user] = await Promise.all([fetchCompanyForMetadata(), fetchUserForMetadata()]);

  const userName = user?.name || '사용자';
  const title = `${userName}의 구매 요청`;

  return {
    title,
    description: `${company.name} - ${userName}님의 구매 요청 내역을 확인하세요.`,
  };
}

const PurchaseRequestsPage = () => <MyPurchaseRequestListSection />;

export default PurchaseRequestsPage;

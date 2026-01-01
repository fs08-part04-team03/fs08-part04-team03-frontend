// 내 구매 요청 상세 페이지
import type { Metadata } from 'next';

import MyPurchaseRequestDetailSection from '@/features/purchase/section/MyPurchaseRequestDetailSection';
import {
  fetchCompanyForMetadata,
  fetchUserForMetadata,
} from '@/lib/metadata-helpers';

export async function generateMetadata(): Promise<Metadata> {
  const [company, user] = await Promise.all([
    fetchCompanyForMetadata(),
    fetchUserForMetadata(),
  ]);

  const userName = user?.name || '사용자';
  const title = `${userName}의 구매 요청 상세`;

  return {
    title,
    description: `${company.name} - ${userName}님의 구매 요청 상세 정보를 확인하세요.`,
  };
}

const MyPurchaseRequestDetailPage = () => <MyPurchaseRequestDetailSection />;

export default MyPurchaseRequestDetailPage;

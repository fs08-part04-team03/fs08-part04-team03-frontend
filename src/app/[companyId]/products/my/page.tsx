import type { Metadata } from 'next';

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
  const title = `${userName}의 등록 상품`;

  return {
    title,
    description: `${company.name} - ${userName}님이 등록한 상품 목록을 확인하세요.`,
  };
}

const MyProductListPage = () => (
  <div>
    <p>MyProductListPage — 내가 등록한 상품 페이지</p>
  </div>
);

export default MyProductListPage;

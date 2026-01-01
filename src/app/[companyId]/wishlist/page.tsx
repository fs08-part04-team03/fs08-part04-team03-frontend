import type { Metadata } from 'next';

import { fetchCompanyForMetadata, fetchUserForMetadata } from '@/lib/metadata-helpers';

export async function generateMetadata(): Promise<Metadata> {
  const [company, user] = await Promise.all([fetchCompanyForMetadata(), fetchUserForMetadata()]);

  const userName = user?.name || '사용자';
  const title = `${userName}의 위시리스트`;

  return {
    title,
    description: `${company.name} - ${userName}님의 위시리스트를 확인하세요.`,
  };
}

const WishlistPage = () => (
  <div>
    <p>WishlistPage — 위시리스트 (백엔드 확인 필요)</p>
  </div>
);

export default WishlistPage;

import type { Metadata } from 'next';

import { fetchCompanyForMetadata, fetchUserForMetadata } from '@/lib/metadata-helpers';
import ShoppingCartSection from '@/features/cart/section/ShoppingCartSection';

export async function generateMetadata(): Promise<Metadata> {
  try {
    const [company, user] = await Promise.all([fetchCompanyForMetadata(), fetchUserForMetadata()]);

    const userName = user?.name || '사용자';
    const companyName = company.name;
    const title = `${companyName} - 장바구니`;

    return {
      title,
      description: `${companyName} - ${userName}님의 장바구니를 확인하고 구매 요청을 진행하세요.`,
      openGraph: {
        title,
        description: `${companyName}의 장바구니 페이지입니다.`,
        type: 'website',
      },
    };
  } catch {
    // 폴백 메타데이터 반환
    return {
      title: '장바구니',
      description: '장바구니를 확인하고 구매 요청을 진행하세요.',
    };
  }
}

const CartPage = () => <ShoppingCartSection />;

export default CartPage;

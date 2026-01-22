import type { Metadata } from 'next';

import ShoppingCartSection from '@/features/cart/section/ShoppingCartSection';

export const metadata: Metadata = {
  title: '장바구니',
  description: '장바구니를 확인하고 구매 요청을 진행하세요.',
  robots: {
    index: false,
    nofollow: true,
  },
  openGraph: {
    title: 'SNACK | 장바구니',
    description: '장바구니를 확인하고 구매 요청을 진행하세요.',
    type: 'website',
    siteName: 'SNACK',
  },
};

const CartPage = () => <ShoppingCartSection />;

export default CartPage;

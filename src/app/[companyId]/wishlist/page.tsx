import type { Metadata } from 'next';

import WishlistSection from '@/features/wishlist/section/WishlistSection';

export const metadata: Metadata = {
  title: '내 위시리스트',
  description: '내 위시리스트를 확인하세요.',
  robots: {
    index: true,
    follow: true,
  },
};

const WishlistPage = () => <WishlistSection />;

export default WishlistPage;

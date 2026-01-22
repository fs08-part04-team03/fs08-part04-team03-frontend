import type { Metadata } from 'next';
import OrderSection from '@/features/cart/section/OrderSection';

export const metadata: Metadata = {
  title: '주문 확인',
  robots: {
    index: true,
    follow: true,
  },
};

const OrderPage = () => <OrderSection />;

export default OrderPage;

import type { Metadata } from 'next';
import OrderConfirmedSection from '@/features/cart/section/OrderConfirmedSection';

export const metadata: Metadata = {
  title: '주문 완료',
  robots: {
    index: true,
    follow: true,
  },
};

const OrderCompletedPage = () => <OrderConfirmedSection />;

export default OrderCompletedPage;

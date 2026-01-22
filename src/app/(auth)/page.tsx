import { Metadata } from 'next';
import Landing from '@/features/landing/section/Landing';

export const metadata: Metadata = {
  title: 'SNACK - 기업 간식 통합 관리',
  description: '구매부터 정산까지 한 번에 관리하는 스마트한 기업 간식 솔루션',
  robots: {
    index: true,
    follow: true,
  },
};

const Home = () => <Landing />;

export default Home;

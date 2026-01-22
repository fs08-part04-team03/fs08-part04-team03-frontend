import { Metadata } from 'next';

import AuthHeader from '@/components/organisms/AuthHeader/AuthHeader';

export const metadata: Metadata = {
  title: {
    template: 'SNACK - %s',
    default: 'SNACK - 로그인',
  },
  description:
    'SNACK에 로그인하여 회사 간식 구매를 관리하세요. 구매 요청, 예산 관리, 구매 내역 조회까지 한 번에.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'SNACK - 기업 간식 통합 관리',
    description:
      'SNACK에 로그인하여 회사 간식 구매를 관리하세요. 구매 요청, 예산 관리, 구매 내역 조회까지 한 번에.',
    type: 'website',
    siteName: 'SNACK',
  },
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <AuthHeader />
    {children}
  </>
);

export default AuthLayout;

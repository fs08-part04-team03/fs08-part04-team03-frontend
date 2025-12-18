import type { Metadata } from 'next';
import HeaderShell from '@/components/organisms/HeaderShell/HeaderShell';
import { Providers } from './providers';
import './globals.css';
import { suit } from './fonts';

export const metadata: Metadata = {
  title: `SNACK - 회사 간식 구매 관리 솔루션`,
  description:
    '여러 플랫폼에서 구매한 간식 내역을 한 곳에서 통합 관리할 수 있는 B2B 간식 관리 솔루션입니다. 구매 기록, 예산, 카테고리별 상품 데이터를 손쉽게 확인하세요.',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="ko">
    <body className={`${suit.variable} font-sans`}>
      <Providers>
        <HeaderShell />
        {children}
      </Providers>
    </body>
  </html>
);

export default RootLayout;

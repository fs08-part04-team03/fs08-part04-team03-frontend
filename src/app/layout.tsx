import type { Metadata, Viewport } from 'next';
import { Providers } from './providers';
import './globals.css';
import { suit } from './fonts';

// ✅ 챗봇 컴포넌트 import
import ChatBot from '../components/chatbot/ChatBot';

export const metadata: Metadata = {
  title: {
    template: '%s | SNACK',
    default: 'SNACK - 회사 간식 구매 관리 솔루션',
  },
  description:
    '여러 플랫폼에서 구매한 간식 내역을 한 곳에서 통합 관리할 수 있는 B2B 간식 관리 솔루션입니다. 구매 기록, 예산, 카테고리별 상품 데이터를 손쉽게 확인하세요.',
  robots: {
    index: false,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="ko" suppressHydrationWarning>
    <head>
      {/* 성능 최적화: DNS prefetch 및 preconnect */}
      <link
        rel="preconnect"
        href="https://snack-store-bucket.s3.ap-northeast-2.amazonaws.com"
        crossOrigin="anonymous"
      />
      <link rel="dns-prefetch" href="https://snack-store-bucket.s3.ap-northeast-2.amazonaws.com" />
      <meta httpEquiv="x-dns-prefetch-control" content="on" />
    </head>

    <body className={`${suit.variable} font-sans`} suppressHydrationWarning>
      {/* 기존 전역 Provider */}
      <Providers>{children}</Providers>

      {/* ✅ 모든 페이지에서 항상 보이는 챗봇 */}
      <ChatBot />
    </body>
  </html>
);

export default RootLayout;

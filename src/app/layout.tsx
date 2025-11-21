import type { Metadata } from 'next';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'Project Name',
  description: '프로젝트 설명',
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <html lang="ko">
    <body>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;


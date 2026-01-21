// src/app/[companyId]/layout.tsx
import type { Metadata } from 'next';

import AuthGuard from '@/components/auth/AuthGuard';
import HeaderShell from '@/components/organisms/HeaderShell/HeaderShell';
import { CompanyProvider } from '@/lib/context/CompanyContext';
import { LAYOUT_SPACING } from '@/constants/layout';

export const dynamic = 'force-dynamic';

/**
 * companyId 스코프 전체에 적용되는 메타데이터 템플릿
 * - 하위 페이지에서 metadata.title = '상품관리'를 주면,
 *   `${companyName} · 상품관리 | SNACK`로 자동 조합됩니다.
 */
export function generateMetadata(): Metadata {
  // accessToken은 클라이언트(localStorage)에서만 관리하므로
  // 서버 컴포넌트의 metadata 단계에서 인증 기반 회사명 조회는 수행하지 않습니다.
  return {
    title: {
      template: `SNACK · %s | SNACK`,
      default: `SNACK | SNACK`,
    },
    description:
      '간식 구매 내역을 한 곳에서 통합 관리하세요. 구매 기록, 예산, 카테고리별 상품 데이터를 손쉽게 확인할 수 있습니다.',
  };
}

const CompanyLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <AuthGuard companyId={companyId}>
      <CompanyProvider>
        <HeaderShell />
        <main
          className={`container mx-auto px-16 tablet:px-24 desktop:max-w-1200 min-w-371 ${LAYOUT_SPACING.section.marginTop} ${LAYOUT_SPACING.section.marginBottom}`}
        >
          {children}
        </main>
      </CompanyProvider>
    </AuthGuard>
  );
};

export default CompanyLayout;

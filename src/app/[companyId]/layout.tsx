import type { Metadata } from 'next';
import AuthGuard from '@/components/auth/AuthGuard';

interface Company {
  name: string;
}

// 회사 정보 fetch 함수
function fetchCompanyById(): Company {
  // TODO: 백엔드 API는 인증 토큰이 필요하지만, 서버 컴포넌트에서는 쿠키 기반 인증 불가
  // 현재는 fallback 사용, 추후 클라이언트 컴포넌트로 변경하거나 별도 API 필요
  return { name: 'SNACK' }; // fallback
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ companyId: string }>;
}): Promise<Metadata> {
  await params; // params는 사용하지 않지만 Next.js 규칙상 받아야 함
  // 백엔드에서 회사 정보 가져오기
  const company = fetchCompanyById();

  return {
    title: `${company.name}의 SNACK - 회사 간식 구매 관리 솔루션`,
    description: `${company.name}의 간식 구매 내역을 한 곳에서 통합 관리하세요. 구매 기록, 예산, 카테고리별 상품 데이터를 손쉽게 확인할 수 있습니다`,
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
      <main className="container mx-auto">{children}</main>
    </AuthGuard>
  );
};

export default CompanyLayout;

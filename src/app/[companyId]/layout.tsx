// app/[companyId]/layout.tsx
import type { Metadata } from 'next';

interface Company {
  name: string;
}

// 👇 회사 정보 fetch 함수
async function fetchCompanyById(companyId: string): Promise<Company> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/companies/${companyId}`, {
    cache: 'force-cache', // 캐싱 전략
  });

  if (!res.ok) {
    return { name: 'SNACK' }; // fallback
  }

  return res.json() as Promise<Company>;
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: { companyId: string };
}): Promise<Metadata> {
  // 백엔드에서 회사 정보 가져오기
  const company = await fetchCompanyById(params.companyId);

  return {
    title: `${company.name}의 SNACK - 회사 간식 구매 관리 솔루션`,
    description: `${company.name}의 간식 구매 내역을 한 곳에서 통합 관리하세요. 구매 기록, 예산, 카테고리별 상품 데이터를 손쉽게 확인할 수 있습니다.`,
  };
}

const CompanyLayout = ({ children }: { children: React.ReactNode }) => (
  <main className="container mx-auto">{children}</main>
);

export default CompanyLayout;

import type { Metadata } from 'next';

interface Company {
  name: string;
}

// 회사 정보 fetch 함수
async function fetchCompanyById(companyId: string): Promise<Company> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/companies/${companyId}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    if (res.status === 404) {
      // eslint-disable-next-line no-console
      console.warn(`Company ${companyId} not found, using fallback`);
    } else {
      // eslint-disable-next-line no-console
      console.error(`Failed to fetch company ${companyId}: ${res.status} ${res.statusText}`);
    }
    return { name: 'SNACK' }; // fallback
  }

  return (await res.json()) as Company;
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ companyId: string }>;
}): Promise<Metadata> {
  const { companyId } = await params;
  // 백엔드에서 회사 정보 가져오기
  const company = await fetchCompanyById(companyId);

  return {
    title: `${company.name}의 SNACK - 회사 간식 구매 관리 솔루션`,
    description: `${company.name}의 간식 구매 내역을 한 곳에서 통합 관리하세요. 구매 기록, 예산, 카테고리별 상품 데이터를 손쉽게 확인할 수 있습니다`,
  };
}

const CompanyLayout = ({ children }: { children: React.ReactNode }) => (
  <main className="container mx-auto">{children}</main>
);

export default CompanyLayout;

import type { Metadata } from 'next';

import { AuthGuard } from '@/components/auth/AuthGuard';
import ProductListSection from '@/features/products/section/ProductListSection';
import { fetchCompanyForMetadata } from '@/lib/metadata-helpers';

export async function generateMetadata(): Promise<Metadata> {
  const baseTitle = '상품 목록';
  const baseDescription =
    '다양한 간식과 음료를 한눈에 확인하세요. 카테고리별 필터링, 검색 기능으로 원하는 상품을 쉽게 찾고, 위시리스트와 장바구니에 담아보세요.';

  const canonicalPath = '/products';

  const baseMetadata: Metadata = {
    title: baseTitle,
    description: baseDescription,

    alternates: {
      canonical: canonicalPath,
    },

    robots: {
      index: true,
      follow: true,
    },

    openGraph: {
      title: `SNACK - ${baseTitle}`,
      description: baseDescription,
      type: 'website',
      siteName: 'SNACK',
      url: canonicalPath,
      images: [
        {
          url: '/og/products.png',
          width: 1200,
          height: 630,
          alt: 'SNACK 상품 목록',
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: `SNACK - ${baseTitle}`,
      description: baseDescription,
      images: ['/og/products.png'],
    },
  };

  try {
    const company = await fetchCompanyForMetadata();
    const companyName = company?.name?.trim();

    if (companyName && companyName !== '회사') {
      const desc = `${companyName}의 상품 목록을 확인하고, 카테고리별로 필터링하거나 검색할 수 있습니다. 원하는 상품을 위시리스트에 추가하거나 장바구니에 담아보세요.`;

      return {
        ...baseMetadata,
        description: desc,
        openGraph: {
          ...baseMetadata.openGraph,
          title: `${companyName} - ${baseTitle}`,
          description: desc,
        },
        twitter: {
          ...baseMetadata.twitter,
          title: `${companyName} - ${baseTitle}`,
          description: desc,
        },
      };
    }

    return baseMetadata;
  } catch {
    return baseMetadata;
  }
}

const ProductListPage = async ({
  params,
}: {
  params: { companyId: string } | Promise<{ companyId: string }>;
}) => {
  const { companyId } = await params;

  return (
    <AuthGuard companyId={companyId}>
      <ProductListSection companyId={companyId} />
    </AuthGuard>
  );
};

export default ProductListPage;

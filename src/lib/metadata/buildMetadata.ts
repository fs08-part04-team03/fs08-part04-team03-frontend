import type { Metadata } from 'next';

/**
 * 페이지 메타데이터 생성을 위한 옵션 인터페이스
 */
export interface PageMetadataOptions {
  /** 페이지 제목 (SNACK - {title} 형식으로 표시) */
  title: string;
  /** 페이지 설명 */
  description: string;
  /** 페이지 경로 (예: '/products') */
  path?: string;
  /** SEO 키워드 배열 */
  keywords?: string[] | readonly string[];
  /** OG 이미지 URL (절대 경로 또는 /og/xxx.png 형식) */
  ogImage?: string;
  /** 검색 엔진 인덱싱 여부 (기본: true) */
  noIndex?: boolean;
  /** 회사명 (있으면 제목에 포함) */
  companyName?: string;
}

/** 사이트 기본 정보 */
const SITE_INFO = {
  name: 'SNACK',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://snack.example.com',
} as const;

/**
 * 페이지 메타데이터를 생성하는 빌더 함수
 *
 * @example
 * // 기본 사용
 * buildPageMetadata({
 *   title: '상품 목록',
 *   description: '다양한 간식과 음료를 확인하세요.',
 *   path: '/products',
 *   keywords: PAGE_KEYWORDS.products,
 * });
 *
 * @example
 * // 회사명 포함
 * buildPageMetadata({
 *   title: '장바구니',
 *   description: '장바구니를 확인하세요.',
 *   companyName: 'ACME Corp',
 * });
 */
export function buildPageMetadata(options: PageMetadataOptions): Metadata {
  const { title, description, path, keywords, ogImage, noIndex = false, companyName } = options;

  const fullUrl = path ? `${SITE_INFO.url}${path}` : undefined;
  const displayTitle = companyName ? `${companyName} - ${title}` : title;
  const ogTitle = `${SITE_INFO.name} - ${title}`;

  const metadata: Metadata = {
    title: displayTitle,
    description,
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };

  // 키워드 추가
  if (keywords && keywords.length > 0) {
    metadata.keywords = keywords.join(', ');
  }

  // canonical URL 추가
  if (fullUrl) {
    metadata.alternates = { canonical: fullUrl };
  }

  // OpenGraph 메타데이터
  metadata.openGraph = {
    title: ogTitle,
    description,
    type: 'website',
    siteName: SITE_INFO.name,
    ...(fullUrl && { url: fullUrl }),
    ...(ogImage && {
      images: [
        {
          url: ogImage.startsWith('/') ? `${SITE_INFO.url}${ogImage}` : ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    }),
  };

  // Twitter 메타데이터
  metadata.twitter = {
    card: 'summary_large_image',
    title: ogTitle,
    description,
    ...(ogImage && {
      images: [ogImage.startsWith('/') ? `${SITE_INFO.url}${ogImage}` : ogImage],
    }),
  };

  return metadata;
}

/**
 * 간단한 메타데이터 생성 (title, description만)
 *
 * @example
 * simpleMetadata('구매 내역', '구매 내역을 확인하세요.');
 */
export function simpleMetadata(title: string, description?: string): Metadata {
  return {
    title,
    ...(description && { description }),
  };
}

/**
 * 폴백 메타데이터 생성 (에러 발생 시 사용)
 */
export function fallbackMetadata(title: string, description?: string): Metadata {
  return {
    title,
    description: description || `${SITE_INFO.name} - ${title}`,
  };
}

import type { NextConfig } from 'next';

// 환경 변수 기반 프로토콜 및 호스트 설정
const imageHost = process.env.IMAGE_HOST || 'snock.tplinkdns.com';
const imagePort = process.env.IMAGE_PORT || '4000';

// 포트 정규화 (빈 문자열이거나 유효하지 않은 경우 제거)
const normalizedPort =
  imagePort.trim() && /^\d+$/.test(imagePort.trim()) ? imagePort.trim() : undefined;

// 백엔드가 HTTPS를 사용하므로 항상 HTTPS 사용
const imageProtocol = 'https';

// 호스트명 정규화 (공백 제거, 소문자 변환)
const normalizedHost = imageHost.trim().toLowerCase();

const nextConfig: NextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: false,
  },

  images: {
    formats: ['image/avif', 'image/webp'],

    remotePatterns: [
      // 🔹 기존 백엔드 업로드 이미지
      {
        protocol: 'https',
        hostname: process.env.BACKEND_HOST || 'snock.tplinkdns.com',
        pathname: '/uploads/**',
      },

      {
        protocol: imageProtocol,
        hostname: normalizedHost,
        ...(normalizedPort && { port: normalizedPort }),
        pathname: '/uploads/**',
      },

      // ✅ S3 presigned URL (상품 이미지)
      {
        protocol: 'https',
        hostname: 'snack-store-bucket.s3.ap-northeast-2.amazonaws.com',
        pathname: '/**',
      },
    ],

    localPatterns: [
      { pathname: '/api/product/image/**' },
      { pathname: '/icons/**' },
      { pathname: '/images/**' },
      { pathname: '/logo/**' },
    ],

    // 이미지 최적화 설정
    minimumCacheTTL: 86400, // 24시간 캐시
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // 프로덕션에서 source maps 비활성화
  productionBrowserSourceMaps: false,

  // 성능 최적화
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  async rewrites() {
    const backendUrl = process.env.BACKEND_API_URL || 'https://snock.tplinkdns.com:4000';

    return [
      // Storybook index rewrite
      {
        source: '/storybook',
        destination: '/storybook/index.html',
      },
      // API proxy
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },

  // 압축 최적화
  compress: true,

  experimental: {
    optimizePackageImports: ['@tanstack/react-query', 'recharts', 'zod'],
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;

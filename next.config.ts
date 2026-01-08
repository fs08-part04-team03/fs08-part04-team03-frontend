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
    ],
    localPatterns: [{ pathname: '/api/product/image/**' }],
  },

  async rewrites() {
    const backendUrl = process.env.BACKEND_API_URL || 'https://snock.tplinkdns.com:4000';
    // Next.js의 Route Handler는 rewrites보다 우선순위가 높으므로,
    // /api/product/image, /api/product, /api/auth/* 같은 Route Handler가 있는 경로는
    // rewrites를 통과하지 않고 Route Handler가 처리됩니다.
    // 따라서 /api/v1/* 경로만 백엔드로 프록시합니다.
    return [
      {
        source: '/api/v1/:path*',
        destination: `${backendUrl}/api/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;

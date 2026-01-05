import type { NextConfig } from 'next';

// 환경 변수 기반 프로토콜 및 호스트 설정
const isProduction = process.env.NODE_ENV === 'production';
const imageHost = process.env.IMAGE_HOST || 'snock.tplinkdns.com';
const imagePort = process.env.IMAGE_PORT || '4000';

// 포트 정규화 (빈 문자열이거나 유효하지 않은 경우 제거)
const normalizedPort =
  imagePort.trim() && /^\d+$/.test(imagePort.trim()) ? imagePort.trim() : undefined;

// 프로덕션에서는 HTTPS, 개발에서는 HTTP 사용
const imageProtocol = isProduction ? 'https' : 'http';

// 호스트명 정규화 (공백 제거, 소문자 변환)
const normalizedHost = imageHost.trim().toLowerCase();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    // allow direct remote fetch (for diagnostics) and same-origin local proxy
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
    localPatterns: [
      // allow same-origin image proxy with path like /api/product/image/<file>
      { pathname: '/api/product/image/**' },
    ],
  },

  async rewrites() {
    const backendUrl = process.env.BACKEND_API_URL || 'https://snock.tplinkdns.com:4000';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

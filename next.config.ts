import type { NextConfig } from 'next';

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
        hostname: process.env.BACKEND_HOST || 'fs08-part04-team03-backend.onrender.com',
        pathname: '/uploads/**',
      },
    ],
    localPatterns: [
      // allow same-origin image proxy with path like /api/product/image/<file>
      { pathname: '/api/product/image/**' },
    ],
  },

  async rewrites() {
    const backendUrl =
      process.env.BACKEND_API_URL || 'https://fs08-part04-team03-backend.onrender.com';
    return [
      {
        source: '/api/:path*',
        destination: `${backendUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;

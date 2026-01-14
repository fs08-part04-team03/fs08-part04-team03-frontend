import localFont from 'next/font/local';

/**
 * 실제로 사용하는 폰트만 로드하여 성능 최적화
 * 사용하지 않는 폰트(Thin, ExtraLight, Light, Heavy)는 제거
 * font-display: optional로 변경하여 더 빠른 렌더링 제공
 */
export const suit = localFont({
  src: [
    { path: '../../public/fonts/suit/SUIT-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../public/fonts/suit/SUIT-Medium.woff2', weight: '500', style: 'normal' },
    { path: '../../public/fonts/suit/SUIT-SemiBold.woff2', weight: '600', style: 'normal' },
    { path: '../../public/fonts/suit/SUIT-Bold.woff2', weight: '700', style: 'normal' },
    { path: '../../public/fonts/suit/SUIT-ExtraBold.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-suit',
  display: 'optional', // swap보다 더 빠른 렌더링 (폰트 로딩 실패 시 시스템 폰트 사용)
  preload: true, // Critical 폰트 preload
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'], // 폴백 폰트 지정
});

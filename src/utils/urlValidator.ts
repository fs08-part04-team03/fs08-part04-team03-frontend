/**
 * 이미지 URL의 안전성을 검증하고 sanitize합니다.
 * @param url - 검증할 URL
 * @returns 안전한 URL 또는 빈 문자열
 */
export const sanitizeImageUrl = (url: string | null): string => {
  if (!url || typeof url !== 'string') return '';

  // 상대 경로는 허용 (Next.js public 폴더)
  if (url.startsWith('/')) return url;

  try {
    const urlObj = new URL(url);

    // https, http만 허용
    const allowedProtocols = ['https:', 'http:'];
    if (!allowedProtocols.includes(urlObj.protocol)) {
      console.warn('[Security] Blocked unsafe protocol:', urlObj.protocol);
      return '';
    }

    // javascript:, data:, vbscript: 등 명시적 차단
    const lowerUrl = url.toLowerCase().trim();
    // eslint-disable-next-line no-script-url
    const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
    if (dangerousProtocols.some((proto) => lowerUrl.startsWith(proto))) {
      console.error('[Security] Dangerous protocol blocked:', lowerUrl.substring(0, 20));
      return '';
    }

    return url;
  } catch (error) {
    console.error('[Security] Invalid URL format:', error);
    return '';
  }
};

/**
 * URL이 유효한 이미지 URL인지 검증합니다.
 */
export const isValidImageUrl = (url: string | null): boolean => sanitizeImageUrl(url) !== '';

/**
 * 이미지 URL의 안전성을 검증하고 sanitize합니다.
 * @param url - 검증할 URL
 * @returns 안전한 URL 또는 빈 문자열
 */
export const sanitizeImageUrl = (url: string | null): string => {
  if (!url || typeof url !== 'string') return '';

  const trimmed = url.trim();

  // 위험 스킴 명시적 차단 (가장 먼저 체크)
  const lowerUrl = trimmed.toLowerCase();
  // eslint-disable-next-line no-script-url
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
  if (dangerousProtocols.some((proto) => lowerUrl.startsWith(proto))) {
    return '';
  }

  // 상대 경로는 허용 (Next.js public 폴더)
  if (trimmed.startsWith('/')) return trimmed;

  // 로컬 파일 미리보기용 blob: URL 허용 (URL.createObjectURL 결과)
  // 예: blob:https://example.com/550e8400-e29b-41d4-a716-446655440000
  if (trimmed.startsWith('blob:')) {
    try {
      const blobUrl = new URL(trimmed);
      // blob: 스킴만 허용하며, 호스트/오리진이 존재하는 정상적인 형태만 통과시킵니다.
      if (blobUrl.protocol === 'blob:' && blobUrl.origin && blobUrl.host) {
        return trimmed;
      }
      return '';
    } catch {
      return '';
    }
  }

  // http, https만 허용
  try {
    const urlObj = new URL(trimmed);
    if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
      return urlObj.toString();
    }
    return '';
  } catch {
    return '';
  }
};

/**
 * URL이 유효한 이미지 URL인지 검증합니다.
 */
export const isValidImageUrl = (url: string | null): boolean => sanitizeImageUrl(url) !== '';

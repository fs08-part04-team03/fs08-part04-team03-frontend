import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_API_URL } from '@/features/auth/utils/constants';
import { logger } from '@/utils/logger';

const DEFAULT_ALLOWED_HEADERS = 'Content-Type, Authorization';
const DEFAULT_ALLOWED_METHODS = 'POST, OPTIONS';

function getAllowedOrigin(req: NextRequest): string | null {
  const requestOrigin = req.headers.get('origin');
  const envOrigin =
    process.env.CORS_ORIGIN ||
    process.env.FRONTEND_ORIGIN ||
    process.env.NEXT_PUBLIC_APP_ORIGIN ||
    null;

  if (!requestOrigin && !envOrigin) return null;
  if (envOrigin && requestOrigin && envOrigin !== requestOrigin) return null;
  return envOrigin || requestOrigin;
}

function applyCorsHeaders(headers: Headers, req: NextRequest): void {
  const allowOrigin = getAllowedOrigin(req);
  if (allowOrigin) {
    headers.set('Access-Control-Allow-Origin', allowOrigin);
    headers.set('Vary', 'Origin');
  }
  headers.set('Access-Control-Allow-Credentials', 'true');
  headers.set('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  headers.set('Access-Control-Allow-Headers', DEFAULT_ALLOWED_HEADERS);
}

function normalizeSetCookieAttributes(cookie: string): string {
  let normalized = cookie;
  if (/\s*samesite=/i.test(normalized)) {
    normalized = normalized.replace(/\s*;\s*samesite=[^;]*/i, '; SameSite=None');
  } else {
    normalized = `${normalized}; SameSite=None`;
  }
  if (!/\s*;\s*secure/i.test(normalized)) {
    normalized = `${normalized}; Secure`;
  }
  return normalized;
}

export function OPTIONS(req: NextRequest) {
  const headers = new Headers();
  applyCorsHeaders(headers, req);
  return new NextResponse(null, { status: 204, headers });
}

/**
 * Refresh Token API Route
 * 브라우저에서는 이 경로를 통해 쿠키 기반 갱신을 처리합니다.
 */
export async function POST(req: NextRequest) {
  // 프로덕션에서는 DEBUG_AUTH를 무시하여 민감한 정보 노출 방지
  const isDebug =
    process.env.NODE_ENV === 'development' &&
    (process.env.DEBUG_AUTH === 'true' || process.env.DEBUG_AUTH === undefined);

  try {
    const backendUrl = process.env.BACKEND_API_URL || DEFAULT_API_URL;
    const refreshUrl = `${backendUrl}/api/v1/auth/refresh`;

    // 요청에서 쿠키 가져오기 (httpOnly 쿠키 포함)
    const cookieHeader = req.headers.get('cookie');

    // 쿠키에서 refreshToken 존재 여부 확인 (디버깅용)
    const hasRefreshToken = cookieHeader?.includes('refreshToken=');

    if (isDebug) {
      logger.info('[Refresh Token API Route] Request Debug:', {
        hasCookieHeader: !!cookieHeader,
        hasRefreshToken,
      });
    }

    // 백엔드로 프록시 요청
    const response = await fetch(refreshUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(cookieHeader && { Cookie: cookieHeader }), // 쿠키가 있으면 전달
      },
      body: JSON.stringify({}),
    });

    // 응답 데이터 가져오기
    const data: unknown = await response.json();

    if (isDebug) {
      logger.info('[Refresh Token API Route] Backend Response:', {
        status: response.status,
        statusText: response.statusText,
        success:
          typeof data === 'object' && data !== null && 'success' in data
            ? (data as { success: boolean }).success
            : undefined,
      });
    }

    // 응답 헤더에서 Set-Cookie가 있으면 전달 (여러 개일 수 있음)
    const headers = new Headers();
    applyCorsHeaders(headers, req);
    const setCookieHeaders = response.headers.getSetCookie();
    if (setCookieHeaders.length > 0) {
      // NextResponse는 여러 Set-Cookie 헤더를 배열로 받을 수 있음
      setCookieHeaders.forEach((cookie) => {
        headers.append('Set-Cookie', normalizeSetCookieAttributes(cookie));
      });
    }

    // 백엔드 응답을 그대로 반환
    return NextResponse.json(data, {
      status: response.status,
      headers,
    });
  } catch (error) {
    logger.error('[Refresh Token API Route] Error:', error);
    const headers = new Headers();
    applyCorsHeaders(headers, req);
    return NextResponse.json(
      { success: false, message: '토큰 갱신 중 오류가 발생했습니다.' },
      { status: 500, headers }
    );
  }
}

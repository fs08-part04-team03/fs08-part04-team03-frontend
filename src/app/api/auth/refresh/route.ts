import { NextRequest, NextResponse } from 'next/server';
import { AUTH_API_PATHS } from '@/features/auth/utils/constants';
import { getApiTimeout, getApiUrl } from '@/utils/api';
import { logger } from '@/utils/logger';

/**
 * Refresh Token API Route
 * 서버 사이드에서 refresh token 쿠키를 백엔드로 전달하여 토큰 갱신 처리
 *
 * 문제: Next.js rewrites를 통해 프록시할 때, 백엔드 도메인의 쿠키가 전달되지 않을 수 있음
 * 해결: Next.js API Route에서 서버 사이드로 요청하여 쿠키를 직접 관리
 *
 * 백엔드 요구사항:
 * - CSRF 토큰 필요 (X-CSRF-Token 헤더)
 * - refreshToken 쿠키 자동 전송
 */
export async function POST(request: NextRequest) {
  try {
    const apiUrl = getApiUrl();
    const timeout = getApiTimeout();

    // 1단계: CSRF 토큰 가져오기
    // 주의: 서버 사이드에서 fetch할 때는 credentials: 'include'가 작동하지 않음
    // 쿠키를 명시적으로 헤더에 포함해야 함
    const requestCookies = request.headers.get('cookie') || '';
    const cookieNames = requestCookies
      .split(';')
      .map((c) => {
        const trimmed = c.trim();
        const equalIndex = trimmed.indexOf('=');
        return equalIndex > 0 ? trimmed.substring(0, equalIndex).trim() : trimmed;
      })
      .filter(Boolean);
    const hasRefreshTokenCookie = cookieNames.some(
      (name) =>
        name && (name.toLowerCase().includes('refresh') || name.toLowerCase() === 'refreshtoken')
    );

    logger.info('[Refresh API Route] 쿠키 확인', {
      hasCookies: !!requestCookies,
      cookieCount: cookieNames.length,
      cookieNames,
      hasRefreshTokenCookie,
      note: 'refreshToken 쿠키는 HttpOnly이므로 브라우저에서 읽을 수 없지만, 서버 사이드에서는 헤더로 전달됨',
    });

    // refreshToken 쿠키가 없으면 에러 반환
    if (!hasRefreshTokenCookie && requestCookies) {
      logger.warn('[Refresh API Route] refreshToken 쿠키가 요청에 없음', {
        cookieNames,
        note: '쿠키 도메인 불일치 가능성: 백엔드 쿠키 도메인이 localhost로 설정되어 있으면 프론트엔드 도메인과 일치해야 함',
      });
    }

    const csrfResponse = await fetch(`${apiUrl}${AUTH_API_PATHS.CSRF}`, {
      method: 'GET',
      headers: {
        Cookie: requestCookies, // 요청 쿠키 전달
      },
      // 서버 사이드에서는 credentials: 'include'가 작동하지 않으므로 쿠키를 헤더에 명시적으로 전달
    });

    if (!csrfResponse.ok) {
      logger.warn('[Refresh API Route] CSRF 토큰 가져오기 실패', {
        status: csrfResponse.status,
      });
      return NextResponse.json(
        { success: false, error: { message: 'CSRF 토큰을 가져올 수 없습니다.' } },
        { status: 500 }
      );
    }

    const csrfResult = (await csrfResponse.json()) as { csrfToken?: string };
    const { csrfToken: csrfTokenFromResponse } = csrfResult;
    if (!csrfTokenFromResponse) {
      logger.warn('[Refresh API Route] CSRF 토큰이 응답에 없음');
      return NextResponse.json(
        { success: false, error: { message: 'CSRF 토큰을 가져올 수 없습니다.' } },
        { status: 500 }
      );
    }

    const csrfToken = csrfTokenFromResponse;

    // 2단계: 백엔드로 refresh 요청 (서버 사이드에서 쿠키 전달)
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      logger.info('[Refresh API Route] Refresh 요청 시작', {
        refreshUrl: `${apiUrl}${AUTH_API_PATHS.REFRESH}`,
        hasCsrfToken: !!csrfToken,
        hasCookies: !!requestCookies,
        cookieCount: cookieNames.length,
        cookieNames,
        hasRefreshTokenCookie,
        note: '서버 사이드에서 백엔드로 쿠키를 헤더로 전달 (쿠키 도메인이 localhost이면 백엔드가 localhost 쿠키를 받을 수 있어야 함)',
      });

      const refreshResponse = await fetch(`${apiUrl}${AUTH_API_PATHS.REFRESH}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken, // CSRF 토큰 헤더 필수
          Cookie: requestCookies, // 요청 쿠키 전달 (서버 사이드에서는 명시적으로 전달 필요)
        },
        body: JSON.stringify({}),
        // 서버 사이드에서는 credentials: 'include'가 작동하지 않으므로 쿠키를 헤더에 명시적으로 전달
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!refreshResponse.ok) {
        const errorText = await refreshResponse.text();
        let errorJson: unknown = null;
        try {
          if (errorText.trim().startsWith('{')) {
            errorJson = JSON.parse(errorText) as unknown;
          }
        } catch {
          // JSON 파싱 실패는 무시
        }

        logger.warn('[Refresh API Route] Refresh 요청 실패', {
          status: refreshResponse.status,
          errorJson,
        });

        // 401 에러는 refresh token이 없거나 만료된 경우
        if (refreshResponse.status === 401) {
          return NextResponse.json(
            { success: false, error: { message: 'refresh token이 존재하지 않습니다.' } },
            { status: 401 }
          );
        }

        // 403 에러는 CSRF 토큰 문제
        if (refreshResponse.status === 403) {
          return NextResponse.json(
            { success: false, error: { message: 'CSRF 토큰이 유효하지 않습니다.' } },
            { status: 403 }
          );
        }

        return NextResponse.json(
          { success: false, error: { message: '토큰 갱신에 실패했습니다.' } },
          { status: refreshResponse.status }
        );
      }

      // 성공 시 응답 본문 가져오기
      // 백엔드 응답 형식: { success: true, data: { user: {...}, accessToken: "..." } }
      const result = (await refreshResponse.json()) as {
        success: boolean;
        data?: {
          accessToken: string;
          user?: {
            id: string;
            companyId: string;
            email: string;
            name: string;
            role: string;
            profileImage?: string;
          };
        };
      };

      if (!result.success || !result.data?.accessToken) {
        logger.warn('[Refresh API Route] 응답 형식이 올바르지 않음', {
          success: result.success,
          hasAccessToken: !!result.data?.accessToken,
        });
        return NextResponse.json(
          { success: false, error: { message: '응답 형식이 올바르지 않습니다.' } },
          { status: 500 }
        );
      }

      // 응답 생성 (백엔드에서 설정한 새 쿠키도 전달)
      const response = NextResponse.json(result);

      // 백엔드 응답의 Set-Cookie 헤더를 프론트엔드 응답에 전달
      const setCookieHeaders = refreshResponse.headers.getSetCookie();
      setCookieHeaders.forEach((cookie) => {
        response.headers.append('Set-Cookie', cookie);
      });

      logger.info('[Refresh API Route] 토큰 갱신 성공');
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        logger.warn('[Refresh API Route] 타임아웃 발생');
        return NextResponse.json(
          { success: false, error: { message: '요청 시간이 초과되었습니다.' } },
          { status: 504 }
        );
      }
      throw error;
    }
  } catch (error) {
    logger.error('[Refresh API Route] 예외 발생', {
      hasError: true,
      errorType: error instanceof Error ? error.constructor.name : 'Unknown',
      errorMessage: error instanceof Error ? error.message : String(error),
    });
    return NextResponse.json(
      { success: false, error: { message: '토큰 갱신 중 오류가 발생했습니다.' } },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_API_URL } from '@/features/auth/utils/constants';

/**
 * Refresh Token API Route
 * Vercel 환경에서 rewrites가 쿠키 전달에 실패할 수 있으므로
 * Next.js API Route를 통해 프록시하여 쿠키가 제대로 전달되도록 함
 */
export async function POST(req: NextRequest) {
  try {
    const backendUrl = process.env.BACKEND_API_URL || DEFAULT_API_URL;
    const refreshUrl = `${backendUrl}/api/v1/auth/refresh`;

    // 요청에서 쿠키 가져오기 (httpOnly 쿠키 포함)
    const cookieHeader = req.headers.get('cookie');

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
    const data = (await response.json()) as unknown;

    // 응답 헤더에서 Set-Cookie가 있으면 전달 (여러 개일 수 있음)
    const headers = new Headers();
    const setCookieHeaders = response.headers.getSetCookie();
    if (setCookieHeaders.length > 0) {
      // NextResponse는 여러 Set-Cookie 헤더를 배열로 받을 수 있음
      setCookieHeaders.forEach((cookie) => {
        headers.append('Set-Cookie', cookie);
      });
    }

    // 백엔드 응답을 그대로 반환
    return NextResponse.json(data, {
      status: response.status,
      headers,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[Refresh Token API Route] Error:', error);
    return NextResponse.json(
      { success: false, message: '토큰 갱신 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}

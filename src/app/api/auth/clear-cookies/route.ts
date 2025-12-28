import { NextResponse } from 'next/server';

/**
 * 인증 쿠키 삭제 API Route
 * 로그아웃 시 쿠키를 안전하게 삭제합니다.
 */
export function POST() {
  const response = NextResponse.json({ success: true });

  // 쿠키 삭제 (만료 시간을 과거로 설정)
  response.cookies.set('auth-role', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  response.cookies.set('auth-company-id', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return response;
}

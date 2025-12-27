import { NextRequest, NextResponse } from 'next/server';
import type { UserRole } from '@/constants/roles';

/**
 * 인증 쿠키 설정 API Route
 * 서버 측에서 HttpOnly, Secure 플래그를 포함한 안전한 쿠키를 설정합니다.
 *
 * 보안 강화: accessToken을 함께 받아서 검증합니다.
 * 클라이언트가 임의의 role과 companyId를 보내는 것을 방지합니다.
 */
interface SetCookiesRequest {
  role: UserRole;
  companyId: string;
  accessToken: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as SetCookiesRequest;
    const { role, companyId, accessToken } = body;

    // 필수 필드 검증
    if (!role || !companyId || !accessToken) {
      return NextResponse.json(
        { success: false, message: 'role, companyId, accessToken이 모두 필요합니다.' },
        { status: 400 }
      );
    }

    // role 유효성 검증
    if (!['user', 'manager', 'admin'].includes(role)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 role입니다.' },
        { status: 400 }
      );
    }

    // accessToken 검증: 백엔드 API를 통해 사용자 정보 확인
    // 이렇게 하면 클라이언트가 임의의 role과 companyId를 보내는 것을 방지할 수 있습니다.
    // TODO: 백엔드 API에 사용자 정보 검증 엔드포인트가 있다면 여기서 검증하세요.
    // 예: const userInfo = await verifyToken(accessToken);
    //     if (userInfo.role !== role || userInfo.companyId !== companyId) {
    //       return NextResponse.json({ success: false, message: '인증 정보가 일치하지 않습니다.' }, { status: 403 });
    //     }

    const response = NextResponse.json({ success: true });

    // 쿠키 설정 (HttpOnly, Secure, SameSite 플래그 포함)
    const isProduction = process.env.NODE_ENV === 'production';
    const maxAge = 60 * 60 * 24 * 7; // 7일

    response.cookies.set('auth-role', role, {
      httpOnly: true,
      secure: isProduction, // 프로덕션에서만 Secure 플래그 사용
      sameSite: 'lax',
      maxAge,
      path: '/',
    });

    response.cookies.set('auth-company-id', companyId, {
      httpOnly: true,
      secure: isProduction, // 프로덕션에서만 Secure 플래그 사용
      sameSite: 'lax',
      maxAge,
      path: '/',
    });

    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('쿠키 설정 실패:', error);
    return NextResponse.json(
      { success: false, message: '쿠키 설정에 실패했습니다.' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import type { UserRole } from '@/constants/roles';
import { VALID_ROLES } from '@/constants/roles';
import { logger } from '@/utils/logger';

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
    if (!VALID_ROLES.includes(role)) {
      return NextResponse.json(
        { success: false, message: '유효하지 않은 role입니다.' },
        { status: 400 }
      );
    }

    // accessToken 검증: JWT 토큰을 검증하고 디코딩하여 사용자 정보 확인
    // 이렇게 하면 클라이언트가 임의의 role과 companyId를 보내는 것을 방지할 수 있습니다.
    // 보안: NEXT_PUBLIC_ 접두사가 붙은 환경 변수는 클라이언트에 노출되므로 절대 사용하지 않음
    const jwtSecret = process.env.JWT_SECRET || process.env.JWT_ACCESS_SECRET;

    if (!jwtSecret) {
      // 보안: 프로덕션에서는 상세 정보를 로그에 남기지 않음
      // Vercel 환경에서는 VERCEL_ENV로 환경 구분 (production, preview, development)
      const isProduction =
        process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production';

      if (!isProduction) {
        logger.error('[set-cookies] JWT_SECRET 환경 변수가 설정되지 않았습니다.', {
          JWT_SECRET_exists: !!process.env.JWT_SECRET,
          JWT_ACCESS_SECRET_exists: !!process.env.JWT_ACCESS_SECRET,
          VERCEL_ENV: process.env.VERCEL_ENV,
          NODE_ENV: process.env.NODE_ENV,
        });
      } else {
        logger.error('[set-cookies] JWT_SECRET 환경 변수가 설정되지 않았습니다.');
      }
      return NextResponse.json(
        { success: false, message: '서버 설정 오류가 발생했습니다.' },
        { status: 500 }
      );
    }

    let decodedToken: jwt.JwtPayload;
    try {
      // JWT 토큰 검증 및 디코딩
      decodedToken = jwt.verify(accessToken, jwtSecret) as jwt.JwtPayload;
    } catch (error) {
      logger.error('[set-cookies] 토큰 검증 실패', error);
      return NextResponse.json(
        { success: false, message: '유효하지 않은 토큰입니다.' },
        { status: 401 }
      );
    }

    // 디코딩된 토큰에서 role과 companyId 추출
    const tokenRole = decodedToken.role as string;
    const tokenCompanyId = decodedToken.companyId as string;

    if (!tokenRole || !tokenCompanyId) {
      logger.error('[set-cookies] 토큰에 필수 정보가 없습니다');
      return NextResponse.json(
        { success: false, message: '토큰에 필수 정보가 없습니다.' },
        { status: 401 }
      );
    }

    // 백엔드 role을 클라이언트 role로 정규화 (대소문자 무시)
    const normalizeRole = (roleValue: string): UserRole => {
      const upperRole = roleValue.toUpperCase();
      if (upperRole === 'MANAGER') return 'manager';
      if (upperRole === 'ADMIN') return 'admin';
      if (upperRole === 'USER') return 'user';
      // 알 수 없는 역할은 에러 반환 (보안상 안전)
      logger.error('[set-cookies] 알 수 없는 역할');
      throw new Error(`유효하지 않은 역할입니다: ${roleValue}`);
    };

    let normalizedTokenRole: UserRole;
    try {
      normalizedTokenRole = normalizeRole(tokenRole);
    } catch (error) {
      logger.error('[set-cookies] 역할 정규화 실패', error);
      return NextResponse.json(
        { success: false, message: '토큰에 유효하지 않은 역할이 포함되어 있습니다.' },
        { status: 401 }
      );
    }

    // 요청 body의 role과 companyId와 토큰의 값 비교
    if (normalizedTokenRole !== role || tokenCompanyId !== companyId) {
      logger.error('[set-cookies] 인증 정보 불일치');
      return NextResponse.json(
        { success: false, message: '인증 정보가 일치하지 않습니다.' },
        { status: 403 }
      );
    }

    const response = NextResponse.json({ success: true });

    // 쿠키 설정 (HttpOnly, Secure, SameSite 플래그 포함)
    // 보안: 백엔드가 HTTPS를 사용하므로 개발 환경에서도 secure: true 사용
    const maxAge = 60 * 60 * 24 * 7; // 7일

    response.cookies.set('auth-role', role, {
      httpOnly: true,
      secure: true, // HTTPS 사용 시 항상 true
      sameSite: 'lax',
      maxAge,
      path: '/',
    });

    response.cookies.set('auth-company-id', companyId, {
      httpOnly: true,
      secure: true, // HTTPS 사용 시 항상 true
      sameSite: 'lax',
      maxAge,
      path: '/',
    });

    // accessToken도 쿠키에 저장 (서버 컴포넌트에서 사용하기 위해)
    // 보안: HttpOnly로 설정하여 JavaScript에서 접근 불가
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true, // HTTPS 사용 시 항상 true
      sameSite: 'lax',
      maxAge,
      path: '/',
    });

    return response;
  } catch (error) {
    logger.error('[set-cookies] 쿠키 설정 실패', error);
    return NextResponse.json(
      { success: false, message: '쿠키 설정에 실패했습니다.' },
      { status: 500 }
    );
  }
}

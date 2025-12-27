import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { hasAccess } from '@/utils/auth';
import type { UserRole } from '@/constants/roles';

/**
 * 인증된 사용자 정보를 쿠키에서 가져옵니다.
 * HttpOnly 쿠키로 안전하게 저장된 인증 정보를 읽습니다.
 */
function getAuthUser(request: NextRequest): { role: UserRole; companyId: string } | null {
  // 서버 측에서 설정된 HttpOnly 쿠키에서 인증 정보 가져오기
  const role = request.cookies.get('auth-role')?.value as UserRole | undefined;
  const companyId = request.cookies.get('auth-company-id')?.value;

  if (role && companyId && ['user', 'manager', 'admin'].includes(role)) {
    return { role, companyId };
  }

  // 쿠키가 없으면 null 반환 (인증되지 않음)
  return null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 공개 경로는 접근 제어 제외
  const publicPaths = ['/login', '/signup', '/invite'];
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // 루트 경로는 그대로 통과
  if (pathname === '/') {
    return NextResponse.next();
  }

  // [companyId] 스코프 경로인 경우 권한 검증 예: '/123', '/123/products', '/123/admin/users' 등
  if (pathname.match(/^\/[^/]+/)) {
    const user = getAuthUser(request);

    // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
    if (!user) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 권한 확인 (hasAccess 내부에서 normalizePath 처리.)
    if (!hasAccess(user.role, pathname)) {
      // 권한이 없으면 회사 홈(상품 목록)으로 리다이렉트 (또는 403 페이지로 변경 가능)
      const homeUrl = new URL(`/${user.companyId}/products`, request.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder, 이미지 등)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

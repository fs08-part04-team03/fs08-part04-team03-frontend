import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { hasAccess } from '@/utils/auth';
import type { UserRole } from '@/constants/roles';

/**
 * 개발 환경에서 사용할 mock 사용자 정보
 * TODO: 실제 인증 시스템 구현 후 제거
 */
function getMockUser(request: NextRequest): { role: UserRole; companyId: string } | null {
  // 개발 중에는 쿠키나 헤더에서 역할을 가져올 수 있도록 설정 예) 쿠키에서 역할 가져오기
  const role = request.cookies.get('mock-role')?.value as UserRole | undefined;
  const companyId = request.cookies.get('mock-company-id')?.value;

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
    const user = getMockUser(request);

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

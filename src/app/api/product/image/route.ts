import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getApiUrl, getApiTimeout } from '@/utils/api';
import { logger } from '@/utils/logger';

/**
 * 이미지 URL 조회 프록시
 * GET /api/product/image?key=...
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const imageKey = url.searchParams.get('key');

  if (!imageKey) {
    return NextResponse.json(
      { success: false, message: 'key parameter is required' },
      { status: 400 }
    );
  }

  // 빈 문자열이나 공백만 있는 경우
  if (imageKey.trim().length === 0) {
    return NextResponse.json({ success: false, message: 'Image key is required' }, { status: 400 });
  }

  // 기본적인 입력 검증 (경로 탐색 공격 방지)
  if (imageKey.includes('..') || imageKey.startsWith('/') || imageKey.includes('\\')) {
    return NextResponse.json({ success: false, message: 'Invalid key format' }, { status: 400 });
  }

  // URL 형식의 키는 허용하지 않음 (http://, https:// 등)
  if (imageKey.startsWith('http://') || imageKey.startsWith('https://')) {
    return NextResponse.json(
      { success: false, message: 'Invalid key format: URL format is not allowed' },
      { status: 400 }
    );
  }

  // 허용된 폴더 prefix 검증 (레거시 형식 지원: prefix 없는 파일명도 허용)
  const allowedPrefixes = ['products/', 'users/', 'companies/', 'misc/'];
  const hasValidPrefix = allowedPrefixes.some((prefix) => imageKey.startsWith(prefix));

  // prefix가 없는 경우 (레거시 형식) products/ prefix 자동 추가
  // 단, 이미 /로 시작하거나 URL 형식인 경우는 제외
  // 확장자가 있든 없든 모두 처리 (백엔드에서 처리하도록)
  let normalizedKey = imageKey.trim();
  if (!hasValidPrefix && !normalizedKey.startsWith('/') && !normalizedKey.includes('://')) {
    normalizedKey = `products/${normalizedKey}`;
  }

  // 서버 사이드에서 백엔드 URL 가져오기
  const backendOrigin = process.env.BACKEND_ORIGIN || process.env.BACKEND_API_URL || getApiUrl();
  const apiBase = backendOrigin;

  // 서버 사이드에서 쿠키 읽기 (Next.js cookies() API 사용)
  let accessToken: string | undefined;
  let allCookies: Array<{ name: string; value: string }> = [];

  try {
    const cookieStore = await cookies();
    accessToken = cookieStore.get('accessToken')?.value;
    allCookies = cookieStore.getAll();
  } catch {
    // cookies() API 실패 시 무시 (인증 없이 진행)
  }

  // 요청 헤더에서 인증 정보 가져오기 (클라이언트에서 직접 전달된 경우)
  const authHeader = req.headers.get('authorization');
  const cookieHeader = req.headers.get('cookie');

  // 쿠키에서 모든 쿠키를 문자열로 구성
  const cookieString =
    allCookies.length > 0
      ? allCookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ')
      : undefined;

  // Authorization 헤더 구성 (쿠키의 accessToken 우선, 없으면 요청 헤더 사용)
  const authorizationHeader = accessToken ? `Bearer ${accessToken}` : authHeader || undefined;

  // 쿠키 문자열 구성 (서버 쿠키와 요청 헤더 쿠키 병합)
  const finalCookieString =
    cookieString && cookieHeader
      ? `${cookieString}; ${cookieHeader}`
      : cookieString || cookieHeader || undefined;

  // 정규화된 키를 URL 인코딩하여 백엔드로 전달
  const encodedKey = encodeURIComponent(normalizedKey);

  const target = new URL(`/api/v1/upload/image/${encodedKey}`, apiBase);

  // 개발 환경에서 디버깅 로그 (logger는 개발 환경에서만 동작)
  logger.info('[Image Proxy] Request details:', {
    originalKey: imageKey,
    normalizedKey,
    encodedKey,
    targetUrl: target.toString(),
    hasAuth: !!authorizationHeader,
    hasCookies: !!finalCookieString,
  });

  const timeout = getApiTimeout();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(target.toString(), {
      method: 'GET',
      headers: {
        ...(authorizationHeader ? { Authorization: authorizationHeader } : {}),
        ...(finalCookieString ? { cookie: finalCookieString } : {}),
      },
      credentials: 'include',
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      // 응답 본문을 한 번만 읽어서 저장 (재사용을 위해)
      let errorText = '';
      try {
        errorText = await res.text();
      } catch {
        errorText = 'Failed to read error response';
      }

      // 개발 환경에서 백엔드 응답 상세 로그 (logger는 개발 환경에서만 동작)
      logger.error('[Image Proxy] Backend error:', {
        status: res.status,
        statusText: res.statusText,
        errorText,
        normalizedKey,
        originalKey: imageKey,
        targetUrl: target.toString(),
      });

      // 404 에러는 이미지를 찾을 수 없음을 명확히 표시
      if (res.status === 404) {
        // 개발 환경에서만 상세 정보 포함
        const errorMessage =
          process.env.NODE_ENV === 'development'
            ? `이미지를 찾을 수 없습니다. (normalized: ${normalizedKey}, original: ${imageKey})`
            : '이미지를 찾을 수 없습니다.';
        return NextResponse.json({ success: false, message: errorMessage }, { status: 404 });
      }

      // 401 에러는 인증 문제
      if (res.status === 401) {
        return NextResponse.json(
          { success: false, message: '이미지 조회 권한이 없습니다.' },
          { status: 401 }
        );
      }

      // 400 에러는 잘못된 키 형식
      if (res.status === 400) {
        const errorMessage =
          process.env.NODE_ENV === 'development'
            ? `잘못된 이미지 키 형식입니다. (normalized: ${normalizedKey}, original: ${imageKey})`
            : '잘못된 이미지 키 형식입니다.';
        return NextResponse.json({ success: false, message: errorMessage }, { status: 400 });
      }

      // 기타 에러는 그대로 전달 (이미 읽은 errorText 사용)
      let parsed: unknown;
      try {
        parsed = JSON.parse(errorText);
      } catch {
        parsed = errorText;
      }
      return NextResponse.json(parsed, { status: res.status });
    }

    // 백엔드 응답 확인
    const contentType = res.headers.get('content-type');

    // 백엔드가 이미지를 직접 반환하는 경우
    if (contentType && contentType.startsWith('image/')) {
      const imageBuffer = await res.arrayBuffer();
      return new NextResponse(imageBuffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=3600', // 1시간 캐시
          'Access-Control-Allow-Origin': '*', // CORS 헤더 추가
        },
      });
    }

    // 백엔드에서 signed URL을 JSON으로 반환하는 경우
    const result = (await res.json()) as {
      success: boolean;
      data?: { url: string };
    };

    if (result.success && result.data?.url) {
      // signed URL에서 이미지를 서버 측에서 가져와서 프록시
      // 별도의 타임아웃 컨트롤러 생성 (S3 페치용)
      const s3Timeout = getApiTimeout();
      const s3Controller = new AbortController();
      const s3TimeoutId = setTimeout(() => s3Controller.abort(), s3Timeout);
      try {
        const imageRes = await fetch(result.data.url, {
          signal: s3Controller.signal,
        });

        if (!imageRes.ok) {
          return NextResponse.json(
            { success: false, message: 'Failed to fetch image from S3' },
            { status: 502 }
          );
        }

        clearTimeout(s3TimeoutId);
        const imageBuffer = await imageRes.arrayBuffer();
        const imageContentType = imageRes.headers.get('content-type') || 'image/jpeg';

        return new NextResponse(imageBuffer, {
          status: 200,
          headers: {
            'Content-Type': imageContentType,
            'Cache-Control': 'public, max-age=3600', // 1시간 캐시
            'Access-Control-Allow-Origin': '*', // CORS 헤더 추가
          },
        });
      } catch (fetchError) {
        clearTimeout(s3TimeoutId);
        if (fetchError instanceof Error && fetchError.name === 'AbortError') {
          return NextResponse.json({ success: false, message: 'Request timeout' }, { status: 504 });
        }
        return NextResponse.json(
          { success: false, message: 'Failed to fetch image from S3' },
          { status: 502 }
        );
      }
    }

    // 예상치 못한 응답
    return NextResponse.json({ success: false, message: 'Invalid response' }, { status: 500 });
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ success: false, message: 'Request timeout' }, { status: 504 });
    }
    return NextResponse.json({ success: false, message: 'Failed to fetch image' }, { status: 502 });
  }
}

/**
 * 이미지 업로드 (S3) - 레거시 엔드포인트
 * POST /api/product/image
 * @deprecated 새로운 /api/v1/upload/image API를 직접 사용하세요
 */
export async function POST(req: Request) {
  // 서버 사이드에서 백엔드 URL 가져오기
  const backendOrigin = process.env.BACKEND_ORIGIN || process.env.BACKEND_API_URL || getApiUrl();
  const apiBase = backendOrigin;

  // 서버 사이드에서 쿠키 읽기 (Next.js cookies() API 사용)
  let accessToken: string | undefined;
  let allCookies: Array<{ name: string; value: string }> = [];

  try {
    const cookieStore = await cookies();
    accessToken = cookieStore.get('accessToken')?.value;
    allCookies = cookieStore.getAll();
  } catch {
    // cookies() API 실패 시 무시 (인증 없이 진행)
  }

  // 요청 헤더에서 인증 정보 가져오기 (클라이언트에서 직접 전달된 경우)
  const authHeader = req.headers.get('authorization');
  const cookieHeader = req.headers.get('cookie');

  // 쿠키에서 모든 쿠키를 문자열로 구성
  const cookieString =
    allCookies.length > 0
      ? allCookies.map((cookie) => `${cookie.name}=${cookie.value}`).join('; ')
      : undefined;

  // Authorization 헤더 구성 (쿠키의 accessToken 우선, 없으면 요청 헤더 사용)
  const authorizationHeader = accessToken ? `Bearer ${accessToken}` : authHeader || undefined;

  // 쿠키 문자열 구성 (서버 쿠키와 요청 헤더 쿠키 병합)
  const finalCookieString =
    cookieString && cookieHeader
      ? `${cookieString}; ${cookieHeader}`
      : cookieString || cookieHeader || undefined;

  // URL에서 folder 쿼리 파라미터 가져오기
  const url = new URL(req.url);
  const folder = url.searchParams.get('folder') || 'products';

  // 허용된 폴더 검증
  const allowedFolders = ['products', 'users', 'companies', 'misc'];
  if (!allowedFolders.includes(folder)) {
    return NextResponse.json({ success: false, message: 'Invalid folder' }, { status: 400 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid form data' }, { status: 400 });
  }

  // 새로운 업로드 API로 프록시
  const target = new URL('/api/v1/upload/image', apiBase);
  target.searchParams.append('folder', folder);

  const timeout = getApiTimeout();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    // FormData를 전달할 때는 Content-Type 헤더를 설정하지 않음
    // 브라우저가 자동으로 boundary를 포함한 multipart/form-data를 설정함
    const headers: HeadersInit = {
      ...(authorizationHeader ? { Authorization: authorizationHeader } : {}),
      ...(finalCookieString ? { cookie: finalCookieString } : {}),
      // FormData는 Content-Type을 자동으로 설정하므로 명시적으로 설정하지 않음
    };

    const res = await fetch(target.toString(), {
      method: 'POST',
      headers,
      credentials: 'include',
      body: formData,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const text = await res.text();
    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }

    if (!res.ok) {
      return NextResponse.json(parsed, { status: res.status });
    }

    return NextResponse.json(parsed, { status: res.status });
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json({ success: false, message: 'Request timeout' }, { status: 504 });
    }
    return NextResponse.json(
      { success: false, message: 'Failed to upload image' },
      { status: 502 }
    );
  }
}

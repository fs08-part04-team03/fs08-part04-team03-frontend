import { NextResponse } from 'next/server';
import { getApiUrl } from '@/utils/api';

/** ===== 타입 정의 ===== */

type Product = {
  id: number;
  name: string;
  price: number;
  image?: string | null;
  categoryId?: number | null;
  salesCount?: number | null;
};

type Pagination = {
  totalPages: number;
};

type BackendListResponse<T> = {
  success: boolean;
  data: T[];
  pagination?: Pagination;
  message?: string;
};

type FetchPageResult<T> =
  | { ok: true; body: BackendListResponse<T> }
  | { ok: false; status: number; body: unknown };

/** ===== 공통 ===== */

const jsonParseSafe = (text: string): unknown => {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

/** ===== GET ===== */

export async function GET(req: Request) {
  const url = new URL(req.url);
  const { searchParams } = url;

  const apiBase = getApiUrl();

  const forwardHeaders: Record<string, string> = {};
  const authHeader = req.headers.get('authorization');
  const cookie = req.headers.get('cookie');
  if (authHeader) forwardHeaders.authorization = authHeader;
  if (cookie) forwardHeaders.cookie = cookie;

  const all = searchParams.get('all');
  const pageSize = Number(searchParams.get('limit') ?? 100);
  const sort = searchParams.get('sort') ?? undefined;
  const categoryId = searchParams.get('categoryId') ?? undefined;
  const q = searchParams.get('q') ?? undefined;

  const fetchPage = async (page: number): Promise<FetchPageResult<Product>> => {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('limit', String(pageSize));
    if (sort) params.set('sort', sort);
    if (categoryId) params.set('categoryId', categoryId);
    if (q) params.set('q', q);

    const target = new URL(`/api/v1/product?${params.toString()}`, apiBase);

    const res = await fetch(target.toString(), {
      method: 'GET',
      headers: {
        ...forwardHeaders,
        Accept: 'application/json',
      },
      // 5분간 캐시 유지 (TOO_MANY_REQUESTS 방지)
      next: { revalidate: 300 },
    });

    const text = await res.text();
    const parsed = jsonParseSafe(text);

    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        body: parsed,
      };
    }

    if (typeof parsed === 'object' && parsed !== null) {
      return {
        ok: true,
        body: parsed as BackendListResponse<Product>,
      };
    }

    return {
      ok: false,
      status: 500,
      body: parsed,
    };
  };

  /** ===== 전체 조회(all=true) ===== */
  if (all === 'true') {
    const first = await fetchPage(1);
    if (!first.ok) {
      return NextResponse.json(first.body, { status: first.status });
    }

    const totalPages = first.body.pagination?.totalPages ?? 1;

    const allData: Product[] = Array.isArray(first.body.data) ? [...first.body.data] : [];

    if (totalPages > 1) {
      const pages = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, i) => fetchPage(i + 2))
      );

      const failed = pages.find((p) => !p.ok);
      if (failed && !failed.ok) {
        return NextResponse.json(failed.body, {
          status: failed.status,
        });
      }

      pages
        .filter((p): p is { ok: true; body: BackendListResponse<Product> } => p.ok)
        .forEach((p) => {
          if (Array.isArray(p.body.data)) {
            allData.push(...p.body.data);
          }
        });
    }

    return NextResponse.json({
      success: true,
      data: allData,
      pagination: { totalPages: 1 },
      message: 'Aggregated product list',
    });
  }

  /** ===== 일반 프록시 ===== */
  const proxyParams = new URLSearchParams();
  const searchParamsForProxy = url.searchParams;

  // 허용된 쿼리 파라미터만 백엔드로 전달
  const allowedKeys = ['limit', 'sort', 'categoryId', 'page', 'all', 'q'];
  allowedKeys.forEach((key) => {
    const value = searchParamsForProxy.get(key);
    if (value !== null) {
      proxyParams.set(key, value);
    }
  });

  const target = new URL(`/api/v1/product?${proxyParams.toString()}`, apiBase);
  const res = await fetch(target.toString(), {
    method: 'GET',
    headers: {
      ...forwardHeaders,
      Accept: 'application/json',
    },
    // 5분간 캐시 유지 (TOO_MANY_REQUESTS 방지)
    next: { revalidate: 300 },
  });

  const text = await res.text();
  const parsed = jsonParseSafe(text);

  if (!res.ok) {
    return NextResponse.json(parsed, { status: res.status });
  }

  return NextResponse.json(parsed, { status: res.status });
}

/** ===== POST ===== */

export async function POST(req: Request) {
  const apiBase = getApiUrl();

  // 서버 사이드에서 쿠키 읽기 (Next.js cookies() API 사용)
  let accessToken: string | undefined;
  let allCookies: Array<{ name: string; value: string }> = [];

  try {
    const { cookies } = await import('next/headers');
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

  const contentType = req.headers.get('content-type') || '';
  const isFormData = contentType.includes('multipart/form-data');

  let body: unknown;
  let requestBody: BodyInit;
  const requestHeaders: HeadersInit = {
    ...(authorizationHeader ? { Authorization: authorizationHeader } : {}),
    ...(finalCookieString ? { cookie: finalCookieString } : {}),
    Accept: 'application/json',
  };

  if (isFormData) {
    // FormData인 경우 그대로 전달
    body = await req.formData();
    requestBody = body as FormData;
    // FormData는 Content-Type을 자동으로 설정하므로 명시하지 않음
  } else {
    // JSON인 경우
    try {
      body = await req.json();
      requestBody = JSON.stringify(body);
      requestHeaders['Content-Type'] = 'application/json';
    } catch {
      return NextResponse.json({ success: false, message: 'Invalid JSON' }, { status: 400 });
    }
  }

  const target = new URL('/api/v1/product', apiBase);

  // 개발 환경에서 디버깅 로그
  if (process.env.NODE_ENV === 'development') {
    console.log('[Product POST] Request details:', {
      targetUrl: target.toString(),
      hasAuth: !!authorizationHeader,
      hasCookies: !!finalCookieString,
      isFormData,
    });
  }

  // PATCH 요청도 처리 (상품 수정)
  const isPatch = req.method === 'PATCH';
  const targetUrl = isPatch
    ? new URL(
        `/api/v1/product/${(req as unknown as { params?: { id?: string } })?.params?.id || ''}`,
        apiBase
      )
    : target;

  // PATCH 요청 시 URL 파라미터 확인
  if (isPatch && process.env.NODE_ENV === 'development') {
    const urlParts = req.url.split('/');
    const productIdIndex = urlParts.indexOf('product') + 1;
    const productId = urlParts[productIdIndex];
    console.log('[Product PATCH] Request details:', {
      targetUrl: targetUrl.toString(),
      productId,
      hasAuth: !!authorizationHeader,
      hasCookies: !!finalCookieString,
      isFormData,
      formDataEntries: isFormData ? 'FormData' : 'JSON',
    });
  }

  const res = await fetch(targetUrl.toString(), {
    method: isPatch ? 'PATCH' : 'POST',
    headers: requestHeaders,
    body: requestBody,
    credentials: 'include',
  });

  const text = await res.text();
  const parsed = jsonParseSafe(text);

  // 개발 환경에서 에러 로깅
  if (!res.ok && process.env.NODE_ENV === 'development') {
    console.error(`[Product ${isPatch ? 'PATCH' : 'POST'}] Backend error:`, {
      status: res.status,
      statusText: res.statusText,
      responseText: text.substring(0, 500), // 처음 500자만
      targetUrl: targetUrl.toString(),
      hasAuth: !!authorizationHeader,
    });
  }

  // 개발 환경에서 성공 응답 로깅
  if (res.ok && process.env.NODE_ENV === 'development' && isPatch) {
    console.log('[Product PATCH] Backend success:', {
      status: res.status,
      hasResponseData: !!text,
      responsePreview:
        typeof parsed === 'object' && parsed !== null
          ? JSON.stringify(parsed).substring(0, 300)
          : String(parsed).substring(0, 300),
    });
  }

  if (!res.ok) {
    return NextResponse.json(parsed, { status: res.status });
  }

  return NextResponse.json(parsed, { status: res.status });
}

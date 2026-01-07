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

  const authHeader = req.headers.get('authorization');
  const cookie = req.headers.get('cookie');

  const contentType = req.headers.get('content-type') || '';
  const isFormData = contentType.includes('multipart/form-data');

  let body: unknown;
  let requestBody: BodyInit;
  const requestHeaders: HeadersInit = {
    ...(authHeader ? { Authorization: authHeader } : {}),
    ...(cookie ? { cookie } : {}),
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

  const res = await fetch(target.toString(), {
    method: 'POST',
    headers: requestHeaders,
    body: requestBody,
  });

  const text = await res.text();
  const parsed = jsonParseSafe(text);

  if (!res.ok) {
    return NextResponse.json(parsed, { status: res.status });
  }

  return NextResponse.json(parsed, { status: res.status });
}

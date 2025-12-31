import { NextResponse } from 'next/server';
import { getApiUrl } from '@/utils/api';

export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

interface Pagination {
  totalPages: number;
}

interface ApiResponse<T> {
  success: boolean;
  data: T[];
  pagination?: Pagination;
  message?: string;
}

// JSON을 안전하게 Product[] 타입으로 변환하는 타입 가드
function isProductArray(data: unknown): data is Product[] {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        typeof item === 'object' &&
        item !== null &&
        'id' in item &&
        'name' in item &&
        'price' in item
    )
  );
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const apiBase = getApiUrl();
  const forwardHeaders: Record<string, string> = {};
  const authHeader = req.headers.get('authorization');
  const cookie = req.headers.get('cookie');
  if (authHeader) forwardHeaders.authorization = authHeader;
  if (cookie) forwardHeaders.cookie = cookie;

  const all = url.searchParams.get('all');
  const pageSize = Number(url.searchParams.get('limit') ?? 100);
  const sort = url.searchParams.get('sort') ?? undefined;
  const categoryId = url.searchParams.get('categoryId') ?? undefined;

  const fetchPage = async (
    page: number
  ): Promise<ApiResponse<Product> & { ok: boolean; status?: number }> => {
    const params = new URLSearchParams({ page: String(page), limit: String(pageSize) });
    if (sort) params.set('sort', sort);
    if (categoryId) params.set('categoryId', categoryId);

    const target = new URL(`/api/v1/product?${params.toString()}`, apiBase);
    const res = await fetch(target.toString(), {
      method: 'GET',
      headers: { ...forwardHeaders, Accept: 'application/json' },
    });

    const text = await res.text();

    try {
      const json: unknown = JSON.parse(text);
      const { data } = json as ApiResponse<unknown>;
      return {
        ok: res.ok,
        status: res.status,
        success: (json as ApiResponse<unknown>).success ?? false,
        data: isProductArray(data) ? data : [],
        pagination: (json as ApiResponse<unknown>).pagination,
        message: (json as ApiResponse<unknown>).message,
      };
    } catch {
      return { ok: false, status: res.status, success: false, data: [], message: text };
    }
  };

  if (all === 'true') {
    const first = await fetchPage(1);
    if (!first.ok) return NextResponse.json(first, { status: first.status ?? 500 });

    const totalPages = first.pagination?.totalPages ?? 1;
    const allData: Product[] = [...first.data];

    if (totalPages > 1) {
      const pages = await Promise.all(
        Array.from({ length: totalPages - 1 }, (_, i) => fetchPage(i + 2))
      );
      pages.forEach((page) => {
        if (page.ok) allData.push(...page.data);
      });
    }

    return NextResponse.json({
      success: true,
      data: allData,
      pagination: { total: allData.length },
      message: 'Aggregated product list',
    });
  }

  // 단일 페이지 처리
  const target = new URL(`/api/v1/product${url.search}`, apiBase);
  const res = await fetch(target.toString(), {
    method: 'GET',
    headers: { ...forwardHeaders, Accept: 'application/json' },
  });

  const text = await res.text();
  try {
    const json: unknown = JSON.parse(text);
    return NextResponse.json(json, { status: res.status });
  } catch {
    return new Response(text, {
      status: res.status,
      headers: { 'content-type': res.headers.get('content-type') ?? 'application/json' },
    });
  }
}

export async function POST(req: Request) {
  const apiBase = getApiUrl();
  const authHeader = req.headers.get('authorization');
  const cookie = req.headers.get('cookie');

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid JSON' }, { status: 400 });
  }

  if (!isProductArray([body])) {
    return NextResponse.json({ success: false, message: 'Invalid Product data' }, { status: 400 });
  }

  const target = new URL('/api/v1/product', apiBase);
  const res = await fetch(target.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(authHeader ? { Authorization: authHeader } : {}),
      ...(cookie ? { cookie } : {}),
      Accept: 'application/json',
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  try {
    const json: unknown = JSON.parse(text);
    return NextResponse.json(json, { status: res.status });
  } catch {
    return new Response(text, {
      status: res.status,
      headers: { 'content-type': res.headers.get('content-type') ?? 'text/plain' },
    });
  }
}

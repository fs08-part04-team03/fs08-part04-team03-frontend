import { NextResponse } from 'next/server';
import { getApiUrl } from '@/utils/api';

/**
 * 이미지 URL 조회 프록시
 * GET /api/product/image/{key}
 */
export async function GET(req: Request, { params }: { params: Promise<{ key: string }> }) {
  const { key } = await params;

  if (!key) {
    return NextResponse.json(
      { success: false, message: 'key parameter is required' },
      { status: 400 }
    );
  }

  // 기본적인 입력 검증
  if (key.includes('..') || key.startsWith('/') || key.includes('\\')) {
    return NextResponse.json({ success: false, message: 'Invalid key format' }, { status: 400 });
  }

  // 허용된 폴더 prefix 검증 (선택적)
  const allowedPrefixes = ['products/', 'users/', 'companies/', 'misc/'];
  if (!allowedPrefixes.some((prefix) => key.startsWith(prefix))) {
    return NextResponse.json({ success: false, message: 'Invalid key prefix' }, { status: 400 });
  }

  const apiBase = getApiUrl();
  const authHeader = req.headers.get('authorization');
  const cookie = req.headers.get('cookie');

  // 키를 URL 인코딩하여 백엔드로 전달
  const encodedKey = encodeURIComponent(key);

  const target = new URL(`/api/v1/upload/image/${encodedKey}`, apiBase);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30초 타임아웃

  try {
    const res = await fetch(target.toString(), {
      method: 'GET',
      headers: {
        ...(authHeader ? { Authorization: authHeader } : {}),
        ...(cookie ? { cookie } : {}),
      },
      credentials: 'include',
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
    return NextResponse.json({ success: false, message: 'Failed to fetch image' }, { status: 502 });
  }
}

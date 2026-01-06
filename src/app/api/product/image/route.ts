import { NextResponse } from 'next/server';
import { getApiUrl } from '@/utils/api';

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

  // 기본적인 입력 검증
  if (imageKey.includes('..') || imageKey.startsWith('/') || imageKey.includes('\\')) {
    return NextResponse.json({ success: false, message: 'Invalid key format' }, { status: 400 });
  }

  // 허용된 폴더 prefix 검증
  const allowedPrefixes = ['products/', 'users/', 'companies/', 'misc/'];
  if (!allowedPrefixes.some((prefix) => imageKey.startsWith(prefix))) {
    return NextResponse.json({ success: false, message: 'Invalid key prefix' }, { status: 400 });
  }

  const apiBase = getApiUrl();
  const authHeader = req.headers.get('authorization');
  const cookie = req.headers.get('cookie');

  // 키를 URL 인코딩하여 백엔드로 전달
  const encodedKey = encodeURIComponent(imageKey);

  const target = new URL(`/api/v1/upload/image/${encodedKey}`, apiBase);

  const res = await fetch(target.toString(), {
    method: 'GET',
    headers: {
      ...(authHeader ? { Authorization: authHeader } : {}),
      ...(cookie ? { cookie } : {}),
    },
    credentials: 'include',
  });

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
}

/**
 * 이미지 업로드 (S3) - 레거시 엔드포인트
 * POST /api/product/image
 * @deprecated 새로운 /api/v1/upload/image API를 직접 사용하세요
 */
export async function POST(req: Request) {
  const apiBase = getApiUrl();

  const authHeader = req.headers.get('authorization');
  const cookie = req.headers.get('cookie');

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

  const res = await fetch(target.toString(), {
    method: 'POST',
    headers: {
      ...(authHeader ? { Authorization: authHeader } : {}),
      ...(cookie ? { cookie } : {}),
    },
    credentials: 'include',
    body: formData,
  });

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
}

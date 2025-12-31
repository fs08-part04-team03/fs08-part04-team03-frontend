import { NextResponse } from 'next/server';

/**
 * Image proxy is disabled.
 * All images are served directly from backend uploads.
 */
export function GET() {
  return NextResponse.json({ success: false, message: 'image proxy disabled' }, { status: 410 });
}

import { NextResponse } from 'next/server';

interface ChatRequestBody {
  message: string;
}

export async function POST(req: Request) {
  const body = (await req.json()) as ChatRequestBody;

  return NextResponse.json({
    reply: `서버 응답: ${body.message}`,
  });
}

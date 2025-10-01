import { NextRequest, NextResponse } from 'next/server';

// Minimal proxy placeholder to keep FAL_API_KEY server-side
export async function POST(req: NextRequest) {
  const apiKey = process.env.FAL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'FAL_API_KEY not configured' }, { status: 500 });
  }

  const body = await req.json();
  const { endpoint, payload } = body ?? {};
  if (!endpoint) {
    return NextResponse.json({ error: 'Missing endpoint' }, { status: 400 });
  }

  const resp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Key ${apiKey}`
    },
    body: JSON.stringify(payload ?? {})
  });

  const contentType = resp.headers.get('content-type') || 'application/json';
  const data = contentType.includes('application/json') ? await resp.json() : await resp.text();
  return NextResponse.json({ ok: resp.ok, status: resp.status, data });
}

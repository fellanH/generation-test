import { NextResponse } from "next/server";

// Minimal proxy that forwards requests to Fal.ai, injecting API key server-side.
export async function POST(request: Request) {
  const falApiKey = process.env.FAL_API_KEY;
  if (!falApiKey) {
    return NextResponse.json(
      { error: "Server misconfigured: missing FAL_API_KEY" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { url, payload } = body as { url: string; payload: unknown };
    if (!url) {
      return NextResponse.json({ error: "Missing url" }, { status: 400 });
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Key ${falApiKey}`,
      },
      body: JSON.stringify(payload ?? {}),
    });

    const data = await response.json().catch(() => ({}));
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to proxy request" },
      { status: 500 }
    );
  }
}


import { NextResponse, type NextRequest } from "next/server";

const AUTH_PATHS = new Set(["/login", "/signup"]);
const PROTECTED_PREFIXES = ["/app", "/gallery"];

export function middleware(request: NextRequest) {
  // Skip static and API routes by default
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Read auth cookie set by Supabase (@supabase/ssr uses `sb:token` cookies)
  const hasSession = Boolean(
    request.cookies.get("sb-access-token") || request.cookies.get("sb:token")
  );

  const isAuthRoute = AUTH_PATHS.has(pathname);
  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));

  if (!hasSession && isProtected) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  if (hasSession && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/app";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|images|public).*)",
  ],
};


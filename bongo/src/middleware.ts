import { NextResponse, NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const supabaseToken = req.cookies.get('sb-access-token')?.value
  const isAuthRoute = req.nextUrl.pathname.startsWith('/auth')
  const isDashboard = req.nextUrl.pathname.startsWith('/dashboard')

  if (!supabaseToken && isDashboard) {
    const url = req.nextUrl.clone()
    url.pathname = '/auth/login'
    url.searchParams.set('redirectedFrom', req.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  if (supabaseToken && isAuthRoute) {
    const url = req.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/:path*']
}


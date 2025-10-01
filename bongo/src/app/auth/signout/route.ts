import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

export async function POST() {
  const supabase = createRouteHandlerClient({ cookies, headers });
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL('/auth', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'));
}


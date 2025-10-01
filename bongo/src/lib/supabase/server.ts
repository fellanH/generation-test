import { createRouteHandlerClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies, headers } from 'next/headers';

export function getServerSupabase() {
  return createServerComponentClient({ cookies });
}

export function getRouteSupabase() {
  return createRouteHandlerClient({ cookies, headers });
}


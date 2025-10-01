"use client";

import { createBrowserClient, type SupabaseClient } from "@supabase/ssr";

/**
 * Creates a browser Supabase client instance using public env variables.
 * This should only be used in Client Components.
 */
export function createClient(): SupabaseClient {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Check your environment variables."
    );
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}


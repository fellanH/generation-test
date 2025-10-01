'use client';

import { useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/lib/supabase/client';

export default function Protected({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthed(Boolean(data.session));
      setLoading(false);
    });
  }, []);

  if (loading) return <p className="text-sm text-gray-600">Checking session…</p>;
  if (!isAuthed) {
    if (typeof window !== 'undefined') window.location.href = '/login';
    return null;
  }
  return <>{children}</>;
}


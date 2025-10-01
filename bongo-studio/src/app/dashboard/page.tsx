import { createSupabaseServerClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="py-12">
        <p className="text-zinc-400">
          You must be signed in to view the dashboard.{' '}
          <Link className="text-indigo-400" href="/login">
            Sign in
          </Link>
        </p>
      </main>
    );
  }

  return (
    <main className="py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <form action="/api/auth/signout" method="post">
          <button className="rounded-md border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-sm">Sign out</button>
        </form>
      </div>
      <p className="text-zinc-400">Welcome, {user.email}</p>
    </main>
  );
}

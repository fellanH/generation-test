import { createSupabaseServerClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <form action="/auth/signout" method="post">
          <button className="text-sm underline">Sign out</button>
        </form>
      </div>
      <p className="mt-4 text-gray-700">Welcome {user?.email}</p>
      <div className="mt-8">
        <Link className="px-4 py-2 rounded bg-black text-white" href="/gallery">Go to Gallery</Link>
      </div>
    </main>
  )
}


import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function GalleryPage() {
  const supabase = createSupabaseServerClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: assets } = await supabase
    .from('assets')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <main className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold">Your Gallery</h1>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {assets?.map(asset => (
          <div key={asset.id} className="border rounded overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset.public_url} alt="asset" className="w-full h-48 object-cover" />
            <div className="p-3 text-sm flex justify-between">
              <a href={asset.public_url} download className="underline">Download</a>
              <a href={asset.public_url} target="_blank" rel="noreferrer" className="underline">Open</a>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}


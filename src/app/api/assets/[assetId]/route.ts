import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

export async function DELETE(
  request: Request,
  { params }: { params: { assetId: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { assetId } = params

    // Get asset to verify ownership and get storage path
    const { data: asset, error: fetchError } = await supabase
      .from('assets')
      .select('*')
      .eq('id', assetId)
      .eq('user_id', user.id)
      .single()

    if (fetchError || !asset) {
      return NextResponse.json(
        { error: 'Asset not found' },
        { status: 404 }
      )
    }

    // Delete from storage
    const { error: storageError } = await supabase.storage
      .from('assets')
      .remove([asset.storage_path])

    if (storageError) {
      console.error('Storage deletion error:', storageError)
    }

    // Delete from database
    const { error: dbError } = await supabase
      .from('assets')
      .delete()
      .eq('id', assetId)
      .eq('user_id', user.id)

    if (dbError) {
      console.error('Database deletion error:', dbError)
      return NextResponse.json(
        { error: 'Failed to delete asset' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Asset deleted successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Asset deletion error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete asset' },
      { status: 500 }
    )
  }
}

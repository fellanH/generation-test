import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import type { Database } from '@/types/database'

const MAX_RETRIES = 3
const RETRY_DELAY = 1000

async function downloadAsset(url: string, retries = MAX_RETRIES): Promise<Blob> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to download: ${response.statusText}`)
    }
    return await response.blob()
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      return downloadAsset(url, retries - 1)
    }
    throw error
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { jobId, assetUrl, assetType, metadata } = await request.json()

    if (!jobId || !assetUrl || !assetType) {
      return NextResponse.json(
        { error: 'Job ID, asset URL, and asset type are required' },
        { status: 400 }
      )
    }

    // Download asset from Fal.ai CDN
    const blob = await downloadAsset(assetUrl)
    
    // Generate unique storage path
    const fileExtension = assetUrl.split('.').pop()?.split('?')[0] || 'png'
    const fileName = `${Date.now()}-${crypto.randomUUID()}.${fileExtension}`
    const storagePath = `${user.id}/${fileName}`

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('assets')
      .upload(storagePath, blob, {
        contentType: blob.type,
        cacheControl: '3600',
        upsert: false,
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      return NextResponse.json(
        { error: 'Failed to upload asset' },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('assets')
      .getPublicUrl(storagePath)

    // Save asset metadata to database
    const { data: asset, error: dbError } = await supabase
      .from('assets')
      .insert({
        user_id: user.id,
        job_id: jobId,
        asset_type: assetType,
        original_url: assetUrl,
        storage_path: storagePath,
        storage_url: publicUrl,
        file_size: blob.size,
        width: metadata?.width || null,
        height: metadata?.height || null,
        duration: metadata?.duration || null,
        metadata: metadata || null,
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save asset metadata' },
        { status: 500 }
      )
    }

    return NextResponse.json({ asset }, { status: 200 })
  } catch (error: any) {
    console.error('Asset transfer error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to transfer asset' },
      { status: 500 }
    )
  }
}

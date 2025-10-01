import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient, createAdminClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { generateId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient(cookieStore)
    const adminSupabase = createAdminClient()
    
    // Verify user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { jobId, result } = await request.json()

    if (!jobId || !result) {
      return NextResponse.json(
        { error: 'Job ID and result are required' },
        { status: 400 }
      )
    }

    // Get job details
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .eq('user_id', user.id)
      .single()

    if (jobError || !job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    const transferredAssets = []

    // Process each image in the result
    if (result.images && Array.isArray(result.images)) {
      for (const [index, image] of result.images.entries()) {
        try {
          // Download image from Fal.ai CDN
          const imageResponse = await fetch(image.url)
          if (!imageResponse.ok) {
            throw new Error(`Failed to download image: ${imageResponse.statusText}`)
          }

          const imageBuffer = await imageResponse.arrayBuffer()
          const fileExtension = image.content_type?.split('/')[1] || 'png'
          const fileName = `${user.id}/${jobId}/${generateId()}.${fileExtension}`

          // Upload to Supabase Storage
          const { data: uploadData, error: uploadError } = await adminSupabase.storage
            .from('assets')
            .upload(fileName, imageBuffer, {
              contentType: image.content_type || 'image/png',
              upsert: false,
            })

          if (uploadError) {
            throw new Error(`Failed to upload image: ${uploadError.message}`)
          }

          // Get public URL
          const { data: publicUrlData } = adminSupabase.storage
            .from('assets')
            .getPublicUrl(fileName)

          // Save asset metadata to database
          const assetId = generateId()
          const { error: assetError } = await supabase
            .from('assets')
            .insert({
              id: assetId,
              user_id: user.id,
              fal_job_id: job.fal_job_id,
              model_name: job.model_name,
              prompt: job.parameters.prompt || '',
              parameters: job.parameters,
              original_url: image.url,
              storage_path: fileName,
              public_url: publicUrlData.publicUrl,
              file_size: imageBuffer.byteLength,
              file_type: image.content_type || 'image/png',
              width: image.width,
              height: image.height,
              status: 'completed',
            })

          if (assetError) {
            console.error('Error saving asset metadata:', assetError)
            // Continue with other assets even if one fails
          } else {
            transferredAssets.push({
              id: assetId,
              publicUrl: publicUrlData.publicUrl,
              originalUrl: image.url,
            })
          }
        } catch (error) {
          console.error(`Error processing image ${index}:`, error)
          // Continue with other assets
        }
      }
    }

    return NextResponse.json({
      success: true,
      transferredAssets,
      message: `Successfully transferred ${transferredAssets.length} assets`,
    })
  } catch (error: any) {
    console.error('Error transferring assets:', error)
    return NextResponse.json(
      { error: 'Failed to transfer assets' },
      { status: 500 }
    )
  }
}
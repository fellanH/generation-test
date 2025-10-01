import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const webhookData = await request.json()
    const { request_id, status } = webhookData

    if (!request_id) {
      return NextResponse.json(
        { success: false, error: 'Missing request_id' },
        { status: 400 }
      )
    }

    // Find the asset by fal_job_id
    const { data: asset, error: fetchError } = await supabaseAdmin
      .from('assets')
      .select('*')
      .eq('fal_job_id', request_id)
      .single()

    if (fetchError || !asset) {
      console.error('Asset not found for job:', request_id)
      return NextResponse.json(
        { success: false, error: 'Asset not found' },
        { status: 404 }
      )
    }

    const updateData: Record<string, unknown> = {
      status: status === 'COMPLETED' ? 'completed' : 
              status === 'FAILED' ? 'failed' : 'processing',
      updated_at: new Date().toISOString()
    }

    // If completed, process the result
    if (status === 'COMPLETED' && webhookData.images && webhookData.images.length > 0) {
      const imageUrl = webhookData.images[0].url
      
      try {
        // Download image from Fal.ai CDN
        const imageResponse = await fetch(imageUrl)
        if (!imageResponse.ok) {
          throw new Error('Failed to download image')
        }

        const imageBuffer = await imageResponse.arrayBuffer()
        const fileName = `asset-${asset.id}-${Date.now()}.png`
        
        // Upload to Supabase Storage
        const { error: uploadError } = await supabaseAdmin.storage
          .from('assets')
          .upload(fileName, imageBuffer, {
            contentType: 'image/png',
            upsert: false
          })

        if (uploadError) {
          throw new Error('Failed to upload to storage')
        }

        // Get public URL
        const { data: urlData } = supabaseAdmin.storage
          .from('assets')
          .getPublicUrl(fileName)

        updateData.result_url = imageUrl
        updateData.storage_url = urlData.publicUrl

        // Calculate cost (simplified)
        updateData.cost = 0.0001 // Base cost for image generation

      } catch (error) {
        console.error('Error processing completed job:', error)
        updateData.status = 'failed'
        updateData.error = 'Failed to process result'
      }
    }

    // Update the asset
    const { error: updateError } = await supabaseAdmin
      .from('assets')
      .update(updateData)
      .eq('id', asset.id)

    if (updateError) {
      console.error('Database update error:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to update asset' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Webhook processed successfully'
    })

  } catch (error) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
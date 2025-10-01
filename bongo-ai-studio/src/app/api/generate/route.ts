import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { createClient } from '@supabase/supabase-js'

const FAL_API_URL = 'https://fal.run/fal-ai'

export async function POST(request: NextRequest) {
  try {
    const { model, inputs } = await request.json()

    if (!model || !inputs) {
      return NextResponse.json(
        { success: false, error: 'Missing model or inputs' },
        { status: 400 }
      )
    }

    // Get user from session
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const authHeader = request.headers.get('authorization')
    if (!authHeader) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const token = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(token)

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Submit job to Fal.ai
    const falResponse = await fetch(`${FAL_API_URL}/${model}`, {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.FAL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs,
        webhook_url: `${process.env.NEXTAUTH_URL}/api/webhooks/fal`
      }),
    })

    if (!falResponse.ok) {
      const errorData = await falResponse.json()
      return NextResponse.json(
        { success: false, error: errorData.detail || 'Failed to submit job' },
        { status: falResponse.status }
      )
    }

    const falData = await falResponse.json()
    const jobId = falData.request_id

    // Save job to database
    const { data: asset, error: dbError } = await supabaseAdmin
      .from('assets')
      .insert({
        user_id: user.id,
        fal_job_id: jobId,
        model_name: model,
        model_version: 'latest',
        prompt: inputs.prompt || null,
        parameters: inputs,
        status: 'pending'
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { success: false, error: 'Failed to save job' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      jobId: asset.id,
      falJobId: jobId
    })

  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
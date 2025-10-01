import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { fal } from '@/lib/fal/client'
import type { Database } from '@/types/database'

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { modelId, input } = await request.json()

    if (!modelId || !input) {
      return NextResponse.json(
        { error: 'Model ID and input are required' },
        { status: 400 }
      )
    }

    // Submit job to Fal.ai
    const result = await fal.subscribe(modelId, {
      input,
      logs: true,
      onQueueUpdate: (update) => {
        console.log('Queue update:', update)
      },
    })

    // Create job record in database
    const { data: job, error: dbError } = await supabase
      .from('jobs')
      .insert({
        user_id: user.id,
        fal_request_id: result.requestId || crypto.randomUUID(),
        model_id: modelId,
        status: 'completed',
        input_params: input,
        output_data: result,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save job' },
        { status: 500 }
      )
    }

    return NextResponse.json({ job, result }, { status: 200 })
  } catch (error: any) {
    console.error('Fal.ai submission error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to submit job' },
      { status: 500 }
    )
  }
}

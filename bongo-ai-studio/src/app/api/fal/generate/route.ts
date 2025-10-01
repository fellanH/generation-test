import { NextRequest, NextResponse } from 'next/server'
import { FalClient } from '@/lib/fal-client'
import { createRouteHandlerClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { generateId } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient(cookieStore)
    
    // Verify user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { modelId, parameters } = await request.json()

    if (!modelId || !parameters) {
      return NextResponse.json(
        { error: 'Model ID and parameters are required' },
        { status: 400 }
      )
    }

    const falClient = new FalClient(process.env.FAL_AI_API_KEY!)
    const response = await falClient.submitJob(modelId, parameters)
    
    // Store job in database
    const jobId = generateId()
    const { error: dbError } = await supabase
      .from('jobs')
      .insert({
        id: jobId,
        user_id: user.id,
        fal_job_id: response.request_id,
        model_name: modelId,
        status: 'queued',
        parameters,
      })

    if (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Failed to store job' },
        { status: 500 }
      )
    }
    
    return NextResponse.json({
      jobId,
      falJobId: response.request_id,
      status: response.status,
    })
  } catch (error: any) {
    console.error('Error submitting job:', error)
    return NextResponse.json(
      { error: 'Failed to submit job' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { FalClient } from '@/lib/fal-client'
import { createRouteHandlerClient } from '@/lib/supabase'
import { cookies } from 'next/headers'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient(cookieStore)
    
    // Verify user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const jobId = params.id

    // Get job from database
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .eq('user_id', user.id)
      .single()

    if (jobError || !job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    // If job is not completed, check status with Fal.ai
    if (job.status !== 'completed' && job.status !== 'failed') {
      const falClient = new FalClient(process.env.FAL_AI_API_KEY!)
      const falResponse = await falClient.getJobStatus(job.fal_job_id)
      
      let newStatus = job.status
      let result = job.result
      let errorMessage = job.error_message

      switch (falResponse.status) {
        case 'COMPLETED':
          newStatus = 'completed'
          result = falResponse.result
          break
        case 'FAILED':
          newStatus = 'failed'
          errorMessage = falResponse.error || 'Job failed'
          break
        case 'IN_PROGRESS':
          newStatus = 'processing'
          break
        default:
          newStatus = 'queued'
      }

      // Update job in database if status changed
      if (newStatus !== job.status) {
        const { error: updateError } = await supabase
          .from('jobs')
          .update({
            status: newStatus,
            result,
            error_message: errorMessage,
            updated_at: new Date().toISOString(),
          })
          .eq('id', jobId)

        if (updateError) {
          console.error('Error updating job:', updateError)
        }
      }

      return NextResponse.json({
        id: job.id,
        status: newStatus,
        result,
        error: errorMessage,
        modelName: job.model_name,
        parameters: job.parameters,
        createdAt: job.created_at,
        updatedAt: job.updated_at,
      })
    }

    return NextResponse.json({
      id: job.id,
      status: job.status,
      result: job.result,
      error: job.error_message,
      modelName: job.model_name,
      parameters: job.parameters,
      createdAt: job.created_at,
      updatedAt: job.updated_at,
    })
  } catch (error: any) {
    console.error('Error fetching job status:', error)
    return NextResponse.json(
      { error: 'Failed to fetch job status' },
      { status: 500 }
    )
  }
}
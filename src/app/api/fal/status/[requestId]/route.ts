import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { fal } from '@/lib/fal/client'
import type { Database } from '@/types/database'

export async function GET(
  request: Request,
  { params }: { params: { requestId: string } }
) {
  try {
    const supabase = createRouteHandlerClient<Database>({ cookies })
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { requestId } = params

    // Get job status from Fal.ai
    const status = await fal.queue.status(requestId, { logs: true })

    // Update job in database
    await supabase
      .from('jobs')
      .update({
        status: status.status,
        output_data: status.responseData || null,
        error_message: status.error || null,
      })
      .eq('fal_request_id', requestId)
      .eq('user_id', user.id)

    return NextResponse.json(status, { status: 200 })
  } catch (error: any) {
    console.error('Status check error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to check status' },
      { status: 500 }
    )
  }
}

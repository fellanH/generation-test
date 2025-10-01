import { NextRequest, NextResponse } from 'next/server'
import { FalClient } from '@/lib/fal-client'
import { createRouteHandlerClient } from '@/lib/supabase'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient(cookieStore)
    
    // Verify user authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const falClient = new FalClient(process.env.FAL_AI_API_KEY!)
    const models = await falClient.listModels()
    
    return NextResponse.json({ models })
  } catch (error: any) {
    console.error('Error fetching models:', error)
    return NextResponse.json(
      { error: 'Failed to fetch models' },
      { status: 500 }
    )
  }
}
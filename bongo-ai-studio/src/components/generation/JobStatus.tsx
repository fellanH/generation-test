'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, CheckCircle, XCircle, Clock, Download } from 'lucide-react'

interface JobStatusProps {
  jobId?: string | null
  onJobComplete?: (assetId: string) => void
}

interface JobData {
  id: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress?: number
  result_url?: string
  storage_url?: string
  error?: string
  created_at: string
}

export function JobStatus({ jobId, onJobComplete }: JobStatusProps) {
  const [job, setJob] = useState<JobData | null>(null)

  useEffect(() => {
    if (!jobId) {
      setJob(null)
      return
    }

    const pollJobStatus = async () => {
      try {
        // Get auth token
        const { data: { session } } = await supabase.auth.getSession()
        if (!session) return

        const response = await fetch(`/api/jobs/${jobId}`, {
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
        })
        const data = await response.json()

        if (data.success) {
          setJob(data.job)
          
          if (data.job.status === 'completed' && data.job.storage_url) {
            onJobComplete?.(data.job.id)
          }
        }
      } catch (error) {
        console.error('Failed to fetch job status:', error)
      }
    }

    // Poll immediately
    pollJobStatus()

    // Set up polling interval
    const interval = setInterval(pollJobStatus, 2000)

    return () => clearInterval(interval)
  }, [jobId, onJobComplete])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />
      case 'processing':
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const handleDownload = () => {
    if (job?.storage_url) {
      window.open(job.storage_url, '_blank')
    }
  }

  if (!job) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Job Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            No active job
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Job Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon(job.status)}
            <Badge className={getStatusColor(job.status)}>
              {job.status}
            </Badge>
          </div>
          <span className="text-xs text-gray-500">
            {new Date(job.created_at).toLocaleTimeString()}
          </span>
        </div>

        {job.status === 'processing' && job.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Progress</span>
              <span>{job.progress}%</span>
            </div>
            <Progress value={job.progress} className="h-2" />
          </div>
        )}

        {job.status === 'failed' && job.error && (
          <Alert variant="destructive">
            <AlertDescription>{job.error}</AlertDescription>
          </Alert>
        )}

        {job.status === 'completed' && job.storage_url && (
          <div className="space-y-2">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Generation completed successfully!
              </AlertDescription>
            </Alert>
            <Button 
              onClick={handleDownload}
              size="sm" 
              className="w-full"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Result
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
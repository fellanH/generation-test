'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatDate } from '@/lib/utils'

interface JobStatusProps {
  jobId: string
  onComplete?: (result: any) => void
}

export function JobStatus({ jobId, onComplete }: JobStatusProps) {
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [transferring, setTransferring] = useState(false)
  const [transferred, setTransferred] = useState(false)

  const transferAssets = async (jobId: string, result: any) => {
    if (transferring || transferred) return
    
    setTransferring(true)
    try {
      const response = await fetch('/api/assets/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId, result }),
      })

      if (response.ok) {
        setTransferred(true)
      } else {
        console.error('Failed to transfer assets')
      }
    } catch (error) {
      console.error('Error transferring assets:', error)
    } finally {
      setTransferring(false)
    }
  }

  useEffect(() => {
    if (!jobId) return

    const fetchJobStatus = async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch job status')
        }
        const data = await response.json()
        setJob(data)
        
        if (data.status === 'completed' && data.result) {
          // Trigger asset transfer
          if (data.result.images && data.result.images.length > 0) {
            transferAssets(jobId, data.result)
          }
          
          if (onComplete) {
            onComplete(data.result)
          }
        }
      } catch (error: any) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchJobStatus()

    // Poll for updates if job is not completed
    const interval = setInterval(() => {
      if (job?.status === 'completed' || job?.status === 'failed') {
        clearInterval(interval)
        return
      }
      fetchJobStatus()
    }, 2000)

    return () => clearInterval(interval)
  }, [jobId, job?.status, onComplete])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'failed':
        return 'text-red-600 bg-red-100'
      case 'processing':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-yellow-600 bg-yellow-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'queued':
        return 'Queued'
      case 'processing':
        return 'Processing'
      case 'completed':
        return 'Completed'
      case 'failed':
        return 'Failed'
      default:
        return 'Unknown'
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-red-600">Error: {error}</p>
        </CardContent>
      </Card>
    )
  }

  if (!job) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Job Status
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
            {getStatusText(job.status)}
          </span>
        </CardTitle>
        <CardDescription>
          Model: {job.modelName}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">Created: {formatDate(job.createdAt)}</p>
          {job.updatedAt !== job.createdAt && (
            <p className="text-sm text-gray-600">Updated: {formatDate(job.updatedAt)}</p>
          )}
        </div>

        {job.status === 'processing' && (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-sm text-gray-600">Processing your request...</span>
          </div>
        )}

        {job.status === 'failed' && job.error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-red-800 text-sm">{job.error}</p>
          </div>
        )}

        {job.status === 'completed' && job.result && (
          <div className="bg-green-50 border border-green-200 rounded-md p-3">
            <p className="text-green-800 text-sm font-medium">Generation completed successfully!</p>
            
            {transferring && (
              <div className="mt-2 flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                <span className="text-sm text-green-700">Saving to your gallery...</span>
              </div>
            )}
            
            {transferred && (
              <div className="mt-2 text-sm text-green-700">
                ✓ Assets saved to your gallery
              </div>
            )}
            
            {job.result.images && job.result.images.length > 0 && (
              <div className="mt-2 grid grid-cols-1 gap-2">
                {job.result.images.map((image: any, index: number) => (
                  <div key={index} className="relative">
                    <img
                      src={image.url}
                      alt={`Generated image ${index + 1}`}
                      className="w-full h-auto rounded-md"
                    />
                    <div className="mt-2 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const link = document.createElement('a')
                          link.href = image.url
                          link.download = `generated-image-${index + 1}.png`
                          link.click()
                        }}
                      >
                        Download
                      </Button>
                      {transferred && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open('/gallery', '_blank')}
                        >
                          View in Gallery
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
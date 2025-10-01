'use client'

import { useState } from 'react'
import { ModelSelector } from '@/components/generation/model-selector'
import { DynamicForm } from '@/components/generation/dynamic-form'
import { JobStatus } from '@/components/generation/job-status'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Model {
  id: string
  name: string
  description: string
  category: string
  inputSchema: any
}

export default function GeneratePage() {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [currentJobId, setCurrentJobId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleModelSelect = (model: Model) => {
    setSelectedModel(model)
    setCurrentJobId(null)
    setError(null)
  }

  const handleGenerate = async (parameters: Record<string, any>) => {
    if (!selectedModel) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/fal/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelId: selectedModel.id,
          parameters,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit generation request')
      }

      const data = await response.json()
      setCurrentJobId(data.jobId)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleJobComplete = (result: any) => {
    // Job completed, could trigger asset saving here
    console.log('Job completed:', result)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push('/dashboard')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Generate Content</h1>
          <p className="text-gray-600 mt-2">
            Select a model and configure parameters to generate AI content
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {!selectedModel ? (
              <ModelSelector onModelSelect={handleModelSelect} />
            ) : (
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-4 border">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{selectedModel.name}</h3>
                      <p className="text-sm text-gray-600">{selectedModel.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedModel(null)}
                    >
                      Change Model
                    </Button>
                  </div>
                </div>

                <DynamicForm
                  schema={selectedModel.inputSchema}
                  onSubmit={handleGenerate}
                  loading={loading}
                />
              </div>
            )}
          </div>

          <div className="space-y-6">
            {currentJobId && (
              <JobStatus
                jobId={currentJobId}
                onComplete={handleJobComplete}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
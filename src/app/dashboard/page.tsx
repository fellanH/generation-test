'use client'

import { useState } from 'react'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import Navbar from '@/components/layout/Navbar'
import ModelSelector from '@/components/generation/ModelSelector'
import DynamicForm from '@/components/generation/DynamicForm'
import type { FalModel } from '@/types'
import toast from 'react-hot-toast'
import Image from 'next/image'

export default function DashboardPage() {
  const [selectedModel, setSelectedModel] = useState<FalModel | undefined>()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAssets, setGeneratedAssets] = useState<any[]>([])

  const handleSubmit = async (input: Record<string, any>) => {
    if (!selectedModel) return

    setIsGenerating(true)
    try {
      // Submit job to Fal.ai
      const response = await fetch('/api/fal/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          modelId: selectedModel.id,
          input,
        }),
      })

      const data = await response.json()
      
      if (!response.ok) throw new Error(data.error)

      toast.success('Generation complete!')

      // Extract image URLs from result
      const images = data.result?.images || []
      
      // Transfer assets to permanent storage
      for (const image of images) {
        try {
          const transferResponse = await fetch('/api/assets/transfer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              jobId: data.job.id,
              assetUrl: image.url,
              assetType: 'image',
              metadata: {
                width: image.width,
                height: image.height,
              },
            }),
          })

          if (transferResponse.ok) {
            const { asset } = await transferResponse.json()
            setGeneratedAssets(prev => [...prev, asset])
          }
        } catch (error) {
          console.error('Asset transfer error:', error)
        }
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to generate')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Generate Assets</h1>
            <p className="text-gray-600 mt-2">
              Select a model and configure parameters to generate images or videos
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Model Selector */}
            <div className="lg:col-span-2">
              <ModelSelector
                onModelSelect={setSelectedModel}
                selectedModel={selectedModel}
              />
            </div>

            {/* Right Column: Form */}
            <div className="lg:col-span-1">
              {selectedModel ? (
                <DynamicForm
                  model={selectedModel}
                  onSubmit={handleSubmit}
                  isLoading={isGenerating}
                />
              ) : (
                <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
                  Select a model to configure parameters
                </div>
              )}
            </div>
          </div>

          {/* Generated Assets Preview */}
          {generatedAssets.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Recently Generated
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {generatedAssets.map((asset) => (
                  <div key={asset.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative aspect-square">
                      <Image
                        src={asset.storage_url}
                        alt="Generated asset"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </ProtectedRoute>
  )
}

'use client'

import { useState } from 'react'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { Navbar } from '@/components/layout/Navbar'
import { ModelSelector } from '@/components/generation/ModelSelector'
import { GenerationForm } from '@/components/generation/GenerationForm'
import { JobStatus } from '@/components/generation/JobStatus'
import { Gallery } from '@/components/gallery/Gallery'
import { FalModel } from '@/types/fal'

export default function DashboardPage() {
  const [selectedModel, setSelectedModel] = useState<FalModel | null>(null)
  const [activeJobId, setActiveJobId] = useState<string | null>(null)

  const handleModelSelect = (model: FalModel) => {
    setSelectedModel(model)
  }

  const handleJobSubmit = (jobId: string) => {
    setActiveJobId(jobId)
  }

  const handleJobComplete = () => {
    setActiveJobId(null)
    // Gallery will automatically refresh
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Generation Panel */}
              <div className="lg:col-span-1">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Generate Content
                  </h2>
                  
                  <div className="space-y-4">
                    <ModelSelector onModelSelect={handleModelSelect} />
                    <GenerationForm 
                      selectedModel={selectedModel} 
                      onJobSubmit={handleJobSubmit}
                    />
                    <JobStatus 
                      jobId={activeJobId}
                      onJobComplete={handleJobComplete}
                    />
                  </div>
                </div>
              </div>
              
              {/* Gallery Panel */}
              <div className="lg:col-span-2">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4">
                    Your Gallery
                  </h2>
                  <Gallery />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  )
}
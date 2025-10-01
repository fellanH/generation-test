'use client'

import { useState, useEffect } from 'react'
import { FalModel } from '@/types/fal'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Loader2, Sparkles } from 'lucide-react'

interface ModelSelectorProps {
  onModelSelect?: (model: FalModel) => void
}

export function ModelSelector({ onModelSelect }: ModelSelectorProps) {
  const [models, setModels] = useState<FalModel[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedModel, setSelectedModel] = useState<FalModel | null>(null)

  useEffect(() => {
    fetchModels()
  }, [])

  const fetchModels = async () => {
    try {
      const response = await fetch('/api/models')
      const data = await response.json()
      
      if (data.success) {
        setModels(data.models)
      }
    } catch (error) {
      console.error('Failed to fetch models:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleModelSelect = (model: FalModel) => {
    setSelectedModel(model)
    onModelSelect?.(model)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
        <span className="ml-2">Loading models...</span>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-700">Select Model</h3>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {models.map((model) => (
          <Card 
            key={model.id} 
            className={`cursor-pointer transition-colors ${
              selectedModel?.id === model.id 
                ? 'ring-2 ring-blue-500 bg-blue-50' 
                : 'hover:bg-gray-50'
            }`}
            onClick={() => handleModelSelect(model)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{model.name}</CardTitle>
                <Sparkles className="h-4 w-4 text-blue-500" />
              </div>
              <CardDescription className="text-xs">
                {model.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1">
                {model.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {model.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{model.tags.length - 3}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
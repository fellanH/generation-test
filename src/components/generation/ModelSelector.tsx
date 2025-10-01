'use client'

import { useState } from 'react'
import { FEATURED_MODELS, MODEL_CATEGORIES } from '@/lib/fal/models'
import type { FalModel } from '@/types'

interface ModelSelectorProps {
  onModelSelect: (model: FalModel) => void
  selectedModel?: FalModel
}

export default function ModelSelector({ onModelSelect, selectedModel }: ModelSelectorProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredModels = selectedCategory === 'All'
    ? FEATURED_MODELS
    : FEATURED_MODELS.filter(model => model.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Select a Model</h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {MODEL_CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Model Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModels.map(model => (
          <button
            key={model.id}
            onClick={() => onModelSelect(model)}
            className={`text-left p-6 rounded-lg border-2 transition-all ${
              selectedModel?.id === model.id
                ? 'border-primary-600 bg-primary-50'
                : 'border-gray-200 bg-white hover:border-primary-300 hover:shadow-md'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-900">{model.name}</h3>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                  {model.category}
                </span>
              </div>
              <p className="text-sm text-gray-600">{model.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

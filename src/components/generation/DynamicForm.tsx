'use client'

import { useState } from 'react'
import type { FalModel } from '@/types'

interface DynamicFormProps {
  model: FalModel
  onSubmit: (input: Record<string, any>) => void
  isLoading: boolean
}

export default function DynamicForm({ model, onSubmit, isLoading }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({
    prompt: '',
    num_images: 1,
    image_size: 'square_hd',
    num_inference_steps: 28,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Common image sizes for Fal.ai models
  const imageSizes = [
    { label: 'Square HD (1024x1024)', value: 'square_hd' },
    { label: 'Landscape 4:3 (1365x1024)', value: 'landscape_4_3' },
    { label: 'Landscape 16:9 (1920x1080)', value: 'landscape_16_9' },
    { label: 'Portrait 3:4 (1024x1365)', value: 'portrait_3_4' },
    { label: 'Portrait 9:16 (1080x1920)', value: 'portrait_9_16' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Configure {model.name}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Prompt */}
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            Prompt
          </label>
          <textarea
            id="prompt"
            rows={4}
            value={formData.prompt}
            onChange={(e) => handleChange('prompt', e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            placeholder="Describe what you want to generate..."
          />
        </div>

        {/* Image Size */}
        <div>
          <label htmlFor="image_size" className="block text-sm font-medium text-gray-700 mb-2">
            Image Size
          </label>
          <select
            id="image_size"
            value={formData.image_size}
            onChange={(e) => handleChange('image_size', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            {imageSizes.map(size => (
              <option key={size.value} value={size.value}>
                {size.label}
              </option>
            ))}
          </select>
        </div>

        {/* Number of Images */}
        <div>
          <label htmlFor="num_images" className="block text-sm font-medium text-gray-700 mb-2">
            Number of Images: {formData.num_images}
          </label>
          <input
            id="num_images"
            type="range"
            min="1"
            max="4"
            value={formData.num_images}
            onChange={(e) => handleChange('num_images', parseInt(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Inference Steps */}
        <div>
          <label htmlFor="num_inference_steps" className="block text-sm font-medium text-gray-700 mb-2">
            Inference Steps: {formData.num_inference_steps}
          </label>
          <input
            id="num_inference_steps"
            type="range"
            min="1"
            max="50"
            value={formData.num_inference_steps}
            onChange={(e) => handleChange('num_inference_steps', parseInt(e.target.value))}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            More steps = higher quality but slower generation
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate'
          )}
        </button>
      </form>
    </div>
  )
}

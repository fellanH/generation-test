'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface DynamicFormProps {
  schema: any
  onSubmit: (parameters: Record<string, any>) => void
  loading?: boolean
}

export function DynamicForm({ schema, onSubmit, loading = false }: DynamicFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({})

  useEffect(() => {
    // Initialize form data with default values
    const initialData: Record<string, any> = {}
    
    if (schema?.properties) {
      Object.entries(schema.properties).forEach(([key, property]: [string, any]) => {
        if (property.default !== undefined) {
          initialData[key] = property.default
        } else if (property.type === 'string') {
          initialData[key] = ''
        } else if (property.type === 'number' || property.type === 'integer') {
          initialData[key] = property.minimum || 0
        } else if (property.type === 'boolean') {
          initialData[key] = false
        }
      })
    }
    
    setFormData(initialData)
  }, [schema])

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const renderField = (key: string, property: any) => {
    const value = formData[key] || ''

    switch (property.type) {
      case 'string':
        if (property.enum) {
          return (
            <select
              value={value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            >
              {property.enum.map((option: string) => (
                <option key={option} value={option}>
                  {option.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </option>
              ))}
            </select>
          )
        }
        
        if (property.description?.toLowerCase().includes('prompt')) {
          return (
            <textarea
              value={value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              placeholder={property.description}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
              disabled={loading}
              required={schema.required?.includes(key)}
            />
          )
        }
        
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            placeholder={property.description}
            disabled={loading}
            required={schema.required?.includes(key)}
          />
        )

      case 'number':
      case 'integer':
        return (
          <Input
            type="number"
            value={value}
            onChange={(e) => handleInputChange(key, parseFloat(e.target.value) || 0)}
            min={property.minimum}
            max={property.maximum}
            step={property.type === 'integer' ? 1 : 0.1}
            disabled={loading}
            required={schema.required?.includes(key)}
          />
        )

      case 'boolean':
        return (
          <input
            type="checkbox"
            checked={value}
            onChange={(e) => handleInputChange(key, e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            disabled={loading}
          />
        )

      default:
        return (
          <Input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            placeholder={property.description}
            disabled={loading}
          />
        )
    }
  }

  if (!schema || !schema.properties) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">No parameters available for this model.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Model Parameters</CardTitle>
        <CardDescription>
          Configure the parameters for your generation
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(schema.properties).map(([key, property]: [string, any]) => (
            <div key={key} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                {schema.required?.includes(key) && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>
              {renderField(key, property)}
              {property.description && (
                <p className="text-xs text-gray-500">{property.description}</p>
              )}
            </div>
          ))}
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
'use client'

import { useState } from 'react'
import { FalModel, FalProperty } from '@/types/fal'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Play } from 'lucide-react'

interface GenerationFormProps {
  selectedModel?: FalModel | null
  onJobSubmit?: (jobId: string) => void
}

export function GenerationForm({ selectedModel, onJobSubmit }: GenerationFormProps) {
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (key: string, value: unknown) => {
    setFormData(prev => ({ ...prev, [key]: value }))
  }

  const renderFormField = (key: string, property: FalProperty) => {
    const value = (formData[key] ?? property.default ?? '') as string

    switch (property.type) {
      case 'string':
        if (property.enum) {
          return (
            <Select value={value} onValueChange={(val) => handleInputChange(key, val)}>
              <SelectTrigger>
                <SelectValue placeholder={`Select ${key}`} />
              </SelectTrigger>
              <SelectContent>
                {property.enum.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )
        }
        
        if (property.description?.toLowerCase().includes('prompt') || 
            property.description?.toLowerCase().includes('description') ||
            key.toLowerCase().includes('prompt')) {
          return (
            <Textarea
              value={value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              placeholder={property.description || `Enter ${key}`}
              rows={3}
            />
          )
        }
        
        return (
          <Input
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            placeholder={property.description || `Enter ${key}`}
          />
        )

      case 'number':
        return (
          <Input
            type="number"
            value={value as unknown as number}
            onChange={(e) => handleInputChange(key, Number(e.target.value))}
            placeholder={property.description || `Enter ${key}`}
            min={property.minimum}
            max={property.maximum}
          />
        )

      case 'boolean':
        return (
          <Switch
            checked={value as unknown as boolean}
            onCheckedChange={(checked) => handleInputChange(key, checked)}
          />
        )

      default:
        return (
          <Input
            value={value}
            onChange={(e) => handleInputChange(key, e.target.value)}
            placeholder={property.description || `Enter ${key}`}
          />
        )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedModel) return

    setLoading(true)
    setError(null)

    try {
      // Get auth token
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        throw new Error('Not authenticated')
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          model: selectedModel.id,
          inputs: formData,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to submit job')
      }

      onJobSubmit?.(data.jobId)
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!selectedModel) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Generation Form</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Select a model to configure parameters
          </p>
        </CardContent>
      </Card>
    )
  }

  const requiredFields = selectedModel.schema.required || []
  const hasRequiredFields = requiredFields.length > 0

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">Configure Parameters</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(selectedModel.schema.properties).map(([key, property]) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key} className="text-sm">
                {key}
                {requiredFields.includes(key) && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </Label>
              {property.description && (
                <p className="text-xs text-gray-500">{property.description}</p>
              )}
              {renderFormField(key, property)}
            </div>
          ))}

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button 
            type="submit" 
            className="w-full" 
            disabled={loading || !hasRequiredFields}
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Play className="mr-2 h-4 w-4" />
            Generate
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
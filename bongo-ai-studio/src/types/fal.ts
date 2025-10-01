export interface FalModel {
  id: string
  name: string
  description: string
  category: string
  tags: string[]
  schema: FalModelSchema
  pricing?: {
    input?: number
    output?: number
  }
}

export interface FalModelSchema {
  type: 'object'
  properties: Record<string, FalProperty>
  required?: string[]
}

export interface FalProperty {
  type: 'string' | 'number' | 'boolean' | 'array' | 'object'
  description?: string
  enum?: string[]
  minimum?: number
  maximum?: number
  default?: unknown
  items?: FalProperty
  properties?: Record<string, FalProperty>
}

export interface FalJob {
  request_id: string
  status: 'IN_PROGRESS' | 'COMPLETED' | 'FAILED'
  logs?: string[]
  metrics?: {
    predict_time?: number
  }
  [key: string]: unknown
}

export interface FalWorkflow {
  id: string
  name: string
  description: string
  steps: FalWorkflowStep[]
}

export interface FalWorkflowStep {
  id: string
  model: string
  inputs: Record<string, unknown>
  outputs?: Record<string, unknown>
}
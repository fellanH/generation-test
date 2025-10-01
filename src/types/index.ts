export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed'

export type AssetType = 'image' | 'video' | 'audio'

export interface Job {
  id: string
  user_id: string
  fal_request_id: string
  model_id: string
  status: JobStatus
  input_params: Record<string, any>
  output_data?: Record<string, any> | null
  error_message?: string | null
  cost?: number | null
  created_at: string
  updated_at: string
  completed_at?: string | null
}

export interface Asset {
  id: string
  user_id: string
  job_id?: string | null
  asset_type: AssetType
  original_url: string
  storage_path: string
  storage_url: string
  file_size?: number | null
  width?: number | null
  height?: number | null
  duration?: number | null
  metadata?: Record<string, any> | null
  created_at: string
}

export interface Profile {
  id: string
  email: string
  full_name?: string | null
  avatar_url?: string | null
  created_at: string
  updated_at: string
}

export interface FalModelSchema {
  type: string
  properties: Record<string, FalSchemaProperty>
  required?: string[]
}

export interface FalSchemaProperty {
  type: string
  title?: string
  description?: string
  default?: any
  minimum?: number
  maximum?: number
  enum?: any[]
  items?: FalSchemaProperty
  format?: string
}

export interface FalModel {
  id: string
  name: string
  description: string
  category: string
  schema?: FalModelSchema
}

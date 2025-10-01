export interface User {
  id: string
  email: string
  fullName?: string
  avatarUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Asset {
  id: string
  userId: string
  falJobId: string
  modelName: string
  prompt: string
  parameters: Record<string, any>
  originalUrl: string
  storagePath: string
  publicUrl: string
  fileSize: number
  fileType: string
  width?: number
  height?: number
  cost?: number
  status: 'processing' | 'completed' | 'failed'
  createdAt: string
  updatedAt: string
}

export interface Job {
  id: string
  userId: string
  falJobId: string
  modelName: string
  status: 'queued' | 'processing' | 'completed' | 'failed'
  parameters: Record<string, any>
  result?: any
  errorMessage?: string
  cost?: number
  createdAt: string
  updatedAt: string
}

export interface FalModel {
  id: string
  name: string
  description: string
  category: string
  inputSchema: any
  pricing?: {
    perRequest?: number
    perSecond?: number
  }
}

export interface GenerationRequest {
  modelId: string
  parameters: Record<string, any>
}

export interface GenerationResult {
  jobId: string
  status: string
  result?: any
  error?: string
}
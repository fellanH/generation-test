interface FalResponse {
  request_id: string
  status: 'IN_QUEUE' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED'
  result?: any
  error?: string
}

interface FalSubmitResponse {
  request_id: string
  status: string
}

export class FalClient {
  private apiKey: string
  private baseUrl = 'https://fal.run/fal-ai'

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Key ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Fal.ai API error: ${response.status} ${error}`)
    }

    return response.json()
  }

  async submitJob(modelId: string, parameters: Record<string, any>): Promise<FalSubmitResponse> {
    return this.makeRequest(`/${modelId}`, {
      method: 'POST',
      body: JSON.stringify(parameters),
    })
  }

  async getJobStatus(requestId: string): Promise<FalResponse> {
    return this.makeRequest(`/requests/${requestId}`, {
      method: 'GET',
    })
  }

  async getJobResult(requestId: string): Promise<FalResponse> {
    return this.makeRequest(`/requests/${requestId}`, {
      method: 'GET',
    })
  }

  async listModels(): Promise<any[]> {
    // This would typically fetch from Fal.ai's model registry
    // For now, return a curated list of popular models
    return [
      {
        id: 'fal-ai/flux/schnell',
        name: 'FLUX Schnell',
        description: 'Fast text-to-image generation',
        category: 'text-to-image',
        inputSchema: {
          type: 'object',
          properties: {
            prompt: {
              type: 'string',
              description: 'Text prompt for image generation'
            },
            image_size: {
              type: 'string',
              enum: ['square_hd', 'square', 'portrait_4_3', 'portrait_16_9', 'landscape_4_3', 'landscape_16_9'],
              default: 'landscape_4_3'
            },
            num_inference_steps: {
              type: 'integer',
              minimum: 1,
              maximum: 50,
              default: 4
            },
            seed: {
              type: 'integer',
              minimum: 0,
              maximum: 2147483647
            }
          },
          required: ['prompt']
        }
      },
      {
        id: 'fal-ai/flux/dev',
        name: 'FLUX Dev',
        description: 'High-quality text-to-image generation',
        category: 'text-to-image',
        inputSchema: {
          type: 'object',
          properties: {
            prompt: {
              type: 'string',
              description: 'Text prompt for image generation'
            },
            image_size: {
              type: 'string',
              enum: ['square_hd', 'square', 'portrait_4_3', 'portrait_16_9', 'landscape_4_3', 'landscape_16_9'],
              default: 'landscape_4_3'
            },
            num_inference_steps: {
              type: 'integer',
              minimum: 1,
              maximum: 50,
              default: 28
            },
            guidance_scale: {
              type: 'number',
              minimum: 0,
              maximum: 20,
              default: 3.5
            },
            seed: {
              type: 'integer',
              minimum: 0,
              maximum: 2147483647
            }
          },
          required: ['prompt']
        }
      }
    ]
  }
}
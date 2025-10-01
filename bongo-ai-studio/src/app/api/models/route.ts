import { NextResponse } from 'next/server'

// Curated list of popular Fal.ai models
const CURATED_MODELS = [
  {
    id: 'fal-ai/flux/schnell',
    name: 'Flux Schnell',
    description: 'Fast text-to-image generation with high quality results',
    category: 'image-generation',
    tags: ['text-to-image', 'fast', 'flux'],
    schema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'Text prompt for image generation'
        },
        image_size: {
          type: 'string',
          enum: ['square_hd', 'square', 'portrait_4_3', 'portrait_16_9', 'landscape_4_3', 'landscape_16_9'],
          default: 'square_hd',
          description: 'Size of the generated image'
        },
        num_inference_steps: {
          type: 'number',
          minimum: 1,
          maximum: 50,
          default: 4,
          description: 'Number of inference steps (higher = better quality, slower)'
        },
        enable_safety_checker: {
          type: 'boolean',
          default: true,
          description: 'Enable safety checker for content filtering'
        }
      },
      required: ['prompt']
    },
    pricing: {
      input: 0.0001,
      output: 0.0001
    }
  },
  {
    id: 'fal-ai/flux/dev',
    name: 'Flux Dev',
    description: 'High-quality text-to-image generation with advanced features',
    category: 'image-generation',
    tags: ['text-to-image', 'high-quality', 'flux'],
    schema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'Text prompt for image generation'
        },
        image_size: {
          type: 'string',
          enum: ['square_hd', 'square', 'portrait_4_3', 'portrait_16_9', 'landscape_4_3', 'landscape_16_9'],
          default: 'square_hd',
          description: 'Size of the generated image'
        },
        num_inference_steps: {
          type: 'number',
          minimum: 1,
          maximum: 50,
          default: 28,
          description: 'Number of inference steps'
        },
        enable_safety_checker: {
          type: 'boolean',
          default: true,
          description: 'Enable safety checker for content filtering'
        },
        seed: {
          type: 'number',
          description: 'Random seed for reproducible results'
        }
      },
      required: ['prompt']
    },
    pricing: {
      input: 0.0001,
      output: 0.0001
    }
  },
  {
    id: 'fal-ai/flux-pro',
    name: 'Flux Pro',
    description: 'Professional-grade text-to-image generation with maximum quality',
    category: 'image-generation',
    tags: ['text-to-image', 'professional', 'flux', 'high-quality'],
    schema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'Text prompt for image generation'
        },
        image_size: {
          type: 'string',
          enum: ['square_hd', 'square', 'portrait_4_3', 'portrait_16_9', 'landscape_4_3', 'landscape_16_9'],
          default: 'square_hd',
          description: 'Size of the generated image'
        },
        num_inference_steps: {
          type: 'number',
          minimum: 1,
          maximum: 50,
          default: 28,
          description: 'Number of inference steps'
        },
        enable_safety_checker: {
          type: 'boolean',
          default: true,
          description: 'Enable safety checker for content filtering'
        },
        seed: {
          type: 'number',
          description: 'Random seed for reproducible results'
        }
      },
      required: ['prompt']
    },
    pricing: {
      input: 0.0001,
      output: 0.0001
    }
  },
  {
    id: 'fal-ai/llama-3.1-8b-instruct',
    name: 'Llama 3.1 8B',
    description: 'Fast and efficient text generation with Llama 3.1 8B model',
    category: 'text-generation',
    tags: ['text-generation', 'llama', 'chat', 'instruct'],
    schema: {
      type: 'object',
      properties: {
        prompt: {
          type: 'string',
          description: 'Text prompt for generation'
        },
        max_tokens: {
          type: 'number',
          minimum: 1,
          maximum: 2048,
          default: 512,
          description: 'Maximum number of tokens to generate'
        },
        temperature: {
          type: 'number',
          minimum: 0,
          maximum: 2,
          default: 0.7,
          description: 'Controls randomness in generation'
        },
        top_p: {
          type: 'number',
          minimum: 0,
          maximum: 1,
          default: 0.9,
          description: 'Nucleus sampling parameter'
        }
      },
      required: ['prompt']
    },
    pricing: {
      input: 0.0001,
      output: 0.0001
    }
  }
]

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      models: CURATED_MODELS
    })
  } catch (error) {
    console.error('Error fetching models:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch models' },
      { status: 500 }
    )
  }
}
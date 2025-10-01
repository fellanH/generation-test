import { FalModel } from '@/types'

// Curated list of popular Fal.ai models for Phase 1
export const FEATURED_MODELS: FalModel[] = [
  {
    id: 'fal-ai/flux/schnell',
    name: 'FLUX Schnell',
    description: 'Ultra-fast text-to-image generation with high quality results',
    category: 'Text-to-Image',
  },
  {
    id: 'fal-ai/flux/dev',
    name: 'FLUX Dev',
    description: 'Advanced text-to-image model with superior quality and detail',
    category: 'Text-to-Image',
  },
  {
    id: 'fal-ai/flux-pro',
    name: 'FLUX Pro',
    description: 'Professional-grade image generation with exceptional quality',
    category: 'Text-to-Image',
  },
  {
    id: 'fal-ai/stable-diffusion-v3-medium',
    name: 'Stable Diffusion 3 Medium',
    description: 'Latest Stable Diffusion model with improved prompt adherence',
    category: 'Text-to-Image',
  },
  {
    id: 'fal-ai/fast-sdxl',
    name: 'Fast SDXL',
    description: 'High-speed SDXL generation optimized for performance',
    category: 'Text-to-Image',
  },
  {
    id: 'fal-ai/fast-svd/text-to-video',
    name: 'Fast SVD Text-to-Video',
    description: 'Generate short video clips from text descriptions',
    category: 'Text-to-Video',
  },
  {
    id: 'fal-ai/fast-svd/image-to-video',
    name: 'Fast SVD Image-to-Video',
    description: 'Animate static images into video sequences',
    category: 'Image-to-Video',
  },
  {
    id: 'fal-ai/recraft-v3',
    name: 'Recraft V3',
    description: 'Vector-style image generation with design focus',
    category: 'Text-to-Image',
  },
  {
    id: 'fal-ai/aura-flow',
    name: 'Aura Flow',
    description: 'Fast and efficient image generation with artistic styles',
    category: 'Text-to-Image',
  },
  {
    id: 'fal-ai/creative-upscaler',
    name: 'Creative Upscaler',
    description: 'Upscale and enhance images with AI-powered detail addition',
    category: 'Image Enhancement',
  },
]

export const MODEL_CATEGORIES = [
  'All',
  'Text-to-Image',
  'Text-to-Video',
  'Image-to-Video',
  'Image Enhancement',
]

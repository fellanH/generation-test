import * as fal from '@fal-ai/serverless-client'

// Initialize Fal client with API key from environment
fal.config({
  credentials: process.env.FAL_KEY,
})

export { fal }

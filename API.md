# Bongo API Documentation

Complete API reference for Bongo AI Studio.

## Base URL

```
Development: http://localhost:3000/api
Production: https://your-domain.com/api
```

## Authentication

All authenticated endpoints require a valid Supabase session. Authentication is handled via cookies set by the Supabase Auth system.

### Headers

No special headers required - authentication is handled automatically via HTTP-only cookies.

---

## Authentication Endpoints

### Sign Up

Create a new user account.

**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "fullName": "John Doe"
}
```

**Response (200 OK):**
```json
{
  "message": "Signup successful. Please check your email for verification.",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    ...
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing required fields or invalid data
- `500 Internal Server Error` - Server error

---

### Login

Authenticate an existing user.

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    ...
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing credentials
- `401 Unauthorized` - Invalid credentials
- `500 Internal Server Error` - Server error

---

### Logout

Sign out the current user.

**Endpoint:** `POST /api/auth/logout`

**Request Body:** None

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

**Error Responses:**
- `400 Bad Request` - Logout failed
- `500 Internal Server Error` - Server error

---

### Auth Callback

OAuth callback handler for email verification and social logins.

**Endpoint:** `GET /api/auth/callback?code=<code>`

**Query Parameters:**
- `code` (string, required) - Authorization code from Supabase

**Response:** Redirects to `/dashboard`

---

## Generation Endpoints

### Submit Generation Job

Submit a new AI generation job to Fal.ai.

**Endpoint:** `POST /api/fal/submit`

**Authentication:** Required

**Request Body:**
```json
{
  "modelId": "fal-ai/flux/schnell",
  "input": {
    "prompt": "A beautiful sunset over mountains",
    "num_images": 1,
    "image_size": "square_hd",
    "num_inference_steps": 28
  }
}
```

**Response (200 OK):**
```json
{
  "job": {
    "id": "uuid",
    "user_id": "uuid",
    "fal_request_id": "fal_request_id",
    "model_id": "fal-ai/flux/schnell",
    "status": "completed",
    "input_params": { ... },
    "output_data": { ... },
    "created_at": "2025-10-01T12:00:00Z",
    "completed_at": "2025-10-01T12:00:30Z"
  },
  "result": {
    "images": [
      {
        "url": "https://fal.media/...",
        "width": 1024,
        "height": 1024,
        "content_type": "image/png"
      }
    ]
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing or invalid parameters
- `401 Unauthorized` - Not authenticated
- `500 Internal Server Error` - Generation failed

**Input Parameters by Model:**

#### Text-to-Image Models (FLUX, Stable Diffusion, etc.)
```typescript
{
  prompt: string              // Required
  negative_prompt?: string    // Optional
  num_images?: number         // 1-4, default: 1
  image_size?: string         // See Image Sizes section
  num_inference_steps?: number // 1-50, default: 28
  guidance_scale?: number     // 1-20, default: 7.5
  seed?: number              // Optional, for reproducibility
}
```

#### Image Sizes
- `square_hd` - 1024x1024
- `square` - 512x512
- `portrait_4_3` - 1024x1365
- `portrait_16_9` - 1080x1920
- `landscape_4_3` - 1365x1024
- `landscape_16_9` - 1920x1080

---

### Check Job Status

Check the status of a submitted job.

**Endpoint:** `GET /api/fal/status/[requestId]`

**Authentication:** Required

**Path Parameters:**
- `requestId` (string) - The Fal.ai request ID

**Response (200 OK):**
```json
{
  "status": "completed",
  "responseData": {
    "images": [ ... ]
  }
}
```

**Status Values:**
- `queued` - Job is waiting in queue
- `processing` - Job is being processed
- `completed` - Job completed successfully
- `failed` - Job failed

**Error Responses:**
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Job not found
- `500 Internal Server Error` - Status check failed

---

## Asset Management Endpoints

### Transfer Asset to Permanent Storage

Download asset from Fal.ai CDN and upload to permanent Supabase Storage.

**Endpoint:** `POST /api/assets/transfer`

**Authentication:** Required

**Request Body:**
```json
{
  "jobId": "uuid",
  "assetUrl": "https://fal.media/files/...",
  "assetType": "image",
  "metadata": {
    "width": 1024,
    "height": 1024
  }
}
```

**Response (200 OK):**
```json
{
  "asset": {
    "id": "uuid",
    "user_id": "uuid",
    "job_id": "uuid",
    "asset_type": "image",
    "original_url": "https://fal.media/...",
    "storage_path": "user-id/filename.png",
    "storage_url": "https://supabase.co/storage/...",
    "file_size": 2048576,
    "width": 1024,
    "height": 1024,
    "metadata": { ... },
    "created_at": "2025-10-01T12:00:00Z"
  }
}
```

**Error Responses:**
- `400 Bad Request` - Missing parameters
- `401 Unauthorized` - Not authenticated
- `500 Internal Server Error` - Transfer failed

**Asset Types:**
- `image` - Static images (PNG, JPG, WebP)
- `video` - Video files (MP4, WebM)
- `audio` - Audio files (MP3, WAV)

---

### List User Assets

Get a paginated list of user's assets.

**Endpoint:** `GET /api/assets/list`

**Authentication:** Required

**Query Parameters:**
- `limit` (number, optional) - Number of assets to return (default: 20, max: 100)
- `offset` (number, optional) - Pagination offset (default: 0)

**Example:**
```
GET /api/assets/list?limit=20&offset=0
```

**Response (200 OK):**
```json
{
  "assets": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "job_id": "uuid",
      "asset_type": "image",
      "original_url": "https://fal.media/...",
      "storage_path": "user-id/filename.png",
      "storage_url": "https://supabase.co/storage/...",
      "file_size": 2048576,
      "width": 1024,
      "height": 1024,
      "duration": null,
      "metadata": { ... },
      "created_at": "2025-10-01T12:00:00Z"
    },
    ...
  ]
}
```

**Error Responses:**
- `401 Unauthorized` - Not authenticated
- `500 Internal Server Error` - Query failed

---

### Delete Asset

Delete an asset from storage and database.

**Endpoint:** `DELETE /api/assets/[assetId]`

**Authentication:** Required

**Path Parameters:**
- `assetId` (string) - The asset UUID

**Response (200 OK):**
```json
{
  "message": "Asset deleted successfully"
}
```

**Error Responses:**
- `401 Unauthorized` - Not authenticated
- `404 Not Found` - Asset not found or not owned by user
- `500 Internal Server Error` - Deletion failed

---

## Error Response Format

All error responses follow this format:

```json
{
  "error": "Human-readable error message"
}
```

**Common HTTP Status Codes:**
- `400 Bad Request` - Invalid input or missing required fields
- `401 Unauthorized` - Authentication required or invalid
- `403 Forbidden` - User doesn't have permission
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server-side error

---

## Rate Limiting

Currently, no rate limiting is implemented. This will be added in Phase 2.

**Recommended limits for production:**
- Authentication: 5 requests per minute per IP
- Generation: 10 requests per minute per user
- Asset operations: 100 requests per minute per user

---

## Webhooks (Phase 2)

Webhook support for real-time job status updates will be added in Phase 2.

**Planned endpoint:**
```
POST /api/webhooks/fal
```

---

## SDK Usage Example

### Client-Side (React Component)

```typescript
// Submit generation job
const handleGenerate = async () => {
  const response = await fetch('/api/fal/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      modelId: 'fal-ai/flux/schnell',
      input: {
        prompt: 'A beautiful landscape',
        num_images: 1,
        image_size: 'square_hd',
      },
    }),
  })

  const data = await response.json()
  
  if (response.ok) {
    // Transfer assets to permanent storage
    for (const image of data.result.images) {
      await fetch('/api/assets/transfer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: data.job.id,
          assetUrl: image.url,
          assetType: 'image',
          metadata: {
            width: image.width,
            height: image.height,
          },
        }),
      })
    }
  }
}
```

### Using SWR for Data Fetching

```typescript
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

function Gallery() {
  const { data, error } = useSWR('/api/assets/list', fetcher, {
    refreshInterval: 10000, // Refresh every 10 seconds
  })

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <div>
      {data.assets.map(asset => (
        <img key={asset.id} src={asset.storage_url} alt="Asset" />
      ))}
    </div>
  )
}
```

---

## Database Schema Reference

### Tables

#### profiles
```sql
id UUID PRIMARY KEY
email TEXT UNIQUE NOT NULL
full_name TEXT
avatar_url TEXT
created_at TIMESTAMP
updated_at TIMESTAMP
```

#### jobs
```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES profiles(id)
fal_request_id TEXT UNIQUE
model_id TEXT
status TEXT
input_params JSONB
output_data JSONB
error_message TEXT
cost DECIMAL
created_at TIMESTAMP
updated_at TIMESTAMP
completed_at TIMESTAMP
```

#### assets
```sql
id UUID PRIMARY KEY
user_id UUID REFERENCES profiles(id)
job_id UUID REFERENCES jobs(id)
asset_type TEXT
original_url TEXT
storage_path TEXT UNIQUE
storage_url TEXT
file_size BIGINT
width INTEGER
height INTEGER
duration DECIMAL
metadata JSONB
created_at TIMESTAMP
```

---

## Security Notes

1. **API Keys**: Never expose `FAL_KEY` or `SUPABASE_SERVICE_ROLE_KEY` to the client
2. **Row Level Security**: All database tables have RLS enabled
3. **Storage Policies**: Users can only access their own assets
4. **Input Validation**: Always validate user input on the server side
5. **Rate Limiting**: Implement in production to prevent abuse

---

## Future API Endpoints (Phase 2+)

### Workflows
- `POST /api/fal/workflow/submit`
- `GET /api/fal/workflow/status/[requestId]`

### Templates
- `GET /api/templates/list`
- `POST /api/templates/create`
- `GET /api/templates/[templateId]`

### LoRAs
- `GET /api/loras/list`
- `POST /api/loras/apply`

### Cost Tracking
- `GET /api/usage/summary`
- `GET /api/usage/history`

### Model Fine-Tuning (Phase 3)
- `POST /api/models/train`
- `GET /api/models/[modelId]/status`
- `GET /api/models/list`

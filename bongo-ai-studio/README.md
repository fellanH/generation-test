# Bongo AI Studio

A user-friendly, persistent web interface for the Fal.ai model and workflow ecosystem, offering reliable asset management, fast execution, and long-term asset persistence.

## Features

- **User Authentication**: Secure sign-up, login, and session management
- **Dynamic UI**: Front-end that adapts input fields based on the selected Fal.ai model
- **Asynchronous Job Execution**: Robust system for submitting and tracking jobs with real-time status updates
- **Permanent Asset Storage**: Backend process to download assets from Fal.ai and re-upload them to permanent storage
- **User Gallery**: Private gallery view to display all generated and stored assets

## Tech Stack

- **Frontend**: Next.js 14 (React) with TypeScript
- **Backend**: Next.js API Routes (Serverless Functions)
- **Database**: Supabase (PostgreSQL) for metadata
- **File Storage**: Supabase Storage (S3-compatible) for assets
- **AI Inference**: Fal.ai API
- **Styling**: Tailwind CSS with shadcn/ui components

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Fal.ai Configuration
FAL_KEY=your_fal_ai_api_key

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### 2. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `supabase-schema.sql` in your Supabase SQL editor
3. Create a storage bucket named `assets` in your Supabase project
4. Set up Row Level Security (RLS) policies as defined in the schema

### 3. Fal.ai Setup

1. Sign up for a Fal.ai account at [fal.ai](https://fal.ai)
2. Get your API key from the dashboard
3. Add it to your `.env.local` file

### 4. Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── assets/       # Asset management endpoints
│   │   ├── generate/     # Generation endpoint
│   │   ├── jobs/         # Job status endpoints
│   │   ├── models/       # Model listing endpoint
│   │   └── webhooks/     # Webhook handlers
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Main dashboard
│   └── page.tsx         # Home page (redirects to dashboard)
├── components/           # React components
│   ├── auth/            # Authentication components
│   ├── gallery/         # Gallery components
│   ├── generation/      # Generation components
│   ├── layout/          # Layout components
│   └── ui/              # Reusable UI components
├── lib/                 # Utility libraries
│   ├── supabase.ts     # Supabase client configuration
│   └── utils.ts        # Utility functions
└── types/              # TypeScript type definitions
    ├── database.ts     # Database types
    └── fal.ts         # Fal.ai API types
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login

### Models
- `GET /api/models` - Get curated list of available models

### Generation
- `POST /api/generate` - Submit generation job
- `GET /api/jobs/[jobId]` - Get job status

### Assets
- `GET /api/assets` - Get user's assets
- `DELETE /api/assets/[assetId]` - Delete asset

### Webhooks
- `POST /api/webhooks/fal` - Fal.ai webhook handler

## Development Roadmap

### Phase 1: Core Functionality & MVP ✅
- [x] User Authentication
- [x] Dynamic UI
- [x] Asynchronous Job Execution
- [x] Permanent Asset Storage
- [x] User Gallery

### Phase 2: Enhancements & Workflow Integration
- [ ] Workflow Execution
- [ ] Templates & LoRAs
- [ ] Real-time Updates (Webhooks)
- [ ] Cost Tracking

### Phase 3: Scaling & Future Development
- [ ] Model Fine-Tuning Interface
- [ ] Community Features
- [ ] Expanded Integrations
- [ ] Performance & Reliability

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
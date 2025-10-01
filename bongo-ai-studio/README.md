# Bongo AI Studio

Your premier user-friendly, persistent web interface for the Fal.ai model and workflow ecosystem, offering reliable asset management, fast execution, and long-term asset persistence.

## Features

### Phase 1 - Core Functionality (MVP) ✅ COMPLETED

- ✅ **User Authentication**: Secure sign-up, login, and session management with Supabase
- ✅ **Dynamic UI**: Front-end that adapts input fields based on selected Fal.ai model
- ✅ **Asynchronous Job Execution**: Robust system for submitting and tracking jobs with real-time status updates
- ✅ **Model Selection**: Curated list of Fal.ai models with dynamic parameter forms
- ✅ **Job Tracking**: Real-time status monitoring with polling system
- ✅ **Permanent Asset Storage**: Backend process to download assets from Fal.ai and re-upload to Supabase Storage
- ✅ **User Gallery**: Private gallery view to display all generated and stored assets with modal details

### Phase 2 - Enhancements (Ready for Implementation)

- **Workflow Execution**: Support for multi-step Fal.ai workflows
- **Templates & LoRAs**: Library of one-click templates and curated custom LoRAs
- **Real-time Updates**: Transition from polling to Fal.ai webhooks
- **Cost Tracking**: UI component to track the cost of each job
- **Advanced Gallery Features**: Filtering, sorting, and bulk operations

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: Next.js API Routes (Serverless Functions)
- **Database**: Supabase (PostgreSQL) for metadata
- **File Storage**: Supabase Storage (S3-compatible) for assets
- **AI Inference**: Fal.ai API
- **Authentication**: Supabase Auth

## 🚀 Quick Start

The Bongo AI Studio MVP is now complete and ready to use! Follow these steps to get started:

### Prerequisites

- Node.js 18+ and npm
- Supabase account ([sign up here](https://supabase.com))
- Fal.ai API key ([get one here](https://fal.ai))

### Installation

1. **Clone and install dependencies:**
   ```bash
   cd bongo-ai-studio
   npm install
   ```

2. **Set up Supabase:**
   - Create a new Supabase project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Go to Settings > API > Service Role to get your service role key
   - Run the SQL schema in the Supabase SQL editor:
     ```sql
     -- Copy and paste the contents of supabase-schema.sql
     ```

3. **Configure environment variables:**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your actual values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   FAL_AI_API_KEY=your_fal_ai_api_key
   NEXTAUTH_SECRET=your_random_secret_string
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   │   ├── fal/          # Fal.ai integration
│   │   ├── jobs/         # Job management
│   │   └── assets/       # Asset management
│   ├── auth/             # Authentication pages
│   ├── dashboard/        # Main dashboard
│   ├── generate/         # Content generation
│   └── gallery/          # Asset gallery
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── auth/             # Authentication components
│   ├── generation/       # Generation-related components
│   └── gallery/          # Gallery components
├── lib/                  # Utility libraries
│   ├── supabase.ts       # Supabase client configuration
│   ├── fal-client.ts     # Fal.ai API client
│   └── utils.ts          # General utilities
└── types/                # TypeScript type definitions
```

## API Endpoints

- `GET /api/fal/models` - List available Fal.ai models
- `POST /api/fal/generate` - Submit generation job
- `GET /api/jobs/[id]` - Get job status and results

## Database Schema

The application uses the following main tables:

- **users**: User profiles (extends Supabase auth.users)
- **jobs**: Generation job tracking
- **assets**: Generated asset metadata and storage info

See `supabase-schema.sql` for the complete schema.

## Development Roadmap

### Phase 1: Core Functionality ✅
- [x] Next.js project setup with TypeScript
- [x] Supabase integration and authentication
- [x] Fal.ai API integration
- [x] Dynamic form generation based on model schemas
- [x] Job submission and status tracking
- [x] Basic UI components and pages

### Phase 2: Asset Management (In Progress)
- [ ] Permanent asset storage system
- [ ] Asset transfer from Fal.ai CDN to Supabase Storage
- [ ] User gallery with asset management
- [ ] Download and share functionality

### Phase 3: Advanced Features (Planned)
- [ ] Webhook integration for real-time updates
- [ ] Cost tracking and billing
- [ ] Template library
- [ ] LoRA integration
- [ ] Workflow support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.
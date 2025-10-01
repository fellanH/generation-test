# Bongo - AI Generative Studio

A premier user-friendly web interface for the Fal.ai model ecosystem, offering reliable asset management, fast execution, and long-term asset persistence.

## Features

### Phase 1: Core Functionality (Current)

- **User Authentication**: Secure sign-up, login, and session management via Supabase Auth
- **Dynamic UI**: Front-end that adapts input fields based on selected Fal.ai models
- **Asynchronous Job Execution**: Robust system for submitting and tracking AI generation jobs
- **Permanent Asset Storage**: Critical backend process to download assets from Fal.ai and re-upload to permanent storage
- **User Gallery**: Private gallery view displaying all generated and stored assets
- **Model Selection**: Curated list of popular Fal.ai models including FLUX, Stable Diffusion, and video generation

## Tech Stack

- **Frontend**: Next.js 14 (React) with App Router
- **Backend**: Next.js API Routes (Serverless Functions)
- **Database**: Supabase (PostgreSQL) for metadata
- **File Storage**: Supabase Storage (S3-compatible) for assets
- **AI Inference**: Fal.ai API
- **Styling**: Tailwind CSS
- **State Management**: SWR for data fetching, Zustand (optional)
- **Authentication**: Supabase Auth with JWT

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account and project
- Fal.ai API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd bongo-ai-studio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Fal.ai Configuration
FAL_KEY=your_fal_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Set up Supabase database:

Go to your Supabase project's SQL editor and run the migration:
```sql
-- Run the contents of supabase/migrations/001_initial_schema.sql
```

Then set up storage policies:
```sql
-- Run the contents of supabase/storage-policies.sql
```

Or create the assets bucket manually in Supabase Storage dashboard.

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
bongo-ai-studio/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── fal/           # Fal.ai proxy endpoints
│   │   │   └── assets/        # Asset management endpoints
│   │   ├── dashboard/         # Generation interface
│   │   ├── gallery/           # User gallery
│   │   ├── login/             # Login page
│   │   ├── signup/            # Signup page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   ├── auth/              # Authentication components
│   │   ├── generation/        # Generation UI components
│   │   ├── gallery/           # Gallery components
│   │   └── layout/            # Layout components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities and configurations
│   │   ├── fal/               # Fal.ai client and models
│   │   └── supabase/          # Supabase clients
│   └── types/                 # TypeScript type definitions
├── supabase/                  # Database migrations and policies
├── public/                    # Static assets
└── package.json
```

## Key API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - Sign in existing user
- `POST /api/auth/logout` - Sign out user
- `GET /api/auth/callback` - OAuth callback handler

### Generation
- `POST /api/fal/submit` - Submit generation job to Fal.ai
- `GET /api/fal/status/[requestId]` - Check job status

### Assets
- `POST /api/assets/transfer` - Transfer asset from Fal.ai to permanent storage
- `GET /api/assets/list` - List user's assets
- `DELETE /api/assets/[assetId]` - Delete asset

## Database Schema

### profiles
User profile information extending Supabase auth.users

### jobs
Tracks all AI generation jobs with status and parameters

### assets
Stores metadata for permanently saved generated assets

See `supabase/migrations/001_initial_schema.sql` for complete schema.

## Development Roadmap

### Phase 1: Core Functionality & MVP ✅
- [x] User authentication
- [x] Dynamic model selection UI
- [x] Asynchronous job execution
- [x] Permanent asset storage
- [x] User gallery

### Phase 2: Enhancements & Workflow Integration (Planned)
- [ ] Workflow execution support
- [ ] Templates & LoRAs library
- [ ] Real-time updates via webhooks
- [ ] Cost tracking UI

### Phase 3: Scaling & Future Development (Future)
- [ ] Model fine-tuning interface
- [ ] Community features & public galleries
- [ ] Expanded integrations (audio, text-to-text)
- [ ] Performance optimization

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-side only) | Yes |
| `FAL_KEY` | Fal.ai API key | Yes |
| `NEXT_PUBLIC_APP_URL` | Your app's public URL | Yes |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in project settings
4. Deploy

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- AWS Amplify
- Self-hosted with Docker

## Contributing

This project is in active development. Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review the Fal.ai API documentation

## Acknowledgments

- [Fal.ai](https://fal.ai/) for AI model inference
- [Supabase](https://supabase.com/) for backend infrastructure
- [Next.js](https://nextjs.org/) for the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling

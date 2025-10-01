# Bongo AI Studio - Complete File Tree

## Root Directory

```
bongo-ai-studio/
├── 📄 package.json                    # Project dependencies and scripts
├── 📄 tsconfig.json                   # TypeScript configuration
├── 📄 next.config.js                  # Next.js configuration
├── 📄 tailwind.config.ts              # Tailwind CSS configuration
├── 📄 postcss.config.js               # PostCSS configuration
├── 📄 .eslintrc.json                  # ESLint rules
├── 📄 .env.example                    # Environment variables template
├── 📄 .gitignore                      # Git ignore rules
├── 📄 .cursorignore                   # Cursor ignore rules
├── 📄 setup.sh                        # Automated setup script
├── 📄 LICENSE                         # MIT License
├── 📄 README.md                       # Main documentation
├── 📄 QUICKSTART.md                   # 5-minute setup guide
├── 📄 API.md                          # API documentation
├── 📄 DEPLOYMENT.md                   # Deployment guide
├── 📄 CONTRIBUTING.md                 # Contribution guidelines
├── 📄 ROADMAP.md                      # Future development plans
├── 📄 PROJECT_SUMMARY.md              # Project overview
├── 📄 IMPLEMENTATION_COMPLETE.md      # Completion report
├── 📄 FILE_TREE.md                    # This file
│
├── 📁 src/                            # Source code
│   ├── 📄 middleware.ts               # Next.js middleware (auth)
│   │
│   ├── 📁 app/                        # Next.js App Router
│   │   ├── 📄 layout.tsx              # Root layout
│   │   ├── 📄 page.tsx                # Landing page
│   │   ├── 📄 globals.css             # Global styles
│   │   │
│   │   ├── 📁 login/
│   │   │   └── 📄 page.tsx            # Login page
│   │   │
│   │   ├── 📁 signup/
│   │   │   └── 📄 page.tsx            # Signup page
│   │   │
│   │   ├── 📁 dashboard/
│   │   │   └── 📄 page.tsx            # Generation interface
│   │   │
│   │   ├── 📁 gallery/
│   │   │   └── 📄 page.tsx            # User gallery
│   │   │
│   │   └── 📁 api/                    # API routes
│   │       │
│   │       ├── 📁 auth/               # Authentication endpoints
│   │       │   ├── 📁 signup/
│   │       │   │   └── 📄 route.ts    # POST /api/auth/signup
│   │       │   ├── 📁 login/
│   │       │   │   └── 📄 route.ts    # POST /api/auth/login
│   │       │   ├── 📁 logout/
│   │       │   │   └── 📄 route.ts    # POST /api/auth/logout
│   │       │   └── 📁 callback/
│   │       │       └── 📄 route.ts    # GET /api/auth/callback
│   │       │
│   │       ├── 📁 fal/                # Fal.ai integration
│   │       │   ├── 📁 submit/
│   │       │   │   └── 📄 route.ts    # POST /api/fal/submit
│   │       │   └── 📁 status/
│   │       │       └── 📁 [requestId]/
│   │       │           └── 📄 route.ts # GET /api/fal/status/[requestId]
│   │       │
│   │       └── 📁 assets/             # Asset management
│   │           ├── 📁 transfer/
│   │           │   └── 📄 route.ts    # POST /api/assets/transfer
│   │           ├── 📁 list/
│   │           │   └── 📄 route.ts    # GET /api/assets/list
│   │           └── 📁 [assetId]/
│   │               └── 📄 route.ts    # DELETE /api/assets/[assetId]
│   │
│   ├── 📁 components/                 # React components
│   │   │
│   │   ├── 📁 auth/                   # Authentication components
│   │   │   ├── 📄 LoginForm.tsx       # Login form
│   │   │   ├── 📄 SignupForm.tsx      # Signup form
│   │   │   └── 📄 ProtectedRoute.tsx  # Route protection HOC
│   │   │
│   │   ├── 📁 generation/             # Generation UI components
│   │   │   ├── 📄 ModelSelector.tsx   # Model selection interface
│   │   │   └── 📄 DynamicForm.tsx     # Dynamic parameter form
│   │   │
│   │   ├── 📁 gallery/                # Gallery components
│   │   │   ├── 📄 Gallery.tsx         # Gallery grid view
│   │   │   └── 📄 AssetCard.tsx       # Individual asset card
│   │   │
│   │   └── 📁 layout/                 # Layout components
│   │       └── 📄 Navbar.tsx          # Navigation bar
│   │
│   ├── 📁 hooks/                      # Custom React hooks
│   │   └── 📄 useAuth.ts              # Authentication hook
│   │
│   ├── 📁 lib/                        # Utilities and configurations
│   │   │
│   │   ├── 📁 supabase/               # Supabase integration
│   │   │   ├── 📄 client.ts           # Client-side Supabase client
│   │   │   ├── 📄 server.ts           # Server-side Supabase client
│   │   │   └── 📄 middleware.ts       # Middleware Supabase client
│   │   │
│   │   └── 📁 fal/                    # Fal.ai integration
│   │       ├── 📄 client.ts           # Fal.ai client configuration
│   │       └── 📄 models.ts           # Model definitions and metadata
│   │
│   └── 📁 types/                      # TypeScript type definitions
│       ├── 📄 database.ts             # Supabase database types
│       └── 📄 index.ts                # General type definitions
│
└── 📁 supabase/                       # Supabase configuration
    ├── 📁 migrations/
    │   └── 📄 001_initial_schema.sql  # Database schema
    └── 📄 storage-policies.sql        # Storage access policies
```

---

## File Descriptions

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | NPM dependencies, scripts, and project metadata |
| `tsconfig.json` | TypeScript compiler configuration |
| `next.config.js` | Next.js framework configuration |
| `tailwind.config.ts` | Tailwind CSS customization |
| `postcss.config.js` | PostCSS plugins configuration |
| `.eslintrc.json` | Code linting rules |
| `.env.example` | Environment variables template |
| `.gitignore` | Files to exclude from Git |
| `.cursorignore` | Files to exclude from Cursor AI |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Comprehensive project documentation |
| `QUICKSTART.md` | Quick 5-minute setup guide |
| `API.md` | Complete API reference with examples |
| `DEPLOYMENT.md` | Production deployment instructions |
| `CONTRIBUTING.md` | Guidelines for contributors |
| `ROADMAP.md` | Future features and development plans |
| `PROJECT_SUMMARY.md` | High-level project overview |
| `IMPLEMENTATION_COMPLETE.md` | Phase 1 completion report |
| `FILE_TREE.md` | This file - project structure |

### Pages (src/app/)

| File | Route | Purpose |
|------|-------|---------|
| `layout.tsx` | - | Root layout with global styles |
| `page.tsx` | `/` | Landing page with hero section |
| `login/page.tsx` | `/login` | User login interface |
| `signup/page.tsx` | `/signup` | User registration interface |
| `dashboard/page.tsx` | `/dashboard` | AI generation interface (protected) |
| `gallery/page.tsx` | `/gallery` | User asset gallery (protected) |

### API Routes (src/app/api/)

#### Authentication
| File | Method | Route | Purpose |
|------|--------|-------|---------|
| `auth/signup/route.ts` | POST | `/api/auth/signup` | Create new user account |
| `auth/login/route.ts` | POST | `/api/auth/login` | Authenticate user |
| `auth/logout/route.ts` | POST | `/api/auth/logout` | Sign out user |
| `auth/callback/route.ts` | GET | `/api/auth/callback` | OAuth callback handler |

#### Generation
| File | Method | Route | Purpose |
|------|--------|-------|---------|
| `fal/submit/route.ts` | POST | `/api/fal/submit` | Submit AI generation job |
| `fal/status/[requestId]/route.ts` | GET | `/api/fal/status/:id` | Check job status |

#### Assets
| File | Method | Route | Purpose |
|------|--------|-------|---------|
| `assets/transfer/route.ts` | POST | `/api/assets/transfer` | Transfer asset to storage |
| `assets/list/route.ts` | GET | `/api/assets/list` | List user's assets |
| `assets/[assetId]/route.ts` | DELETE | `/api/assets/:id` | Delete an asset |

### Components (src/components/)

#### Authentication Components
| Component | Purpose |
|-----------|---------|
| `LoginForm.tsx` | Form for user login |
| `SignupForm.tsx` | Form for user registration |
| `ProtectedRoute.tsx` | HOC to protect authenticated routes |

#### Generation Components
| Component | Purpose |
|-----------|---------|
| `ModelSelector.tsx` | Grid of available AI models with filtering |
| `DynamicForm.tsx` | Form that adapts to selected model parameters |

#### Gallery Components
| Component | Purpose |
|-----------|---------|
| `Gallery.tsx` | Grid layout displaying all user assets |
| `AssetCard.tsx` | Individual asset with preview and actions |

#### Layout Components
| Component | Purpose |
|-----------|---------|
| `Navbar.tsx` | Top navigation bar with user menu |

### Hooks (src/hooks/)

| Hook | Purpose |
|------|---------|
| `useAuth.ts` | Authentication state and methods (signIn, signUp, signOut) |

### Library/Utils (src/lib/)

#### Supabase
| File | Purpose |
|------|---------|
| `supabase/client.ts` | Client-side Supabase instance |
| `supabase/server.ts` | Server-side Supabase instance |
| `supabase/middleware.ts` | Middleware Supabase instance |

#### Fal.ai
| File | Purpose |
|------|---------|
| `fal/client.ts` | Fal.ai client configuration |
| `fal/models.ts` | Curated list of 10+ AI models |

### Types (src/types/)

| File | Purpose |
|------|---------|
| `database.ts` | Supabase database schema types |
| `index.ts` | Application-wide type definitions |

### Database (supabase/)

| File | Purpose |
|------|---------|
| `migrations/001_initial_schema.sql` | Database tables, policies, and functions |
| `storage-policies.sql` | Storage bucket and access policies |

---

## File Statistics

### By Type

```
TypeScript Files (.ts/.tsx): 35
SQL Files (.sql):            2
Config Files (.js/.json):    5
CSS Files (.css):            1
Markdown Files (.md):        9
Shell Scripts (.sh):         1
Other (.example):            1
─────────────────────────────
Total:                      54 files
```

### By Category

```
Pages:                  6 files
API Routes:            9 files
Components:            8 files
Hooks:                 1 file
Libraries:             5 files
Types:                 2 files
Database:              2 files
Configuration:        11 files
Documentation:         9 files
Scripts:               1 file
─────────────────────────────
Total:                54 files
```

### Lines of Code (Estimated)

```
TypeScript/TSX:     ~4,500 lines
SQL:                  ~200 lines
Configuration:        ~300 lines
Documentation:      ~3,000 lines
─────────────────────────────
Total:              ~8,000 lines
```

---

## Key Dependencies

### Production Dependencies (12)
- `next` - React framework
- `react` - UI library
- `react-dom` - React DOM bindings
- `@supabase/supabase-js` - Supabase client
- `@supabase/auth-helpers-nextjs` - Supabase auth helpers
- `@fal-ai/serverless-client` - Fal.ai client
- `zustand` - State management
- `axios` - HTTP client
- `date-fns` - Date utilities
- `lucide-react` - Icon library
- `react-hot-toast` - Toast notifications
- `swr` - Data fetching

### Development Dependencies (9)
- `typescript` - Type system
- `@types/node` - Node.js types
- `@types/react` - React types
- `@types/react-dom` - React DOM types
- `tailwindcss` - CSS framework
- `autoprefixer` - CSS post-processor
- `postcss` - CSS transformer
- `eslint` - Code linter
- `eslint-config-next` - Next.js ESLint config

---

## Database Schema

### Tables (3)

```sql
profiles
├── id (UUID, PK)
├── email (TEXT)
├── full_name (TEXT)
├── avatar_url (TEXT)
├── created_at (TIMESTAMP)
└── updated_at (TIMESTAMP)

jobs
├── id (UUID, PK)
├── user_id (UUID, FK → profiles.id)
├── fal_request_id (TEXT)
├── model_id (TEXT)
├── status (TEXT)
├── input_params (JSONB)
├── output_data (JSONB)
├── error_message (TEXT)
├── cost (DECIMAL)
├── created_at (TIMESTAMP)
├── updated_at (TIMESTAMP)
└── completed_at (TIMESTAMP)

assets
├── id (UUID, PK)
├── user_id (UUID, FK → profiles.id)
├── job_id (UUID, FK → jobs.id)
├── asset_type (TEXT)
├── original_url (TEXT)
├── storage_path (TEXT)
├── storage_url (TEXT)
├── file_size (BIGINT)
├── width (INTEGER)
├── height (INTEGER)
├── duration (DECIMAL)
├── metadata (JSONB)
└── created_at (TIMESTAMP)
```

### Storage Buckets (1)

```
assets/
└── {user_id}/
    └── {generated_files}
```

---

## Important Paths

### Development
- **Dev Server**: `npm run dev` → http://localhost:3000
- **API Base**: http://localhost:3000/api
- **Environment**: `.env` (create from `.env.example`)

### Production
- **Build Output**: `.next/`
- **Static Files**: `public/`
- **Environment**: Platform-specific (Vercel, Netlify, etc.)

---

## Quick Navigation

### For New Developers
1. Start with `QUICKSTART.md`
2. Read `README.md`
3. Review `PROJECT_SUMMARY.md`
4. Explore `src/app/page.tsx` (landing page)
5. Check `src/app/dashboard/page.tsx` (main functionality)

### For API Integration
1. Read `API.md`
2. Check `src/app/api/` directory
3. Review `src/lib/fal/` for Fal.ai integration
4. See `src/lib/supabase/` for database integration

### For Deployment
1. Read `DEPLOYMENT.md`
2. Set up Supabase (see `supabase/` directory)
3. Configure environment variables
4. Follow platform-specific instructions

### For Contributing
1. Read `CONTRIBUTING.md`
2. Check `ROADMAP.md` for planned features
3. Follow code style in existing files
4. Submit PRs with clear descriptions

---

## File Naming Conventions

- **Pages**: lowercase with dashes (`page.tsx`, `dashboard/page.tsx`)
- **Components**: PascalCase (`LoginForm.tsx`, `AssetCard.tsx`)
- **API Routes**: lowercase with dashes (`route.ts`)
- **Hooks**: camelCase with "use" prefix (`useAuth.ts`)
- **Utils**: camelCase (`client.ts`, `models.ts`)
- **Types**: camelCase (`database.ts`, `index.ts`)
- **Docs**: UPPERCASE (`README.md`, `API.md`)
- **Config**: lowercase with dots (`next.config.js`)

---

**Last Updated**: October 1, 2025

For questions about file structure, see PROJECT_SUMMARY.md or README.md

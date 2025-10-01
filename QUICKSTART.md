# Bongo AI Studio - Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- A Supabase account ([supabase.com](https://supabase.com))
- A Fal.ai account ([fal.ai](https://fal.ai))

## Step 1: Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd bongo-ai-studio

# Run the setup script (Linux/Mac)
./setup.sh

# Or manually:
npm install
cp .env.example .env
```

## Step 2: Set Up Supabase

### Create a Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details
4. Wait for project to be ready (2-3 minutes)

### Get Your Credentials

1. Go to **Settings** → **API**
2. Copy these values:
   - Project URL
   - `anon` `public` key
   - `service_role` `secret` key

### Run Database Migrations

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New Query**
3. Copy the entire contents of `supabase/migrations/001_initial_schema.sql`
4. Paste and click **Run**
5. You should see "Success. No rows returned"

### Set Up Storage

1. Go to **Storage** in your Supabase dashboard
2. Click **Create a new bucket**
3. Name it `assets`
4. Set it to **Private**
5. Click **Save**

Then set up policies:

1. Go to **SQL Editor**
2. Copy the entire contents of `supabase/storage-policies.sql`
3. Paste and click **Run**

## Step 3: Get Fal.ai API Key

1. Go to [fal.ai](https://fal.ai)
2. Sign up or log in
3. Go to your dashboard
4. Generate an API key
5. Copy the key (it starts with `fal-...`)

## Step 4: Configure Environment Variables

Edit the `.env` file in your project root:

```env
# Replace these with your actual values
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

FAL_KEY=your-fal-api-key-here

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**⚠️ Important:**
- Don't commit the `.env` file to git
- Keep `SUPABASE_SERVICE_ROLE_KEY` and `FAL_KEY` secret
- Never expose these keys in client-side code

## Step 5: Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

You should see the Bongo landing page! 🎉

## Step 6: Test the Application

### Create an Account

1. Click **Get Started** or **Sign Up**
2. Enter your email and password
3. Check your email for verification link
4. Click the verification link

### Generate Your First Asset

1. After logging in, you'll be on the dashboard
2. Select a model (try **FLUX Schnell** for fast results)
3. Enter a prompt like "A beautiful sunset over mountains"
4. Adjust parameters if desired
5. Click **Generate**
6. Wait for the generation to complete (10-30 seconds)
7. Your asset will appear in the "Recently Generated" section

### View Your Gallery

1. Click **Gallery** in the navigation
2. You should see your generated asset
3. Hover over it to see action buttons
4. Try downloading or sharing the asset

## Troubleshooting

### "Unauthorized" Errors

**Problem:** Getting 401 errors when making requests

**Solutions:**
- Check that you're logged in
- Verify Supabase credentials in `.env`
- Make sure you ran the database migrations
- Clear browser cookies and log in again

### Database Connection Issues

**Problem:** "Failed to fetch" or database errors

**Solutions:**
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check that Supabase project is active (not paused)
- Ensure database migrations ran successfully
- Check Row Level Security policies are set up

### Generation Fails

**Problem:** Jobs fail or return errors

**Solutions:**
- Verify `FAL_KEY` is correct
- Check you have credits in your Fal.ai account
- Try a simpler prompt
- Check Fal.ai API status

### Assets Not Showing

**Problem:** Generated assets don't appear in gallery

**Solutions:**
- Check that storage bucket was created correctly
- Verify storage policies were applied
- Check browser console for errors
- Ensure asset transfer completed (check Network tab)

### Build Errors

**Problem:** TypeScript or build errors

**Solutions:**
```bash
# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

## Next Steps

Now that you have Bongo running:

1. **Explore Models**: Try different Fal.ai models
2. **Experiment with Parameters**: Adjust inference steps, image sizes, etc.
3. **Read Documentation**: Check out README.md for detailed info
4. **Check the Roadmap**: See ROADMAP.md for upcoming features
5. **Contribute**: See CONTRIBUTING.md if you want to help

## Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Deployment
vercel               # Deploy to Vercel (requires Vercel CLI)
```

## Project Structure at a Glance

```
bongo-ai-studio/
├── src/
│   ├── app/           # Pages and API routes
│   ├── components/    # React components
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utilities
│   └── types/         # TypeScript types
├── supabase/          # Database setup
├── .env              # Your environment variables
└── package.json      # Dependencies
```

## Quick Reference: Key Files

- **Landing Page**: `src/app/page.tsx`
- **Dashboard**: `src/app/dashboard/page.tsx`
- **Gallery**: `src/app/gallery/page.tsx`
- **Auth Hook**: `src/hooks/useAuth.ts`
- **Model List**: `src/lib/fal/models.ts`
- **Database Schema**: `supabase/migrations/001_initial_schema.sql`

## Common Tasks

### Add a New Model

Edit `src/lib/fal/models.ts`:

```typescript
export const FEATURED_MODELS: FalModel[] = [
  // ... existing models
  {
    id: 'fal-ai/your-model',
    name: 'Your Model Name',
    description: 'Description here',
    category: 'Text-to-Image',
  },
]
```

### Customize Styling

Edit `tailwind.config.ts` to change colors, fonts, etc.

### Add Environment Variable

1. Add to `.env`
2. If client-side, prefix with `NEXT_PUBLIC_`
3. Restart dev server
4. Update `.env.example` with placeholder

## Production Deployment

Quick deploy to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and add environment variables
```

See DEPLOYMENT.md for complete deployment guide.

## Getting Help

- **Documentation**: Check markdown files in project root
- **Issues**: [GitHub Issues](https://github.com/your-repo/issues)
- **API Reference**: See API.md
- **Fal.ai Docs**: [docs.fal.ai](https://docs.fal.ai/)
- **Supabase Docs**: [supabase.com/docs](https://supabase.com/docs)

## Security Reminders

✅ **DO:**
- Keep `.env` out of version control
- Use environment variables for secrets
- Enable RLS on database tables
- Validate user input

❌ **DON'T:**
- Commit API keys to Git
- Expose service role key to client
- Share your `.env` file
- Disable Row Level Security

---

## Success Checklist

After completing this guide, you should have:

- [x] Installed dependencies
- [x] Created Supabase project
- [x] Set up database schema
- [x] Configured storage bucket
- [x] Got Fal.ai API key
- [x] Set up `.env` file
- [x] Started dev server successfully
- [x] Created a user account
- [x] Generated your first asset
- [x] Viewed asset in gallery

---

**Congratulations!** 🎉 You're now ready to build with Bongo AI Studio!

For more detailed information, see the full documentation in README.md.

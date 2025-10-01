# Bongo Deployment Guide

Complete guide for deploying Bongo AI Studio to production.

## Prerequisites

Before deploying, ensure you have:

1. **Supabase Project**
   - Created a Supabase project at [supabase.com](https://supabase.com)
   - Noted your project URL and API keys

2. **Fal.ai API Key**
   - Signed up at [fal.ai](https://fal.ai)
   - Generated an API key from your dashboard

3. **Git Repository**
   - Code pushed to GitHub, GitLab, or Bitbucket

## Supabase Setup

### 1. Run Database Migrations

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
5. Click **Run** to execute the migration

### 2. Set Up Storage

#### Option A: Using SQL (Recommended)

1. In SQL Editor, create a new query
2. Copy and paste the contents of `supabase/storage-policies.sql`
3. Run the query

#### Option B: Using Dashboard

1. Navigate to **Storage** in Supabase dashboard
2. Click **Create a new bucket**
3. Name it `assets`
4. Set it to **Private**
5. Click **Save**

Then add policies:

1. Go to **Storage Policies**
2. Add three policies for the `assets` bucket:

**Upload Policy:**
```sql
CREATE POLICY "Users can upload assets to their own folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'assets' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

**Select Policy:**
```sql
CREATE POLICY "Users can view their own assets"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'assets' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

**Delete Policy:**
```sql
CREATE POLICY "Users can delete their own assets"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'assets' AND
  (storage.foldername(name))[1] = auth.uid()::text
);
```

### 3. Configure Authentication

1. Navigate to **Authentication** > **Providers**
2. Enable **Email** provider
3. (Optional) Configure email templates in **Email Templates**
4. (Optional) Enable additional providers (Google, GitHub, etc.)

### 4. Get API Keys

1. Go to **Settings** > **API**
2. Copy the following:
   - Project URL
   - `anon` `public` key
   - `service_role` `secret` key (keep this secure!)

## Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the recommended platform for Next.js applications.

#### Steps:

1. **Install Vercel CLI (Optional)**
   ```bash
   npm i -g vercel
   ```

2. **Deploy via Dashboard**
   
   a. Go to [vercel.com](https://vercel.com)
   
   b. Click **Add New Project**
   
   c. Import your Git repository
   
   d. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

3. **Add Environment Variables**

   In project settings, add these environment variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   FAL_KEY=your_fal_api_key
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

4. **Deploy**
   
   Click **Deploy** and wait for the build to complete.

5. **Set Up Custom Domain (Optional)**
   
   - Go to **Settings** > **Domains**
   - Add your custom domain
   - Configure DNS as instructed

#### Deploy via CLI:

```bash
vercel
# Follow the prompts
# Set environment variables when prompted
```

### Option 2: Netlify

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com)
   - Click **Add new site** > **Import an existing project**
   - Connect your Git repository

2. **Configure Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

3. **Add Environment Variables**
   - Go to **Site settings** > **Environment variables**
   - Add all environment variables listed above

4. **Deploy**

### Option 3: Railway

1. **Create New Project**
   - Go to [railway.app](https://railway.app)
   - Click **New Project** > **Deploy from GitHub repo**

2. **Add Environment Variables**
   - Click on your deployment
   - Go to **Variables** tab
   - Add all environment variables

3. **Deploy**
   - Railway will automatically deploy

### Option 4: Self-Hosted with Docker

#### Create Dockerfile:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["npm", "start"]
```

#### Build and Run:

```bash
# Build image
docker build -t bongo-ai-studio .

# Run container
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  -e SUPABASE_SERVICE_ROLE_KEY=your_key \
  -e FAL_KEY=your_key \
  -e NEXT_PUBLIC_APP_URL=http://localhost:3000 \
  bongo-ai-studio
```

## Post-Deployment

### 1. Update Supabase Auth Settings

1. Go to **Authentication** > **URL Configuration**
2. Add your production URL to **Site URL**
3. Add redirect URLs:
   - `https://your-domain.com/auth/callback`
   - `https://your-domain.com/dashboard`

### 2. Test the Application

1. Visit your deployed URL
2. Test user registration
3. Test user login
4. Generate an asset
5. Check the gallery
6. Test asset download and deletion

### 3. Configure CORS (if needed)

If you encounter CORS issues with Supabase Storage:

1. Go to **Storage** > **Policies**
2. Ensure bucket policies are correctly set
3. Check that `NEXT_PUBLIC_APP_URL` matches your domain

### 4. Set Up Monitoring

#### Vercel Analytics (Vercel deployments)
1. Enable Vercel Analytics in project settings
2. Add Vercel Speed Insights

#### Sentry (All platforms)
```bash
npm install @sentry/nextjs
```

Initialize Sentry and configure error tracking.

### 5. Performance Optimization

1. **Enable Image Optimization**
   - Already configured in `next.config.js`

2. **Configure CDN Caching**
   - Set appropriate cache headers
   - Use Vercel Edge Network (automatic on Vercel)

3. **Database Optimization**
   - Monitor Supabase usage
   - Add indexes if needed
   - Consider read replicas for high traffic

## Environment-Specific Configurations

### Development
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Staging
```env
NEXT_PUBLIC_APP_URL=https://staging.your-domain.com
```

### Production
```env
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

## Troubleshooting

### Build Fails

**Issue**: TypeScript errors during build

**Solution**: Run `npm run type-check` locally to identify issues

---

**Issue**: Missing environment variables

**Solution**: Ensure all required environment variables are set in deployment platform

### Runtime Errors

**Issue**: "Unauthorized" errors

**Solution**: 
- Check Supabase API keys
- Verify authentication is working
- Check browser console for detailed errors

---

**Issue**: Assets not loading

**Solution**:
- Verify Supabase Storage bucket is created
- Check storage policies are applied
- Ensure storage URLs are accessible

### Fal.ai Integration Issues

**Issue**: Generation fails

**Solution**:
- Verify FAL_KEY is correct
- Check Fal.ai API status
- Review API route logs

## Security Checklist

- [ ] All environment variables are set
- [ ] `SUPABASE_SERVICE_ROLE_KEY` is kept secret (not in client code)
- [ ] `FAL_KEY` is kept secret (server-side only)
- [ ] Row Level Security (RLS) is enabled on all tables
- [ ] Storage policies are correctly configured
- [ ] HTTPS is enforced in production
- [ ] Authentication callbacks are whitelisted in Supabase
- [ ] CORS is properly configured

## Scaling Considerations

### High Traffic

1. **Upgrade Supabase Plan**
   - Increase database connections
   - Add read replicas

2. **Optimize API Routes**
   - Implement caching
   - Use Edge Functions where appropriate

3. **CDN for Assets**
   - Supabase Storage includes CDN
   - Consider additional CDN for static assets

### Cost Optimization

1. **Monitor Fal.ai Usage**
   - Implement usage limits per user
   - Add cost tracking in UI (Phase 2)

2. **Database Query Optimization**
   - Use proper indexes
   - Limit query results
   - Implement pagination

3. **Storage Management**
   - Implement storage limits per user
   - Add cleanup for old assets

## Backup Strategy

### Database Backups

Supabase provides automatic daily backups. For critical applications:

1. Set up Point-in-Time Recovery (PITR) in Supabase
2. Export database regularly
3. Store backups in separate location

### Asset Backups

1. Supabase Storage is replicated
2. For extra safety, set up periodic S3 sync
3. Document asset recovery procedures

## Support

For deployment issues:
- Check [Next.js deployment docs](https://nextjs.org/docs/deployment)
- Review [Supabase documentation](https://supabase.com/docs)
- Check [Fal.ai API docs](https://docs.fal.ai/)

For application-specific issues:
- Check application logs
- Review error tracking (Sentry)
- Open GitHub issue

# Deployment Guide for Bongo AI Studio

This guide covers deploying Bongo AI Studio to production environments.

## Prerequisites

- Supabase project (database + storage)
- Fal.ai API key
- Vercel account (recommended) or other Next.js hosting platform

## Supabase Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be fully initialized

### 2. Set up Database Schema

1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the entire contents of `supabase-schema.sql`
3. Run the SQL script to create all tables, indexes, and policies

### 3. Configure Storage

1. Go to Storage in your Supabase dashboard
2. Create a new bucket called `assets`
3. Set the bucket to be public (for asset URLs to work)
4. Configure the following bucket policy:

```sql
-- Allow authenticated users to upload to their own folder
CREATE POLICY "Users can upload to own folder" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'assets' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow public access to read assets
CREATE POLICY "Public can view assets" ON storage.objects
FOR SELECT USING (bucket_id = 'assets');
```

### 4. Configure Authentication

1. Go to Authentication > Settings in Supabase
2. Configure your site URL (e.g., `https://yourdomain.com`)
3. Add redirect URLs for auth callbacks:
   - `https://yourdomain.com/auth/callback`
   - `http://localhost:3000/auth/callback` (for development)

## Environment Variables

Set up the following environment variables in your deployment platform:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Fal.ai Configuration
FAL_AI_API_KEY=your_fal_ai_key_here

# Next.js Configuration
NEXTAUTH_SECRET=your_random_secret_string_here
NEXTAUTH_URL=https://yourdomain.com
```

## Vercel Deployment

### 1. Connect Repository

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Vercel will automatically detect it's a Next.js project

### 2. Configure Environment Variables

1. In your Vercel project settings, go to Environment Variables
2. Add all the environment variables listed above
3. Make sure to add them for Production, Preview, and Development environments

### 3. Deploy

1. Vercel will automatically deploy on every push to main
2. Your app will be available at `https://your-project.vercel.app`

## Alternative Deployment Options

### Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Railway Deployment

1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

## Post-Deployment Checklist

- [ ] Verify authentication works (sign up/sign in)
- [ ] Test model selection and parameter forms
- [ ] Submit a test generation job
- [ ] Verify asset transfer to Supabase Storage
- [ ] Check gallery displays assets correctly
- [ ] Test download and share functionality
- [ ] Verify all API endpoints are working
- [ ] Check responsive design on mobile devices

## Monitoring and Maintenance

### Supabase Monitoring

- Monitor database usage in Supabase dashboard
- Set up alerts for storage usage
- Review API usage and rate limits

### Application Monitoring

- Set up error tracking (e.g., Sentry)
- Monitor API response times
- Track user engagement metrics

### Regular Maintenance

- Update dependencies regularly
- Monitor Fal.ai API changes
- Backup database regularly
- Review and optimize database queries

## Troubleshooting

### Common Issues

1. **Authentication not working**
   - Check redirect URLs in Supabase settings
   - Verify environment variables are set correctly

2. **Assets not uploading**
   - Check Supabase Storage bucket permissions
   - Verify service role key has proper permissions

3. **Fal.ai API errors**
   - Verify API key is valid and has sufficient credits
   - Check rate limits and usage quotas

4. **Database connection issues**
   - Verify Supabase URL and keys
   - Check database connection limits

### Getting Help

- Check Supabase documentation
- Review Fal.ai API documentation
- Open an issue in the GitHub repository
- Check Vercel deployment logs for errors

## Security Considerations

- Never expose service role keys in client-side code
- Use Row Level Security (RLS) policies in Supabase
- Regularly rotate API keys
- Monitor for unusual API usage patterns
- Keep dependencies updated for security patches
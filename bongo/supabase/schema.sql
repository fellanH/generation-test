-- Enable UUIDs
create extension if not exists "uuid-ossp";

-- Assets table: stores metadata for generated assets
create table if not exists public.assets (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  model text,
  job_id text,
  storage_bucket text not null default 'assets',
  storage_path text not null,
  public_url text not null,
  mime_type text,
  width int,
  height int,
  created_at timestamptz not null default now()
);

-- Policies
alter table public.assets enable row level security;

create policy "Users can view own assets" on public.assets
for select using (auth.uid() = user_id);

create policy "Users can insert own assets" on public.assets
for insert with check (auth.uid() = user_id);

create policy "Users can delete own assets" on public.assets
for delete using (auth.uid() = user_id);

-- Storage bucket note: create via Supabase dashboard or edge function
-- Bucket name: assets, make it private; generate public_url via signed URL if needed


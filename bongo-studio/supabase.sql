-- Users are managed by Supabase Auth; this table stores profile metadata
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  display_name text,
  avatar_url text
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles for select using (auth.uid() = id);

create policy "Profiles are editable by owner"
  on public.profiles for update using (auth.uid() = id);

-- Assets generated via Fal.ai and persisted in Supabase Storage
create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  owner_id uuid references auth.users(id) on delete cascade not null,
  model_id text not null,
  job_id text,
  status text default 'stored',
  mime_type text,
  width integer,
  height integer,
  size_bytes integer,
  storage_bucket text not null default 'assets',
  storage_path text not null,
  original_fal_url text,
  metadata jsonb default '{}'::jsonb
);

alter table public.assets enable row level security;

create index if not exists assets_owner_idx on public.assets(owner_id);

create policy "Assets are viewable by owner"
  on public.assets for select using (auth.uid() = owner_id);

create policy "Assets are insertable by owner"
  on public.assets for insert with check (auth.uid() = owner_id);

create policy "Assets are deletable by owner"
  on public.assets for delete using (auth.uid() = owner_id);

-- Trigger to update updated_at on profiles
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.handle_updated_at();

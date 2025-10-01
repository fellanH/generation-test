## Bongo – AI Generative Studio (MVP scaffold)

This is a manually scaffolded Next.js (App Router) project prepared for:

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Supabase (auth + storage, to be wired)

### Getting Started

1. Install dependencies:

```bash
npm install
```

2. Copy env example and fill values:

```bash
cp .env.local.example .env.local
```

Required keys:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000

### Notes

- Supabase helpers exist in `src/lib/supabase`. You will need to `npm install` the dependencies listed in `package.json`.
- Auth pages are scaffolded under `src/app/(auth)`.


-- =============================================================
-- Leading Edge Consultancy Services — Supabase Schema
-- Paste this entire file into the Supabase SQL Editor and run it.
-- =============================================================


-- ----------------------------------------------------------------
-- 1. SUBMISSIONS TABLE
-- ----------------------------------------------------------------
create table if not exists public.submissions (
  id          bigserial primary key,
  name        text not null,
  email       text not null,
  country     text,
  country_code text,
  phone       text,
  industry    text,
  description text,
  file_url    text,
  created_at  timestamptz default now()
);


-- ----------------------------------------------------------------
-- 2. ROW LEVEL SECURITY
-- ----------------------------------------------------------------
alter table public.submissions enable row level security;

-- Anyone (including unauthenticated API routes) can insert new submissions.
create policy "Allow public insert"
  on public.submissions
  for insert
  to anon, authenticated
  with check (true);

-- Only logged-in admin users can read submissions.
create policy "Allow authenticated read"
  on public.submissions
  for select
  to authenticated
  using (true);


-- ----------------------------------------------------------------
-- 3. STORAGE BUCKET — resumes
-- Supabase Storage buckets can also be created via the dashboard
-- (Storage → New bucket), but this SQL approach works too.
-- ----------------------------------------------------------------
insert into storage.buckets (id, name, public)
  values ('resumes', 'resumes', true)
  on conflict (id) do nothing;

-- Allow unauthenticated uploads (the API route uses the anon key).
create policy "Allow public upload to resumes"
  on storage.objects
  for insert
  to anon, authenticated
  with check (bucket_id = 'resumes');

-- Allow public read so resume URLs are accessible.
create policy "Allow public read from resumes"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'resumes');


-- ----------------------------------------------------------------
-- 4. ADMIN AUTH
-- Create an admin user through the Supabase dashboard:
--   Authentication → Users → Invite user (or Add user)
-- That email/password is what the /admin page login uses.
-- No SQL needed for auth setup.
-- ----------------------------------------------------------------

-- ========================================================
-- Supabase Schema for Wedding Invitation (RSVP & Guestbook)
-- Run this script in the Supabase SQL Editor (https://supabase.com)
-- ========================================================

-- 1. Create the RSVPs table
create table if not exists public.rsvps (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  attending boolean not null default true,
  guests integer not null default 1,
  message text
);

-- 2. Index for fast sorting of messages/wishes by date
create index if not exists rsvps_created_at_idx on public.rsvps (created_at desc);

-- 3. Enable Row Level Security (RLS)
alter table public.rsvps enable row level security;

-- 4. RLS Policy: Allow anyone (anon) to insert their RSVP
create policy "Allow public inserts for RSVPs"
  on public.rsvps
  for insert
  with check (true);

-- 5. RLS Policy: Allow anyone to view RSVPs/wishes (for Guestbook feed)
create policy "Allow public read access for RSVPs"
  on public.rsvps
  for select
  using (true);

-- Run this once in Supabase SQL Editor.

create table profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null,
  is_admin boolean default false,
  created_at timestamptz default now()
);

create or replace function is_admin(uid uuid) returns boolean as $$
  select coalesce((select is_admin from profiles where id = uid), false);
$$ language sql stable;

create table uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users not null,
  title text not null,
  game text,
  language text default 'Luau',
  description text,
  code text not null,
  created_at timestamptz default now()
);

-- generic likes/dislikes, works for local-json, scriptblox, and uploaded scripts
create table likes (
  id uuid primary key default gen_random_uuid(),
  script_source text not null,   -- 'local' | 'scriptblox' | 'upload'
  script_id text not null,
  user_id uuid references auth.users not null,
  value smallint not null check (value in (1, -1)),
  unique (script_source, script_id, user_id)
);

create table comments (
  id uuid primary key default gen_random_uuid(),
  script_source text not null,
  script_id text not null,
  user_id uuid references auth.users not null,
  content text not null,
  created_at timestamptz default now()
);

-- Row Level Security
alter table profiles enable row level security;
alter table uploads enable row level security;
alter table likes enable row level security;
alter table comments enable row level security;

create policy "profiles readable by all" on profiles for select using (true);
create policy "user inserts own profile" on profiles for insert with check (auth.uid() = id);
create policy "user updates own profile" on profiles for update using (auth.uid() = id);

create policy "uploads readable by all" on uploads for select using (true);
create policy "logged in users insert uploads" on uploads for insert with check (auth.uid() = user_id);
create policy "owner or admin updates upload" on uploads for update using (auth.uid() = user_id or is_admin(auth.uid()));
create policy "owner or admin deletes upload" on uploads for delete using (auth.uid() = user_id or is_admin(auth.uid()));

create policy "likes readable by all" on likes for select using (true);
create policy "user manages own like" on likes for insert with check (auth.uid() = user_id);
create policy "user updates own like" on likes for update using (auth.uid() = user_id);
create policy "user deletes own like" on likes for delete using (auth.uid() = user_id);

create policy "comments readable by all" on comments for select using (true);
create policy "logged in users insert comments" on comments for insert with check (auth.uid() = user_id);
create policy "owner or admin updates comment" on comments for update using (auth.uid() = user_id or is_admin(auth.uid()));
create policy "owner or admin deletes comment" on comments for delete using (auth.uid() = user_id or is_admin(auth.uid()));

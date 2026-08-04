create extension if not exists "pgcrypto";

create table if not exists public.users (
  id uuid primary key,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.survey_data (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  zipcode text not null,
  year_built int not null,
  home_value text not null,
  home_type text not null,
  safety_features text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.risk_scores (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  score numeric(3,1) not null check (score >= 0 and score <= 10),
  factors jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.policies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  type text not null check (type in ('Basic', 'Premium')),
  premium numeric(10,2) not null,
  renewal_date date not null
);

create table if not exists public.recommendations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  text text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null unique references public.users(id) on delete cascade,
  exhibits_completed int not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.survey_data enable row level security;
alter table public.risk_scores enable row level security;
alter table public.policies enable row level security;
alter table public.recommendations enable row level security;
alter table public.user_progress enable row level security;

drop policy if exists "users authenticated full access" on public.users;
create policy "users authenticated full access"
on public.users
for all
to authenticated
using (true)
with check (true);

drop policy if exists "survey authenticated full access" on public.survey_data;
create policy "survey authenticated full access"
on public.survey_data
for all
to authenticated
using (true)
with check (true);

drop policy if exists "risk authenticated full access" on public.risk_scores;
create policy "risk authenticated full access"
on public.risk_scores
for all
to authenticated
using (true)
with check (true);

drop policy if exists "policy authenticated full access" on public.policies;
create policy "policy authenticated full access"
on public.policies
for all
to authenticated
using (true)
with check (true);

drop policy if exists "recommendations authenticated full access" on public.recommendations;
create policy "recommendations authenticated full access"
on public.recommendations
for all
to authenticated
using (true)
with check (true);

drop policy if exists "progress authenticated full access" on public.user_progress;
create policy "progress authenticated full access"
on public.user_progress
for all
to authenticated
using (true)
with check (true);

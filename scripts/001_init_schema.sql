-- orbitrag · initial schema
-- 1. site_content : key/value store for every editable piece of copy on the landing page
-- 2. visits       : append-only log of every landing-page view
-- 3. admins       : allow-list of authenticated users who may edit content / read visits

create table if not exists public.site_content (
  key         text primary key,
  value       text not null default '',
  label       text not null,
  kind        text not null default 'text' check (kind in ('text','textarea','url','email')),
  section     text not null default 'general',
  sort_order  int  not null default 0,
  updated_at  timestamptz not null default now()
);

create table if not exists public.visits (
  id          uuid primary key default gen_random_uuid(),
  path        text,
  referrer    text,
  user_agent  text,
  country     text,
  created_at  timestamptz not null default now()
);

create index if not exists visits_created_at_idx on public.visits (created_at desc);

create table if not exists public.admins (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  email      text not null,
  created_at timestamptz not null default now()
);

-- Helper: is the current session an admin?
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

-- RLS
alter table public.site_content enable row level security;
alter table public.visits       enable row level security;
alter table public.admins       enable row level security;

-- site_content: world-readable, admin-writable
drop policy if exists "site_content read public"   on public.site_content;
drop policy if exists "site_content write admin"   on public.site_content;
drop policy if exists "site_content update admin"  on public.site_content;
drop policy if exists "site_content delete admin"  on public.site_content;

create policy "site_content read public"
  on public.site_content for select
  using (true);

create policy "site_content write admin"
  on public.site_content for insert
  with check (public.is_admin());

create policy "site_content update admin"
  on public.site_content for update
  using (public.is_admin())
  with check (public.is_admin());

create policy "site_content delete admin"
  on public.site_content for delete
  using (public.is_admin());

-- visits: anyone can log a visit (anon insert), only admins can read
drop policy if exists "visits insert public" on public.visits;
drop policy if exists "visits read admin"    on public.visits;

create policy "visits insert public"
  on public.visits for insert
  with check (true);

create policy "visits read admin"
  on public.visits for select
  using (public.is_admin());

-- admins: only admins can see who's on the list. Bootstrap is done by a trigger below.
drop policy if exists "admins read admin" on public.admins;

create policy "admins read admin"
  on public.admins for select
  using (public.is_admin());

-- Bootstrap: first user to sign up becomes the admin automatically.
create or replace function public.bootstrap_first_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select count(*) from public.admins) = 0 then
    insert into public.admins (user_id, email)
    values (new.id, new.email)
    on conflict (user_id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_bootstrap on auth.users;

create trigger on_auth_user_created_bootstrap
  after insert on auth.users
  for each row
  execute function public.bootstrap_first_admin();

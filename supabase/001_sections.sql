create table if not exists public.users (
  id         uuid primary key references auth.users (id) on delete cascade,
  email      text not null unique,
  full_name  text,
  role       text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;

drop policy if exists "Users can read their own row" on public.users;
create policy "Users can read their own row" on public.users
  for select to authenticated using (id = (select auth.uid()));

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.users where id = (select auth.uid()) and role = 'admin');
$$;

drop table if exists public.admins;

create table if not exists public.sections (
  key        text primary key,
  content    jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists sections_touch on public.sections;
create trigger sections_touch before update on public.sections
  for each row execute function public.touch_updated_at();

alter table public.sections enable row level security;

drop policy if exists "Anyone can read sections" on public.sections;
create policy "Anyone can read sections" on public.sections
  for select to anon, authenticated using (true);

drop policy if exists "Admins can add sections" on public.sections;
create policy "Admins can add sections" on public.sections
  for insert to authenticated with check ((select public.is_admin()));

drop policy if exists "Admins can edit sections" on public.sections;
create policy "Admins can edit sections" on public.sections
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

insert into public.sections (key, content) values
(
  'header',
  '{
    "menu": [
      { "label": "About", "href": "#about" },
      { "label": "AIT", "href": "#ait" },
      { "label": "Books & Publications", "href": "#books" },
      { "label": "Media", "href": "#media" },
      { "label": "Speaking", "href": "#speaking" },
      { "label": "Experience", "href": "#experience" },
      { "label": "Her Work", "href": "#work" }
    ]
  }'::jsonb
),
(
  'announcement',
  '{
    "enabled": true,
    "text": "Recipient of the 2026 AAMFT Clinical Practice Innovation Award —",
    "link_label": "Read more",
    "link_href": "#experience"
  }'::jsonb
)
on conflict (key) do nothing;

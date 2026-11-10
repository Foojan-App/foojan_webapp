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

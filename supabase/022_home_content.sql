create table if not exists public.home_content (
  key        text primary key,
  content    jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

drop trigger if exists home_content_touch on public.home_content;
create trigger home_content_touch before update on public.home_content
  for each row execute function public.touch_updated_at();

alter table public.home_content enable row level security;

drop policy if exists "Anyone can read home content" on public.home_content;
create policy "Anyone can read home content" on public.home_content
  for select to anon, authenticated using (true);

drop policy if exists "Admins can add home content" on public.home_content;
create policy "Admins can add home content" on public.home_content
  for insert to authenticated with check ((select public.is_admin()));

drop policy if exists "Admins can edit home content" on public.home_content;
create policy "Admins can edit home content" on public.home_content
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

create table if not exists public.about (
  id                 integer primary key default 1 check (id = 1),
  eyebrow            text not null,
  heading            text not null,
  signature_subtitle text not null,
  lead               text not null,
  body               text not null,
  quote              text not null,
  quote_author       text not null,
  link_label         text not null,
  link_href          text not null,
  updated_at         timestamptz not null default now()
);

alter table public.about enable row level security;

drop trigger if exists about_touch on public.about;
create trigger about_touch before update on public.about
  for each row execute function public.touch_updated_at();

drop policy if exists "Anyone can read" on public.about;
create policy "Anyone can read" on public.about
  for select to anon, authenticated using (true);

drop policy if exists "Admins can add" on public.about;
create policy "Admins can add" on public.about
  for insert to authenticated with check ((select public.is_admin()));

drop policy if exists "Admins can edit" on public.about;
create policy "Admins can edit" on public.about
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

insert into public.about (
  id, eyebrow, heading, signature_subtitle, lead, body, quote, quote_author, link_label, link_href
)
values (
  1,
  'Meet Dr. Foojan',
  'A career devoted to understanding how *awareness* creates meaningful change.',
  'Psy.D., LMFT · Originator of AIT',
  E'I believe awareness is where transformation\nbegins — but awareness alone is not enough.\nWe may understand why we react as we do and\nstill repeat the same emotional, relational and\nbehavioral patterns.',
  E'That conviction led me to develop Awareness Integration Theory — an\nevidence-informed, multimodality framework that helps people\nrecognize the patterns shaping their lives, choose an intentional\nidentity, and translate it into purposeful action.',
  E'Awareness is not simply insight. It\nbecomes powerful when it changes how\nwe relate, choose and act.',
  'Dr. Foojan Zeine',
  'Read the full biography',
  '#'
)
on conflict (id) do nothing;

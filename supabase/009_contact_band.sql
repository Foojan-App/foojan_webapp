create table if not exists public.contact_band (
  id                     integer primary key default 1 check (id = 1),
  heading                text not null,
  paragraph              text not null,
  primary_button_label   text not null,
  primary_button_href    text not null,
  secondary_button_label text not null,
  secondary_button_href  text not null,
  updated_at             timestamptz not null default now()
);

alter table public.contact_band enable row level security;

drop trigger if exists contact_band_touch on public.contact_band;
create trigger contact_band_touch before update on public.contact_band
  for each row execute function public.touch_updated_at();

drop policy if exists "Anyone can read" on public.contact_band;
create policy "Anyone can read" on public.contact_band
  for select to anon, authenticated using (true);

drop policy if exists "Admins can add" on public.contact_band;
create policy "Admins can add" on public.contact_band
  for insert to authenticated with check ((select public.is_admin()));

drop policy if exists "Admins can edit" on public.contact_band;
create policy "Admins can edit" on public.contact_band
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

insert into public.contact_band (
  id, heading, paragraph, primary_button_label, primary_button_href, secondary_button_label, secondary_button_href
)
values (
  1,
  E'Speaking. Media.|Education.|\nCollaboration.',
  E'Whether you are planning an event, producing a program, or exploring\nprofessional training in AIT — start a conversation with Dr. Foojan’s office.',
  'Get in touch',
  'mailto:',
  'Speaking inquiries',
  '#speaking'
)
on conflict (id) do nothing;

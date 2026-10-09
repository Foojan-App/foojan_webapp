create table if not exists public.personal_note (
  id                 integer primary key default 1 check (id = 1),
  eyebrow            text not null,
  heading            text not null,
  paragraph          text not null,
  signature_subtitle text not null,
  updated_at         timestamptz not null default now()
);

alter table public.personal_note enable row level security;

drop trigger if exists personal_note_touch on public.personal_note;
create trigger personal_note_touch before update on public.personal_note
  for each row execute function public.touch_updated_at();

drop policy if exists "Anyone can read" on public.personal_note;
create policy "Anyone can read" on public.personal_note
  for select to anon, authenticated using (true);

drop policy if exists "Admins can add" on public.personal_note;
create policy "Admins can add" on public.personal_note
  for insert to authenticated with check ((select public.is_admin()));

drop policy if exists "Admins can edit" on public.personal_note;
create policy "Admins can edit" on public.personal_note
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));

insert into public.personal_note (id, eyebrow, heading, paragraph, signature_subtitle)
values (
  1,
  'A personal note',
  E'One mission, expressed through|many\nforms of work.',
  E'Although my work spans psychotherapy,|education, research, leadership,|\nmedia and technology, I do not see these|as separate pursuits. They are|\nexpressions of one mission: helping|human beings meet themselves with|\ngreater honesty, compassion, courage|and responsibility — and use that|\nawareness to create lives and|relationships that reflect who they|\nconsciously choose to be.',
  'Psy.D., LMFT'
)
on conflict (id) do nothing;

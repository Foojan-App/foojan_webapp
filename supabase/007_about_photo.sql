alter table public.about add column if not exists avatar_url text not null default '/images/foojan-avatar.png';
alter table public.about add column if not exists signature_name text not null default 'Dr. Foojan Zeine';

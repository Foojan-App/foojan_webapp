alter table public.pathways_section add column if not exists image_url text not null default '/images/photos/psychotherapy.png';
alter table public.pathways_section add column if not exists image_alt text not null default 'Dr. Foojan Zeine at the Therapy Hub';

alter table public.ait_section add column if not exists image_url text not null default '/images/photos/ait-research.png';
alter table public.ait_section add column if not exists image_alt text not null default 'Dr. Foojan Zeine presenting Awareness Integration Theory research';

alter table public.speaking add column if not exists image_url text not null default '/images/photos/speaking.png';
alter table public.speaking add column if not exists image_alt text not null default 'Dr. Foojan Zeine speaking to a professional audience';

alter table public.experience_section add column if not exists image_url text not null default '/images/photos/experience.png';
alter table public.experience_section add column if not exists image_alt text not null default 'Dr. Foojan Zeine at an international psychotherapy conference';

alter table public.extending_section add column if not exists image_url text not null default '/images/photos/foojan-app.png';
alter table public.extending_section add column if not exists image_alt text not null default 'Dr. Foojan Zeine presenting the Foojan App';

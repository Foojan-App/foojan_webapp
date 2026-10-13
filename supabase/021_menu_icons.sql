alter table public.menu_items add column if not exists icon_url text not null default '';

update public.menu_items set icon_url = '/images/menu/about.svg' where href = '#about' and icon_url = '';
update public.menu_items set icon_url = '/images/menu/ait.svg' where href = '#ait' and icon_url = '';
update public.menu_items set icon_url = '/images/menu/books.svg' where href = '#books' and icon_url = '';
update public.menu_items set icon_url = '/images/menu/media.svg' where href = '#media' and icon_url = '';
update public.menu_items set icon_url = '/images/menu/speaking.svg' where href = '#speaking' and icon_url = '';
update public.menu_items set icon_url = '/images/menu/experience.svg' where href = '#experience' and icon_url = '';
update public.menu_items set icon_url = '/images/menu/psychotherapy.svg' where label = 'Psychotherapy' and icon_url = '';

delete from public.menu_items where href = '/contact';

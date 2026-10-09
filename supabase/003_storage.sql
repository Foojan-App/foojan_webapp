insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do nothing;

drop policy if exists "Admins can upload images" on storage.objects;
create policy "Admins can upload images" on storage.objects
  for insert to authenticated with check (bucket_id = 'images' and (select public.is_admin()));

drop policy if exists "Admins can replace images" on storage.objects;
create policy "Admins can replace images" on storage.objects
  for update to authenticated using (bucket_id = 'images' and (select public.is_admin()));

drop policy if exists "Admins can delete images" on storage.objects;
create policy "Admins can delete images" on storage.objects
  for delete to authenticated using (bucket_id = 'images' and (select public.is_admin()));

drop policy if exists "Admins can see images" on storage.objects;
create policy "Admins can see images" on storage.objects
  for select to authenticated using (bucket_id = 'images' and (select public.is_admin()));

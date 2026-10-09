drop policy if exists "Admins can see images" on storage.objects;
create policy "Admins can see images" on storage.objects
  for select to authenticated using (bucket_id = 'images' and (select public.is_admin()));

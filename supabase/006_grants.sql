grant usage on schema public to anon, authenticated;

grant select on public.home_content, public.legal_pages, public.about_page, public.about_page_highlights to anon, authenticated;
grant insert, update on public.home_content to authenticated;
grant insert, update, delete on public.legal_pages, public.about_page, public.about_page_highlights to authenticated;

grant insert on public.contact_messages to anon, authenticated;
grant select, update, delete on public.contact_messages to authenticated;

grant select on public.users to authenticated;

grant usage, select on all sequences in schema public to anon, authenticated;

grant execute on function public.is_admin() to anon, authenticated;

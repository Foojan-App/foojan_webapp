update auth.users
set email_confirmed_at = coalesce(email_confirmed_at, now())
where email = 'your-email@example.com';

insert into public.users (id, email, full_name, role)
select id, email, 'Admin', 'admin' from auth.users where email = 'your-email@example.com'
on conflict (id) do update set role = excluded.role;

select u.email, u.email_confirmed_at is not null as confirmed, p.role
from auth.users u
left join public.users p on p.id = u.id
where u.email = 'your-email@example.com';

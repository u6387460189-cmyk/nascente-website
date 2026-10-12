-- Inquiries submitted through the website form.
-- Written only by the /api/inquire serverless function using the service-role key.
-- RLS is on with no policies, so the public anon key can neither read nor write.

create table if not exists public.inquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  parent_name   text not null,
  email         text not null,
  child_name    text not null,
  birth_year    int  not null,
  sessions      text[] not null,
  introduced_by text,
  note          text,
  lang          text not null default 'en' check (lang in ('en', 'pt')),
  status        text not null default 'new' check (status in ('new', 'contacted', 'confirmed', 'declined'))
);

create index if not exists inquiries_created_at_idx on public.inquiries (created_at desc);

alter table public.inquiries enable row level security;

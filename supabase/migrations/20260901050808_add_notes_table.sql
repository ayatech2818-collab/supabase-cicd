create table public.notes (
  id uuid primary key default gen_random_uuid(),
  test_table_id uuid not null references public.test_table (id) on delete cascade,
  body text not null,
  created_at timestamptz not null default timezone('utc'::text, now())
);

create index notes_test_table_id_idx on public.notes (test_table_id);

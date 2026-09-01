insert into test_table (name) values
  ('Alice'),
  ('Bob'),
  ('Charlie');

insert into notes (test_table_id, body)
select id, 'First note for ' || name
from test_table
where name = 'Alice';

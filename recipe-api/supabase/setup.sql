-- supabase/setup.sql: the Coffee Shop menu table.
-- Paste this whole file into Supabase: SQL Editor, New query, Run.
-- Same idea as the recipes table from class, but for drinks.

create table if not exists public.drinks (
  id            bigint generated always as identity primary key,
  name          text not null,
  category      text not null,                     -- 'Hot Coffee', 'Cold Coffee', 'Other Drinks'
  description   text not null default '',
  price         numeric(6, 2) not null check (price >= 0),
  emoji         text not null default '☕',
  customizable  boolean not null default true,     -- opens the size/milk/extras popup on the site
  created_at    timestamptz not null default now()
);

-- The 6 drinks from the coffee shop menu (only added if the table is empty).
insert into public.drinks (name, category, description, price, emoji, customizable)
select * from (values
  ('Cappuccino',          'Hot Coffee',   'Espresso with steamed milk and a thick layer of foam.',       4.50, '☕', true),
  ('Latte',               'Hot Coffee',   'Espresso mixed with smooth steamed milk.',                    4.75, '☕', true),
  ('Americano',           'Hot Coffee',   'Espresso combined with hot water for a smooth, bold coffee.', 3.50, '☕', true),
  ('Iced Latte',          'Cold Coffee',  'Espresso and cold milk served over ice.',                     5.00, '🧊', true),
  ('Caramel Iced Coffee', 'Cold Coffee',  'Iced coffee with milk and sweet caramel.',                    5.25, '🥤', true),
  ('Hot Chocolate',       'Other Drinks', 'Rich chocolate blended with warm steamed milk.',              4.00, '🍫', true)
) as menu
where not exists (select 1 from public.drinks);

-- The API uses the SECRET key, which skips Row Level Security, so this changes nothing for it.
-- It just stops anyone from editing the menu with the public key.
alter table public.drinks enable row level security;

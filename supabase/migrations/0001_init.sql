create extension if not exists postgis;

create type trip_theme as enum (
  'beach','city_break','business','adventure','road_trip',
  'romantic','family','festival','ski','backpacking'
);

create type plan_type as enum (
  'flight','lodging','car','dining','meeting',
  'cruise','ferry','activity','parking','train'
);

create type plan_status as enum ('planned','booked','confirmed','cancelled');
create type plan_source as enum ('manual','email_parsed','api_booked');

create table trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  destination text,
  theme trip_theme not null default 'city_break',
  start_date date,
  end_date date,
  cover_img text,
  created_at timestamptz default now()
);

create table plans (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references trips(id) on delete cascade,
  type plan_type not null,
  title text not null,
  start_datetime timestamptz,
  end_datetime timestamptz,
  start_location geography(Point,4326),
  end_location geography(Point,4326),
  start_address text,
  end_address text,
  confirmation_number text,
  status plan_status not null default 'planned',
  source plan_source not null default 'manual',
  details jsonb not null default '{}',
  attachments text[] default '{}',
  created_at timestamptz default now()
);

create index plans_trip_idx on plans(trip_id);
create index plans_time_idx on plans(start_datetime);
create index plans_start_geo_idx on plans using gist(start_location);

-- RLS
alter table trips enable row level security;
alter table plans enable row level security;

create policy "own trips" on trips
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own plans" on plans
  for all using (
    exists (select 1 from trips t where t.id = plans.trip_id and t.user_id = auth.uid())
  ) with check (
    exists (select 1 from trips t where t.id = plans.trip_id and t.user_id = auth.uid())
  );

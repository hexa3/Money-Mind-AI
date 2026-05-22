create extension if not exists "pgcrypto";

create table public.profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  role text not null check (role in ('student', 'teacher')),
  display_name text not null,
  age int,
  goals text,
  dream_career text,
  interests text,
  spending_style text,
  created_at timestamptz not null default now()
);

create table public.classrooms (
  id uuid primary key default gen_random_uuid(),
  teacher_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  join_code text unique not null,
  created_at timestamptz not null default now()
);

create table public.classroom_members (
  classroom_id uuid references public.classrooms(id) on delete cascade,
  student_id uuid references public.profiles(id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (classroom_id, student_id)
);

create table public.progress_snapshots (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  money_score int not null check (money_score between 0 and 100),
  happiness_score int not null check (happiness_score between 0 and 100),
  knowledge_score int not null check (knowledge_score between 0 and 100),
  risk_score int not null check (risk_score between 0 and 100),
  xp int not null default 0,
  streak int not null default 0,
  level int not null default 1,
  created_at timestamptz not null default now()
);

create table public.scenario_attempts (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  scenario_id text not null,
  choice_id text not null,
  consequence jsonb not null,
  created_at timestamptz not null default now()
);

create table public.assignments (
  id uuid primary key default gen_random_uuid(),
  classroom_id uuid not null references public.classrooms(id) on delete cascade,
  title text not null,
  mission text not null,
  due_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.classrooms enable row level security;
alter table public.classroom_members enable row level security;
alter table public.progress_snapshots enable row level security;
alter table public.scenario_attempts enable row level security;
alter table public.assignments enable row level security;

create policy "profiles readable by owner" on public.profiles for select using (true);
create policy "classrooms readable by members" on public.classrooms for select using (true);
create policy "members readable" on public.classroom_members for select using (true);
create policy "progress insert demo" on public.progress_snapshots for insert with check (true);
create policy "attempts insert demo" on public.scenario_attempts for insert with check (true);
create policy "assignments readable" on public.assignments for select using (true);

-- Run this in the Supabase SQL Editor (Project → SQL Editor → New query) before
-- using /admin/projects. Safe to re-run: every statement is idempotent.

create extension if not exists pgcrypto;

create table if not exists public.projects (
  id                uuid primary key default gen_random_uuid(),
  title             text not null,
  slug              text not null unique,
  description       text not null,
  long_description  text,
  date              date not null,               -- day-of-month is ignored by the UI
  category          text not null check (category in ('hardware', 'software', 'ai', 'embedded', 'web')),
  tags              text[] not null default '{}',
  image_url         text,
  project_url       text,
  featured          boolean not null default false,
  problem           text,
  process           text,
  challenges        text,
  results           text,
  lessons           text,
  display_order     integer not null default 0,
  created_at        timestamptz not null default now()
);

-- Self-heal tables that were already created (e.g. via the Table Editor)
-- before this script's column list settled.
alter table public.projects add column if not exists long_description text;

-- RLS policies (below) only take effect once the underlying role has the
-- matching SQL-level GRANT. The Supabase Table Editor adds these
-- automatically for tables created through the UI; a table created via raw
-- SQL needs them added explicitly.
grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;

alter table public.projects enable row level security;

drop policy if exists "Public read access" on public.projects;
create policy "Public read access"
  on public.projects for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated insert" on public.projects;
create policy "Authenticated insert"
  on public.projects for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update" on public.projects;
create policy "Authenticated update"
  on public.projects for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated delete" on public.projects;
create policy "Authenticated delete"
  on public.projects for delete
  to authenticated
  using (true);

-- ─── experience ────────────────────────────────────────────────────────────
-- `type` and `skills` aren't in the original spec but are extended here for
-- parity with the existing UI (ExperienceCard/Experience.tsx render both).

create table if not exists public.experience (
  id             uuid primary key default gen_random_uuid(),
  company        text not null,
  role           text not null,
  type           text not null check (type in ('professional', 'leadership', 'technical')),
  start_date     text not null,              -- "YYYY-MM"
  end_date       text,                        -- null means "Present"
  location       text,
  description    text,
  bullets        text[] not null default '{}',
  skills         text[] not null default '{}',
  display_order  integer not null default 0,
  created_at     timestamptz not null default now(),
  constraint experience_company_role_key unique (company, role)
);

grant select on public.experience to anon, authenticated;
grant insert, update, delete on public.experience to authenticated;

alter table public.experience enable row level security;

drop policy if exists "Public read access" on public.experience;
create policy "Public read access"
  on public.experience for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated insert" on public.experience;
create policy "Authenticated insert"
  on public.experience for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update" on public.experience;
create policy "Authenticated update"
  on public.experience for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated delete" on public.experience;
create policy "Authenticated delete"
  on public.experience for delete
  to authenticated
  using (true);

-- ─── skills ────────────────────────────────────────────────────────────────
-- `icon` isn't in the original spec but is extended here for parity — SkillCard
-- renders it (falling back to initials when absent). `description` is dropped:
-- the Skill type carries it but no component ever renders it, so there's
-- nothing on the live site to preserve.

create table if not exists public.skills (
  id             uuid primary key default gen_random_uuid(),
  name           text not null unique,
  category       text not null check (category in ('programming', 'frontend', 'backend', 'cad', 'tools')),
  icon           text,
  proficiency    integer check (proficiency is null or proficiency between 1 and 5),
  display_order  integer not null default 0,
  created_at     timestamptz not null default now()
);

grant select on public.skills to anon, authenticated;
grant insert, update, delete on public.skills to authenticated;

alter table public.skills enable row level security;

drop policy if exists "Public read access" on public.skills;
create policy "Public read access"
  on public.skills for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated insert" on public.skills;
create policy "Authenticated insert"
  on public.skills for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated update" on public.skills;
create policy "Authenticated update"
  on public.skills for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated delete" on public.skills;
create policy "Authenticated delete"
  on public.skills for delete
  to authenticated
  using (true);

-- ─── site_content ──────────────────────────────────────────────────────────
-- Singleton table (always exactly one row, id = 1) backing the Home/About
-- section. Unlike projects/experience/skills, an empty table isn't a valid
-- state — the homepage needs this row to render — so the default row is
-- seeded here in the schema script, not in seed.sql.

create table if not exists public.site_content (
  id             integer primary key default 1 check (id = 1),
  name           text not null,
  tagline        text,
  bio            text,
  resume_url     text,
  email          text,
  linkedin_url   text,
  github_url     text,
  typed_phrases  text[] not null default '{}',
  focus_areas    text[] not null default '{}',
  updated_at     timestamptz not null default now()
);

-- Self-heal a table that was already created before these columns existed.
alter table public.site_content add column if not exists typed_phrases text[] not null default '{}';
alter table public.site_content add column if not exists focus_areas text[] not null default '{}';

grant select on public.site_content to anon, authenticated;
grant update on public.site_content to authenticated;

alter table public.site_content enable row level security;

drop policy if exists "Public read access" on public.site_content;
create policy "Public read access"
  on public.site_content for select
  to anon, authenticated
  using (true);

-- No insert/delete policy: the singleton row is seeded below and should
-- never be created or removed through the app, only updated.
drop policy if exists "Authenticated update" on public.site_content;
create policy "Authenticated update"
  on public.site_content for update
  to authenticated
  using (id = 1)
  with check (id = 1);

insert into public.site_content
  (id, name, tagline, bio, resume_url, email, linkedin_url, github_url, typed_phrases, focus_areas)
values (
  1,
  'Ethen Dhanaraj',
  'Electrical Engineering Student at UC Santa Cruz',
  $$I'm an Electrical Engineering student at UC Santa Cruz with a focus on building systems that sit at the boundary of hardware and software. My coursework and hands-on work span embedded systems, high voltage electronics, machine learning, and full-stack development, and I'm most engaged when a project requires thinking across all of those layers at once.

On the hardware side, I work with Formula Slug's electric vehicle team doing PCB layout, high voltage interlock design, and battery pack assembly. On the software and AI side, I interned at Ushur building AI-powered automation workflows for enterprise clients in healthcare and finance, and recently built ChainPilot, a multi-agent supply chain decision framework, in 24 hours at a hackathon.

Outside of technical work, I serve as Vice President of Professional Development for Alpha Kappa Psi, where I founded Alpha Technologies, an internal organization focused on growing the technical skills of chapter members. I also work with nonprofits through 180 Degrees Consulting, helping organizations identify operational gaps and build actionable strategies.

I believe the strongest engineers are ones who can go deep on a technical problem and still communicate clearly, lead a team, and deliver something real. That is the standard I hold myself to.$$,
  '/resume.pdf',
  'ethendhanaraj@gmail.com',
  'https://www.linkedin.com/in/ethen-dhanaraj/',
  'https://github.com/ethend5',
  array['Embedded Systems Developer', 'AI & Hardware Enthusiast', 'Full-Stack Developer', 'Engineering Leader'],
  array['Embedded Systems', 'PCB Design', 'Machine Learning', 'RTOS / Firmware', 'Full-Stack Web', 'Control Theory']
)
on conflict (id) do nothing;

-- Backfill typed_phrases/focus_areas for a row that was inserted before
-- these columns existed. Only touches rows where still empty, so it won't
-- clobber anything already edited through /admin/home.
update public.site_content
  set typed_phrases = array['Embedded Systems Developer', 'AI & Hardware Enthusiast', 'Full-Stack Developer', 'Engineering Leader']
  where id = 1 and typed_phrases = '{}';

update public.site_content
  set focus_areas = array['Embedded Systems', 'PCB Design', 'Machine Learning', 'RTOS / Firmware', 'Full-Stack Web', 'Control Theory']
  where id = 1 and focus_areas = '{}';

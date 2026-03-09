-- Run this in Supabase SQL Editor

-- Projects table
CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  long_description text,
  category text,
  stack text[],
  image_url text,
  demo_url text,
  github_url text,
  featured boolean DEFAULT false,
  published boolean DEFAULT true,
  display_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Skills table
CREATE TABLE skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  level int DEFAULT 80,
  icon text,
  display_order int DEFAULT 0,
  is_active boolean DEFAULT true
);

-- Messages table (from contact form)
CREATE TABLE messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_all_projects" ON projects FOR ALL
  USING (auth.role() = 'authenticated');
CREATE POLICY "public_read_projects" ON projects FOR SELECT
  USING (published = true);

CREATE POLICY "admin_all_skills" ON skills FOR ALL
  USING (auth.role() = 'authenticated');
CREATE POLICY "public_read_skills" ON skills FOR SELECT
  USING (is_active = true);

CREATE POLICY "admin_all_messages" ON messages FOR ALL
  USING (auth.role() = 'authenticated');
CREATE POLICY "public_insert_messages" ON messages FOR INSERT
  WITH CHECK (true);

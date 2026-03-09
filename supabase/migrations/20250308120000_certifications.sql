-- Certifications (affichées dans le bloc "Certifications" de la sidebar droite)
CREATE TABLE certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  issuer text,
  url text,
  image_url text,
  display_order int DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_all_certifications" ON certifications FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "public_read_certifications" ON certifications FOR SELECT
  USING (is_active = true);

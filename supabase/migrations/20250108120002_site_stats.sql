-- Stats affichées sur le profil (éditables dans l’admin)
CREATE TABLE site_stats (
  key text PRIMARY KEY,
  value int NOT NULL
);

-- Une seule ligne par clé
INSERT INTO site_stats (key, value) VALUES
  ('happy_clients', 18),
  ('years_experience', 5);

-- RLS: lecture publique, écriture admin
ALTER TABLE site_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_site_stats" ON site_stats FOR SELECT
  USING (true);

CREATE POLICY "admin_all_site_stats" ON site_stats FOR ALL
  USING (auth.role() = 'authenticated');

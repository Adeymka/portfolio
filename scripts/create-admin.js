/**
 * Crée l'utilisateur admin dans Supabase.
 * Usage: node scripts/create-admin.js
 * Nécessite .env.local avec NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY
 */

const fs = require("fs");
const path = require("path");

const envPath = path.resolve(process.cwd(), ".env.local");
if (!fs.existsSync(envPath)) {
  console.error("Fichier .env.local introuvable dans:", process.cwd());
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, "utf8");
envContent.split(/\r?\n/).forEach((line) => {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return;
  const eq = trimmed.indexOf("=");
  if (eq === -1) return;
  const key = trimmed.slice(0, eq).trim();
  const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
  process.env[key] = value;
});

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Manque NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY dans .env.local"
  );
  process.exit(1);
}

const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const ADMIN_EMAIL = "ashershop@admin.local";
const ADMIN_PASSWORD = "Ashershop&555";

async function main() {
  console.log("Création de l'utilisateur admin...");
  const { data, error } = await supabase.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    email_confirm: true,
  });

  if (error) {
    if (error.message.includes("already been registered")) {
      console.log("L'utilisateur existe déjà. Tu peux te connecter avec :");
      console.log("  Email:", ADMIN_EMAIL);
      console.log("  Mot de passe:", ADMIN_PASSWORD);
      return;
    }
    console.error("Erreur:", error.message);
    process.exit(1);
  }

  console.log("Admin créé avec succès.");
  console.log("Connecte-toi sur /admin/login avec :");
  console.log("  Email:", ADMIN_EMAIL);
  console.log("  Mot de passe:", ADMIN_PASSWORD);
}

main();

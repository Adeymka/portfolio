import DocumentGenerator from "@/components/admin/DocumentGenerator";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Documents | Admin",
  description: "Générateur de documents",
};

export default async function AdminDocumentsPage() {
  const supabase = await createClient();
  let projects: { id: string; title: string }[] = [];
  let skills: { id: string; name: string; category: string }[] = [];
  try {
    const [pRes, sRes] = await Promise.all([
      supabase.from("projects").select("id, title").eq("published", true).order("display_order"),
      supabase.from("skills").select("id, name, category").eq("is_active", true).order("category").order("display_order"),
    ]);
    projects = (pRes.data ?? []) as typeof projects;
    skills = (sRes.data ?? []) as typeof skills;
  } catch {
    // tables may not exist
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-syne text-2xl font-bold text-fb-text">
          Générateur de documents
        </h1>
        <p className="text-sm text-fb-text-secondary">
          Admin / Documents
        </p>
      </div>
      <DocumentGenerator
        projects={projects}
        skills={skills}
      />
    </div>
  );
}

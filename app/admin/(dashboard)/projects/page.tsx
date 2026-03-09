import ProjectsManager from "@/components/admin/ProjectsManager";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Projets | Admin",
  description: "Gestion des projets",
};

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  let projects: { id: string; title: string; slug: string; description: string | null; long_description: string | null; specs: string | null; category: string | null; stack: string[]; image_url: string | null; demo_url: string | null; github_url: string | null; featured: boolean; published: boolean; display_order: number; created_at: string; updated_at: string }[] = [];
  try {
    const { data } = await supabase
      .from("projects")
      .select("id, title, slug, description, long_description, specs, category, stack, image_url, demo_url, github_url, featured, published, display_order, created_at, updated_at")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });
    projects = (data ?? []) as typeof projects;
  } catch {
    projects = [];
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-syne text-2xl font-bold text-fb-text">
          Gestion des Projets
        </h1>
        <p className="text-sm text-fb-text-secondary">
          Admin / Projets
        </p>
      </div>
      <ProjectsManager initialProjects={projects} />
    </div>
  );
}

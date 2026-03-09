import SkillsManager from "@/components/admin/SkillsManager";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Skills | Admin",
  description: "Gestion des compétences",
};

export default async function AdminSkillsPage() {
  const supabase = await createClient();
  let skills: { id: string; name: string; category: string; level: number; icon: string | null; display_order: number; is_active: boolean }[] = [];
  try {
    const { data } = await supabase
      .from("skills")
      .select("*")
      .order("category")
      .order("display_order", { ascending: true });
    skills = (data ?? []) as typeof skills;
  } catch {
    skills = [];
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-syne text-2xl font-bold text-fb-text">
          Gestion des Skills
        </h1>
        <p className="text-sm text-fb-text-secondary">Admin / Skills</p>
      </div>
      <SkillsManager initialSkills={skills} />
    </div>
  );
}

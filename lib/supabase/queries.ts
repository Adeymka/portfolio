import { createStaticClient } from "@/lib/supabase/server";
import type { Skill } from "@/lib/data";

export async function getActiveSkills(): Promise<Skill[]> {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("skills")
    .select("name, level, category")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) return [];
  if (!data?.length) return [];

  return data as Skill[];
}

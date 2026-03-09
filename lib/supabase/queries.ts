import { createStaticClient } from "@/lib/supabase/server";
import type { Skill } from "@/lib/data";

export interface SiteStats {
  happyClients: number;
  yearsExperience: number;
}

const DEFAULT_SITE_STATS: SiteStats = { happyClients: 18, yearsExperience: 5 };

export async function getSiteStats(): Promise<SiteStats> {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("site_stats")
      .select("key, value")
      .in("key", ["happy_clients", "years_experience"]);
    if (error || !data?.length) return DEFAULT_SITE_STATS;
    const map = Object.fromEntries(data.map((r) => [r.key, r.value]));
    return {
      happyClients: Number(map.happy_clients) || DEFAULT_SITE_STATS.happyClients,
      yearsExperience: Number(map.years_experience) ?? DEFAULT_SITE_STATS.yearsExperience,
    };
  } catch {
    return DEFAULT_SITE_STATS;
  }
}

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

export interface Certification {
  id: string;
  title: string;
  issuer: string | null;
  url: string | null;
  image_url: string | null;
}

export async function getActiveCertifications(): Promise<Certification[]> {
  const supabase = createStaticClient();
  const { data, error } = await supabase
    .from("certifications")
    .select("id, title, issuer, url, image_url")
    .eq("is_active", true)
    .order("display_order", { ascending: true })
    .order("title", { ascending: true });

  if (error) return [];
  if (!data?.length) return [];

  return data.map((r) => ({
    id: String(r.id),
    title: r.title,
    issuer: r.issuer ?? null,
    url: r.url ?? null,
    image_url: r.image_url ?? null,
  }));
}

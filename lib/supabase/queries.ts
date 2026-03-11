import { createStaticClient } from "@/lib/supabase/server";
import type { Skill } from "@/lib/data";

export interface SiteStats {
  yearsExperience: number;
}

const DEFAULT_SITE_STATS: SiteStats = { yearsExperience: 5 };

/** Coerce DB value (number or string) to integer; fallback to default if invalid. */
function toInt(val: unknown, fallback: number): number {
  if (typeof val === "number" && Number.isFinite(val)) return Math.max(0, Math.floor(val));
  if (typeof val === "string") {
    const n = parseInt(val, 10);
    if (!Number.isNaN(n)) return Math.max(0, n);
  }
  return fallback;
}

export async function getSiteStats(): Promise<SiteStats> {
  try {
    const supabase = createStaticClient();
    const { data, error } = await supabase
      .from("site_stats")
      .select("key, value")
      .in("key", ["years_experience"]);
    if (error) return DEFAULT_SITE_STATS;
    const map: Record<string, unknown> = {};
    for (const row of data ?? []) {
      const k = row?.key;
      if (typeof k === "string") map[k] = row?.value;
    }
    return {
      yearsExperience: toInt(map["years_experience"], DEFAULT_SITE_STATS.yearsExperience),
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

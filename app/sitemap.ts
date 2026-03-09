import type { MetadataRoute } from "next";
import { createStaticClient } from "@/lib/supabase/server";

function getBaseUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL;
  if (env) return env.startsWith("http") ? env : `https://${env}`;
  return "https://localhost:3000";
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/projects`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  try {
    const supabase = createStaticClient();
    const { data } = await supabase
      .from("projects")
      .select("slug, updated_at")
      .eq("published", true);
    const projectEntries: MetadataRoute.Sitemap = (data ?? []).map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
    return [...staticRoutes, ...projectEntries];
  } catch {
    return staticRoutes;
  }
}

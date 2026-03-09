import type { MetadataRoute } from "next";

function getBaseUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL;
  if (env) return env.startsWith("http") ? env : `https://${env}`;
  return "https://localhost:3000";
}

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}

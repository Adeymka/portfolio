import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createStaticClient } from "@/lib/supabase/server";
import CaseStudyPage from "@/components/sections/CaseStudyPage";
import type { CaseStudy } from "@/lib/case-studies";

export const revalidate = 60;

export interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateStaticParams() {
  const supabase = createStaticClient();
  const { data } = await supabase
    .from("projects")
    .select("slug")
    .eq("published", true);
  return (data ?? []).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = "then" in params ? await params : params;
  const slug = resolved.slug;
  const supabase = createStaticClient();
  const { data: project } = await supabase
    .from("projects")
    .select("title, description")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!project) return { title: "Projet | Donald ADJINDA" };

  const title = `${project.title} | Donald ADJINDA`;
  const description =
    (project.description ?? "").slice(0, 160) || `Étude de cas : ${project.title}. Projet réalisé par Donald ADJINDA.`;

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

function mapRowToCaseStudy(row: {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  long_description: string | null;
  specs: string | null;
  category: string | null;
  stack: string[] | null;
  image_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  created_at: string;
}): CaseStudy {
  return {
    id: String(row.id),
    slug: row.slug,
    title: row.title,
    description: row.description ?? "",
    longDescription: row.long_description ?? null,
    specs: row.specs ?? null,
    stack: row.stack ?? [],
    image: row.image_url ?? null,
    liveUrl: row.demo_url ?? null,
    githubUrl: row.github_url ?? null,
    category: row.category ?? "",
    reactions: { likes: 0, loves: 0, wows: 0 },
    comments: [],
    createdAt: new Date(row.created_at),
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const resolved = "then" in params ? await params : params;
  const { slug } = resolved;
  const supabase = createStaticClient();
  const { data: project } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!project) notFound();

  const caseStudy = mapRowToCaseStudy(project);
  return <CaseStudyPage caseStudy={caseStudy} />;
}

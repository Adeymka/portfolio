import type { Metadata } from "next";
import MobileLayout from "@/components/mobile/MobileLayout";
import Navbar from "@/components/layout/Navbar";
import ProfileHeader from "@/components/sections/ProfileHeader";
import ProjectFeed from "@/components/sections/ProjectFeed";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { createStaticClient } from "@/lib/supabase/server";
import { getActiveSkills, getSiteStats, getActiveCertifications } from "@/lib/supabase/queries";
import { siteLinks } from "@/lib/site-content";
import type { Project } from "@/lib/data";
import type { TrendingSkill } from "@/components/layout/RightSidebar";
import type { StackItem } from "@/components/layout/LeftSidebar";

/** Construit la liste #Trending à partir des stacks des projets (base de données). */
function buildTrendingFromProjects(projects: Project[]): TrendingSkill[] {
  const countByTag = new Map<string, number>();
  for (const p of projects) {
    for (const tag of p.stack || []) {
      const t = tag.trim();
      if (t) countByTag.set(t, (countByTag.get(t) ?? 0) + 1);
    }
  }
  return Array.from(countByTag.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag, count]) => ({
      tag,
      count: String(count),
      label: count === 1 ? "projet" : "projets",
    }));
}

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Portfolio de Donald ADJINDA, développeur web. Projets React, Next.js, Laravel. EIG, stage RIXXID. Disponible pour missions et collaborations.",
  openGraph: {
    title: "Donald ADJINDA — Développeur Web",
    description:
      "Portfolio et projets web. React, Next.js, Laravel. Passionné par les applications modernes et performantes.",
  },
};

function mapRowToProject(row: {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  category: string | null;
  stack: string[] | null;
  image_url: string | null;
  demo_url: string | null;
  github_url: string | null;
  created_at: string;
}): Project {
  return {
    id: String(row.id),
    title: row.title,
    description: row.description ?? "",
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

const SIDEBAR_INTRO = {
  bio: "Passionné par la création d'applications web modernes et performantes. Je transforme vos idées en solutions numériques innovantes.",
  jobTitle: "Développeur Web",
  company: "Freelance",
  school: "École Internationale de Graphisme (EIG)",
  location: "Abomey-Calavi, Bénin",
  website: "",
  joinedDate: "2024",
};

const SIDEBAR_SKILLS = [
  { name: "React", level: 85, category: "Frontend" },
  { name: "JavaScript", level: 80, category: "Frontend" },
  { name: "HTML5 / CSS3", level: 85, category: "Frontend" },
  { name: "Tailwind CSS", level: 75, category: "Frontend" },
  { name: "PHP / Laravel", level: 70, category: "Backend" },
  { name: "MySQL", level: 65, category: "Backend" },
  { name: "Git / GitHub", level: 80, category: "DevOps" },
];

const SIDEBAR_STACK = [
  { name: "React", category: "Frontend" as const },
  { name: "Next.js", category: "Frontend" as const },
  { name: "Tailwind CSS", category: "Frontend" as const },
  { name: "PHP / Laravel", category: "Backend" as const },
  { name: "MySQL", category: "Backend" as const },
  { name: "Git / GitHub", category: "DevOps" as const },
];

const SAMPLE_PROJECTS: Project[] = [
  {
    id: "1",
    title: "Floriana House",
    description:
      "Site vitrine moderne pour un institut de beauté et bien-être à Cotonou. Design élégant et professionnel. Réalisé avec React, Next.js et déployé sur Vercel.",
    stack: ["React", "Next.js", "Vercel"],
    image: null,
    liveUrl: null,
    githubUrl: null,
    category: "Vitrine",
    reactions: { likes: 0, loves: 0, wows: 0 },
    comments: [],
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "Enagnon",
    description:
      "Plateforme de gestion d'école développée lors d'un stage chez RIXXID. Interface formateur (web) et interface étudiant (mobile).",
    stack: ["Web", "Mobile", "RIXXID"],
    image: null,
    liveUrl: null,
    githubUrl: null,
    category: "Web App",
    reactions: { likes: 0, loves: 0, wows: 0 },
    comments: [],
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
  },
];

export default async function Home() {
  const supabase = createStaticClient();
  const [skillsResult, projectsResult, siteStats, certifications] = await Promise.all([
    getActiveSkills(),
    supabase
      .from("projects")
      .select("id, title, slug, description, category, stack, image_url, demo_url, github_url, created_at")
      .eq("published", true)
      .order("display_order", { ascending: true }),
    getSiteStats(),
    getActiveCertifications(),
  ]);
  const skills = skillsResult.length > 0 ? skillsResult : SIDEBAR_SKILLS;
  const projects =
    projectsResult.data && projectsResult.data.length > 0
      ? projectsResult.data.map(mapRowToProject)
      : SAMPLE_PROJECTS;
  const trending =
    projects.length > 0 ? buildTrendingFromProjects(projects) : undefined;
  const stackFromSkills: StackItem[] =
    skills.length > 0
      ? skills.map((s) => ({
          name: s.name,
          category: s.category as StackItem["category"],
        }))
      : SIDEBAR_STACK;
  return (
    <>
      {/* Desktop only */}
      <div className="hidden lg:block">
        <Navbar />
        <main className="min-h-screen p-4 pb-12 md:p-6">
          <div className="mx-auto flex w-full max-w-[1540px] gap-6">
            <LeftSidebar
              intro={SIDEBAR_INTRO}
              skills={skills}
              stack={stackFromSkills}
              nextAvailableDate="Next week"
            />
            <div className="min-w-0 flex-1 space-y-6">
              <div className="overflow-hidden rounded-2xl bg-fb-card shadow-card">
                <ProfileHeader
                  profileImage={siteLinks.profileImageUrl}
                  location={siteLinks.location}
                  projectsCount={projects.length}
                  happyClients={siteStats.happyClients}
                  yearsExperience={siteStats.yearsExperience}
                />
              </div>
              <div className="rounded-2xl bg-fb-card p-4 shadow-card md:p-6">
                <ProjectFeed
                  projects={projects}
                  authorName="Donald ADJINDA"
                  authorAvatar={siteLinks.profileImageUrl}
                />
              </div>
            </div>
            <RightSidebar
              yourName="Donald ADJINDA"
              email={siteLinks.email}
              githubUrl={siteLinks.githubUrl}
              linkedInUrl={siteLinks.linkedInUrl}
              nextAvailableSlot="15 mars"
              trending={trending}
              certifications={certifications}
            />
          </div>
        </main>
      </div>
      {/* Mobile + Tablet */}
      <div className="lg:hidden">
        <MobileLayout
          profileImageUrl={siteLinks.profileImageUrl}
          location={siteLinks.location}
          profileStats={{
            projectsCount: projects.length,
            happyClients: siteStats.happyClients,
            yearsExperience: siteStats.yearsExperience,
          }}
        />
      </div>
    </>
  );
}

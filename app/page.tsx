import type { Metadata } from "next";
import MobileLayout from "@/components/mobile/MobileLayout";
import Navbar from "@/components/layout/Navbar";
import ProfileHeader from "@/components/sections/ProfileHeader";
import ProjectFeed from "@/components/sections/ProjectFeed";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import { createStaticClient } from "@/lib/supabase/server";
import { getActiveSkills } from "@/lib/supabase/queries";
import type { Project } from "@/lib/data";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Accueil",
  description:
    "Portfolio de Donald ADJINDA, développeur Full Stack. Projets React, Next.js, Node.js. Disponible pour missions freelance et CDI.",
  openGraph: {
    title: "Donald ADJINDA — Développeur Full Stack",
    description:
      "Portfolio et projets web. Full Stack, React, Next.js, Node.js. Contactez-moi pour votre projet.",
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
  bio: "I build web apps that users love. React, Node, and clean code are my daily bread.",
  jobTitle: "Full Stack Developer",
  company: "Freelance",
  school: "École 42",
  location: "Paris, France",
  website: "https://yoursite.com",
  joinedDate: "March 2024",
};

const SIDEBAR_SKILLS = [
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "React", level: 85, category: "Frontend" },
  { name: "Node.js", level: 80, category: "Backend" },
  { name: "PostgreSQL", level: 70, category: "Backend" },
  { name: "Docker", level: 65, category: "DevOps" },
  { name: "Figma", level: 60, category: "Design" },
];

const SIDEBAR_STACK = [
  { name: "React", category: "Frontend" as const },
  { name: "Next.js", category: "Frontend" as const },
  { name: "Node.js", category: "Backend" as const },
  { name: "PostgreSQL", category: "Backend" as const },
  { name: "Docker", category: "DevOps" as const },
  { name: "Figma", category: "Design" as const },
];

const SAMPLE_PROJECTS: Project[] = [
  {
    id: "1",
    title: "E-shop Dashboard",
    description:
      "A full-stack e-commerce dashboard with real-time analytics, order management, and inventory tracking. Built with Next.js and PostgreSQL. The admin panel allows merchants to track sales, manage products, and view customer insights.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    image: null,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "E-commerce",
    reactions: { likes: 12, loves: 8, wows: 4 },
    comments: [
      {
        id: "c1",
        author: "Marie L.",
        content: "Clean UI and very responsive. Exactly what we needed!",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      },
    ],
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    title: "SaaS Admin Panel",
    description:
      "Multi-tenant SaaS admin with role-based access, billing integration, and team management.",
    stack: ["React", "Node.js", "Stripe", "MongoDB"],
    image: null,
    liveUrl: null,
    githubUrl: "https://github.com",
    category: "SaaS",
    reactions: { likes: 20, loves: 5, wows: 2 },
    comments: [
      {
        id: "c2",
        author: "Thomas D.",
        content: "Impressive architecture. The onboarding flow is smooth.",
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ],
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    title: "Mobile First Landing",
    description:
      "Vitrine site with animations and dark mode. Optimized for Core Web Vitals.",
    stack: ["Next.js", "Framer Motion", "CSS Variables"],
    image: null,
    liveUrl: "https://example.com",
    githubUrl: null,
    category: "Vitrine",
    reactions: { likes: 6, loves: 3, wows: 1 },
    comments: [],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
];

export default async function Home() {
  const supabase = createStaticClient();
  const [skillsResult, projectsResult] = await Promise.all([
    getActiveSkills(),
    supabase
      .from("projects")
      .select("id, title, slug, description, category, stack, image_url, demo_url, github_url, created_at")
      .eq("published", true)
      .order("display_order", { ascending: true }),
  ]);
  const skills = skillsResult.length > 0 ? skillsResult : SIDEBAR_SKILLS;
  const projects =
    projectsResult.data && projectsResult.data.length > 0
      ? projectsResult.data.map(mapRowToProject)
      : SAMPLE_PROJECTS;
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
              stack={SIDEBAR_STACK}
              nextAvailableDate="Next week"
            />
            <div className="min-w-0 flex-1 space-y-6">
              <div className="overflow-hidden rounded-2xl bg-fb-card shadow-card">
                <ProfileHeader />
              </div>
              <div className="rounded-2xl bg-fb-card p-4 shadow-card md:p-6">
                <ProjectFeed projects={projects} />
              </div>
            </div>
            <RightSidebar yourName="Donald ADJINDA" nextAvailableSlot="Mar 15" />
          </div>
        </main>
      </div>
      {/* Mobile + Tablet */}
      <div className="lg:hidden">
        <MobileLayout />
      </div>
    </>
  );
}

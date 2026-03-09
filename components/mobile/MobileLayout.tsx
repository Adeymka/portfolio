"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import MobileNavbar from "./MobileNavbar";
import MobileProfileHeader from "./MobileProfileHeader";
import MobileProjectFeed from "./MobileProjectFeed";
import BottomNav from "./BottomNav";
import MobileLeftSheet from "./MobileLeftSheet";
import type { Project } from "@/lib/data";
import type { Skill } from "@/lib/data";
import type { IntroData, StackItem } from "@/components/layout/LeftSidebar";

const MOBILE_INTRO: IntroData = {
  bio: "Passionné par la création d'applications web modernes et performantes.",
  jobTitle: "Développeur Web",
  company: "Freelance",
  school: "École Internationale de Graphisme (EIG)",
  location: "Abomey-Calavi, Bénin",
  website: "",
  joinedDate: "2024",
};

const MOBILE_STACK: StackItem[] = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "Docker", category: "DevOps" },
  { name: "Figma", category: "Design" },
];

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
}): Project & { slug?: string } {
  return {
    id: String(row.id),
    slug: row.slug,
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

export interface ProfileStats {
  projectsCount: number;
  happyClients: number;
  yearsExperience: number;
}

export default function MobileLayout({
  profileImageUrl = null,
  location,
  profileStats,
}: {
  profileImageUrl?: string | null;
  location?: string;
  profileStats?: ProfileStats;
} = {}) {
  const [projects, setProjects] = useState<(Project & { slug?: string })[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase
        .from("projects")
        .select("*")
        .eq("published", true)
        .order("display_order", { ascending: true }),
      supabase
        .from("skills")
        .select("name, level, category")
        .eq("is_active", true)
        .order("display_order", { ascending: true })
        .order("name", { ascending: true }),
    ]).then(([projectsRes, skillsRes]) => {
      if (projectsRes.data?.length) {
        setProjects(projectsRes.data.map(mapRowToProject));
      }
      if (skillsRes.data?.length) {
        setSkills(skillsRes.data as Skill[]);
      }
    });
  }, []);

  const displaySkills =
    skills.length > 0
      ? skills
      : [
          { name: "TypeScript", level: 90, category: "Frontend" },
          { name: "React", level: 85, category: "Frontend" },
          { name: "Node.js", level: 80, category: "Backend" },
          { name: "PostgreSQL", level: 70, category: "Backend" },
          { name: "Docker", level: 65, category: "DevOps" },
          { name: "Figma", level: 60, category: "Design" },
        ];

  const displayStack: import("@/components/layout/LeftSidebar").StackItem[] =
    displaySkills.length > 0
      ? displaySkills.map((s) => ({
          name: s.name,
          category: s.category as import("@/components/layout/LeftSidebar").StackItem["category"],
        }))
      : MOBILE_STACK;

  return (
    <div
      className="flex min-h-screen flex-col bg-fb-gray lg:hidden"
      style={{
        paddingBottom: "calc(56px + env(safe-area-inset-bottom))",
      }}
    >
      <MobileNavbar profileAvatar={profileImageUrl} />
      <main className="flex-1">
        <div className="mb-2 bg-fb-card">
          <MobileProfileHeader
            profileImage={profileImageUrl}
            location={location}
            projectsCount={profileStats?.projectsCount ?? projects.length}
            happyClients={profileStats?.happyClients}
            yearsExperience={profileStats?.yearsExperience}
          />
        </div>
        <        MobileProjectFeed
          projects={projects}
          authorAvatar={profileImageUrl}
          authorName="Donald ADJINDA"
        />
      </main>
      <BottomNav onMoreClick={() => setSheetOpen(true)} />
      <MobileLeftSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        intro={MOBILE_INTRO}
        skills={displaySkills}
        stack={displayStack}
        nextAvailableDate="Next week"
        profileAvatar={profileImageUrl}
      />
    </div>
  );
}

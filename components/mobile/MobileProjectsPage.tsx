"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import MobileProjectCard from "./MobileProjectCard";
import BottomNav from "./BottomNav";
import MobileLeftSheet from "./MobileLeftSheet";
import MobileNavbar from "./MobileNavbar";
import type { Project } from "@/lib/data";
import type { Skill } from "@/lib/data";
import type { IntroData, StackItem } from "@/components/layout/LeftSidebar";
import { siteLinks } from "@/lib/site-content";

const CATEGORIES = ["All", "SaaS", "E-commerce", "Mobile", "Vitrine", "API/Backend"] as const;

const MOBILE_INTRO: IntroData = {
  bio: "Passionné par la création d'applications web modernes et performantes.",
  jobTitle: "Développeur Web",
  company: "Freelance",
  school: "École Internationale de Graphisme (EIG)",
  location: "Abomey-Calavi, Bénin",
  website: "https://mykerobert3-arch.github.io/DonaldPortfolio/",
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

export interface MobileProjectsPageProps {
  projects: (Project & { slug?: string })[];
}

export default function MobileProjectsPage({ projects }: MobileProjectsPageProps) {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from("skills")
      .select("name, level, category")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .order("name", { ascending: true })
      .then(({ data }) => {
        if (data?.length) setSkills(data as Skill[]);
      });
  }, []);

  const filtered = projects.filter((p) => {
    const matchCat = category === "All" || p.category === category;
    const q = search.trim().toLowerCase();
    const matchSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.stack.some((s) => s.toLowerCase().includes(q)) ||
      p.description.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

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

  return (
    <div
      className="flex min-h-screen flex-col bg-fb-gray lg:hidden"
      style={{
        paddingBottom: "calc(56px + env(safe-area-inset-bottom))",
      }}
    >
      <MobileNavbar profileAvatar={siteLinks.profileImageUrl} />
      <div
        className="px-4 py-8 text-white"
        style={{
          background: "linear-gradient(135deg, #1877f2 0%, #0052cc 50%, #1877f2 100%)",
        }}
      >
        <motion.h1
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="font-syne text-2xl font-bold"
        >
          My Work
        </motion.h1>
        <p className="mt-2 font-dm-sans text-white/90">
          {projects.length} projet{projects.length !== 1 ? "s" : ""}
        </p>
      </div>
      <div className="sticky top-12 z-40 border-b border-fb-border bg-fb-card px-3 py-2">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                category === cat
                  ? "bg-fb-blue text-white"
                  : "bg-fb-gray text-fb-text-secondary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Rechercher..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-2 w-full rounded-lg border border-fb-border bg-fb-gray px-3 py-2 text-sm text-fb-text placeholder:text-fb-text-secondary focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
          style={{ fontSize: "16px" }}
        />
      </div>
      <div className="flex-1">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16">
            <p className="text-center font-dm-sans text-lg text-fb-text-secondary">
              Aucun projet dans cette catégorie.
            </p>
          </div>
        ) : (
          filtered.map((p) => <MobileProjectCard key={p.id} project={p} />)
        )}
      </div>
      <BottomNav onMoreClick={() => setSheetOpen(true)} />
      <MobileLeftSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        intro={MOBILE_INTRO}
        skills={displaySkills}
        stack={MOBILE_STACK}
        nextAvailableDate="Next week"
        profileAvatar={siteLinks.profileImageUrl}
      />
    </div>
  );
}

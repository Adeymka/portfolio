"use client";

import { useState } from "react";
import MobileNavbar from "./MobileNavbar";
import BottomNav from "./BottomNav";
import MobileLeftSheet from "./MobileLeftSheet";
import type { IntroData, StackItem } from "@/components/layout/LeftSidebar";
import type { Skill } from "@/lib/data";
import { siteLinks } from "@/lib/site-content";

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

const DEFAULT_SKILLS: Skill[] = [
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "React", level: 85, category: "Frontend" },
  { name: "Node.js", level: 80, category: "Backend" },
  { name: "PostgreSQL", level: 70, category: "Backend" },
  { name: "Docker", level: 65, category: "DevOps" },
  { name: "Figma", level: 60, category: "Design" },
];

export default function MobilePageShell({ children }: { children: React.ReactNode }) {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <div
      className="flex min-h-screen flex-col bg-fb-gray lg:hidden"
      style={{ paddingBottom: "calc(56px + env(safe-area-inset-bottom))" }}
    >
      <MobileNavbar profileAvatar={siteLinks.profileImageUrl} />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <BottomNav onMoreClick={() => setSheetOpen(true)} />
      <MobileLeftSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        intro={MOBILE_INTRO}
        skills={DEFAULT_SKILLS}
        stack={MOBILE_STACK}
        nextAvailableDate="Next week"
        profileAvatar={siteLinks.profileImageUrl}
      />
    </div>
  );
}

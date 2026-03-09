"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap, MapPin, Link2, Calendar } from "lucide-react";
import type { Skill } from "@/lib/data";

export interface IntroData {
  bio: string;
  jobTitle: string;
  company: string;
  school: string;
  location: string;
  website: string;
  joinedDate: string; // e.g. "March 2024"
}

export interface StackItem {
  name: string;
  category: "Frontend" | "Backend" | "DevOps" | "Design";
  icon?: string; // emoji or initials
}

export interface LeftSidebarProps {
  intro: IntroData;
  skills: Skill[];
  stack: StackItem[];
  nextAvailableDate?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#1877F2",
  Backend: "#42B883",
  DevOps: "#E8A020",
  Design: "#E91E8C",
  default: "#65676B",
};

function levelToLabel(level: number): "Junior" | "Mid" | "Senior" {
  const pct = level <= 5 ? (level / 5) * 100 : level;
  if (pct <= 33) return "Junior";
  if (pct <= 66) return "Mid";
  return "Senior";
}

function levelToPercent(level: number): number {
  if (level <= 5) return (level / 5) * 100;
  return Math.min(100, Math.max(0, level));
}

function SkillBar({ skill, onVisible }: { skill: Skill; onVisible: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);
  const percent = levelToPercent(skill.level);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setFilled(true);
          onVisible();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -20px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [onVisible]);

  const color = CATEGORY_COLORS[skill.category] ?? CATEGORY_COLORS.default;

  return (
    <div ref={ref} className="rounded-lg border border-fb-border bg-fb-card p-3">
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: color }}
        />
        <span className="font-jetbrains-mono text-[13px] text-fb-text truncate flex-1">
          {skill.name}
        </span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-fb-border">
        <div
          className="h-full rounded-full bg-fb-blue transition-all duration-700 ease-out"
          style={{
            width: filled ? `${percent}%` : "0%",
          }}
        />
      </div>
      <div className="mt-2 flex justify-end">
        <span className="font-dm-sans text-[11px] font-medium text-fb-text-secondary">
          {levelToLabel(skill.level)}
        </span>
      </div>
    </div>
  );
}

export default function LeftSidebar({
  intro,
  skills,
  stack,
  nextAvailableDate = "Next week",
}: LeftSidebarProps) {
  const visibleRef = useRef(false);
  const onBarVisible = () => {
    visibleRef.current = true;
  };

  return (
    <aside
      className="scrollbar-hide hidden w-[280px] shrink-0 overflow-y-auto rounded-lg lg:block"
      style={{ position: "sticky", top: "72px", maxHeight: "calc(100vh - 88px)" }}
    >
      {/* INTRO CARD */}
      <div className="mb-4 rounded-lg border border-fb-border bg-fb-card p-4 shadow-card">
        <h3 className="font-dm-sans text-[17px] font-bold text-fb-text mb-3">
          Intro
        </h3>
        <p className="text-[15px] text-fb-text-secondary italic mb-4">
          {intro.bio}
        </p>
        <div className="space-y-0">
          <div className="flex items-center gap-2 py-1.5 text-[15px] text-fb-text">
            <Briefcase className="h-4 w-4 shrink-0 text-fb-text-secondary" aria-hidden />
            <span>
              {intro.jobTitle} at {intro.company}
            </span>
          </div>
          <div className="flex items-center gap-2 py-1.5 text-[15px] text-fb-text">
            <GraduationCap className="h-4 w-4 shrink-0 text-fb-text-secondary" aria-hidden />
            <span>Studied at {intro.school}</span>
          </div>
          <div className="flex items-center gap-2 py-1.5 text-[15px] text-fb-text">
            <MapPin className="h-4 w-4 shrink-0 text-fb-text-secondary" aria-hidden />
            <span>Lives in {intro.location}</span>
          </div>
          <div className="flex items-center gap-2 py-1.5">
            <Link2 className="h-4 w-4 shrink-0 text-fb-text-secondary" aria-hidden />
            <a
              href={intro.website.startsWith("http") ? intro.website : `https://${intro.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-fb-blue hover:underline text-[15px]"
            >
              {intro.website.replace(/^https?:\/\//, "")}
            </a>
          </div>
          <div className="flex items-center gap-2 py-1.5 text-[15px] text-fb-text-secondary">
            <Calendar className="h-4 w-4 shrink-0 text-fb-text-secondary" aria-hidden />
            <span>Joined {intro.joinedDate}</span>
          </div>
        </div>
      </div>

      {/* SKILLS CARD */}
      <div className="mb-3 rounded-lg border border-fb-border bg-fb-card p-4 shadow-card">
        <h3 className="font-dm-sans text-[17px] font-bold text-fb-text mb-3">
          Skills
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {skills.map((skill) => (
            <SkillBar key={skill.name} skill={skill} onVisible={onBarVisible} />
          ))}
        </div>
      </div>

      {/* STACK CARD */}
      <div className="mb-3 rounded-lg border border-fb-border bg-fb-card p-4 shadow-card">
        <h3 className="font-dm-sans text-[17px] font-bold text-fb-text mb-3">
          Stack & Tools
        </h3>
        <ul className="space-y-0">
          {stack.map((item) => (
            <li key={item.name}>
              <button
                type="button"
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg py-2 px-2 -mx-2 text-left transition-colors duration-200 hover:bg-fb-hover"
              >
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-semibold bg-fb-gray text-fb-text"
                  aria-hidden
                >
                  {item.icon ?? item.name.slice(0, 2).toUpperCase()}
                </span>
                <span className="flex-1 font-dm-sans text-[14px] text-fb-text truncate">
                  {item.name}
                </span>
                <span className="shrink-0 rounded px-1.5 py-0.5 font-dm-sans text-[11px] text-fb-text-secondary bg-fb-gray">
                  {item.category}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* AVAILABILITY CARD */}
      <div className="mb-3 rounded-lg border border-fb-border bg-fb-card p-4 shadow-card">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full bg-fb-green animate-pulse-dot"
            aria-hidden
          />
          <span className="font-dm-sans text-[15px] font-medium text-fb-text">
            Available for new projects
          </span>
        </div>
        <p className="text-[13px] text-fb-text-secondary mb-3">
          Next available: {nextAvailableDate}
        </p>
        <a
          href="/contact"
          className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-fb-blue bg-transparent py-2.5 font-dm-sans text-sm font-medium text-fb-blue transition-all duration-200 hover:bg-fb-blue-light"
        >
          Book a call
        </a>
      </div>
    </aside>
  );
}

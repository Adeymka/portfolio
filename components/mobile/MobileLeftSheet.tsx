"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Github, Linkedin } from "lucide-react";
import type { Skill } from "@/lib/data";
import type { IntroData } from "@/components/layout/LeftSidebar";
import type { StackItem } from "@/components/layout/LeftSidebar";
import Avatar from "@/components/ui/Avatar";

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#1877F2",
  Backend: "#42B883",
  DevOps: "#E8A020",
  Design: "#E91E8C",
  Tools: "#6366F1",
  default: "#65676B",
};

function levelToPercent(level: number): number {
  if (level <= 5) return (level / 5) * 100;
  return Math.min(100, Math.max(0, level));
}

const THEME_KEY = "theme";

export interface MobileLeftSheetProps {
  isOpen: boolean;
  onClose: () => void;
  intro: IntroData;
  skills: Skill[];
  stack: StackItem[];
  nextAvailableDate?: string;
  profileAvatar?: string | null;
  profileName?: string;
}

export default function MobileLeftSheet({
  isOpen,
  onClose,
  intro,
  skills,
  stack,
  nextAvailableDate = "Next week",
  profileAvatar = null,
  profileName = "Portfolio",
}: MobileLeftSheetProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (typeof document === "undefined") return;
    const stored = document.documentElement.getAttribute("data-theme");
    if (stored === "dark" || stored === "light") setTheme(stored);
  }, []);

  const handleThemeToggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (_) {}
    setTheme(next);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onClose}
            aria-hidden
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 z-50 w-[280px] overflow-y-auto bg-fb-card lg:hidden"
            style={{ paddingTop: "env(safe-area-inset-top)" }}
            role="dialog"
            aria-label="Menu Plus"
          >
            <div className="p-4 pb-6">
              <div className="mb-4 flex items-center gap-3 border-b border-fb-border pb-4">
                <Avatar
                  src={profileAvatar}
                  alt={profileName}
                  size="md"
                  className="h-12 w-12"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-syne font-bold text-fb-text">{profileName}</p>
                  <Link
                    href="/"
                    onClick={onClose}
                    className="text-sm text-fb-blue"
                  >
                    Voir profil
                  </Link>
                </div>
              </div>

              <div className="mb-4 rounded-lg border border-fb-border bg-fb-card p-4 shadow-card">
                <h3 className="font-dm-sans text-[17px] font-bold text-fb-text mb-3">
                  Skills
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {skills.slice(0, 6).map((skill) => {
                    const percent = levelToPercent(skill.level);
                    const color =
                      CATEGORY_COLORS[skill.category] ?? CATEGORY_COLORS.default;
                    return (
                      <div
                        key={skill.name}
                        className="rounded-lg border border-fb-border bg-fb-card p-3"
                      >
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
                            className="h-full rounded-full bg-fb-blue"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mb-4 rounded-lg border border-fb-border bg-fb-card p-4 shadow-card">
                <h3 className="font-dm-sans text-[17px] font-bold text-fb-text mb-3">
                  Stack & Tools
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {stack.map((item) => (
                    <span
                      key={item.name}
                      className="rounded-full bg-fb-gray px-2.5 py-1 font-dm-sans text-[12px] text-fb-text-secondary"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4 rounded-lg border border-fb-border bg-fb-card p-4 shadow-card">
                <h3 className="font-dm-sans text-[17px] font-bold text-fb-text mb-3">
                  Liens
                </h3>
                <div className="flex gap-3">
                  {intro.website ? (
                    <a
                      href={intro.website.startsWith("http") ? intro.website : `https://${intro.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-fb-gray text-fb-text"
                      aria-label="Site"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  ) : null}
                  <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-fb-gray text-fb-text"
                    aria-label="LinkedIn (à venir)"
                    title="À venir"
                  >
                    <Linkedin className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="mb-4 rounded-lg border border-fb-border bg-fb-card p-4 shadow-card">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full bg-fb-green"
                    style={{ animation: "pulse 2s ease-in-out infinite" }}
                    aria-hidden
                  />
                  <span className="font-dm-sans text-[15px] font-medium text-fb-text">
                    Disponibilité
                  </span>
                </div>
                <p className="text-[13px] text-fb-text-secondary mb-3">
                  Prochaine dispo: {nextAvailableDate}
                </p>
                <span className="inline-flex rounded-full border border-fb-green bg-fb-green/10 px-3 py-1 text-xs font-medium text-fb-green">
                  Open to work
                </span>
              </div>

              <button
                type="button"
                onClick={handleThemeToggle}
                className="flex w-full min-h-[44px] items-center gap-2 rounded-lg px-4 py-2.5 text-left text-sm text-fb-text"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 shrink-0 text-fb-text-secondary" />
                ) : (
                  <Moon className="h-5 w-5 shrink-0 text-fb-text-secondary" />
                )}
                <span>{theme === "dark" ? "Mode clair" : "Mode sombre"}</span>
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

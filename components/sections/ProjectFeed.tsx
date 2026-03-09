"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Video, Smile } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import ProjectPost from "./ProjectPost";
import type { Project } from "@/lib/data";

const CREATE_ACTIONS = [
  { Icon: Camera, label: "Photo" },
  { Icon: Video, label: "Video" },
  { Icon: Smile, label: "Feeling/Activity" },
] as const;

const FILTERS = ["All", "SaaS", "E-commerce", "Mobile", "Vitrine"] as const;

export interface ProjectFeedProps {
  projects: Project[];
  authorName?: string;
  authorAvatar?: string | null;
}

export default function ProjectFeed({
  projects,
  authorName = "Donald ADJINDA",
  authorAvatar = null,
}: ProjectFeedProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [comingSoonTooltip, setComingSoonTooltip] = useState<string | null>(null);

  useEffect(() => {
    if (!comingSoonTooltip) return;
    const t = setTimeout(() => setComingSoonTooltip(null), 1500);
    return () => clearTimeout(t);
  }, [comingSoonTooltip]);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section className="space-y-4">
      {/* CREATE POST BOX */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative rounded-lg border border-fb-border bg-fb-card p-4 shadow-card"
      >
        <div className="flex gap-3">
          <Avatar
            src={authorAvatar}
            alt={authorName}
            size="md"
            className="h-10 w-10 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <button
              type="button"
              onClick={() => setComingSoonTooltip("post")}
              className="w-full rounded-full bg-fb-input-bg px-4 py-2 text-left text-[15px] text-fb-text-secondary transition-colors hover:bg-fb-hover"
            >
              What project did you build?
            </button>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 border-t border-fb-border pt-3">
          {CREATE_ACTIONS.map(({ Icon, label }) => (
            <button
              key={label}
              type="button"
              onClick={() => setComingSoonTooltip(label)}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-[15px] font-medium text-fb-text-secondary transition-colors hover:bg-fb-gray"
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <AnimatePresence>
          {comingSoonTooltip && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-fb-dark px-4 py-2 text-sm font-medium text-white shadow-modal z-10 pointer-events-none"
              role="tooltip"
            >
              Coming soon
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* FILTER BAR */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="flex flex-wrap gap-2"
      >
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
              activeFilter === filter
                ? "bg-fb-blue text-white"
                : "bg-fb-gray text-fb-text-secondary hover:bg-fb-border"
            }`}
          >
            {filter}
          </button>
        ))}
      </motion.div>

      {/* PROJECT CARDS */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-lg border border-fb-border bg-fb-card p-8 text-center text-fb-text-secondary shadow-card"
            >
              No projects in this category yet.
            </motion.p>
          ) : (
            filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.35,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              >
                <ProjectPost
                  project={project}
                  authorName={authorName}
                  authorAvatar={authorAvatar}
                  index={i}
                />
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* INFINITE SCROLL PLACEHOLDER */}
      {filtered.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center py-6"
        >
          <button
            type="button"
            className="rounded-lg border border-fb-border bg-fb-card px-6 py-2 text-sm text-fb-text-secondary shadow-card hover:bg-fb-gray transition-colors"
          >
            Load more
          </button>
        </motion.div>
      )}
    </section>
  );
}

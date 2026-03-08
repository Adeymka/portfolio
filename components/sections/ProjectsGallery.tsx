"use client";

import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectGalleryCard from "./ProjectGalleryCard";
import type { Project } from "@/lib/data";

const CATEGORIES = ["All", "SaaS", "E-commerce", "Mobile", "Vitrine", "API/Backend"] as const;
const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "liked", label: "Most Liked" },
  { value: "category", label: "By Category" },
] as const;

export interface ProjectWithSlug extends Project {
  slug?: string;
}

export interface ProjectsGalleryProps {
  projects: ProjectWithSlug[];
  featuredIds?: string[];
  satisfiedClientsCount?: number;
}

function totalReactions(p: Project) {
  return p.reactions.likes + p.reactions.loves + p.reactions.wows;
}

export default function ProjectsGallery({
  projects,
  featuredIds = [],
  satisfiedClientsCount = 18,
}: ProjectsGalleryProps) {
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<string>("recent");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const categoriesCount = useMemo(
    () => new Set(projects.map((p) => p.category)).size,
    [projects]
  );

  const filteredAndSorted = useMemo(() => {
    let list = projects.filter((p) => {
      const matchCategory = category === "All" || p.category === category;
      const q = search.trim().toLowerCase();
      const matchSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.stack.some((s) => s.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });

    if (sort === "recent") {
      list = [...list].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (sort === "liked") {
      list = [...list].sort((a, b) => totalReactions(b) - totalReactions(a));
    } else if (sort === "category") {
      list = [...list].sort((a, b) => a.category.localeCompare(b.category));
    }

    return list;
  }, [projects, category, sort, search]);

  const visible = filteredAndSorted.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSorted.length;
  const activeFilters = [
    category !== "All" && { type: "category" as const, label: category },
    search.trim() && { type: "search" as const, label: `"${search.trim()}"` },
  ].filter(Boolean) as { type: "category" | "search"; label: string }[];

  const removeFilter = useCallback((type: "category" | "search") => {
    if (type === "category") setCategory("All");
    if (type === "search") setSearch("");
  }, []);

  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setVisibleCount((n) => n + 6);
      },
      { rootMargin: "120px" }
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, visible.length]);

  return (
    <div className="min-h-screen">
      {/* PAGE HEADER */}
      <header className="projects-hero-gradient relative overflow-hidden rounded-t-2xl px-6 py-16 text-white md:px-10 md:py-20">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative">
          <motion.h1
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="font-syne text-4xl font-bold md:text-[48px]"
          >
            My Work
          </motion.h1>
          <p className="mt-2 font-dm-sans text-lg text-white/90">
            {projects.length} projects · {categoriesCount} categories ·{" "}
            {satisfiedClientsCount} satisfied clients
          </p>
        </div>
      </header>

      {/* STICKY FILTER BAR */}
      <div className="sticky top-[72px] z-40 -mt-px border-b border-fb-border bg-fb-card/95 px-4 py-3 backdrop-blur-sm md:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? "bg-fb-blue text-white"
                    : "bg-fb-gray text-fb-text-secondary hover:bg-fb-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-fb-border bg-fb-input-bg px-3 py-2 text-sm text-fb-text focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <input
              type="search"
              placeholder="Search by name or tech stack..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 min-w-[200px] max-w-xs rounded-lg border border-fb-border bg-fb-input-bg px-4 py-2 text-sm text-fb-text placeholder:text-fb-text-secondary focus:border-fb-blue focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
          </div>
          {activeFilters.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-fb-text-secondary">Active:</span>
              {activeFilters.map((f) => (
                <span
                  key={`${f.type}-${f.label}`}
                  className="inline-flex items-center gap-1 rounded-full bg-fb-blue-light px-3 py-1 text-sm text-fb-blue"
                >
                  {f.label}
                  <button
                    type="button"
                    onClick={() => removeFilter(f.type)}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-fb-blue/20"
                    aria-label={`Remove ${f.label}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PROJECTS GRID */}
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6">
        <AnimatePresence mode="wait">
          {filteredAndSorted.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-fb-border bg-fb-gray/50 py-16 px-6"
            >
              <EmptyIllustration />
              <p className="mt-6 text-center font-dm-sans text-lg text-fb-text-secondary">
                No projects in this category yet.
              </p>
              <button
                type="button"
                onClick={() => {
                  setCategory("All");
                  setSearch("");
                }}
                className="mt-4 rounded-lg bg-fb-blue px-5 py-2.5 font-medium text-white hover:bg-fb-blue-dark transition-colors"
              >
                View all projects
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`${category}-${sort}-${search}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 xl:auto-rows-[minmax(200px,auto)] xl:gap-5"
            >
              {visible.map((project, i) => (
                <ProjectGalleryCard
                  key={project.id}
                  project={project}
                  featured={featuredIds.includes(project.id)}
                  index={i}
                  caseStudyUrl={project.slug ? `/projects/${project.slug}` : undefined}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* LOAD MORE TRIGGER */}
        {filteredAndSorted.length > 0 && (
          <div ref={loadMoreRef} className="flex justify-center py-10">
            {hasMore && (
              <button
                type="button"
                onClick={() => setVisibleCount((n) => n + 6)}
                className="rounded-lg border border-fb-border bg-fb-card px-6 py-3 text-sm font-medium text-fb-text shadow-card hover:bg-fb-gray transition-colors"
              >
                Load more projects
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyIllustration() {
  return (
    <svg
      width="160"
      height="120"
      viewBox="0 0 160 120"
      fill="none"
      className="text-fb-text-secondary/40"
      aria-hidden
    >
      <rect x="20" y="20" width="120" height="80" rx="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <rect x="32" y="32" width="40" height="28" rx="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M80 44 L120 44 M80 52 L110 52 M80 60 L100 60" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="52" cy="46" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

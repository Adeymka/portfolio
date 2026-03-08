"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/data";

const CATEGORY_COLORS: Record<string, string> = {
  SaaS: "#1877F2",
  "E-commerce": "#42B883",
  Mobile: "#E8A020",
  Vitrine: "#E91E8C",
  "API/Backend": "#6366F1",
  default: "#65676B",
};

export interface ProjectGalleryCardProps {
  project: Project;
  featured?: boolean;
  index?: number;
  caseStudyUrl?: string;
}

export default function ProjectGalleryCard({
  project,
  featured = false,
  index = 0,
  caseStudyUrl,
}: ProjectGalleryCardProps) {
  const categoryColor = CATEGORY_COLORS[project.category] ?? CATEGORY_COLORS.default;
  const link = caseStudyUrl ?? project.liveUrl ?? "#";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-lg border border-fb-border bg-white shadow-card transition-shadow duration-300 hover:shadow-hover ${
        featured ? "xl:row-span-2" : ""
      }`}
    >
      <a href={link} className="block">
        {/* Image / gradient placeholder */}
        <div
          className={`relative overflow-hidden bg-fb-gray ${
            featured ? "aspect-[4/5] xl:aspect-auto xl:min-h-[340px]" : "aspect-video"
          }`}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: categoryColor }}
            >
              <span className="font-syne text-2xl font-bold text-white/80 md:text-3xl">
                {project.title}
              </span>
            </div>
          )}

          {/* Category badge — top-left */}
          <span
            className="absolute left-2 top-2 rounded-md px-2 py-1 text-xs font-medium text-white shadow-md"
            style={{ backgroundColor: categoryColor }}
          >
            {project.category}
          </span>

          {/* Featured badge — top-right */}
          {featured && (
            <span className="absolute right-2 top-2 rounded-md bg-fb-gold px-2 py-1 text-xs font-bold text-white shadow-md">
              Featured
            </span>
          )}

          {/* Hover overlay — slides up from bottom */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/50 to-transparent p-4 pt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <h3 className="font-syne text-lg font-bold text-white md:text-xl">
              {project.title}
            </h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-white/20 px-2 py-0.5 font-jetbrains-mono text-[11px] text-white"
                >
                  {tech}
                </span>
              ))}
            </div>
            <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-md border-2 border-white px-3 py-1.5 text-sm font-medium text-white transition-colors group-hover:bg-white group-hover:text-fb-text">
              View Case Study →
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}

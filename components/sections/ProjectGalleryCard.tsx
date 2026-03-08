"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Skeleton from "@/components/ui/Skeleton";
import { BLUR_DATA_URL } from "@/lib/constants";
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
  loading?: boolean;
}

export default function ProjectGalleryCard({
  project,
  featured = false,
  index = 0,
  caseStudyUrl,
  loading = false,
}: ProjectGalleryCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const categoryColor = CATEGORY_COLORS[project.category] ?? CATEGORY_COLORS.default;
  const link = caseStudyUrl ?? project.liveUrl ?? "#";

  if (loading) {
    return (
      <article
        className={`overflow-hidden rounded-lg border border-fb-border bg-fb-card shadow-card ${
          featured ? "xl:row-span-2" : ""
        }`}
      >
        <Skeleton
          className={
            featured
              ? "aspect-[4/5] w-full xl:min-h-[340px]"
              : "aspect-video w-full"
          }
        />
        <div className="p-4">
          <Skeleton className="mb-2 h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-1/2" />
        </div>
      </article>
    );
  }

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
      className={`group relative overflow-hidden rounded-lg border border-fb-border bg-fb-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-hover ${
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
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              unoptimized={project.image.startsWith("http")}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
            <span className="mt-3 inline-flex w-fit items-center gap-1 rounded-md border-2 border-white bg-black px-3 py-1.5 text-sm font-medium text-white transition-colors group-hover:bg-white group-hover:text-black">
              View Case Study →
            </span>
          </div>
        </div>
      </a>
    </motion.article>
  );
}

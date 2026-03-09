"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, ThumbsUp, MessageCircle, ExternalLink } from "lucide-react";
import Avatar from "@/components/ui/Avatar";
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

export interface MobileProjectCardProps {
  project: Project & { slug?: string };
  authorAvatar?: string | null;
  authorName?: string;
}

function formatDate(d: Date) {
  const now = new Date();
  const diff = now.getTime() - new Date(d).getTime();
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  if (days < 1) return "Aujourd'hui";
  if (days === 1) return "Hier";
  if (days < 7) return `Il y a ${days} j`;
  if (days < 30) return `Il y a ${Math.floor(days / 7)} sem`;
  return new Date(d).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
}

export default function MobileProjectCard({
  project,
  authorAvatar = null,
  authorName = "Donald ADJINDA",
}: MobileProjectCardProps) {
  const [expanded, setExpanded] = useState(false);
  const categoryColor = CATEGORY_COLORS[project.category] ?? CATEGORY_COLORS.default;
  const hasSlug = Boolean(project.slug?.trim());
  const caseStudyUrl = hasSlug ? `/projects/${project.slug}` : null;

  return (
    <article className="border-b border-fb-border bg-fb-card lg:hidden">
      <div className="flex items-center gap-2 px-3 pt-3 pb-2">
        <Avatar
          src={authorAvatar}
          alt={authorName}
          size="sm"
          className="h-9 w-9 shrink-0"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate font-medium text-[15px] text-fb-text">{project.title}</p>
          <p className="text-xs text-fb-text-secondary">{project.category}</p>
        </div>
        {!hasSlug && (
          <span className="rounded-full bg-fb-gray px-2 py-0.5 text-xs text-fb-text-secondary">
            Coming soon
          </span>
        )}
        <span className="ml-auto text-xs text-fb-text-secondary">
          {formatDate(project.createdAt)}
        </span>
        <button
          type="button"
          className="flex h-9 w-9 min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-fb-text-secondary"
          aria-label="Plus d'options"
        >
          <MoreHorizontal className="h-5 w-5" aria-hidden />
        </button>
      </div>
      <div className="px-3 pb-2">
        <p
          className={`text-[15px] leading-snug text-fb-text ${!expanded ? "line-clamp-3" : ""}`}
        >
          {project.description}
        </p>
        {project.description.length > 100 && (
          <button
            type="button"
            className="mt-1 text-sm font-medium text-fb-blue"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Voir moins" : "Voir plus"}
          </button>
        )}
      </div>
      <div className="relative w-full aspect-video overflow-hidden bg-fb-gray">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            unoptimized={project.image.startsWith("http")}
            sizes="100vw"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center px-4 text-center"
            style={{ backgroundColor: categoryColor }}
          >
            <span className="font-syne text-lg font-bold text-white/90">
              {project.title}
            </span>
          </div>
        )}
      </div>
      <div className="flex gap-1.5 overflow-x-auto px-3 py-2 scrollbar-hide">
        {project.stack.slice(0, 6).map((tech) => (
          <span
            key={tech}
            className="shrink-0 rounded-full bg-fb-gray px-2 py-0.5 font-jetbrains-mono text-[11px] text-fb-text-secondary"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-3 border-t border-fb-border">
        <button
          type="button"
          className="flex min-h-[44px] items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-fb-text-secondary hover:bg-fb-hover active:bg-fb-gray"
        >
          <ThumbsUp className="h-4 w-4" aria-hidden />
          J&apos;aime
        </button>
        <button
          type="button"
          className="flex min-h-[44px] items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-fb-text-secondary hover:bg-fb-hover active:bg-fb-gray"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Commenter
        </button>
        {caseStudyUrl ? (
          <Link
            href={caseStudyUrl}
            className="flex min-h-[44px] items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-fb-text-secondary hover:bg-fb-hover active:bg-fb-gray"
          >
            <ExternalLink className="h-4 w-4" aria-hidden />
            Voir projet
          </Link>
        ) : (
          <span className="flex min-h-[44px] cursor-default items-center justify-center gap-1.5 py-2.5 text-sm font-medium text-fb-text-secondary">
            <ExternalLink className="h-4 w-4" aria-hidden />
            Voir projet
          </span>
        )}
      </div>
    </article>
  );
}

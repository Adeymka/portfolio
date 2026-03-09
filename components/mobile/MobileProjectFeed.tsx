"use client";

import Avatar from "@/components/ui/Avatar";
import MobileProjectCard from "./MobileProjectCard";
import type { Project } from "@/lib/data";

export interface MobileProjectFeedProps {
  projects: (Project & { slug?: string })[];
  authorAvatar?: string | null;
  authorName?: string;
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
      <rect
        x="20"
        y="20"
        width="120"
        height="80"
        rx="8"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <rect
        x="32"
        y="32"
        width="40"
        height="28"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M80 44 L120 44 M80 52 L110 52 M80 60 L100 60"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="52"
        cy="46"
        r="6"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

export default function MobileProjectFeed({
  projects,
  authorAvatar = null,
  authorName = "Donald ADJINDA",
}: MobileProjectFeedProps) {
  return (
    <div className="lg:hidden">
      <div className="flex items-center gap-2 border-b border-fb-border bg-fb-card px-3 py-2.5">
        <Avatar
          src={authorAvatar}
          alt={authorName}
          size="sm"
          className="h-8 w-8 shrink-0"
        />
        <div className="min-w-0 flex-1 rounded-full bg-fb-gray px-4 py-2 text-sm text-fb-text-secondary">
          Quoi de neuf ?
        </div>
      </div>
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-6">
          <EmptyIllustration />
          <p className="mt-6 text-center font-dm-sans text-lg text-fb-text-secondary">
            Aucun projet pour le moment.
          </p>
        </div>
      ) : (
        projects.map((p) => (
          <MobileProjectCard
            key={p.id}
            project={p}
            authorAvatar={authorAvatar}
            authorName={authorName}
          />
        ))
      )}
    </div>
  );
}

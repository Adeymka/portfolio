"use client";

import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import type { Project, Comment } from "@/lib/data";

const CATEGORY_COLORS: Record<string, string> = {
  SaaS: "#1877F2",
  "E-commerce": "#42B883",
  Mobile: "#E8A020",
  Vitrine: "#E91E8C",
  default: "#65676B",
};

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const d = typeof date === "string" ? new Date(date) : date;
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);
  if (diffDays < 1) return "Today";
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
}

const REACTION_LABELS: Record<string, string> = {
  like: "Cool Project",
  love: "Great UX",
  wow: "Impressive",
};

export interface ProjectPostProps {
  project: Project;
  authorName?: string;
  authorAvatar?: string | null;
  index?: number;
}

export default function ProjectPost({
  project,
  authorName = "You",
  authorAvatar = null,
  index = 0,
}: ProjectPostProps) {
  const [reactions, setReactions] = useState(project.reactions);
  const [userReaction, setUserReaction] = useState<"like" | "love" | "wow" | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [reactionPicker, setReactionPicker] = useState<"like" | "love" | "wow" | null>(null);
  const [shareCount, setShareCount] = useState(1);

  const totalReactions = reactions.likes + reactions.loves + reactions.wows + (userReaction ? 1 : 0);
  const totalComments = project.comments.length;
  const descriptionLines = expanded ? undefined : 3;
  const categoryColor = CATEGORY_COLORS[project.category] ?? CATEGORY_COLORS.default;

  const handleReaction = (type: "like" | "love" | "wow") => {
    if (userReaction === type) {
      setUserReaction(null);
      return;
    }
    setUserReaction(type);
    setReactionPicker(null);
  };

  const toggleReaction = (type: "like" | "love" | "wow") => {
    const prev = userReaction;
    setUserReaction(prev === type ? null : type);
    setReactionPicker(null);
  };

  return (
    <article className="rounded-lg border border-fb-border bg-white p-4 shadow-card">
      {/* HEADER */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar src={authorAvatar} alt={authorName} size="md" className="h-10 w-10 shrink-0" />
          <div className="min-w-0">
            <p className="font-dm-sans text-[15px] font-bold text-fb-text truncate">
              {authorName}
            </p>
            <p className="text-[13px] text-fb-text-secondary">
              {formatRelativeTime(project.createdAt)} · 🌐
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-fb-blue-light px-2 py-0.5 font-dm-sans text-[11px] font-medium text-fb-blue">
            {project.category}
          </span>
        </div>
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="rounded-full p-1.5 text-fb-text-secondary hover:bg-fb-gray transition-colors"
            aria-label="Menu"
          >
            <span className="text-lg leading-none">•••</span>
          </button>
          {menuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                aria-hidden
                onClick={() => setMenuOpen(false)}
              />
              <div className="absolute right-0 top-full z-20 mt-1 min-w-[160px] rounded-lg border border-fb-border bg-white py-1 shadow-modal">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-fb-text hover:bg-fb-gray"
                  >
                    View live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-sm text-fb-text hover:bg-fb-gray"
                  >
                    View code
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="block w-full px-4 py-2 text-left text-sm text-fb-text hover:bg-fb-gray"
                >
                  Share
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <h3 className="font-syne text-[17px] font-bold text-fb-text mb-2">
        {project.title}
      </h3>
      <div className="mb-3">
        <p
          className="text-[15px] text-fb-text-secondary"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: expanded ? undefined : 3,
            WebkitBoxOrient: "vertical" as const,
            overflow: "hidden",
          }}
        >
          {project.description}
        </p>
        {project.description.length > 120 && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-1 text-[15px] font-medium text-fb-text-secondary hover:text-fb-blue"
          >
            {expanded ? "See less" : "See more"}
          </button>
        )}
      </div>

      {/* TECH STACK TAGS */}
      <div className="mb-3 overflow-x-auto scrollbar-hide flex gap-2 pb-1">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-jetbrains-mono text-xs rounded-full bg-fb-gray px-3 py-1 text-fb-text shrink-0 transition-colors duration-200 hover:bg-fb-blue-light hover:text-fb-blue cursor-default"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* PROJECT IMAGE */}
      <div className="relative mb-3 overflow-hidden rounded-lg aspect-video bg-fb-gray group">
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
            />
            <a
              href={project.liveUrl ?? "#"}
              className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              <span className="rounded-lg bg-white px-4 py-2 font-dm-sans text-sm font-medium text-fb-text shadow-hover">
                View Project →
              </span>
            </a>
          </>
        ) : (
          <div
            className="flex h-full w-full items-center justify-center transition-transform duration-300 group-hover:scale-[1.01]"
            style={{ backgroundColor: categoryColor }}
          >
            <span className="font-syne text-xl font-bold text-white/90 drop-shadow">
              {project.title}
            </span>
            <a
              href={project.liveUrl ?? "#"}
              className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
            >
              <span className="rounded-lg bg-white px-4 py-2 font-dm-sans text-sm font-medium text-fb-text shadow-hover">
                View Project →
              </span>
            </a>
          </div>
        )}
      </div>

      {/* ENGAGEMENT BAR */}
      <div className="flex flex-wrap items-center gap-2 py-2 text-[13px] text-fb-text-secondary border-b border-fb-border">
        <button
          type="button"
          className="hover:underline"
          onClick={() => setReactionPicker((p) => (p ? null : "like"))}
        >
          👍❤️😮 {totalReactions} reactions
        </button>
        <button
          type="button"
          className="hover:underline"
          onClick={() => setCommentsOpen((c) => !c)}
        >
          {totalComments} comments
        </button>
        <button type="button" className="hover:underline">
          {shareCount} share
        </button>
      </div>

      {/* ACTION BUTTONS */}
      <div className="grid grid-cols-3 gap-1 pt-1">
        {(["like", "love", "wow"] as const).map((type) => (
          <div key={type} className="relative">
            <button
              type="button"
              onMouseEnter={() => setReactionPicker(type)}
              onMouseLeave={() => setReactionPicker(null)}
              onClick={() => toggleReaction(type)}
              className={`flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-[15px] transition-colors duration-200 hover:bg-fb-gray ${
                userReaction === type ? "text-fb-blue font-bold" : "text-fb-text-secondary"
              }`}
            >
              {type === "like" && "👍"}
              {type === "love" && "❤️"}
              {type === "wow" && "😮"}
              <span className="hidden sm:inline">{REACTION_LABELS[type]}</span>
            </button>
            {reactionPicker === type && (
              <div
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 flex gap-0.5 rounded-full border border-fb-border bg-white px-2 py-1 shadow-hover"
                onMouseEnter={() => setReactionPicker(type)}
                onMouseLeave={() => setReactionPicker(null)}
              >
                {(["like", "love", "wow"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleReaction(r)}
                    className="rounded-full p-1 text-lg hover:scale-125 transition-transform"
                  >
                    {r === "like" && "👍"}
                    {r === "love" && "❤️"}
                    {r === "wow" && "😮"}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* COMMENTS (collapsible) */}
      {commentsOpen && (
        <div className="mt-3 pt-3 border-t border-fb-border space-y-3">
          {project.comments.slice(0, 2).map((c: Comment) => (
            <div key={c.id} className="flex gap-2">
              <Avatar
                src={c.authorAvatar ?? null}
                alt={c.author}
                size="sm"
                className="h-8 w-8 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[13px] font-semibold text-fb-text">{c.author}</p>
                <p className="text-[15px] text-fb-text">{c.content}</p>
                <p className="text-[12px] text-fb-text-secondary mt-0.5">
                  {formatRelativeTime(c.createdAt)}
                </p>
              </div>
            </div>
          ))}
          <div className="flex gap-2">
            <Avatar src={null} alt="You" size="sm" className="h-8 w-8 shrink-0" />
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 rounded-full bg-fb-gray px-4 py-2 text-[15px] text-fb-text placeholder:text-fb-text-secondary border-0 focus:outline-none focus:ring-2 focus:ring-fb-blue/30"
              readOnly
              aria-label="Write a comment"
            />
          </div>
        </div>
      )}
    </article>
  );
}

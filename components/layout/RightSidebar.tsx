"use client";

import { Mail, Github, Linkedin } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

export interface PersonRef {
  name: string;
  avatar?: string | null;
  linkedInUrl?: string | null;
}

export interface TrendingSkill {
  tag: string;
  count: string;
  label: string;
}

export interface RightSidebarProps {
  yourName?: string;
  email?: string;
  githubUrl?: string;
  linkedInUrl?: string;
  nextAvailableSlot?: string;
  /** Mon–Fri availability: true = available (green), false = busy (gray) */
  weekAvailability?: [boolean, boolean, boolean, boolean, boolean];
  people?: PersonRef[];
  trending?: TrendingSkill[];
}

const DEFAULT_PEOPLE: PersonRef[] = [
  { name: "Marie Laurent", linkedInUrl: "https://linkedin.com" },
  { name: "Thomas Dubois", linkedInUrl: "https://linkedin.com" },
  { name: "Sophie Martin", linkedInUrl: "https://linkedin.com" },
];

const DEFAULT_TRENDING: TrendingSkill[] = [
  { tag: "React", count: "24K", label: "developers" },
  { tag: "Supabase", count: "8K", label: "projects" },
  { tag: "Next.js", count: "18K", label: "repos" },
  { tag: "TypeScript", count: "32K", label: "developers" },
];

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export default function RightSidebar({
  yourName = "Your Name",
  email = "hello@yoursite.com",
  githubUrl = "https://github.com",
  linkedInUrl = "https://linkedin.com",
  nextAvailableSlot = "Mar 15",
  weekAvailability = [true, false, true, true, false],
  people = DEFAULT_PEOPLE,
  trending = DEFAULT_TRENDING,
}: RightSidebarProps) {
  const initials = yourName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside
      className="scrollbar-hide hidden w-[320px] shrink-0 overflow-y-auto rounded-lg xl:block"
      style={{ position: "sticky", top: "72px", maxHeight: "calc(100vh - 88px)" }}
    >
      {/* SPONSORED CARD */}
      <div className="mb-4 rounded-lg border border-fb-border bg-white p-0 shadow-card overflow-hidden">
        <p className="px-4 pt-3 text-[14px] text-fb-text-secondary">
          Sponsored
        </p>
        <a
          href="#hire"
          className="block p-4 pt-0 hover:bg-fb-gray/50 transition-colors"
        >
          <div
            className="mb-3 flex h-24 w-full items-center justify-center rounded-md text-2xl font-bold text-white/90"
            style={{
              background: "linear-gradient(135deg, #1877F2 0%, #0052CC 100%)",
            }}
          >
            {initials}
          </div>
          <p className="font-dm-sans text-[15px] font-bold text-fb-text mb-0.5">
            Looking for a world-class developer?
          </p>
          <p className="text-[13px] text-fb-text-secondary mb-3">
            Full Stack, SaaS, E-commerce. Delivered on time.
          </p>
          <span className="flex w-full items-center justify-center rounded-sm bg-fb-blue py-2 text-[14px] font-medium text-white">
            Hire Now
          </span>
        </a>
      </div>

      {/* PEOPLE YOU MAY KNOW */}
      <div className="mb-4 rounded-lg border border-fb-border bg-white p-4 shadow-card">
        <h3 className="font-dm-sans text-[17px] font-bold text-fb-text mb-3">
          People you may know
        </h3>
        <ul className="space-y-3">
          {people.slice(0, 3).map((person) => (
            <li key={person.name} className="flex items-center gap-3">
              <Avatar
                src={person.avatar ?? null}
                alt={person.name}
                size="md"
                className="h-10 w-10 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="font-dm-sans text-[15px] font-bold text-fb-text truncate">
                  {person.name}
                </p>
                <p className="text-[13px] text-fb-text-secondary">
                  worked with {yourName}
                </p>
              </div>
              {person.linkedInUrl && (
                <a
                  href={person.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 rounded-md bg-fb-blue px-3 py-1.5 text-[13px] font-medium text-white hover:bg-fb-blue-dark transition-colors"
                >
                  LinkedIn
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* CONTACT INFO / AVAILABILITY */}
      <div className="mb-4 rounded-lg border border-fb-border bg-white p-4 shadow-card">
        <h3 className="font-dm-sans text-[17px] font-bold text-fb-text mb-3">
          Contact Info
        </h3>
        <div className="space-y-2 mb-4">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-[14px] text-fb-text hover:text-fb-blue"
          >
            <Mail className="h-4 w-4 shrink-0 text-fb-text-secondary" aria-hidden />
            {email}
          </a>
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[14px] text-fb-text hover:text-fb-blue"
            >
              <Github className="h-4 w-4 shrink-0 text-fb-text-secondary" aria-hidden />
              GitHub
            </a>
          )}
          {linkedInUrl && (
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[14px] text-fb-text hover:text-fb-blue"
            >
              <Linkedin className="h-4 w-4 shrink-0 text-fb-text-secondary" aria-hidden />
              LinkedIn
            </a>
          )}
        </div>
        <p className="text-[13px] text-fb-text-secondary mb-2">
          Availability this week
        </p>
        <div className="flex gap-2 mb-3">
          {WEEKDAYS.map((day, i) => (
            <div
              key={day}
              className="flex flex-col items-center gap-1"
              title={weekAvailability[i] ? "Available" : "Busy"}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  weekAvailability[i] ? "bg-fb-green" : "bg-fb-text-secondary/40"
                }`}
              />
              <span className="text-[11px] text-fb-text-secondary">{day}</span>
            </div>
          ))}
        </div>
        <p className="text-[13px] font-medium text-fb-green">
          Next available slot: {nextAvailableSlot}
        </p>
      </div>

      {/* TRENDING SKILLS */}
      <div className="mb-4 rounded-lg border border-fb-border bg-white p-4 shadow-card">
        <h3 className="font-dm-sans text-[17px] font-bold text-fb-text mb-3">
          #Trending in your stack
        </h3>
        <ul className="space-y-2">
          {trending.map((item) => (
            <li key={item.tag}>
              <a
                href="#"
                className="block rounded-lg py-2 px-2 -mx-2 text-[14px] text-fb-text hover:bg-fb-gray transition-colors"
              >
                <span className="font-medium text-fb-blue">#{item.tag}</span>
                <span className="text-fb-text-secondary">
                  {" "}
                  · {item.count} {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* FOOTER LINKS */}
      <footer className="px-1 py-2">
        <div className="flex flex-wrap gap-x-2 gap-y-1 text-[12px] text-fb-text-secondary">
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <span>·</span>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <span>·</span>
          <a href="#" className="hover:underline">
            About
          </a>
          <span>·</span>
          <a href="#" className="hover:underline">
            Cookies
          </a>
        </div>
        <p className="mt-2 text-[12px] text-fb-text-secondary">
          © 2025 {yourName} · Made with ☕ and too much CSS
        </p>
      </footer>
    </aside>
  );
}

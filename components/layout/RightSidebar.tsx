"use client";

import { Mail, Github, Linkedin, Award } from "lucide-react";
import { siteLinks } from "@/lib/site-content";

export interface TrendingSkill {
  tag: string;
  count: string;
  label: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string | null;
  url: string | null;
  image_url: string | null;
}

export interface RightSidebarProps {
  yourName?: string;
  email?: string;
  githubUrl?: string;
  linkedInUrl?: string;
  nextAvailableSlot?: string;
  /** Mon–Fri availability: true = available (green), false = busy (gray) */
  weekAvailability?: [boolean, boolean, boolean, boolean, boolean];
  trending?: TrendingSkill[];
  /** Certifications affichées dans le bloc "Certifications" (ex-people you may know) */
  certifications?: CertificationItem[];
}

const DEFAULT_TRENDING: TrendingSkill[] = [
  { tag: "React", count: "24K", label: "développeurs" },
  { tag: "Supabase", count: "8K", label: "projets" },
  { tag: "Next.js", count: "18K", label: "repos" },
  { tag: "TypeScript", count: "32K", label: "développeurs" },
];

const WEEKDAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven"];

export default function RightSidebar({
  yourName = "Donald ADJINDA",
  email = siteLinks.email,
  githubUrl = siteLinks.githubUrl,
  linkedInUrl = siteLinks.linkedInUrl,
  nextAvailableSlot = "15 mars",
  weekAvailability = [true, false, true, true, false],
  trending = DEFAULT_TRENDING,
  certifications = [],
}: RightSidebarProps) {
  const initials = yourName
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <aside
      className="scrollbar-hide hidden w-[320px] shrink-0 overflow-y-auto rounded-lg lg:block"
      style={{ position: "sticky", top: "72px", maxHeight: "calc(100vh - 88px)" }}
    >
      {/* SPONSORED CARD */}
      <div className="mb-4 rounded-lg border border-fb-border bg-fb-card p-0 shadow-card overflow-hidden">
        <p className="px-4 pt-3 text-[14px] text-fb-text-secondary">
          Sponsored
        </p>
        <a
          href="/contact"
          className="block p-4 pt-0 hover:bg-fb-hover transition-colors"
        >
          <div
            className="mb-3 flex h-24 w-full items-center justify-center rounded-md text-2xl font-bold text-white/90"
            style={{
              background: "linear-gradient(135deg, var(--fb-blue) 0%, var(--fb-blue-dark) 100%)",
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

      {/* CONTACT INFO / AVAILABILITY */}
      <div className="mb-4 rounded-lg border border-fb-border bg-fb-card p-4 shadow-card">
        <h3 className="font-dm-sans text-[17px] font-bold text-fb-text mb-3">
          Informations de contact
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
          Disponibilité cette semaine
        </p>
        <div className="flex gap-2 mb-3">
          {WEEKDAYS.map((day, i) => (
            <div
              key={day}
              className="flex flex-col items-center gap-1"
              title={weekAvailability[i] ? "Disponible" : "Occupé"}
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
          Prochaine place disponible : {nextAvailableSlot}
        </p>
      </div>

      {/* People you may know — affiche les certifications */}
      {certifications.length > 0 && (
        <div className="mb-4 rounded-lg border border-fb-border bg-fb-card p-4 shadow-card">
          <h3 className="font-dm-sans text-[17px] font-bold text-fb-text mb-3">
            Certification
          </h3>
          <ul className="space-y-3">
            {certifications.map((cert) => {
              const content = (
                <>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-fb-blue-light text-fb-blue">
                    {cert.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={cert.image_url}
                        alt=""
                        className="h-10 w-10 object-cover"
                      />
                    ) : (
                      <Award className="h-5 w-5" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-medium text-fb-text truncate">
                      {cert.title}
                    </p>
                    {cert.issuer && (
                      <p className="text-[12px] text-fb-text-secondary truncate">
                        {cert.issuer}
                      </p>
                    )}
                  </div>
                </>
              );
              return (
                <li key={cert.id}>
                  {cert.url ? (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-lg py-2 px-2 -mx-2 hover:bg-fb-gray transition-colors"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-3 rounded-lg py-2 px-2 -mx-2">
                      {content}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* TRENDING SKILLS */}
      <div className="mb-4 rounded-lg border border-fb-border bg-fb-card p-4 shadow-card">
        <h3 className="font-dm-sans text-[17px] font-bold text-fb-text mb-3">
          #Trending dans ta pile
        </h3>
        <ul className="space-y-2">
          {trending.map((item) => (
            <li key={item.tag}>
              <a
                href={`/projects?q=${encodeURIComponent(item.tag)}`}
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
          <button type="button" className="hover:underline bg-transparent border-0 cursor-pointer p-0 text-inherit" title="À venir">
            Privacy
          </button>
          <span>·</span>
          <button type="button" className="hover:underline bg-transparent border-0 cursor-pointer p-0 text-inherit" title="À venir">
            Terms
          </button>
          <span>·</span>
          <a href="/about" className="hover:underline">
            About
          </a>
          <span>·</span>
          <button type="button" className="hover:underline bg-transparent border-0 cursor-pointer p-0 text-inherit" title="À venir">
            Cookies
          </button>
        </div>
        <p className="mt-2 text-[12px] text-fb-text-secondary">
          © 2025 {yourName} · Made with ☕ and too much CSS
        </p>
      </footer>
    </aside>
  );
}

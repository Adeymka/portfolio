"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { CaseStudy } from "@/lib/case-studies";
import { getCategoryColor, getRelatedCaseStudies } from "@/lib/case-studies";
import ProjectGalleryCard from "./ProjectGalleryCard";

function useCountUp(end: number, duration = 1500, trigger = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round(t * end));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, trigger]);
  return count;
}

export function ReadingProgressBar() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      setProgress(height ? (winScroll / height) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div
      className="fixed left-0 top-0 z-[100] h-1 bg-fb-blue transition-all duration-150"
      style={{ width: `${progress}%` }}
      aria-hidden
    />
  );
}

export interface CaseStudyPageProps {
  caseStudy: CaseStudy;
}

export default function CaseStudyPage({ caseStudy }: CaseStudyPageProps) {
  const heroRef = useRef<HTMLElement>(null);
  const [metaBarVisible, setMetaBarVisible] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [expandedHighlight, setExpandedHighlight] = useState<number | null>(null);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const handleShare = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const title = caseStudy.title;
    const text = (caseStudy.description || "").slice(0, 200) + (caseStudy.description && caseStudy.description.length > 200 ? "…" : "");
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title, text, url });
        setShareFeedback("Shared!");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        setShareFeedback("Link copied!");
      } else {
        setShareFeedback("Link copied!");
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") setShareFeedback("Could not share");
    }
    setTimeout(() => setShareFeedback(null), 2000);
  }, [caseStudy.title, caseStudy.description]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const observer = new IntersectionObserver(
      (entries) => {
        setMetaBarVisible(!entries[0]?.isIntersecting);
      },
      { threshold: 0, rootMargin: "-72px 0px 0px 0px" }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const related = getRelatedCaseStudies(caseStudy, 3);
  const categoryColor = getCategoryColor(caseStudy.category);

  return (
    <>
      <ReadingProgressBar />

      {/* HERO */}
      <header
        ref={heroRef}
        className="relative aspect-video w-full overflow-hidden bg-fb-gray"
      >
        {caseStudy.image ? (
          <Image
            src={caseStudy.image}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div
            className="h-full w-full flex items-center justify-center"
            style={{ backgroundColor: categoryColor }}
          >
            <span className="font-syne text-3xl font-bold text-white/90 md:text-4xl">
              {caseStudy.title}
            </span>
          </div>
        )}
        <div
          className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6 md:p-10"
          aria-hidden
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
          <span
            className="mb-2 inline-flex w-fit rounded-md px-2.5 py-1 text-sm font-medium text-white"
            style={{ backgroundColor: categoryColor }}
          >
            {caseStudy.category}
          </span>
          <h1 className="font-syne text-3xl font-bold text-white md:text-4xl lg:text-5xl">
            {caseStudy.title}
          </h1>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/90">
            {caseStudy.role && <span>{caseStudy.role}</span>}
            {caseStudy.duration && <span>· {caseStudy.duration}</span>}
            {caseStudy.year && <span>· {caseStudy.year}</span>}
            {caseStudy.status && (
              <span>· Status: {caseStudy.status}</span>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {caseStudy.liveUrl && (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-fb-card px-4 py-2 text-sm font-medium text-fb-text hover:bg-fb-hover"
              >
                View Live Site ↗
              </a>
            )}
            {caseStudy.githubUrl && (
              <a
                href={caseStudy.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border-2 border-white px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
              >
                GitHub Repository
              </a>
            )}
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 rounded-lg border border-white/60 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
            >
              ← Back to projects
            </Link>
          </div>
        </div>
      </header>

      {/* META BAR (sticky) */}
      <AnimatePresence>
        {metaBarVisible && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="sticky top-[56px] z-50 flex flex-wrap items-center justify-between gap-2 border-b border-fb-border bg-fb-card/95 px-4 py-3 backdrop-blur-sm md:px-6"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-syne text-lg font-bold text-fb-text">
                {caseStudy.title}
              </span>
              {caseStudy.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-fb-gray px-2.5 py-0.5 font-jetbrains-mono text-xs text-fb-text"
                >
                  {tech}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={handleShare}
              className="rounded-lg border border-fb-border px-3 py-1.5 text-sm text-fb-text hover:bg-fb-hover"
            >
              {shareFeedback || "Share"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-3xl px-4 py-10 md:px-6">
        {/* DESCRIPTION (courte, from DB) */}
        {caseStudy.description && (
          <section className="mb-16">
            <p className="text-fb-text-secondary leading-relaxed">
              {caseStudy.description}
            </p>
          </section>
        )}

        {/* LONG DESCRIPTION (from DB) */}
        {caseStudy.longDescription && (
          <section className="mb-16">
            <p className="whitespace-pre-line text-fb-text-secondary leading-relaxed">
              {caseStudy.longDescription}
            </p>
          </section>
        )}

        {/* CAHIER DES CHARGES (from DB) */}
        <section className="mb-16">
          <h2 className="font-syne text-xl font-bold text-fb-text md:text-2xl">
            Cahier des charges
          </h2>
          {caseStudy.specs ? (
            <p className="mt-4 whitespace-pre-line text-fb-text-secondary leading-relaxed">
              {caseStudy.specs}
            </p>
          ) : (
            <p className="mt-4 text-fb-text-secondary/70 italic">
              Aucun cahier des charges renseigné pour ce projet.
            </p>
          )}
        </section>

        {/* CHALLENGE */}
        {caseStudy.challenge && (
          <section className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-fb-blue">
              The Challenge
            </p>
            <h2 className="mt-2 font-syne text-2xl font-bold text-fb-text md:text-3xl">
              {caseStudy.challenge.title}
            </h2>
            <p className="mt-4 whitespace-pre-line text-fb-text-secondary leading-relaxed">
              {caseStudy.challenge.body}
            </p>
            {(caseStudy.challenge.beforeImage || caseStudy.challenge.afterImage) && (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {caseStudy.challenge.beforeImage && (
                  <div>
                    <p className="mb-2 text-sm font-medium text-fb-text-secondary">Before</p>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-fb-border">
                      <Image
                        src={caseStudy.challenge.beforeImage}
                        alt="Before"
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                )}
                {caseStudy.challenge.afterImage && (
                  <div>
                    <p className="mb-2 text-sm font-medium text-fb-text-secondary">After</p>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-fb-border">
                      <Image
                        src={caseStudy.challenge.afterImage}
                        alt="After"
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* SOLUTION */}
        {caseStudy.solution && (
          <section className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-fb-blue">
              The Solution
            </p>
            <p className="mt-4 text-fb-text-secondary leading-relaxed">
              {caseStudy.solution.body}
            </p>
            {caseStudy.solution.architectureImage && (
              <div className="relative mt-6 h-64 w-full overflow-hidden rounded-lg border border-fb-border bg-fb-gray/50 p-4 md:h-80">
                <Image
                  src={caseStudy.solution.architectureImage}
                  alt="Architecture"
                  fill
                  className="object-contain rounded-lg"
                  sizes="100vw"
                />
              </div>
            )}
            {caseStudy.solution.decisions?.length > 0 && (
              <div className="mt-8">
                <h3 className="font-syne text-lg font-bold text-fb-text">Key decisions</h3>
                <ul className="mt-3 space-y-3">
                  {caseStudy.solution.decisions.map((d, i) => (
                    <li key={i} className="rounded-lg border border-fb-border p-4">
                      <p className="font-medium text-fb-text">{d.title}</p>
                      <p className="mt-1 text-sm text-fb-text-secondary">{d.body}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {caseStudy.solution.highlights?.length > 0 && (
              <div className="mt-8">
                <h3 className="font-syne text-lg font-bold text-fb-text">Technical highlights</h3>
                <ul className="mt-3 space-y-2">
                  {caseStudy.solution.highlights.map((h, i) => (
                    <li key={i} className="rounded-lg border border-fb-border">
                      <button
                        type="button"
                        onClick={() => setExpandedHighlight(expandedHighlight === i ? null : i)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left"
                      >
                        <span className="font-medium text-fb-text">{h.title}</span>
                        <span className="text-fb-text-secondary">
                          {expandedHighlight === i ? "−" : "+"}
                        </span>
                      </button>
                      <AnimatePresence>
                        {expandedHighlight === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="border-t border-fb-border px-4 py-3 text-sm text-fb-text-secondary">
                              {h.body}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}

        {/* TECH STACK */}
        {(caseStudy.techStack?.length ?? 0) > 0 && (
          <section className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-fb-blue">
              Tech Stack
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {caseStudy.techStack!.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-fb-border p-4"
                  style={{
                    borderLeftWidth: "4px",
                    borderLeftColor:
                      tech.category === "frontend"
                        ? "var(--fb-blue)"
                        : tech.category === "backend"
                          ? "var(--fb-green)"
                          : "var(--fb-gold)",
                  }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-fb-gray font-jetbrains-mono text-sm font-bold text-fb-text">
                    {tech.name.slice(0, 2)}
                  </span>
                  <div>
                    <p className="font-medium text-fb-text">{tech.name}</p>
                    <p className="mt-0.5 text-sm text-fb-text-secondary">{tech.usage}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* RESULTS */}
        {(caseStudy.results?.length ?? 0) > 0 && (
          <section className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-fb-blue">
              The Results
            </p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudy.results!.map((stat, i) => (
                <ResultCard key={i} stat={stat} />
              ))}
            </div>
            {caseStudy.testimonial && (
              <blockquote className="mt-8 rounded-xl border border-fb-border bg-fb-gray/30 p-6">
                <p className="text-lg italic text-fb-text">&quot;{caseStudy.testimonial.quote}&quot;</p>
                <footer className="mt-3 font-dm-sans font-medium text-fb-text">
                  — {caseStudy.testimonial.author}
                  {caseStudy.testimonial.role && (
                    <span className="text-fb-text-secondary">, {caseStudy.testimonial.role}</span>
                  )}
                </footer>
              </blockquote>
            )}
            {(caseStudy.screenshots?.length ?? 0) > 0 && (
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {caseStudy.screenshots!.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setLightboxImage(src)}
                    className="relative aspect-video w-full overflow-hidden rounded-lg border border-fb-border text-left"
                  >
                    <Image src={src} alt={`Screenshot ${i + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </button>
                ))}
              </div>
            )}
          </section>
        )}

        {/* RELATED */}
        {related.length > 0 && (
          <section className="mb-16">
            <h2 className="font-syne text-xl font-bold text-fb-text">
              More projects you might like
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <ProjectGalleryCard
                  key={p.id}
                  project={p}
                  index={i}
                  caseStudyUrl={`/projects/${p.slug}`}
                />
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="rounded-2xl border border-fb-border bg-fb-blue-light/50 py-12 px-6 text-center">
          <h2 className="font-syne text-2xl font-bold text-fb-text">
            Have a similar project in mind?
          </h2>
          <p className="mt-2 text-fb-text-secondary">
            Let&apos;s build it together
          </p>
          <Link
            href="/#hire"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-fb-blue px-8 py-4 text-lg font-medium text-white shadow-card hover:bg-fb-blue-dark hover:shadow-hover transition-all"
          >
            Hire Me
          </Link>
        </section>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/80 p-4"
            onClick={() => setLightboxImage(null)}
          >
            <motion.img
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={lightboxImage}
              alt=""
              className="max-h-full max-w-full rounded-lg object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function ResultCard({
  stat,
}: {
  stat: { label: string; value: string; prefix?: string; suffix?: string };
}) {
  const num = parseInt(stat.value, 10);
  const isNumeric = !Number.isNaN(num);
  const count = useCountUp(num, 1200, isNumeric);
  const displayValue = isNumeric ? count : stat.value;
  return (
    <div className="rounded-xl border border-fb-border bg-fb-card p-6 shadow-card">
      <p className="font-syne text-3xl font-bold text-fb-blue">
        {stat.prefix}
        {displayValue}
        {stat.suffix}
      </p>
      <p className="mt-1 text-sm text-fb-text-secondary">{stat.label}</p>
    </div>
  );
}

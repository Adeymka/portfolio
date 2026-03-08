"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, MapPin, Globe, Briefcase, MessageCircle, Download } from "lucide-react";

const FLOAT_PARTICLES = [
  { size: 6, left: "15%", top: "30%", delay: 0, anim: "floatParticle" },
  { size: 4, left: "45%", top: "20%", delay: 0.5, anim: "floatParticleAlt" },
  { size: 8, left: "70%", top: "50%", delay: 1, anim: "floatParticle" },
  { size: 5, left: "25%", top: "70%", delay: 0.2, anim: "floatParticleAlt" },
  { size: 6, left: "85%", top: "25%", delay: 1.2, anim: "floatParticle" },
  { size: 4, left: "55%", top: "75%", delay: 0.8, anim: "floatParticleAlt" },
];

const STAT_LABELS = ["Projects Delivered", "Years Experience", "Happy Clients"] as const;

function useCountUp(end: number, durationMs = 1500, startOnMount = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!startOnMount) return;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      setCount(Math.round(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, durationMs, startOnMount]);
  return count;
}

export interface ProfileHeaderProps {
  name?: string;
  title?: string;
  location?: string;
  website?: string;
  profileImage?: string | null;
  projectsCount?: number;
  yearsExperience?: number;
  happyClients?: number;
}

export default function ProfileHeader({
  name = "Your Name",
  title = "Full Stack Developer · Freelance",
  location = "Paris, France",
  website = "yoursite.com",
  profileImage = null,
  projectsCount = 24,
  yearsExperience = 5,
  happyClients = 18,
}: ProfileHeaderProps) {
  const [coverHover, setCoverHover] = useState(false);
  const projects = useCountUp(projectsCount);
  const years = useCountUp(yearsExperience);
  const clients = useCountUp(happyClients);
  const statsValues = [projects, years, clients];
  const statsLabels = STAT_LABELS;

  return (
    <section className="relative">
      {/* Cover photo */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="profile-cover-gradient relative h-[200px] w-full overflow-hidden rounded-t-2xl md:h-[300px]"
        onMouseEnter={() => setCoverHover(true)}
        onMouseLeave={() => setCoverHover(false)}
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      >
        {/* Floating particles */}
        {FLOAT_PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white opacity-30"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              top: p.top,
              animation: `${p.anim} ${4 + (i % 3)}s ease-in-out infinite`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        {/* Edit cover button — visible on hover */}
        <motion.button
          initial={false}
          animate={{ opacity: coverHover ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-3 right-3 flex items-center gap-2 rounded-lg bg-black/40 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-black/50 disabled:pointer-events-none"
          disabled={!coverHover}
          type="button"
        >
          <Pencil className="h-4 w-4" aria-hidden />
          Edit cover
        </motion.button>
      </motion.div>

      {/* Content container: overlap avatar + info */}
      <div className="px-5 md:px-8 lg:px-10">
        <div className="relative -mt-[50px] md:-mt-[75px]">
          {/* Profile picture */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="relative inline-block"
          >
            <div
              className="relative h-[100px] w-[100px] overflow-hidden rounded-full border-4 border-white bg-fb-gray shadow-[0_2px_8px_rgba(0,0,0,0.2)] md:h-[150px] md:w-[150px]"
              style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.2)" }}
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-fb-blue-light font-syne text-3xl font-bold text-fb-blue md:text-4xl">
                  {name.charAt(0)}
                </div>
              )}
            </div>
            {/* Green online dot */}
            <span
              className="absolute bottom-1 right-1 h-5 w-5 rounded-full border-[3px] border-white bg-fb-green animate-pulse-dot md:bottom-2 md:right-2 md:h-[20px] md:w-[20px]"
              aria-hidden
            />
          </motion.div>

          {/* Info + buttons row: name left, buttons right on desktop */}
          <div className="mt-5 flex flex-col gap-5 pb-6 md:flex-row md:items-start md:justify-between md:gap-6 md:pb-8">
            <div className="min-w-0 flex-1 basis-0">
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
                className="font-syne text-2xl font-bold text-fb-text md:text-[32px]"
              >
                {name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.45, ease: "easeOut" }}
                className="mt-1 text-base text-fb-text-secondary md:text-lg"
              >
                {title}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                className="mt-2 flex flex-wrap items-center gap-4 text-sm text-fb-text-secondary"
              >
                {location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4 shrink-0" aria-hidden />
                    {location}
                  </span>
                )}
                {website && (
                  <a
                    href={website.startsWith("http") ? website : `https://${website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-fb-blue hover:underline"
                  >
                    <Globe className="h-4 w-4 shrink-0" aria-hidden />
                    {website}
                  </a>
                )}
              </motion.div>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.55 }}
                className="mt-2 inline-flex rounded-full border border-fb-green px-3 py-1 text-xs font-medium"
                style={{ backgroundColor: "#E8F5E9", color: "#2E7D32" }}
              >
                Open to work
              </motion.span>
            </div>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
              className="flex flex-shrink-0 flex-wrap items-center justify-end gap-2 md:justify-end"
            >
              <a
                href="#hire"
                className="inline-flex items-center gap-2 rounded-lg bg-fb-blue px-6 py-2 font-medium text-white shadow-card transition-all duration-200 hover:translate-y-[-1px] hover:bg-fb-blue-dark hover:shadow-hover"
              >
                <Briefcase className="h-5 w-5" aria-hidden />
                Hire Me
              </a>
              <a
                href="#message"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-fb-blue bg-white px-5 py-2 font-medium text-fb-blue transition-all duration-200 hover:bg-fb-blue-light"
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                Message
              </a>
              <a
                href="#cv"
                className="inline-flex items-center gap-2 rounded-lg border border-fb-border bg-transparent px-5 py-2 font-medium text-fb-text transition-all duration-200 hover:bg-fb-gray"
              >
                <Download className="h-5 w-5" aria-hidden />
                Download CV
              </a>
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
            className="grid grid-cols-3 gap-6 border-t border-fb-border py-5 md:gap-8 md:py-6"
          >
            {statsLabels.map((label, i) => (
              <div key={label} className="text-center">
                <p className="font-syne text-2xl font-bold text-fb-blue md:text-[28px]">
                  {statsValues[i]}
                </p>
                <p className="mt-0.5 font-dm-sans text-xs text-fb-text-secondary">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

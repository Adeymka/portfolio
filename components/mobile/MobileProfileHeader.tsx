"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Globe, Briefcase, X } from "lucide-react";
import { BLUR_DATA_URL } from "@/lib/constants";
import MatrixRain from "@/components/sections/MatrixRain";

export interface MobileProfileHeaderProps {
  name?: string;
  title?: string;
  location?: string;
  website?: string;
  profileImage?: string | null;
  projectsCount?: number;
  yearsExperience?: number;
  happyClients?: number;
}

const STAT_LABELS = ["Projets", "Années", "Clients"] as const;

export default function MobileProfileHeader({
  name = "Donald ADJINDA",
  title = "Développeur Web · Freelance",
  location = "Abomey-Calavi, Bénin",
  website = "yoursite.com",
  profileImage = null,
  projectsCount = 24,
  yearsExperience = 5,
  happyClients = 18,
}: MobileProfileHeaderProps) {
  const [profileImageOpen, setProfileImageOpen] = useState(false);
  const statsValues = [projectsCount, yearsExperience, happyClients];

  useEffect(() => {
    if (!profileImageOpen) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProfileImageOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [profileImageOpen]);

  return (
    <section className="relative lg:hidden">
      <div
        className="profile-cover-gradient relative h-[150px] w-full overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      >
        <MatrixRain />
      </div>
      <div className="px-4 pb-4">
        <div className="relative -mt-10 flex flex-col items-center">
          <button
            type="button"
            onClick={() => profileImage && setProfileImageOpen(true)}
            className="relative left-1/2 h-20 w-20 -translate-x-1/2 overflow-hidden rounded-full border-[3px] border-white bg-fb-gray shadow-card focus:outline-none focus-visible:ring-2 focus-visible:ring-fb-blue focus-visible:ring-offset-2"
            aria-label="Voir la photo de profil en grand"
          >
            <div className="relative h-full w-full">
              {profileImage ? (
                <Image
                  src={profileImage}
                  alt={name}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  unoptimized={profileImage.startsWith("http")}
                  sizes="80px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-fb-blue font-syne text-2xl font-bold text-white">
                  {name.charAt(0)}
                </div>
              )}
            </div>
            <span
              className="absolute bottom-0.5 right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-fb-green"
              style={{ animation: "pulse 2s ease-in-out infinite" }}
              aria-hidden
            />
          </button>

          {/* Lightbox photo de profil (mobile) */}
          <AnimatePresence>
            {profileImageOpen && profileImage && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
                onClick={() => setProfileImageOpen(false)}
                role="dialog"
                aria-modal="true"
                aria-label="Photo de profil en grand"
              >
                <button
                  type="button"
                  onClick={() => setProfileImageOpen(false)}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 touch-manipulation"
                  aria-label="Fermer"
                >
                  <X className="h-6 w-6" />
                </button>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="relative max-h-[85vh] max-w-[85vw] touch-none"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={profileImage}
                    alt={`${name} — photo de profil`}
                    width={400}
                    height={400}
                    className="max-h-[85vh] w-auto rounded-lg object-contain shadow-2xl"
                    unoptimized={profileImage.startsWith("http")}
                    sizes="85vw"
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-12 text-center">
            <h1 className="font-syne text-xl font-bold text-fb-text">{name}</h1>
            <p className="mt-0.5 text-sm text-fb-text-secondary">{title}</p>
            <div className="mt-1.5 flex flex-wrap justify-center gap-3 text-xs text-fb-text-secondary">
              {location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {location}
                </span>
              )}
              {website && (
                <a
                  href={website.startsWith("http") ? website : `https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-fb-blue"
                >
                  <Globe className="h-3.5 w-3.5 shrink-0" aria-hidden />
                  {website}
                </a>
              )}
            </div>
            <span className="mt-2 inline-flex rounded-full border border-fb-green bg-fb-green/10 px-3 py-1 text-xs font-medium text-fb-green">
              Open to work
            </span>
          </div>
          <div className="mt-3 px-4">
            <Link
              href="/contact"
              className="hire-me-btn flex w-full items-center justify-center gap-2 rounded-lg bg-fb-blue py-2 font-medium text-white shadow-card"
            >
              <Briefcase className="h-4 w-4 shrink-0" aria-hidden />
              Hire Me
            </Link>
          </div>
          <div className="mt-4 grid w-full grid-cols-3 border-t border-fb-border pt-3">
            {STAT_LABELS.map((label, i) => (
              <div
                key={label}
                className={`text-center ${i < 2 ? "border-r border-fb-border" : ""}`}
              >
                <p className="font-syne text-lg font-bold text-fb-blue">
                  {statsValues[i]}
                </p>
                <p className="mt-0.5 text-[10px] text-fb-text-secondary">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-2 overflow-x-auto border-t border-fb-border pt-3 scrollbar-hide">
            {["Posts", "À propos", "Skills", "Contact"].map((tab) => (
              <button
                key={tab}
                type="button"
                className="shrink-0 rounded-full bg-fb-gray px-4 py-2 text-sm font-medium text-fb-text"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

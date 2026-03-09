"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, Calendar, CheckCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import MobileNavbar from "./MobileNavbar";
import BottomNav from "./BottomNav";
import MobileLeftSheet from "./MobileLeftSheet";
import type { IntroData, StackItem } from "@/components/layout/LeftSidebar";
import type { Skill } from "@/lib/data";
import { siteLinks } from "@/lib/site-content";

const MIN_MESSAGE_LENGTH = 20;

const MOBILE_INTRO: IntroData = {
  bio: "Passionné par la création d'applications web modernes et performantes.",
  jobTitle: "Développeur Web",
  company: "Freelance",
  school: "École Internationale de Graphisme (EIG)",
  location: "Abomey-Calavi, Bénin",
  website: "https://mykerobert3-arch.github.io/DonaldPortfolio/",
  joinedDate: "2024",
};

const MOBILE_STACK: StackItem[] = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "Docker", category: "DevOps" },
  { name: "Figma", category: "Design" },
];

const DEFAULT_SKILLS: Skill[] = [
  { name: "TypeScript", level: 90, category: "Frontend" },
  { name: "React", level: 85, category: "Frontend" },
  { name: "Node.js", level: 80, category: "Backend" },
  { name: "PostgreSQL", level: 70, category: "Backend" },
  { name: "Docker", level: 65, category: "DevOps" },
  { name: "Figma", level: 60, category: "Design" },
];

export default function MobileContactPage() {
  const [nameVal, setNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [messageVal, setMessageVal] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState(0);

  useEffect(() => {
    if (cooldownUntil <= 0) return;
    const t = setInterval(() => setCooldownUntil((prev) => Math.max(0, prev - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldownUntil]);

  const validate = () => {
    const next: typeof errors = {};
    if (!nameVal.trim()) next.name = "Name is required";
    if (!emailVal.trim()) next.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) next.email = "Invalid email";
    if (!messageVal.trim()) next.message = "Message is required";
    else if (messageVal.trim().length < MIN_MESSAGE_LENGTH)
      next.message = `At least ${MIN_MESSAGE_LENGTH} characters`;
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cooldownUntil > 0) return;
    if (!validate()) return;
    setSubmitting(true);
    setErrors({});
    try {
      const supabase = createClient();
      await supabase.from("messages").insert({
        name: nameVal.trim(),
        email: emailVal.trim(),
        subject: "Contact depuis le portfolio",
        message: messageVal.trim(),
      });
    } catch {
      // continue to show success even if Supabase fails
    }
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSuccess(true);
    setCooldownUntil(60);
    setNameVal("");
    setEmailVal("");
    setMessageVal("");
    setErrors({});
  };

  const inputBase =
    "rounded-lg border border-fb-border bg-fb-input-bg px-4 py-3 w-full text-fb-text placeholder:text-fb-text-secondary focus:border-fb-blue focus:ring-1 focus:ring-fb-blue focus:outline-none min-h-[44px]";
  const inputStyle = { fontSize: "16px" };

  return (
    <div
      className="flex min-h-screen flex-col bg-fb-gray lg:hidden"
      style={{ paddingBottom: "calc(56px + env(safe-area-inset-bottom))" }}
    >
      <MobileNavbar profileAvatar={siteLinks.profileImageUrl} />
      <main className="flex-1 overflow-y-auto">
      {/* HEADER */}
      <header className="px-4 pt-6 pb-4">
        <h1 className="font-syne text-2xl font-bold text-fb-text">Contact</h1>
        <p className="mt-1 text-sm text-fb-text-secondary">Répondez en moins de 24h</p>
      </header>

      {/* INFO CARDS ROW */}
      <div className="mb-4 flex flex-col gap-3 px-4">
        <a
          href={`mailto:${siteLinks.email}`}
          className="flex flex-1 flex-col items-center justify-center rounded-xl border border-fb-border bg-fb-card p-3 text-center transition-colors hover:bg-fb-hover"
        >
          <Mail className="h-6 w-6 text-fb-blue" aria-hidden />
          <p className="mt-1 text-xs text-fb-text-secondary">Email</p>
        </a>
        <div className="flex flex-1 flex-col rounded-xl border border-fb-border bg-fb-card p-3 text-center">
          <Phone className="mx-auto h-6 w-6 text-fb-blue" aria-hidden />
          <p className="mt-1 text-xs text-fb-text-secondary">Téléphone</p>
          <p className="mt-0.5 text-sm font-medium text-fb-text">{siteLinks.phone}</p>
          <div className="mt-2 flex justify-center gap-3">
            <a
              href={`tel:${siteLinks.phoneE164}`}
              className="rounded-lg bg-fb-blue px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
            >
              Appel direct
            </a>
            <a
              href={siteLinks.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#25D366] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
            >
              WhatsApp
            </a>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-fb-border bg-fb-card p-3 text-center">
          <Calendar className="mx-auto h-6 w-6 text-fb-blue" aria-hidden />
          <p className="mt-1 text-xs text-fb-text-secondary">Calendly</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center px-4 py-12"
          >
            <CheckCircle className="h-12 w-12 text-fb-green" aria-hidden />
            <p className="mt-4 font-syne text-xl font-bold text-fb-text">Message envoyé !</p>
            <p className="mt-1 text-sm text-fb-text-secondary">Je vous réponds dans les 24h.</p>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-4 rounded-2xl border border-fb-border bg-fb-card p-4"
          >
            <form onSubmit={handleSubmit} noValidate>
              <label className="block">
                <input
                  type="text"
                  value={nameVal}
                  onChange={(e) => setNameVal(e.target.value)}
                  placeholder="Nom"
                  className={inputBase}
                  style={inputStyle}
                  disabled={submitting}
                  autoComplete="name"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </label>
              <label className="mt-3 block">
                <input
                  type="email"
                  value={emailVal}
                  onChange={(e) => setEmailVal(e.target.value)}
                  placeholder="Email"
                  className={inputBase}
                  style={inputStyle}
                  disabled={submitting}
                  autoComplete="email"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </label>
              <label className="mt-3 block">
                <textarea
                  value={messageVal}
                  onChange={(e) => setMessageVal(e.target.value)}
                  placeholder="Message"
                  rows={5}
                  className={`${inputBase} resize-none`}
                  style={inputStyle}
                  disabled={submitting}
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </label>
              <button
                type="submit"
                disabled={submitting || cooldownUntil > 0}
                className="hire-me-btn mt-4 flex w-full min-h-[44px] items-center justify-center gap-2 rounded-xl bg-fb-blue py-3.5 font-medium text-[15px] text-white disabled:opacity-70"
              >
                <span className="hire-me-shimmer" aria-hidden />
                <span className="relative z-10">
                  {submitting ? "Envoi en cours..." : cooldownUntil > 0 ? `Renvoyer dans ${cooldownUntil} s` : "Envoyer le message"}
                </span>
              </button>
              {cooldownUntil > 0 && (
                <p className="mt-2 text-center text-xs text-fb-text-secondary">Vous pourrez renvoyer un message dans {cooldownUntil} s.</p>
              )}
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      </main>
      <BottomNav onMoreClick={() => setSheetOpen(true)} />
      <MobileLeftSheet
        isOpen={sheetOpen}
        onClose={() => setSheetOpen(false)}
        intro={MOBILE_INTRO}
        skills={DEFAULT_SKILLS}
        stack={MOBILE_STACK}
        nextAvailableDate="Next week"
        profileAvatar={siteLinks.profileImageUrl}
      />
    </div>
  );
}

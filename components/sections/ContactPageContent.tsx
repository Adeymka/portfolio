"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Linkedin,
  Send,
  Paperclip,
  Calendar,
  FileText,
  Zap,
  Loader2,
} from "lucide-react";
import Avatar from "@/components/ui/Avatar";
import { createClient } from "@/lib/supabase/client";

const INTRO_BUBBLES = [
  { id: 1, text: "👋 Hey! Thanks for visiting my portfolio.", delay: 500 },
  { id: 2, text: "Tell me about your project — I'd love to hear more!", delay: 1200 },
];

const MIN_MESSAGE_LENGTH = 20;

export interface ContactPageContentProps {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  /** Pour lien tel: (ex. +229156392567) */
  phoneTel?: string;
  /** Pour lien WhatsApp (ex. https://wa.me/229156392567) */
  whatsappUrl?: string;
  linkedInUrl?: string;
  cvUrl?: string | null;
  projectsCount?: number;
  timezone?: string;
  avatar?: string | null;
}

export default function ContactPageContent({
  name = "Donald ADJINDA",
  title = "Développeur Web",
  email = "adjindaadeymkadonald@gmail.com",
  phone,
  phoneTel,
  whatsappUrl,
  linkedInUrl,
  cvUrl = null,
  projectsCount = 24,
  timezone = "Abomey-Calavi, Bénin (WAT)",
  avatar = null,
}: ContactPageContentProps) {
  const [visibleBubbles, setVisibleBubbles] = useState<number[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [displayProjects, setDisplayProjects] = useState(0);
  const [nameVal, setNameVal] = useState("");
  const [emailVal, setEmailVal] = useState("");
  const [messageVal, setMessageVal] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [messageFocused, setMessageFocused] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState<number>(0);

  useEffect(() => {
    if (cooldownUntil <= 0) return;
    const t = setInterval(() => {
      setCooldownUntil((prev) => {
        const next = Math.max(0, prev - 1);
        return next;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [cooldownUntil]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    INTRO_BUBBLES.forEach((b) => {
      timers.push(
        setTimeout(() => setVisibleBubbles((prev) => [...prev, b.id]), b.delay)
      );
    });
    const typingStart = INTRO_BUBBLES[INTRO_BUBBLES.length - 1].delay + 600;
    timers.push(setTimeout(() => setShowTyping(true), typingStart));
    timers.push(setTimeout(() => setShowTyping(false), typingStart + 800));
    timers.push(setTimeout(() => setShowForm(true), typingStart + 1000));
    return () => timers.forEach(clearTimeout);
  }, []);

  // Count-up pour projets (comme le bloc profil)
  useEffect(() => {
    const durationMs = 1500;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      setDisplayProjects(Math.round(progress * projectsCount));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [projectsCount]);

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
      // continue to show success even if Supabase fails (e.g. RLS / no table)
    }
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitting(false);
    setSuccess(true);
    setCooldownUntil(60);
    setNameVal("");
    setEmailVal("");
    setMessageVal("");
    setErrors({});
    try {
      const confetti = (await import("canvas-confetti")).default;
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.8 }, duration: 1000 });
    } catch {
      // no confetti if import fails
    }
  };

  const runValidation = (field: "name" | "email" | "message") => {
    if (field === "name") setErrors((e) => ({ ...e, name: nameVal.trim() ? undefined : "Name is required" }));
    if (field === "email") {
      if (!emailVal.trim()) setErrors((e) => ({ ...e, email: "Email is required" }));
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal))
        setErrors((e) => ({ ...e, email: "Invalid email" }));
      else setErrors((e) => ({ ...e, email: undefined }));
    }
    if (field === "message") {
      if (!messageVal.trim()) setErrors((e) => ({ ...e, message: "Message is required" }));
      else if (messageVal.trim().length < MIN_MESSAGE_LENGTH)
        setErrors((e) => ({ ...e, message: `At least ${MIN_MESSAGE_LENGTH} characters` }));
      else setErrors((e) => ({ ...e, message: undefined }));
    }
  };

  return (
    <div className="flex h-[calc(100vh-56px)] min-h-[500px] flex-col overflow-hidden bg-fb-card md:flex-row">
      {/* LEFT PANEL — 40% (brand gradient) */}
      <div
        className="flex flex-shrink-0 flex-col justify-between p-6 text-white md:w-[40%] md:p-8"
        style={{
          background: "linear-gradient(180deg, var(--fb-blue) 0%, var(--fb-blue-dark) 100%)",
        }}
      >
        <div>
          <div className="relative inline-block">
            <Avatar
              src={avatar}
              alt={name}
              size="lg"
              online
              className="h-20 w-20 border-4 border-white/30"
            />
            <span className="absolute bottom-1 right-1 h-4 w-4 rounded-full border-2 border-white bg-fb-green" />
          </div>
          <h1 className="mt-4 font-syne text-2xl font-bold">{name}</h1>
          <p className="mt-1 text-white/90">{title}</p>
          <p className="mt-4 flex items-center gap-2 text-sm">
            <Zap className="h-4 w-4" />
            Usually responds within 24h
          </p>
        </div>
        <div className="space-y-3 text-sm">
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-white/95 hover:underline"
          >
            <Mail className="h-4 w-4 shrink-0" />
            {email}
          </a>
          {phone && (
            <div className="flex flex-col gap-1">
              <span className="flex items-center gap-2 text-white/95">
                <Phone className="h-4 w-4 shrink-0" />
                {phone}
              </span>
              {(phoneTel || whatsappUrl) && (
                <div className="ml-6 flex flex-wrap gap-3 text-sm">
                  {phoneTel && (
                    <a
                      href={`tel:${phoneTel}`}
                      className="text-white/90 underline hover:text-white"
                    >
                      Appel direct
                    </a>
                  )}
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/90 underline hover:text-white"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
          {linkedInUrl && (
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/95 hover:underline"
            >
              <Linkedin className="h-4 w-4 shrink-0" />
              LinkedIn
            </a>
          )}
          <p className="pt-2 text-white/80">
            {displayProjects} projects delivered
          </p>
          <p className="flex items-center gap-2 text-white/95">
            <span className="h-2 w-2 rounded-full bg-fb-green" />
            Available for new projects
          </p>
        </div>
        <div className="border-t border-white/20 pt-4 text-xs text-white/80">
          <p className="font-medium text-white/95">Fuseau horaire</p>
          <p className="mt-1">{timezone}</p>
          <p className="mt-0.5">WAT (West Africa Time)</p>
        </div>
      </div>

      {/* RIGHT PANEL — 60% Messenger */}
      <div className="flex min-h-0 flex-1 flex-col border-l border-fb-border bg-fb-gray/30 md:w-[60%]">
        {/* Top bar */}
        <div className="flex items-center gap-3 border-b border-fb-border bg-fb-card px-4 py-3">
          <Avatar src={avatar} alt={name} size="md" online className="h-10 w-10" />
          <div className="min-w-0 flex-1">
            <p className="font-dm-sans font-semibold text-fb-text">{name}</p>
            <p className="flex items-center gap-1.5 text-xs text-fb-green">
              <span className="h-1.5 w-1.5 rounded-full bg-fb-green" />
              Active now
            </p>
          </div>
        </div>

        {/* Message area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {INTRO_BUBBLES.map((bubble) => (
            <AnimatePresence key={bubble.id}>
              {visibleBubbles.includes(bubble.id) && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="flex justify-end"
                >
                  <div className="max-w-[85%] rounded-2xl rounded-br-md bg-fb-blue px-4 py-2.5 text-[15px] text-white">
                    {bubble.text}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          ))}
          <AnimatePresence>
            {showTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="rounded-2xl rounded-bl-md bg-fb-card px-4 py-3 shadow-card">
                  <span className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-2 w-2 rounded-full bg-fb-text-secondary"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <div className="max-w-[85%] rounded-2xl rounded-br-md bg-fb-blue px-4 py-2.5 text-[15px] text-white">
                  Got your message! I&apos;ll be in touch soon 🙌
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Form — message composer */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="border-t border-fb-border bg-fb-card p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <Avatar src={null} alt="You" size="sm" className="h-8 w-8 shrink-0" />
                <span className="text-sm font-medium text-fb-text-secondary">You</span>
                <input
                  type="text"
                  placeholder="Your name"
                  value={nameVal}
                  onChange={(e) => {
                    setNameVal(e.target.value);
                    runValidation("name");
                  }}
                  onBlur={() => runValidation("name")}
                  className={`flex-1 rounded-full border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text text-[15px] placeholder:text-fb-text-secondary focus:outline-none focus:ring-2 focus:ring-fb-blue/30 ${
                    errors.name ? "border-red-500" : "border-transparent"
                  }`}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
              </div>
              {errors.name && (
                <p id="name-error" className="mb-1 text-xs text-red-500">{errors.name}</p>
              )}
              <div className="mb-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={emailVal}
                  onChange={(e) => {
                    setEmailVal(e.target.value);
                    runValidation("email");
                  }}
                  onBlur={() => runValidation("email")}
                  className={`w-full rounded-full border border-fb-border bg-fb-input-bg px-4 py-2 text-fb-text text-[15px] placeholder:text-fb-text-secondary focus:outline-none focus:ring-2 focus:ring-fb-blue/30 ${
                    errors.email ? "border-red-500" : "border-transparent"
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              <div className="relative mb-1">
                <textarea
                  placeholder="Write a message..."
                  value={messageVal}
                  onChange={(e) => {
                    setMessageVal(e.target.value);
                    runValidation("message");
                  }}
                  onFocus={() => setMessageFocused(true)}
                  onBlur={() => setMessageFocused(false)}
                  onBlurCapture={() => runValidation("message")}
                  rows={messageFocused || messageVal.length > 35 ? 3 : 1}
                  className={`w-full resize-none rounded-full border border-fb-border bg-fb-input-bg px-4 py-2.5 pr-12 text-[15px] text-fb-text placeholder:text-fb-text-secondary focus:outline-none focus:ring-2 focus:ring-fb-blue/30 transition-[height] ${
                    errors.message ? "border-red-500" : "border-transparent"
                  } ${messageFocused || messageVal.length > 35 ? "rounded-2xl" : ""}`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                <button
                  type="submit"
                  disabled={submitting || cooldownUntil > 0}
                  className="absolute bottom-2 right-2 flex h-9 w-9 items-center justify-center rounded-full bg-fb-blue text-white hover:bg-fb-blue-dark disabled:opacity-70"
                  aria-label="Send"
                >
                  {submitting ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.message && (
                <p id="message-error" className="mb-2 text-xs text-red-500">{errors.message}</p>
              )}
              {cooldownUntil > 0 && (
                <p className="mt-2 text-xs text-fb-text-secondary">
                  Vous pourrez renvoyer un message dans {cooldownUntil} s.
                </p>
              )}
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-fb-text-secondary">
                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-fb-blue"
                >
                  <Paperclip className="h-4 w-4" />
                  Attach brief
                </button>
                <button
                  type="button"
                  className="flex items-center gap-1.5 hover:text-fb-blue"
                >
                  <Calendar className="h-4 w-4" />
                  Schedule call
                </button>
                {cvUrl ? (
                  <a
                    href={cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-fb-blue"
                  >
                    <FileText className="h-4 w-4" />
                    Télécharger le CV
                  </a>
                ) : (
                  <span className="flex items-center gap-1.5 text-fb-text-secondary">
                    <FileText className="h-4 w-4" />
                    CV (à configurer)
                  </span>
                )}
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Code2,
  Rocket,
  Target,
  Sparkles,
  Zap,
  Handshake,
  Ruler,
  Lock,
  Sprout,
  BookOpen,
  Music,
  Plane,
  Coffee,
  Gamepad2,
  Camera,
} from "lucide-react";

const TIMELINE = [
  {
    year: "2018",
    title: "First lines of code",
    description:
      "Started with Python and web basics. Built small scripts and fell in love with turning ideas into something people could use.",
    Icon: Code2,
  },
  {
    year: "2020",
    title: "Full-stack shift",
    description:
      "Moved to JavaScript and Node.js. Shipped first production apps and learned how to work with clients and iterate fast.",
    Icon: Rocket,
  },
  {
    year: "2022",
    title: "Going independent",
    description:
      "Went freelance to focus on product work: SaaS, e-commerce, and clean architecture. Prioritized delivery and long-term maintainability.",
    Icon: Target,
  },
  {
    year: "2024",
    title: "Today",
    description:
      "Building products that make a difference — from dashboards to storefronts. Still learning, still shipping.",
    Icon: Sparkles,
  },
];

const VALUES = [
  {
    Icon: Target,
    title: "Clarity first",
    description: "I align on goals and constraints before writing code. Fewer surprises, better outcomes.",
  },
  {
    Icon: Zap,
    title: "Speed & quality",
    description: "Ship often without cutting corners. Clean code and tests so we can move fast later.",
  },
  {
    Icon: Handshake,
    title: "Partnership",
    description: "You're the expert in your domain. I bring tech and product sense. We decide together.",
  },
  {
    Icon: Ruler,
    title: "Simple by default",
    description: "I choose boring tech when it fits. Fancy when it actually solves the problem.",
  },
  {
    Icon: Lock,
    title: "Transparent process",
    description: "Clear timelines, regular updates, and no black boxes. You always know where we stand.",
  },
  {
    Icon: Sprout,
    title: "Built to last",
    description: "Code that your team can own and evolve. Documentation and structure matter.",
  },
];

const ENJOY_ITEMS = [
  { Icon: BookOpen, label: "Books" },
  { Icon: Music, label: "Music" },
  { Icon: Plane, label: "Travel" },
  { Icon: Coffee, label: "Coffee" },
  { Icon: Gamepad2, label: "Games" },
  { Icon: Camera, label: "Photos" },
];

const viewport = { once: true, amount: 0.2 };

export default function AboutPageContent() {
  return (
    <main className="min-h-screen bg-fb-gray pb-20">
      {/* HERO — split layout */}
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-2 md:items-center md:gap-12 md:px-6 md:py-24">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex justify-center"
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-lg bg-fb-gray shadow-hover"
            style={{
              border: "8px solid #1877F2",
              transform: "rotate(-2deg)",
            }}
          >
            <div className="aspect-[4/5] w-full flex items-center justify-center bg-fb-blue-light text-fb-blue">
              <User className="h-32 w-32 md:h-40 md:w-40" strokeWidth={1.25} />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="font-syne text-3xl font-bold text-fb-text md:text-[44px] md:leading-tight">
            I build products that make a difference
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-fb-text-secondary md:text-xl">
            I’m a full-stack developer who cares as much about the problem we’re
            solving as the code we write. I’ve shipped SaaS, e-commerce, and
            everything in between — always with an eye on clarity, speed, and
            long-term maintainability.
          </p>
        </motion.div>
      </section>

      {/* STORY */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5 }}
          className="space-y-6 text-fb-text-secondary leading-relaxed"
        >
          <p>
            I didn’t start out as a developer. I stumbled into code while trying
            to automate something tedious, and it stuck. What I love most isn’t
            the syntax — it’s turning a messy real-world problem into something
            that works, that people actually use, and that doesn’t fall apart
            in six months.
          </p>
          <p>
            I’ve worked with startups and small teams where every decision
            matters. That taught me to ask “why” before “how,” to ship often, and
            to keep the stack simple until there’s a real reason to complicate
            it. I’m driven by the idea that good software should feel invisible:
            it just works, and the human on the other side can focus on their
            job, not on the tool.
          </p>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 border-l-4 border-fb-blue pl-6 text-center text-2xl italic text-fb-text md:text-[24px]"
        >
          “I’d rather build one thing that lasts than ten that look good on a
          demo and break in production.”
        </motion.blockquote>
      </section>

      {/* JOURNEY TIMELINE */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
        <h2 className="font-syne text-2xl font-bold text-fb-text md:text-3xl">
          Journey
        </h2>
        <div className="relative mt-10 pl-8 md:pl-10">
          {/* Dashed line */}
          <div
            className="absolute left-[11px] top-0 bottom-0 w-0.5 border-l-2 border-dashed border-fb-border md:left-[15px]"
            aria-hidden
          />
          {TIMELINE.map((milestone, i) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="relative mb-12 last:mb-0"
            >
              {/* Blue dot */}
              <span
                className="absolute left-[-26px] top-2 h-3 w-3 rounded-full bg-fb-blue md:left-[-30px]"
                aria-hidden
              />
              <span className="text-sm font-semibold text-fb-blue">
                {milestone.year}
              </span>
              <h3 className="mt-1 font-syne text-lg font-bold text-fb-text">
                {milestone.title}
              </h3>
              <p className="mt-2 text-fb-text-secondary leading-relaxed">
                {milestone.description}
              </p>
              <span className="mt-2 inline-flex text-fb-blue">
                <milestone.Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden />
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* VALUES — How I work */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <h2 className="font-syne text-2xl font-bold text-fb-text md:text-3xl">
          How I work
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="rounded-xl border border-fb-border bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hover"
            >
              <span className="inline-flex text-fb-blue">
                <value.Icon className="h-10 w-10" strokeWidth={1.25} aria-hidden />
              </span>
              <h3 className="mt-3 font-syne text-lg font-bold text-fb-text">
                {value.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fb-text-secondary">
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* WHAT I ENJOY — Instagram-style grid */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-6 md:py-20">
        <h2 className="font-syne text-2xl font-bold text-fb-text md:text-3xl">
          Outside of code
        </h2>
        <p className="mt-2 text-fb-text-secondary">
          Books, music, travel — the things that keep me curious.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
          {ENJOY_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{ duration: 0.3, delay: 0.03 * i }}
              className="flex aspect-square flex-col items-center justify-center rounded-xl border border-fb-border bg-white shadow-card transition-all duration-200 hover:shadow-hover"
            >
              <span className="inline-flex text-fb-blue">
                <item.Icon className="h-12 w-12 md:h-14 md:w-14" strokeWidth={1.25} aria-hidden />
              </span>
              <span className="mt-2 text-sm font-medium text-fb-text">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-2xl px-4 py-16 text-center md:py-20">
        <h2 className="font-syne text-2xl font-bold text-fb-text md:text-3xl">
          Ready to work together?
        </h2>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-lg bg-fb-blue px-6 py-3 font-medium text-white shadow-card transition-all duration-200 hover:bg-fb-blue-dark hover:shadow-hover"
          >
            See my work
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border-2 border-fb-blue bg-white px-6 py-3 font-medium text-fb-blue transition-all duration-200 hover:bg-fb-blue-light"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </main>
  );
}

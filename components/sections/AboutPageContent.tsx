"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import { siteLinks } from "@/lib/site-content";
import {
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
    year: "EIG",
    title: "Formation en développement web",
    description:
      "Diplômé de l'École Internationale de Graphisme (EIG). Bases solides en création d’interfaces et en développement web.",
    Icon: Code2,
  },
  {
    year: "RIXXID",
    title: "Stage développeur (3 mois)",
    description:
      "Développement d’une plateforme de gestion d’école : interface formateur (web) et interface étudiant (mobile). Mise en pratique en conditions réelles.",
    Icon: Rocket,
  },
  {
    year: "Aujourd’hui",
    title: "Développeur web freelance",
    description:
      "Je continue de me former aux nouvelles technologies (React, Next.js, Tailwind, Laravel) et je suis disponible pour vos projets web et applications.",
    Icon: Sparkles,
  },
];

const COMPETENCES = [
  {
    title: "Frontend",
    items: "HTML5, CSS3, JavaScript, React, Bootstrap, Tailwind",
  },
  {
    title: "Backend",
    items: "PHP / Laravel, MySQL, API REST (bases)",
  },
  {
    title: "Mobile",
    items: "Formation prévue (React Native)",
  },
  {
    title: "Outils",
    items: "Git / GitHub",
  },
];

const VALUES = [
  {
    Icon: Target,
    title: "Clarté d’abord",
    description: "J’aligne les objectifs et contraintes avant de coder. Moins de surprises, de meilleurs résultats.",
  },
  {
    Icon: Zap,
    title: "Rapidité et qualité",
    description: "Livrer souvent sans sacrifier la qualité. Code propre pour avancer sereinement.",
  },
  {
    Icon: Handshake,
    title: "Partenariat",
    description: "Vous êtes l’expert de votre domaine. J’apporte la technique. On décide ensemble.",
  },
  {
    Icon: Ruler,
    title: "Simple par défaut",
    description: "J’utilise les bons outils au bon moment, sans complexité inutile.",
  },
  {
    Icon: Lock,
    title: "Transparence",
    description: "Délais clairs, mises à jour régulières. Vous savez toujours où on en est.",
  },
  {
    Icon: Sprout,
    title: "Durable",
    description: "Code que vous ou votre équipe pourrez faire évoluer. Structure et lisibilité comptent.",
  },
];

const ENJOY_ITEMS = [
  { Icon: BookOpen, label: "Livres" },
  { Icon: Music, label: "Musique" },
  { Icon: Plane, label: "Voyage" },
  { Icon: Coffee, label: "Café" },
  { Icon: Gamepad2, label: "Jeux" },
  { Icon: Camera, label: "Photo" },
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
              border: "8px solid var(--fb-blue)",
              transform: "rotate(-2deg)",
            }}
          >
            <div className="aspect-[4/5] relative w-full bg-fb-blue-light">
              <Image
                src={siteLinks.profileImageUrl}
                alt="Donald ADJINDA — Développeur web"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 28rem"
                priority
              />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="font-syne text-3xl font-bold text-fb-text md:text-[44px] md:leading-tight">
            Développeur web passionné par les solutions numériques
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-fb-text-secondary md:text-xl">
            Diplômé de l’École Internationale de Graphisme (EIG), j’ai effectué un stage de 3 mois chez RIXXID où j’ai développé une plateforme de gestion d’école. Je continue de me former aux nouvelles technologies et je transforme vos idées en applications web modernes et performantes.
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
            Passionné par la création d’applications web modernes et performantes, j’aime transformer des idées en solutions numériques concrètes. Mon parcours à l’EIG et mon stage chez RIXXID m’ont donné une base solide en développement web et en travail en équipe.
          </p>
          <p>
            Je m’investis dans des projets variés — sites vitrines, plateformes de gestion, interfaces utilisateur — en privilégiant la clarté du code et l’expérience utilisateur. Je continue d’apprendre (React, Next.js, Tailwind, Laravel, React Native à venir) pour proposer des réalisations à la hauteur de vos besoins.
          </p>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 border-l-4 border-fb-blue pl-6 text-center text-2xl italic text-fb-text md:text-[24px]"
        >
          “Je transforme vos idées en solutions numériques innovantes.”
        </motion.blockquote>
      </section>

      {/* COMPÉTENCES TECHNIQUES */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
        <SectionTitle className="font-syne text-2xl font-bold text-fb-text md:text-3xl">
          Compétences techniques
        </SectionTitle>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {COMPETENCES.map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="rounded-xl border border-fb-border bg-fb-card p-5 shadow-card"
            >
              <h3 className="font-syne text-lg font-bold text-fb-text">{block.title}</h3>
              <p className="mt-2 text-sm text-fb-text-secondary">{block.items}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* JOURNEY TIMELINE */}
      <section className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
        <SectionTitle className="font-syne text-2xl font-bold text-fb-text md:text-3xl">
          Parcours
        </SectionTitle>
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
        <SectionTitle className="font-syne text-2xl font-bold text-fb-text md:text-3xl">
          Comment je travaille
        </SectionTitle>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="rounded-xl border border-fb-border bg-fb-card p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-hover"
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
        <SectionTitle className="font-syne text-2xl font-bold text-fb-text md:text-3xl">
          En dehors du code
        </SectionTitle>
        <p className="mt-2 text-fb-text-secondary">
          Livres, musique, voyage — ce qui me garde curieux.
        </p>
        <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
          {ENJOY_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={viewport}
              transition={{ duration: 0.3, delay: 0.03 * i }}
              className="flex aspect-square flex-col items-center justify-center rounded-xl border border-fb-border bg-fb-card shadow-card transition-all duration-200 hover:shadow-hover"
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
        <SectionTitle className="font-syne text-2xl font-bold text-fb-text md:text-3xl">
          Prêt à collaborer ?
        </SectionTitle>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center rounded-lg bg-fb-blue px-6 py-3 font-medium text-white shadow-card transition-all duration-200 hover:bg-fb-blue-dark hover:shadow-hover"
          >
            Voir mes projets
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg border-2 border-fb-blue bg-fb-card px-6 py-3 font-medium text-fb-blue transition-all duration-200 hover:bg-fb-blue-light"
          >
            Me contacter
          </Link>
        </div>
      </section>
    </main>
  );
}

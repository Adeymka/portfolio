import type { Metadata } from "next";
import AboutPageContent from "@/components/sections/AboutPageContent";
import MobilePageShell from "@/components/mobile/MobilePageShell";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Présentation de Donald ADJINDA : parcours EIG, stage RIXXID, compétences (Frontend, Backend, Laravel, React). Développeur web freelance.",
  openGraph: {
    title: "À propos | Donald ADJINDA",
    description: "Parcours, compétences techniques et valeurs. Développeur web disponible pour vos projets.",
  },
};

export default function AboutPage() {
  return (
    <>
      <div className="hidden lg:block">
        <AboutPageContent />
      </div>
      <div className="lg:hidden">
        <MobilePageShell>
          <AboutPageContent />
        </MobilePageShell>
      </div>
    </>
  );
}

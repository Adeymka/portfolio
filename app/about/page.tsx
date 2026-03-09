import type { Metadata } from "next";
import AboutPageContent from "@/components/sections/AboutPageContent";
import MobilePageShell from "@/components/mobile/MobilePageShell";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Présentation de Donald ADJINDA : parcours développeur, méthodologie, valeurs (clarté, qualité, partenariat). Full Stack, freelance.",
  openGraph: {
    title: "À propos | Donald ADJINDA",
    description: "Parcours, compétences et valeurs. Développeur Full Stack disponible pour vos projets.",
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

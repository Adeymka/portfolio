import type { Metadata } from "next";
import dynamic from "next/dynamic";
import MobileContactPage from "@/components/mobile/MobileContactPage";
import ContactLoading from "./loading";
import { siteLinks } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Donald ADJINDA pour votre projet web. Formulaire de contact, réponse sous 24h. Full Stack, React, Next.js.",
  openGraph: {
    title: "Contact | Donald ADJINDA",
    description: "Envoyez un message. Réponse garantie sous 24h.",
  },
};

const ContactPageContent = dynamic(
  () => import("@/components/sections/ContactPageContent"),
  {
    loading: () => <ContactLoading />,
    ssr: false,
  }
);

export default function ContactPage() {
  return (
    <>
      <div className="hidden lg:block">
        <main className="min-h-[calc(100vh-56px)] h-[calc(100vh-56px)]">
          <ContactPageContent
          email={siteLinks.email}
          linkedInUrl={siteLinks.linkedInUrl}
          cvUrl={siteLinks.cvUrl}
        />
        </main>
      </div>
      <div className="lg:hidden">
        <MobileContactPage />
      </div>
    </>
  );
}

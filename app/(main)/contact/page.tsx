import type { Metadata } from "next";
import dynamic from "next/dynamic";
import MobileContactPage from "@/components/mobile/MobileContactPage";
import ContactLoading from "./loading";
import { siteLinks } from "@/lib/site-content";
import { createStaticClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Donald ADJINDA pour votre projet web. Formulaire de contact, réponse sous 24h. Développeur web, React, Next.js, Laravel.",
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

export default async function ContactPage() {
  const supabase = createStaticClient();
  const [projectsResult] = await Promise.all([
    supabase
      .from("projects")
      .select("id")
      .eq("published", true),
  ]);
  const projectsCount = projectsResult.data?.length ?? 24;

  return (
    <>
      <div className="hidden lg:block">
        <main className="min-h-[calc(100vh-56px)] h-[calc(100vh-56px)]">
          <ContactPageContent
            email={siteLinks.email}
            phone={siteLinks.phone}
            phoneTel={siteLinks.phoneE164}
            whatsappUrl={siteLinks.whatsappUrl}
            linkedInUrl={siteLinks.linkedInUrl}
            cvUrl={siteLinks.cvUrl}
            avatar={siteLinks.profileImageUrl}
            projectsCount={projectsCount}
            timezone={`${siteLinks.location} (WAT)`}
          />
        </main>
      </div>
      <div className="lg:hidden">
        <MobileContactPage />
      </div>
    </>
  );
}

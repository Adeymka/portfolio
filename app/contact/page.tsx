import dynamic from "next/dynamic";
import ContactLoading from "./loading";

const ContactPageContent = dynamic(
  () => import("@/components/sections/ContactPageContent"),
  {
    loading: () => <ContactLoading />,
    ssr: false,
  }
);

export default function ContactPage() {
  return (
    <main className="min-h-[calc(100vh-56px)] h-[calc(100vh-56px)]">
      <ContactPageContent />
    </main>
  );
}

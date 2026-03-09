import CertificationsManager from "@/components/admin/CertificationsManager";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Certifications | Admin",
  description: "Gestion des certifications",
};

export default async function AdminCertificationsPage() {
  const supabase = await createClient();
  let certs: {
    id: string;
    title: string;
    issuer: string | null;
    url: string | null;
    image_url: string | null;
    display_order: number;
    is_active: boolean;
  }[] = [];
  try {
    const { data } = await supabase
      .from("certifications")
      .select("*")
      .order("display_order", { ascending: true })
      .order("title", { ascending: true });
    certs = (data ?? []) as typeof certs;
  } catch {
    certs = [];
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-syne text-2xl font-bold text-fb-text">
          Certifications
        </h1>
        <p className="text-sm text-fb-text-secondary">
          Ces certifications s’affichent dans le bloc « Certifications » de la
          sidebar droite sur l’accueil.
        </p>
      </div>
      <CertificationsManager initialCertifications={certs} />
    </div>
  );
}

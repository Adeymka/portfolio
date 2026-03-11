import SettingsContent from "@/components/admin/SettingsContent";
import { getSiteStats } from "@/lib/supabase/queries";

export const metadata = {
  title: "Paramètres | Admin",
  description: "Statistiques profil (années d’expérience)",
};

export default async function AdminSettingsPage() {
  const stats = await getSiteStats();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-syne text-2xl font-bold text-fb-text">
          Paramètres
        </h1>
        <p className="text-sm text-fb-text-secondary">
          Admin / Statistiques affichées sur le profil
        </p>
      </div>
      <SettingsContent
        initialYearsExperience={stats.yearsExperience}
      />
    </div>
  );
}

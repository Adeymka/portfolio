import DashboardContent from "@/components/admin/DashboardContent";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Dashboard | Admin",
  description: "Vue d'ensemble de l'administration",
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  let totalProjects = 0;
  let publishedProjects = 0;
  let unreadMessages = 0;
  let activeSkills = 0;
  let recentMessages: { id: string; name: string; subject: string | null; created_at: string; is_read: boolean }[] = [];
  let recentProjects: { id: string; title: string; category: string | null; published: boolean }[] = [];

  try {
    const [proj, pub, unread, skills] = await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("projects").select("*", { count: "exact", head: true }).eq("published", true),
      supabase.from("messages").select("*", { count: "exact", head: true }).eq("is_read", false),
      supabase.from("skills").select("*", { count: "exact", head: true }).eq("is_active", true),
    ]);
    totalProjects = proj.count ?? 0;
    publishedProjects = pub.count ?? 0;
    unreadMessages = unread.count ?? 0;
    activeSkills = skills.count ?? 0;

    const [msgRes, projRes] = await Promise.all([
      supabase.from("messages").select("id, name, subject, created_at, is_read").order("created_at", { ascending: false }).limit(5),
      supabase.from("projects").select("id, title, category, published").order("created_at", { ascending: false }).limit(4),
    ]);
    recentMessages = msgRes.data ?? [];
    recentProjects = projRes.data ?? [];
  } catch {
    // tables may not exist yet
  }

  return (
    <DashboardContent
      stats={{
        totalProjects,
        publishedProjects,
        unreadMessages,
        activeSkills,
      }}
      recentMessages={recentMessages}
      recentProjects={recentProjects}
    />
  );
}

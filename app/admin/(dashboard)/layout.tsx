import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AdminLayout from "@/components/admin/AdminLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    redirect("/admin/login");
  }

  let unreadCount = 0;
  try {
    const { count } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);
    unreadCount = count ?? 0;
  } catch {
    // table may not exist yet
  }

  return (
    <AdminLayout unreadCount={unreadCount}>{children}</AdminLayout>
  );
}

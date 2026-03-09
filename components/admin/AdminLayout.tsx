"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FolderOpen, Zap, Mail, FileText, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projets", icon: FolderOpen },
  { href: "/admin/skills", label: "Skills", icon: Zap },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/documents", label: "Documents", icon: FileText },
] as const;

export default function AdminLayout({
  children,
  unreadCount = 0,
}: {
  children: React.ReactNode;
  unreadCount?: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserEmail(user?.email ?? null);
    });
  }, [supabase.auth]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex min-h-screen">
      <aside
        className="fixed left-0 top-0 z-40 flex h-full w-[240px] flex-col border-r border-white/10"
        style={{ backgroundColor: "#0F172A" }}
      >
        <div className="flex h-14 items-center gap-2 border-b border-white/10 px-4">
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fb-blue text-white font-syne font-bold text-lg"
            aria-hidden
          >
            A
          </span>
          <span className="font-syne text-lg font-bold text-white">Admin</span>
        </div>
        <nav className="flex-1 space-y-0.5 p-3">
          {NAV.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-fb-blue/20 text-fb-blue"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden />
                {item.label}
                {item.href === "/admin/messages" && unreadCount > 0 && (
                  <span className="ml-auto rounded-full bg-fb-blue px-2 py-0.5 text-xs font-medium text-white">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-3">
          {userEmail && (
            <p className="truncate px-3 py-1 text-xs text-slate-400">
              {userEmail}
            </p>
          )}
          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
          >
            <LogOut className="h-5 w-5 shrink-0" aria-hidden />
            Se déconnecter
          </button>
        </div>
      </aside>
      <main className="ml-[240px] min-h-screen flex-1 bg-fb-gray">
        {children}
      </main>
    </div>
  );
}

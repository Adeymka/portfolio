"use client";

import Link from "next/link";
import { Search, Bell } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

export interface MobileNavbarProps {
  siteName?: string;
  profileAvatar?: string | null;
  notificationCount?: number;
}

export default function MobileNavbar({
  siteName = "Portfolio",
  profileAvatar = null,
}: MobileNavbarProps) {
  return (
    <header
      className="sticky top-0 z-50 grid h-12 grid-cols-[auto_1fr_auto] items-center gap-2 border-b border-fb-border bg-fb-card px-3 lg:hidden"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <Link
        href="/"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-fb-blue font-syne text-sm font-bold text-white"
        aria-label={siteName}
      >
        {siteName.charAt(0)}
      </Link>
      <form action="/projects" method="get" className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-fb-input-bg px-3 py-1.5" role="search">
        <Search className="h-4 w-4 shrink-0 text-fb-text-secondary" aria-hidden />
        <input
          type="search"
          name="q"
          placeholder="Rechercher..."
          className="min-w-0 flex-1 border-0 bg-transparent text-sm text-fb-text placeholder:text-fb-text-secondary focus:outline-none"
          style={{ fontSize: "16px" }}
          aria-label="Rechercher"
        />
      </form>
      <div className="flex shrink-0 items-center gap-1">
        <Link
          href="/contact"
          className="relative flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-fb-text"
          aria-label="Contact"
        >
          <Bell className="h-6 w-6" aria-hidden />
        </Link>
        <Link
          href="/"
          className="flex h-8 w-8 items-center justify-center rounded-full"
          aria-label="Profil"
        >
          <Avatar src={profileAvatar} alt="Profil" size="sm" className="h-8 w-8" />
        </Link>
      </div>
    </header>
  );
}

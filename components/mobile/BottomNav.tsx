"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, FolderKanban, User, Mail, MoreHorizontal } from "lucide-react";

export interface BottomNavProps {
  onMoreClick: () => void;
}

const NAV_ITEMS = [
  { id: "home", href: "/", Icon: Home },
  { id: "projects", href: "/projects", Icon: FolderKanban },
  { id: "about", href: "/about", Icon: User },
  { id: "contact", href: "/contact", Icon: Mail },
] as const;

export default function BottomNav({ onMoreClick }: BottomNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-fb-border bg-fb-card lg:hidden"
      style={{
        height: "calc(56px + env(safe-area-inset-bottom))",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
      aria-label="Navigation principale"
    >
      {NAV_ITEMS.map(({ id, href, Icon }) => {
        const isActive =
          (id === "home" && pathname === "/") ||
          (id !== "home" && pathname.startsWith(href));
        return (
          <Link
            key={id}
            href={href}
            className="flex min-h-[48px] min-w-[48px] flex-1 flex-col items-center justify-center gap-0.5 text-fb-text-secondary transition-colors hover:text-fb-text"
            style={isActive ? { color: "var(--fb-blue)" } : undefined}
            aria-current={isActive ? "page" : undefined}
          >
            <Icon className="h-6 w-6 shrink-0" aria-hidden />
            {isActive && (
              <span
                className="h-0.5 w-3 rounded-full bg-fb-blue"
                aria-hidden
              />
            )}
          </Link>
        );
      })}
      <button
        type="button"
        onClick={onMoreClick}
        className="flex min-h-[48px] min-w-[48px] flex-1 flex-col items-center justify-center text-fb-text-secondary transition-colors hover:text-fb-text"
        aria-label="Plus"
      >
        <MoreHorizontal className="h-6 w-6 shrink-0" aria-hidden />
      </button>
    </nav>
  );
}

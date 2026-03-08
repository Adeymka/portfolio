"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Search, Bell, MessageCircle, Menu, Sun, Moon } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

const THEME_KEY = "theme";

function getTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  const stored = document.documentElement.getAttribute("data-theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const NAV_TABS = [
  { id: "home", label: "Home", href: "/" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;

const DROPDOWN_ITEMS = [
  { id: "visitor", label: "View as visitor", href: "#" },
  { id: "edit", label: "Edit portfolio", href: "#" },
  { id: "cv", label: "Download CV", href: "#" },
  { id: "dark", label: "Dark mode", action: "toggle-dark" },
] as const;

export interface NavbarProps {
  siteName?: string;
  profileAvatar?: string | null;
  notificationCount?: number;
  messageCount?: number;
}

export default function Navbar({
  siteName = "Portfolio",
  profileAvatar = null,
  notificationCount = 3,
  messageCount = 1,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleThemeToggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (_) {}
    setTheme(next);
    setDropdownOpen(false);
  };

  return (
    <>
      <style jsx>{`
        .nav-scrolled {
          box-shadow: var(--shadow-card);
        }
      `}</style>
      <header
        className={`sticky top-0 z-50 grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-4 border-b border-fb-border bg-fb-card px-4 transition-all duration-300 md:px-6 ${
          scrolled ? "nav-scrolled backdrop-blur-md bg-fb-card/95" : ""
        }`}
        style={{ height: "56px" }}
      >
        {/* LEFT */}
        <div className="flex min-w-0 items-center gap-2 md:gap-3">
          {/* Logo: circular icon + name */}
          <a
            href="/"
            className="flex shrink-0 items-center gap-2 no-underline transition-opacity duration-200 hover:opacity-90"
          >
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fb-blue text-white font-syne font-bold text-lg"
              aria-hidden
            >
              {siteName.charAt(0)}
            </span>
            <span className="hidden font-syne text-xl font-bold text-fb-blue sm:inline">
              {siteName}
            </span>
          </a>

          {/* Search pill — 200px default, 280px on focus */}
          <div
            className={`ml-2 flex items-center gap-2 rounded-full bg-fb-input-bg px-4 py-2 transition-all duration-300 ${
              searchFocused ? "w-[280px] ring-2 ring-fb-blue ring-offset-1" : "w-[200px]"
            } min-w-0 shrink-0`}
          >
            <Search className="h-5 w-5 shrink-0 text-fb-text-secondary" aria-hidden />
            <input
              type="search"
              placeholder="Search projects..."
              className="w-full min-w-0 border-0 bg-transparent text-fb-text placeholder:text-fb-text-secondary focus:outline-none"
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              aria-label="Search projects"
            />
          </div>
        </div>

        {/* CENTER — desktop only, tabs centered */}
        <nav className="hidden items-center justify-center md:flex" aria-label="Main">
          <div className="flex items-center">
            {NAV_TABS.map((tab) => (
              <a
                key={tab.id}
                href={tab.href}
                className="flex h-14 min-w-[60px] items-center justify-center rounded-lg px-4 text-fb-text transition-all duration-200 hover:bg-fb-hover active:scale-[0.97] data-[active]:border-b-2 data-[active]:border-fb-blue data-[active]:text-fb-blue data-[active]:font-medium"
                data-active={tab.id === "home" ? "true" : undefined}
                style={{ minWidth: "60px" }}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </nav>

        {/* RIGHT */}
        <div className="flex shrink-0 items-center gap-1 justify-self-end">
          {/* Notification bell with badge */}
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-fb-text transition-transform duration-200 hover:bg-fb-hover active:scale-95"
            aria-label={`${notificationCount} notifications`}
          >
            <Bell className="h-6 w-6" aria-hidden />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-fb-blue px-1 text-[10px] font-medium text-white"
            >
              {notificationCount}
            </motion.span>
          </button>

          {/* Message icon with badge */}
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-fb-text transition-transform duration-200 hover:bg-fb-hover active:scale-95"
            aria-label={`${messageCount} messages`}
          >
            <MessageCircle className="h-6 w-6" aria-hidden />
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 25 }}
              className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-fb-blue px-1 text-[10px] font-medium text-white"
            >
              {messageCount}
            </motion.span>
          </button>

          {/* Profile avatar + dropdown */}
          <div className="relative ml-1" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen((o) => !o)}
              className="flex rounded-full ring-0 transition-all duration-200 hover:ring-2 hover:ring-fb-blue/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-fb-blue"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              aria-label="Profile menu"
            >
              <Avatar
                src={profileAvatar}
                alt="Profile"
                size="sm"
                className="h-9 w-9"
              />
            </button>

            {dropdownOpen && (
              <div
                className="absolute right-0 top-full z-50 mt-2 min-w-[220px] origin-top-right rounded-xl border border-fb-border bg-fb-card py-1 shadow-modal transition-all duration-200"
                style={{
                  animation: "dropdownIn 0.2s ease-out forwards",
                  transformOrigin: "top right",
                }}
                role="menu"
              >
                {DROPDOWN_ITEMS.map((item) =>
                  "action" in item && item.action ? (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => (item.id === "dark" ? handleThemeToggle() : setDropdownOpen(false))}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-fb-text transition-colors duration-200 hover:bg-fb-hover"
                      role="menuitem"
                      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                    >
                      <>
                        {theme === "dark" ? (
                          <Sun className="h-5 w-5 shrink-0 text-fb-text-secondary" aria-hidden />
                        ) : (
                          <Moon className="h-5 w-5 shrink-0 text-fb-text-secondary" aria-hidden />
                        )}
                        <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
                        <span className="ml-auto text-xs text-fb-text-secondary">
                          {theme === "dark" ? "On" : "Off"}
                        </span>
                      </>
                    </button>
                  ) : "href" in item ? (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-fb-text no-underline transition-colors duration-200 hover:bg-fb-hover"
                      role="menuitem"
                    >
                      {item.label}
                    </a>
                  ) : null
                )}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-full text-fb-text transition-all duration-200 hover:bg-fb-hover md:hidden"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-expanded={mobileMenuOpen}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" aria-hidden />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
            aria-hidden
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className="fixed left-0 right-0 top-14 z-40 flex flex-col gap-1 border-b border-fb-border bg-fb-card p-2 md:hidden"
            role="dialog"
            aria-label="Mobile menu"
          >
            {NAV_TABS.map((tab) => (
              <a
                key={tab.id}
                href={tab.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-fb-text transition-colors hover:bg-fb-hover"
              >
                {tab.label}
              </a>
            ))}
          </div>
        </>
      )}

      {/* Dropdown keyframe + scrolled shadow */}
      <style jsx global>{`
        @keyframes dropdownIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </>
  );
}

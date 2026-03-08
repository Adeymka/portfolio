"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Bell, MessageCircle, Menu } from "lucide-react";
import Avatar from "@/components/ui/Avatar";

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
  const [darkMode, setDarkMode] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDropdownAction = (id: string) => {
    if (id === "toggle-dark") {
      setDarkMode((prev) => !prev);
    }
    setDropdownOpen(false);
  };

  return (
    <>
      <style jsx>{`
        .nav-scrolled {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .dark .nav-scrolled {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
      <header
        className={`sticky top-0 z-50 grid h-14 grid-cols-[1fr_auto_1fr] items-center gap-4 border-b px-4 transition-all duration-300 md:px-6 ${
          scrolled
            ? "nav-scrolled bg-white/80 dark:bg-[#242526]/95 backdrop-blur-md dark:backdrop-blur-md border-fb-border dark:border-[#3A3B3C]"
            : "bg-white dark:bg-[#242526] border-fb-border dark:border-[#3A3B3C]"
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
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-fb-blue text-white font-syne font-bold text-lg dark:bg-fb-blue"
              aria-hidden
            >
              {siteName.charAt(0)}
            </span>
            <span className="hidden font-syne text-xl font-bold text-fb-blue dark:text-fb-blue sm:inline">
              {siteName}
            </span>
          </a>

          {/* Search pill — 200px default, 280px on focus */}
          <div
            className={`ml-2 flex items-center gap-2 rounded-full bg-fb-gray px-4 py-2 transition-all duration-300 dark:bg-[#3A3B3C] ${
              searchFocused ? "w-[280px] ring-2 ring-fb-blue ring-offset-1" : "w-[200px]"
            } min-w-0 shrink-0`}
          >
            <Search
              className="h-5 w-5 shrink-0 text-fb-text-secondary dark:text-[#b0b3b8]"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search projects..."
              className="w-full min-w-0 border-0 bg-transparent text-fb-text placeholder:text-fb-text-secondary focus:outline-none dark:bg-transparent dark:text-white dark:placeholder:text-[#b0b3b8]"
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
                className="flex h-14 min-w-[60px] items-center justify-center rounded-lg px-4 text-fb-text transition-all duration-200 hover:bg-[#F2F2F2] dark:text-white dark:hover:bg-[#3A3B3C] data-[active]:border-b-2 data-[active]:border-fb-blue data-[active]:text-fb-blue data-[active]:font-medium dark:data-[active]:text-fb-blue"
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
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-fb-text transition-all duration-200 hover:bg-[#F2F2F2] dark:text-white dark:hover:bg-[#3A3B3C] animate-shake"
            aria-label={`${notificationCount} notifications`}
          >
            <Bell className="h-6 w-6" aria-hidden />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-fb-blue px-1 text-[10px] font-medium text-white">
              {notificationCount}
            </span>
          </button>

          {/* Message icon with badge */}
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-fb-text transition-all duration-200 hover:bg-[#F2F2F2] dark:text-white dark:hover:bg-[#3A3B3C]"
            aria-label={`${messageCount} messages`}
          >
            <MessageCircle className="h-6 w-6" aria-hidden />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-fb-blue px-1 text-[10px] font-medium text-white">
              {messageCount}
            </span>
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
                className="absolute right-0 top-full z-50 mt-2 min-w-[220px] origin-top-right rounded-xl border border-fb-border bg-white py-1 shadow-modal transition-all duration-200 dark:border-[#3A3B3C] dark:bg-[#242526]"
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
                      onClick={() => handleDropdownAction(item.action)}
                      className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-fb-text transition-colors duration-200 hover:bg-fb-gray dark:text-white dark:hover:bg-[#3A3B3C]"
                      role="menuitem"
                    >
                      {item.label}
                      {item.id === "dark" && (
                        <span className="ml-auto text-xs text-fb-text-secondary dark:text-[#b0b3b8]">
                          {darkMode ? "On" : "Off"}
                        </span>
                      )}
                    </button>
                  ) : "href" in item ? (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-2.5 text-sm text-fb-text no-underline transition-colors duration-200 hover:bg-fb-gray dark:text-white dark:hover:bg-[#3A3B3C]"
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
            className="ml-2 flex h-9 w-9 items-center justify-center rounded-full text-fb-text transition-all duration-200 hover:bg-[#F2F2F2] md:hidden dark:text-white dark:hover:bg-[#3A3B3C]"
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
            className="fixed left-0 right-0 top-14 z-40 flex flex-col gap-1 border-b border-fb-border bg-white p-2 dark:border-[#3A3B3C] dark:bg-[#242526] md:hidden"
            role="dialog"
            aria-label="Mobile menu"
          >
            {NAV_TABS.map((tab) => (
              <a
                key={tab.id}
                href={tab.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-4 py-3 text-fb-text transition-colors dark:text-white"
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

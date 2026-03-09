"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import PageTransition from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";
import { siteLinks } from "@/lib/site-content";

function ConditionalShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {pathname !== "/" && (
        <div className="hidden lg:block">
          <Navbar profileAvatar={siteLinks.profileImageUrl} />
        </div>
      )}
      <PageTransition>{children}</PageTransition>
      <CustomCursor />
    </>
  );
}

export default function ConditionalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return <ConditionalShellInner>{children}</ConditionalShellInner>;
}

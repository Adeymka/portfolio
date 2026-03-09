"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import PageTransition from "@/components/PageTransition";
import CustomCursor from "@/components/CustomCursor";

export default function ConditionalShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      {pathname !== "/" && (
        <div className="hidden lg:block">
          <Navbar />
        </div>
      )}
      <PageTransition>{children}</PageTransition>
      <CustomCursor />
    </>
  );
}

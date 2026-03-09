"use client";

import ConditionalShell from "@/components/layout/ConditionalShell";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ConditionalShell>{children}</ConditionalShell>;
}

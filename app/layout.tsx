import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import ConditionalShell from "@/components/layout/ConditionalShell";
import { THEME_SCRIPT } from "./theme-script";
import { getSameAsUrls } from "@/lib/site-content";
import "./globals.css";

const syne = Syne({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  weight: ["300", "400", "500"],
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

function getBaseUrl(): string {
  const u = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.VERCEL_URL;
  if (!u) return "https://localhost:3000";
  return u.startsWith("http") ? u : `https://${u}`;
}
const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Donald ADJINDA — Développeur Full Stack",
    template: "%s | Donald ADJINDA",
  },
  description:
    "Portfolio de Donald ADJINDA, développeur Full Stack. Projets React, Next.js, Node.js. Contact et réalisations.",
  openGraph: {
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Donald ADJINDA — Développeur Full Stack",
    description:
      "Portfolio Full Stack. Projets React, Next.js, Node.js. Contact et réalisations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Donald ADJINDA",
              jobTitle: "Développeur Full Stack",
              url: baseUrl,
              description:
                "Portfolio Full Stack. Projets React, Next.js, Node.js. Disponible pour missions freelance et CDI.",
              sameAs: getSameAsUrls(),
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-fb-gray font-dm-sans text-fb-text antialiased" suppressHydrationWarning>
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}

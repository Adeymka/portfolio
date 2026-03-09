import type { Project } from "./data";

export interface CaseStudyChallenge {
  title: string;
  body: string;
  beforeImage?: string | null;
  afterImage?: string | null;
}

export interface CaseStudySolution {
  body: string;
  architectureImage?: string | null;
  decisions: { title: string; body: string }[];
  highlights: { title: string; body: string }[];
}

export interface TechStackItem {
  name: string;
  category: "frontend" | "backend" | "infra";
  usage: string;
  icon?: string | null;
}

export interface ResultStat {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  avatar?: string | null;
}

export interface CaseStudy extends Project {
  slug: string;
  longDescription?: string | null;
  specs?: string | null;
  role?: string;
  duration?: string;
  year?: string;
  status?: "Live" | "In Progress";
  challenge?: CaseStudyChallenge | null;
  solution?: CaseStudySolution | null;
  techStack?: TechStackItem[];
  results?: ResultStat[];
  testimonial?: Testimonial | null;
  screenshots?: string[];
  relatedSlugs?: string[];
}

const CATEGORY_COLORS: Record<string, string> = {
  SaaS: "#1877F2",
  "E-commerce": "#42B883",
  Mobile: "#E8A020",
  Vitrine: "#E91E8C",
  "API/Backend": "#6366F1",
  default: "#65676B",
};

export function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] ?? CATEGORY_COLORS.default;
}

/** In-memory store; replace with DB or CMS in production */
const CASE_STUDIES: CaseStudy[] = [
  {
    id: "1",
    slug: "e-shop-dashboard",
    title: "E-shop Dashboard",
    description:
      "Full-stack e-commerce dashboard with real-time analytics, order management, and inventory tracking.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    image: null,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "E-commerce",
    reactions: { likes: 12, loves: 8, wows: 4 },
    comments: [],
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    role: "Lead Developer",
    duration: "4 months",
    year: "2024",
    status: "Live",
    challenge: {
      title: "Scale order management without losing speed",
      body: "The client was managing thousands of orders per day across multiple channels. Their legacy system was slow, prone to errors, and didn't support real-time inventory. We needed to design a solution that could handle peak traffic during sales events while giving merchants a single source of truth.",
      beforeImage: null,
      afterImage: null,
    },
    solution: {
      body: "We built a modern dashboard on Next.js with a real-time sync layer. Key was moving critical reads to a cached layer and keeping writes consistent via event-driven updates.",
      decisions: [
        { title: "Next.js App Router", body: "Chose App Router for streaming and server components to reduce client payload and improve TTI." },
        { title: "PostgreSQL + read replicas", body: "Single primary for writes, two replicas for dashboard reads to handle concurrent merchants." },
      ],
      highlights: [
        { title: "Real-time inventory", body: "WebSocket updates so stock levels and order status stay in sync across tabs and devices." },
        { title: "Bulk actions", body: "Background jobs for bulk status updates and exports without blocking the UI." },
        { title: "Role-based access", body: "Fine-grained permissions so support and managers see only what they need." },
      ],
    },
    techStack: [
      { name: "Next.js", category: "frontend", usage: "App Router, server components, API routes" },
      { name: "TypeScript", category: "frontend", usage: "Full type safety across app and API" },
      { name: "PostgreSQL", category: "backend", usage: "Orders, products, inventory" },
      { name: "Tailwind", category: "frontend", usage: "Dashboard UI and design system" },
    ],
    results: [
      { label: "Load time", value: "47", prefix: "↑ ", suffix: "% faster" },
      { label: "Conversion", value: "3", prefix: "↑ ", suffix: "x rate" },
      { label: "Uptime", value: "100", suffix: "%" },
    ],
    testimonial: {
      quote: "The new dashboard cut our support tickets in half. We finally have one place to see everything.",
      author: "Marie L.",
      role: "Operations Lead",
    },
    screenshots: [],
    relatedSlugs: ["saas-admin-panel", "e-commerce-storefront"],
  },
  {
    id: "2",
    slug: "saas-admin-panel",
    title: "SaaS Admin Panel",
    description: "Multi-tenant SaaS admin with role-based access, billing integration, and team management.",
    stack: ["React", "Node.js", "Stripe", "MongoDB"],
    image: null,
    liveUrl: null,
    githubUrl: "https://github.com",
    category: "SaaS",
    reactions: { likes: 20, loves: 5, wows: 2 },
    comments: [],
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    role: "Full Stack Developer",
    duration: "6 months",
    year: "2024",
    status: "In Progress",
    challenge: {
      title: "Multi-tenant isolation and scalable billing",
      body: "The product needed to support hundreds of teams with strict data isolation. Billing had to reflect usage per tenant and integrate with Stripe without blocking the main flow.",
    },
    solution: {
      body: "We implemented tenant-scoped data access at the API layer and used Stripe Customer Portal plus webhooks for billing. Admin UI is React with a shared component library.",
      decisions: [
        { title: "Tenant per database schema", body: "Each tenant gets a schema for audit and backup isolation while sharing the same app instance." },
      ],
      highlights: [
        { title: "SSO & RBAC", body: "SAML/OIDC and custom roles so enterprises can plug in their IdP." },
        { title: "Usage metering", body: "Events sent to Stripe for usage-based billing and overage handling." },
      ],
    },
    techStack: [
      { name: "React", category: "frontend", usage: "Admin UI and shared components" },
      { name: "Node.js", category: "backend", usage: "API and background jobs" },
      { name: "Stripe", category: "backend", usage: "Subscriptions and metering" },
      { name: "MongoDB", category: "backend", usage: "Tenant and audit data" },
    ],
    results: [
      { label: "Tenants onboarded", value: "50", suffix: "+" },
      { label: "API latency p99", value: "<200", suffix: "ms" },
    ],
    relatedSlugs: ["e-shop-dashboard", "subscription-billing"],
  },
  {
    id: "3",
    slug: "mobile-first-landing",
    title: "Mobile First Landing",
    description: "Vitrine site with animations and dark mode. Optimized for Core Web Vitals.",
    stack: ["Next.js", "Framer Motion", "CSS Variables"],
    image: null,
    liveUrl: "https://example.com",
    githubUrl: null,
    category: "Vitrine",
    reactions: { likes: 6, loves: 3, wows: 1 },
    comments: [],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    role: "Frontend Developer",
    duration: "2 months",
    year: "2024",
    status: "Live",
    challenge: {
      title: "Stand out without hurting performance",
      body: "The client wanted a striking, animated landing page that still scored well on Core Web Vitals and worked on all devices.",
    },
    solution: {
      body: "We used Framer Motion for key animations with reduced motion support, and CSS variables for theming. Critical CSS inlined, rest loaded async.",
      decisions: [],
      highlights: [
        { title: "LCP < 2s", body: "Image optimization and priority loading for above-the-fold content." },
        { title: "Dark mode", body: "System preference + manual toggle with no flash." },
      ],
    },
    techStack: [
      { name: "Next.js", category: "frontend", usage: "SSR and static generation" },
      { name: "Framer Motion", category: "frontend", usage: "Scroll and hover animations" },
      { name: "CSS Variables", category: "frontend", usage: "Theming and dark mode" },
    ],
    results: [
      { label: "LCP", value: "1.2", suffix: "s" },
      { label: "Lighthouse", value: "98", suffix: "/100" },
    ],
    relatedSlugs: ["portfolio-vitrine", "e-shop-dashboard"],
  },
  {
    id: "6",
    slug: "portfolio-vitrine",
    title: "Portfolio Vitrine",
    description: "Minimal portfolio with CMS and contact form.",
    stack: ["Next.js", "MDX", "Tailwind"],
    image: null,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Vitrine",
    reactions: { likes: 10, loves: 2, wows: 1 },
    comments: [],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    role: "Solo Developer",
    duration: "1 month",
    year: "2024",
    status: "Live",
    challenge: { title: "Simple but memorable", body: "A fast, editable portfolio that the client could update via MDX without touching code." },
    solution: { body: "Next.js + MDX for content, Tailwind for layout. Contact form with server action and rate limiting.", decisions: [], highlights: [] },
    techStack: [
      { name: "Next.js", category: "frontend", usage: "App Router and MDX" },
      { name: "MDX", category: "frontend", usage: "Blog and project content" },
      { name: "Tailwind", category: "frontend", usage: "Styling" },
    ],
    results: [{ label: "Build size", value: "<100", suffix: "KB" }],
    relatedSlugs: ["mobile-first-landing", "e-commerce-storefront"],
  },
  {
    id: "7",
    slug: "subscription-billing",
    title: "Subscription Billing",
    description: "Stripe-based subscription management with usage metering and invoices.",
    stack: ["Next.js", "Stripe", "Prisma"],
    image: null,
    liveUrl: null,
    githubUrl: "https://github.com",
    category: "SaaS",
    reactions: { likes: 18, loves: 7, wows: 4 },
    comments: [],
    createdAt: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000),
    role: "Backend Lead",
    duration: "3 months",
    year: "2024",
    status: "Live",
    challenge: { title: "Flexible billing for B2B", body: "Support subscriptions, usage-based add-ons, and invoice generation for enterprise clients." },
    solution: { body: "Stripe Billing with metered billing and Customer Portal. Prisma for persistence and idempotency.", decisions: [], highlights: [] },
    techStack: [
      { name: "Next.js", category: "frontend", usage: "Dashboard and webhooks" },
      { name: "Stripe", category: "backend", usage: "Billing and metering" },
      { name: "Prisma", category: "backend", usage: "Database and migrations" },
    ],
    results: [{ label: "Invoices", value: "10K", suffix: "+/month" }],
    relatedSlugs: ["saas-admin-panel", "e-shop-dashboard"],
  },
  {
    id: "9",
    slug: "e-commerce-storefront",
    title: "E-commerce Storefront",
    description: "Headless storefront with cart, checkout, and product filters.",
    stack: ["Next.js", "Shopify", "Tailwind"],
    image: null,
    liveUrl: "https://example.com",
    githubUrl: null,
    category: "E-commerce",
    reactions: { likes: 14, loves: 9, wows: 3 },
    comments: [],
    createdAt: new Date(Date.now() - 50 * 24 * 60 * 60 * 1000),
    role: "Frontend Developer",
    duration: "3 months",
    year: "2024",
    status: "Live",
    challenge: { title: "Fast storefront on headless", body: "Combine Shopify backend with a custom storefront for brand control and performance." },
    solution: { body: "Next.js with Shopify Storefront API. Cart and checkout optimized for conversion.", decisions: [], highlights: [] },
    techStack: [
      { name: "Next.js", category: "frontend", usage: "Storefront and ISR" },
      { name: "Shopify", category: "backend", usage: "Products and checkout" },
      { name: "Tailwind", category: "frontend", usage: "UI" },
    ],
    results: [{ label: "Conversion", value: "2.1", suffix: "x" }],
    relatedSlugs: ["e-shop-dashboard", "portfolio-vitrine"],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  return CASE_STUDIES.find((c) => c.slug === slug) ?? null;
}

export function getAllCaseStudySlugs(): string[] {
  return CASE_STUDIES.map((c) => c.slug);
}

export function getRelatedCaseStudies(caseStudy: CaseStudy, limit = 3): CaseStudy[] {
  const slugs = caseStudy.relatedSlugs ?? [];
  const out: CaseStudy[] = [];
  for (const s of slugs) {
    const found = CASE_STUDIES.find((c) => c.slug === s);
    if (found) out.push(found);
    if (out.length >= limit) break;
  }
  while (out.length < limit) {
    const other = CASE_STUDIES.find((c) => c.slug !== caseStudy.slug && !out.includes(c));
    if (!other) break;
    out.push(other);
  }
  return out.slice(0, limit);
}

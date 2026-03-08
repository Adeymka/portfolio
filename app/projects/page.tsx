import ProjectsGallery from "@/components/sections/ProjectsGallery";
import type { ProjectWithSlug } from "@/components/sections/ProjectsGallery";

const GALLERY_PROJECTS: ProjectWithSlug[] = [
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
  },
  {
    id: "2",
    slug: "saas-admin-panel",
    title: "SaaS Admin Panel",
    description:
      "Multi-tenant SaaS admin with role-based access, billing integration, and team management.",
    stack: ["React", "Node.js", "Stripe", "MongoDB"],
    image: null,
    liveUrl: null,
    githubUrl: "https://github.com",
    category: "SaaS",
    reactions: { likes: 20, loves: 5, wows: 2 },
    comments: [],
    createdAt: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    slug: "mobile-first-landing",
    title: "Mobile First Landing",
    description:
      "Vitrine site with animations and dark mode. Optimized for Core Web Vitals.",
    stack: ["Next.js", "Framer Motion", "CSS Variables"],
    image: null,
    liveUrl: "https://example.com",
    githubUrl: null,
    category: "Vitrine",
    reactions: { likes: 6, loves: 3, wows: 1 },
    comments: [],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    title: "Fitness App (React Native)",
    description: "Cross-platform fitness tracking with offline sync and social challenges.",
    stack: ["React Native", "Expo", "Supabase"],
    image: null,
    liveUrl: null,
    githubUrl: "https://github.com",
    category: "Mobile",
    reactions: { likes: 15, loves: 10, wows: 5 },
    comments: [],
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    title: "REST API Gateway",
    description: "Centralized API gateway with rate limiting, auth, and request logging.",
    stack: ["Node.js", "Express", "Redis", "Docker"],
    image: null,
    liveUrl: null,
    githubUrl: "https://github.com",
    category: "API/Backend",
    reactions: { likes: 8, loves: 4, wows: 3 },
    comments: [],
    createdAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
  },
  {
    id: "6",
    slug: "portfolio-vitrine",
    title: "Portfolio Vitrine",
    description: "Minimal portfolio with CMS and contact form. Fast and accessible.",
    stack: ["Next.js", "MDX", "Tailwind"],
    image: null,
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    category: "Vitrine",
    reactions: { likes: 10, loves: 2, wows: 1 },
    comments: [],
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
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
  },
  {
    id: "8",
    title: "Marketplace Backend",
    description: "Scalable marketplace API: products, orders, payments, and notifications.",
    stack: ["Node.js", "PostgreSQL", "Bull", "Stripe"],
    image: null,
    liveUrl: null,
    githubUrl: "https://github.com",
    category: "API/Backend",
    reactions: { likes: 11, loves: 6, wows: 2 },
    comments: [],
    createdAt: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000),
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
  },
];

const FEATURED_IDS = ["1", "2"];

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-fb-gray pb-12">
      <div className="mx-auto max-w-7xl">
        <ProjectsGallery
          projects={GALLERY_PROJECTS}
          featuredIds={FEATURED_IDS}
          satisfiedClientsCount={18}
        />
      </div>
    </main>
  );
}

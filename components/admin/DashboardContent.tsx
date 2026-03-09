"use client";

import Link from "next/link";
import { FolderOpen, CheckCircle, Mail, Zap } from "lucide-react";

interface Stats {
  totalProjects: number;
  publishedProjects: number;
  unreadMessages: number;
  activeSkills: number;
}

interface RecentMessage {
  id: string;
  name: string;
  subject: string | null;
  created_at: string;
  is_read: boolean;
}

interface RecentProject {
  id: string;
  title: string;
  category: string | null;
  published: boolean;
}

export default function DashboardContent({
  stats,
  recentMessages,
  recentProjects,
}: {
  stats: Stats;
  recentMessages: RecentMessage[];
  recentProjects: RecentProject[];
}) {
  const cards = [
    {
      icon: FolderOpen,
      label: "Total Projets",
      value: stats.totalProjects,
      sub: "projets au total",
    },
    {
      icon: CheckCircle,
      label: "Projets publiés",
      value: stats.publishedProjects,
      sub: "visibles sur le site",
    },
    {
      icon: Mail,
      label: "Messages non lus",
      value: stats.unreadMessages,
      sub: "à traiter",
    },
    {
      icon: Zap,
      label: "Skills actifs",
      value: stats.activeSkills,
      sub: "affichés",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="font-syne text-2xl font-bold text-fb-text">Dashboard</h1>
        <p className="text-sm text-fb-text-secondary">
          Admin / Vue d&apos;ensemble
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.label}
              className="rounded-lg border border-fb-border bg-fb-card p-5 shadow-card"
            >
              <Icon className="h-6 w-6 text-fb-blue" aria-hidden />
              <p className="mt-2 font-syne text-3xl font-bold text-fb-text">
                {card.value}
              </p>
              <p className="text-sm font-medium text-fb-text-secondary">
                {card.label}
              </p>
              <p className="mt-0.5 text-xs text-fb-text-secondary">
                {card.sub}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <section className="rounded-lg border border-fb-border bg-fb-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-syne text-lg font-bold text-fb-text">
              Derniers messages
            </h2>
            <Link
              href="/admin/messages"
              className="text-sm font-medium text-fb-blue hover:underline"
            >
              Voir tous les messages →
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {recentMessages.length === 0 ? (
              <li className="text-sm text-fb-text-secondary">
                Aucun message.
              </li>
            ) : (
              recentMessages.map((m) => (
                <li
                  key={m.id}
                  className="flex items-center justify-between border-b border-fb-border pb-2 last:border-0"
                >
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate text-sm ${m.is_read ? "text-fb-text" : "font-semibold text-fb-text"}`}
                    >
                      {m.name}
                    </p>
                    <p className="truncate text-xs text-fb-text-secondary">
                      {m.subject || "Sans objet"} ·{" "}
                      {new Date(m.created_at).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  {!m.is_read && (
                    <span className="ml-2 h-2 w-2 shrink-0 rounded-full bg-fb-blue" />
                  )}
                </li>
              ))
            )}
          </ul>
        </section>

        <section className="rounded-lg border border-fb-border bg-fb-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <h2 className="font-syne text-lg font-bold text-fb-text">
              Derniers projets
            </h2>
            <Link
              href="/admin/projects"
              className="text-sm font-medium text-fb-blue hover:underline"
            >
              Gérer les projets →
            </Link>
          </div>
          <ul className="mt-4 space-y-3">
            {recentProjects.length === 0 ? (
              <li className="text-sm text-fb-text-secondary">
                Aucun projet.
              </li>
            ) : (
              recentProjects.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between rounded-lg border border-fb-border p-3"
                >
                  <div>
                    <p className="font-medium text-fb-text">{p.title}</p>
                    <p className="text-xs text-fb-text-secondary">
                      {p.category || "—"} ·{" "}
                      {p.published ? "Publié" : "Brouillon"}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      p.published
                        ? "bg-green-100 text-green-700"
                        : "bg-fb-gray text-fb-text-secondary"
                    }`}
                  >
                    {p.published ? "Publié" : "Brouillon"}
                  </span>
                </li>
              ))
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}

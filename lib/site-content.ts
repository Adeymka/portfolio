/**
 * Liens et infos publics du portfolio — à personnaliser.
 * Utilisé pour le JSON-LD (SEO), les sidebars, contact, etc.
 */
export const siteLinks = {
  website: "https://yoursite.com",
  email: "hello@yoursite.com",
  linkedInUrl: "https://linkedin.com/in/yourprofile",
  githubUrl: "https://github.com/yourprofile",
  /** URL publique du CV (PDF) — optionnel, pour bouton "Télécharger le CV" */
  cvUrl: null as string | null,
} as const;

/** Liste pour schema.org sameAs (réseaux sociaux + site) */
export function getSameAsUrls(): string[] {
  const { website, linkedInUrl, githubUrl } = siteLinks;
  const out: string[] = [];
  if (website) out.push(website);
  if (linkedInUrl) out.push(linkedInUrl);
  if (githubUrl) out.push(githubUrl);
  return out;
}

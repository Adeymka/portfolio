/**
 * Liens et infos publics du portfolio — à personnaliser.
 * Utilisé pour le JSON-LD (SEO), les sidebars, contact, etc.
 */
export const siteLinks = {
  /** Ancien portfolio (ou remplacer par l’URL du nouveau une fois déployé) */
  website: "https://mykerobert3-arch.github.io/DonaldPortfolio/",
  email: "adjindaadeymkadonald@gmail.com",
  linkedInUrl: "https://www.linkedin.com/in/adeymka-donald-adjinda-919b572ba/",
  githubUrl: "https://github.com/Adeymka",
  /** URL publique du CV (PDF) — à renseigner plus tard si besoin */
  cvUrl: null as string | null,
  /** Photo de profil (dans public/) — ex. /image/image.jpeg */
  profileImageUrl: "/image/image.jpeg",
  /** Logo header / favicon (dans public/) */
  logoUrl: "/image/logo-removebg-preview.png",
  /** Lieu (affiché dans profil, sidebars) */
  location: "Abomey-Calavi, Bénin",
  /** Numéro au format local (affiché) */
  phone: "01 56 39 25 67",
  /** Numéro pour tel: et wa.me (préfixe Bénin +229, sans le 0 initial) */
  phoneE164: "+229156392567",
  whatsappUrl: "https://wa.me/229156392567",
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

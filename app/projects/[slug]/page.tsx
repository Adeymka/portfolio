import { notFound } from "next/navigation";
import CaseStudyPage from "@/components/sections/CaseStudyPage";
import { getCaseStudyBySlug, getAllCaseStudySlugs } from "@/lib/case-studies";

export interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();
  return <CaseStudyPage caseStudy={caseStudy} />;
}

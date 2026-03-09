import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getClientIp, checkRateLimit } from "@/lib/rate-limit";

const MAX_LENGTH = { company: 200, position: 200, recruiter: 100, highlights: 1000 };

function sanitize(str: unknown): string {
  if (typeof str !== "string") return "";
  return str.trim().slice(0, 500);
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const { allowed, retryAfter } = checkRateLimit(`generate-letter:${ip}`);
  if (!allowed) {
    return NextResponse.json(
      {
        error: "Trop de requêtes. Réessayez dans quelques instants.",
        code: "RATE_LIMITED",
        retryAfter,
      },
      { status: 429, headers: retryAfter ? { "Retry-After": String(retryAfter) } : undefined }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey?.trim()) {
    return NextResponse.json(
      { error: "Service de génération non configuré.", code: "API_KEY_MISSING" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const company = sanitize(body.company).slice(0, MAX_LENGTH.company);
    const position = sanitize(body.position).slice(0, MAX_LENGTH.position);
    const recruiter = sanitize(body.recruiter).slice(0, MAX_LENGTH.recruiter);
    const highlights = sanitize(body.highlights).slice(0, MAX_LENGTH.highlights);
    const tone = ["Formel", "Convivial", "Courant"].includes(sanitize(body.tone)) ? sanitize(body.tone) : "Formel";
    const lang = ["Français", "English"].includes(sanitize(body.lang)) ? sanitize(body.lang) : "Français";

    if (!company || !position) {
      return NextResponse.json(
        { error: "Entreprise et poste sont requis.", code: "VALIDATION_ERROR" },
        { status: 400 }
      );
    }

    const anthropic = new Anthropic({ apiKey });

    const prompt = `Write a ${tone} cover letter in ${lang} for the position of ${position} at ${company}.
${recruiter ? `Address it to ${recruiter}.` : ""}
Highlight these strengths: ${highlights || "Full-stack web development, Next.js, React, modern web technologies."}
Do not include any content that is not part of the letter. Output only the letter text.
The candidate is a web developer specializing in Next.js, React, and modern web technologies.
Format: proper letter with date, address, opening, 3 paragraphs, closing.`;

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      response.content[0].type === "text"
        ? response.content[0].text
        : "";

    return NextResponse.json({ letter: text });
  } catch (e) {
    console.error("generate-letter:", e);
    const message = e instanceof Error ? e.message : "";
    const isAuthError = /api_key|invalid.*key|authentication/i.test(message);
    return NextResponse.json(
      {
        error: isAuthError
          ? "Clé API invalide ou expirée. Vérifiez ANTHROPIC_API_KEY."
          : "La génération a échoué. Réessayez dans quelques instants.",
        code: isAuthError ? "API_ERROR" : "GENERATION_FAILED",
      },
      { status: isAuthError ? 503 : 500 }
    );
  }
}

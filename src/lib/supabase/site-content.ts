import { createClient } from "@/lib/supabase/server";

export interface SiteContentRow {
  id: number;
  name: string;
  tagline: string | null;
  bio: string | null;
  resume_url: string | null;
  email: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  typed_phrases: string[];
  focus_areas: string[];
  updated_at: string;
}

export interface SiteContent {
  name: string;
  tagline: string;
  bioParagraphs: string[];
  resumeUrl: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  typedPhrases: string[];
  focusAreas: string[];
}

export function rowToSiteContent(row: SiteContentRow): SiteContent {
  return {
    name: row.name,
    tagline: row.tagline ?? "",
    bioParagraphs: (row.bio ?? "").split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
    resumeUrl: row.resume_url ?? "/resume.pdf",
    email: row.email ?? "",
    linkedinUrl: row.linkedin_url ?? "",
    githubUrl: row.github_url ?? "",
    typedPhrases: row.typed_phrases,
    focusAreas: row.focus_areas,
  };
}

export async function getSiteContent(): Promise<SiteContent> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) throw new Error(error.message);
  return rowToSiteContent(data as SiteContentRow);
}

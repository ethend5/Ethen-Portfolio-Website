"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ActionState = { error?: string; success?: boolean };

interface SiteContentInput {
  name: string;
  tagline: string | null;
  bio: string | null;
  resume_url: string | null;
  email: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  typed_phrases: string[];
  focus_areas: string[];
}

function parseFormData(formData: FormData): SiteContentInput {
  const str = (key: string) => String(formData.get(key) ?? "").trim();
  const optional = (key: string) => str(key) || null;
  const lines = (key: string) =>
    str(key)
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
  const csv = (key: string) =>
    str(key)
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

  return {
    name: str("name"),
    tagline: optional("tagline"),
    bio: optional("bio"),
    resume_url: optional("resume_url"),
    email: optional("email"),
    linkedin_url: optional("linkedin_url"),
    github_url: optional("github_url"),
    typed_phrases: lines("typed_phrases"),
    focus_areas: csv("focus_areas"),
  };
}

export async function updateSiteContent(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const input = parseFormData(formData);
  if (!input.name) return { error: "Name is required." };

  const supabase = await createClient();
  const { error } = await supabase
    .from("site_content")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", 1);

  if (error) return { error: error.message };

  revalidatePath("/admin/home");
  revalidatePath("/");
  revalidatePath("/resume");
  return { success: true };
}

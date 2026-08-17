"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ActionState = { error?: string };

const TYPES = ["professional", "leadership", "technical", "activities"];

interface ExperienceInput {
  company: string;
  role: string;
  type: string;
  start_date: string;
  end_date: string | null;
  location: string | null;
  description: string | null;
  bullets: string[];
  skills: string[];
  logo_url: string | null;
  display_order: number;
}

function parseFormData(formData: FormData): ExperienceInput {
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
    company: str("company"),
    role: str("role"),
    type: str("type"),
    start_date: str("start_date"),
    end_date: optional("end_date"),
    location: optional("location"),
    description: optional("description"),
    bullets: lines("bullets"),
    skills: csv("skills"),
    logo_url: optional("logo_url"),
    display_order: Number(str("display_order")) || 0,
  };
}

function validate(input: ExperienceInput): string | null {
  if (!input.company) return "Company is required.";
  if (!input.role) return "Role is required.";
  if (!TYPES.includes(input.type)) return "Invalid type.";
  if (!/^\d{4}-\d{2}$/.test(input.start_date)) {
    return "Start date must be in YYYY-MM format.";
  }
  if (input.end_date && !/^\d{4}-\d{2}$/.test(input.end_date)) {
    return "End date must be in YYYY-MM format, or left blank for Present.";
  }
  return null;
}

export async function createExperience(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const input = parseFormData(formData);
  const validationError = validate(input);
  if (validationError) return { error: validationError };

  const supabase = await createClient();
  const { error } = await supabase.from("experience").insert(input);
  if (error) return { error: error.message };

  revalidatePath("/admin/experience");
  revalidatePath("/");
  redirect("/admin/experience");
}

export async function updateExperience(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const input = parseFormData(formData);
  const validationError = validate(input);
  if (validationError) return { error: validationError };

  const supabase = await createClient();
  const { error } = await supabase.from("experience").update(input).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/experience");
  revalidatePath("/");
  redirect("/admin/experience");
}

export async function deleteExperience(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("experience").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/experience");
  revalidatePath("/");
}

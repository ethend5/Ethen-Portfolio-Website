"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ActionState = { error?: string };

const CATEGORIES = ["programming", "frontend", "backend", "cad", "tools"];

interface SkillInput {
  name: string;
  category: string;
  icon: string | null;
  proficiency: number | null;
  display_order: number;
}

function parseFormData(formData: FormData): SkillInput {
  const str = (key: string) => String(formData.get(key) ?? "").trim();
  const optional = (key: string) => str(key) || null;
  const proficiencyRaw = str("proficiency");

  return {
    name: str("name"),
    category: str("category"),
    icon: optional("icon"),
    proficiency: proficiencyRaw ? Number(proficiencyRaw) : null,
    display_order: Number(str("display_order")) || 0,
  };
}

function validate(input: SkillInput): string | null {
  if (!input.name) return "Name is required.";
  if (!CATEGORIES.includes(input.category)) return "Invalid category.";
  if (
    input.proficiency !== null &&
    (!Number.isInteger(input.proficiency) || input.proficiency < 1 || input.proficiency > 5)
  ) {
    return "Proficiency must be an integer from 1 to 5, or left blank.";
  }
  return null;
}

export async function createSkill(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const input = parseFormData(formData);
  const validationError = validate(input);
  if (validationError) return { error: validationError };

  const supabase = await createClient();
  const { error } = await supabase.from("skills").insert(input);
  if (error) return { error: error.message };

  revalidatePath("/admin/skills");
  revalidatePath("/");
  redirect("/admin/skills");
}

export async function updateSkill(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const input = parseFormData(formData);
  const validationError = validate(input);
  if (validationError) return { error: validationError };

  const supabase = await createClient();
  const { error } = await supabase.from("skills").update(input).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/skills");
  revalidatePath("/");
  redirect("/admin/skills");
}

export async function deleteSkill(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("skills").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/skills");
  revalidatePath("/");
}

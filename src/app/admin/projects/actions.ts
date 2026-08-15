"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type ActionState = { error?: string };

const CATEGORIES = ["hardware", "software", "ai", "embedded", "web"];

interface ProjectInput {
  title: string;
  slug: string;
  description: string;
  long_description: string | null;
  date: string;
  category: string;
  tags: string[];
  image_url: string | null;
  project_url: string | null;
  featured: boolean;
  problem: string | null;
  process: string | null;
  challenges: string | null;
  results: string | null;
  lessons: string | null;
  display_order: number;
}

function parseFormData(formData: FormData): ProjectInput {
  const str = (key: string) => String(formData.get(key) ?? "").trim();
  const optional = (key: string) => str(key) || null;
  const tags = str("tags")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  // <input type="month"> submits "YYYY-MM"; the `date` column is a native
  // Postgres date, which requires a full "YYYY-MM-DD".
  const rawDate = str("date");
  const date = /^\d{4}-\d{2}$/.test(rawDate) ? `${rawDate}-01` : rawDate;

  return {
    title: str("title"),
    slug: str("slug"),
    description: str("description"),
    long_description: optional("long_description"),
    date,
    category: str("category"),
    tags,
    image_url: optional("image_url"),
    project_url: optional("project_url"),
    featured: formData.get("featured") === "on",
    problem: optional("problem"),
    process: optional("process"),
    challenges: optional("challenges"),
    results: optional("results"),
    lessons: optional("lessons"),
    display_order: Number(str("display_order")) || 0,
  };
}

function validate(input: ProjectInput): string | null {
  if (!input.title) return "Title is required.";
  if (!input.slug) return "Slug is required.";
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(input.slug)) {
    return "Slug must be lowercase letters, numbers, and hyphens only.";
  }
  if (!input.description) return "Description is required.";
  if (!input.date) return "Date is required.";
  if (!CATEGORIES.includes(input.category)) return "Invalid category.";
  return null;
}

export async function createProject(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const input = parseFormData(formData);
  const validationError = validate(input);
  if (validationError) return { error: validationError };

  const supabase = await createClient();
  const { error } = await supabase.from("projects").insert(input);
  if (error) return { error: error.message };

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function updateProject(
  id: string,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const input = parseFormData(formData);
  const validationError = validate(input);
  if (validationError) return { error: validationError };

  const supabase = await createClient();
  const { error } = await supabase.from("projects").update(input).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${input.slug}`);
  revalidatePath("/");
  redirect("/admin/projects");
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.from("projects").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath("/");
}

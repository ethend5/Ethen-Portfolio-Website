import { cache } from "react";
import type { Project } from "@/types";
import { createClient } from "@/lib/supabase/server";

export interface ProjectRow {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string | null;
  date: string;
  category: Project["category"];
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
  created_at: string;
}

export function rowToProject(row: ProjectRow): Project {
  return {
    title: row.title,
    slug: row.slug,
    description: row.description,
    longDescription: row.long_description ?? "",
    date: row.date,
    tags: row.tags,
    image: row.image_url ?? "",
    demo: row.project_url ?? undefined,
    demoLabel: row.project_url ? "View Project" : undefined,
    featured: row.featured,
    category: row.category,
    problem: row.problem ?? undefined,
    process: row.process ?? undefined,
    challenges: row.challenges ?? undefined,
    results: row.results ?? undefined,
    lessons: row.lessons ?? undefined,
  };
}

export async function getProjects(): Promise<Project[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw new Error(error.message);
  return (data as ProjectRow[]).map(rowToProject);
}

export const getProjectBySlug = cache(async (slug: string): Promise<Project | null> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw new Error(error.message);
  return data ? rowToProject(data as ProjectRow) : null;
});

import type { Experience } from "@/types";
import { createClient } from "@/lib/supabase/server";

export interface ExperienceRow {
  id: string;
  company: string;
  role: string;
  type: Experience["type"];
  start_date: string;
  end_date: string | null;
  location: string | null;
  description: string | null;
  bullets: string[];
  skills: string[];
  display_order: number;
  created_at: string;
}

export function rowToExperience(row: ExperienceRow): Experience {
  return {
    id: row.id,
    company: row.company,
    role: row.role,
    type: row.type,
    startDate: row.start_date,
    endDate: row.end_date ?? "Present",
    description: row.description ?? "",
    responsibilities: row.bullets,
    skills: row.skills,
  };
}

export async function getExperiences(): Promise<Experience[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw new Error(error.message);
  return (data as ExperienceRow[]).map(rowToExperience);
}

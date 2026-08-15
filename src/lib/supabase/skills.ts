import type { Skill } from "@/types";
import { createClient } from "@/lib/supabase/server";

export interface SkillRow {
  id: string;
  name: string;
  category: Skill["category"];
  icon: string | null;
  proficiency: number | null;
  display_order: number;
  created_at: string;
}

export function rowToSkill(row: SkillRow): Skill {
  return {
    name: row.name,
    category: row.category,
    icon: row.icon ?? undefined,
    description: "",
    proficiency: (row.proficiency ?? 0) as Skill["proficiency"],
  };
}

export async function getSkills(): Promise<Skill[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw new Error(error.message);
  return (data as SkillRow[]).map(rowToSkill);
}

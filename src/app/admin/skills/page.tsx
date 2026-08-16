import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { SkillRow } from "@/lib/supabase/skills";
import DeleteSkillButton from "./DeleteSkillButton";

export default async function AdminSkillsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw new Error(error.message);
  const skills = (data ?? []) as SkillRow[];

  return (
    <section className="min-h-screen px-6 py-24">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 flex items-center justify-between gap-4">
          <div>
            <Link
              href="/admin"
              className="text-xs text-text-muted hover:text-[#38bdf8] transition-colors"
            >
              ← Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-white mt-2 mb-2">Skills</h1>
            <div className="h-1 w-12 rounded-full bg-primary-500" />
          </div>
          <Link
            href="/admin/skills/new"
            className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2.5
                       text-sm font-semibold text-white hover:bg-primary-600
                       transition-colors duration-200"
          >
            <Plus size={16} strokeWidth={2.5} />
            New Skill
          </Link>
        </div>

        {skills.length === 0 ? (
          <p className="text-sm text-text-secondary">
            No skills yet. Create your first one to get started.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-4 rounded-xl border border-white/8
                           bg-background-800 px-5 py-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{skill.name}</p>
                  <p className="truncate text-xs text-text-muted">
                    {skill.category}
                    {skill.proficiency ? ` · ${skill.proficiency}/5` : ""} · order{" "}
                    {skill.display_order}
                  </p>
                </div>
                <Link
                  href={`/admin/skills/${skill.id}/edit`}
                  className="flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5
                             text-sm text-text-secondary hover:text-white hover:border-white/20
                             transition-colors duration-200"
                >
                  <Pencil size={13} />
                  Edit
                </Link>
                <DeleteSkillButton id={skill.id} name={skill.name} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

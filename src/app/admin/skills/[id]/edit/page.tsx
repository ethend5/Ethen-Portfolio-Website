import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { SkillRow } from "@/lib/supabase/skills";
import SkillForm from "@/app/admin/skills/SkillForm";
import { updateSkill } from "@/app/admin/skills/actions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditSkillPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  const boundUpdate = updateSkill.bind(null, id);

  return (
    <section className="min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin/skills"
          className="text-xs text-text-muted hover:text-[#38bdf8] transition-colors"
        >
          ← Skills
        </Link>
        <h1 className="text-3xl font-bold text-white mt-2 mb-8">Edit Skill</h1>
        <SkillForm skill={data as SkillRow} action={boundUpdate} submitLabel="Save Changes" />
      </div>
    </section>
  );
}

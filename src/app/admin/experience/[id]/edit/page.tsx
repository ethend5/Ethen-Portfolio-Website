import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ExperienceRow } from "@/lib/supabase/experience";
import ExperienceForm from "@/app/admin/experience/ExperienceForm";
import { updateExperience } from "@/app/admin/experience/actions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  const boundUpdate = updateExperience.bind(null, id);

  return (
    <section className="min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin/experience"
          className="text-xs text-text-muted hover:text-[#38bdf8] transition-colors"
        >
          ← Experience
        </Link>
        <h1 className="text-3xl font-bold text-white mt-2 mb-8">Edit Experience</h1>
        <ExperienceForm
          experience={data as ExperienceRow}
          action={boundUpdate}
          submitLabel="Save Changes"
        />
      </div>
    </section>
  );
}

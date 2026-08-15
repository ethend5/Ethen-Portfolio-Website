import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ProjectRow } from "@/lib/supabase/projects";
import ProjectForm from "@/app/admin/projects/ProjectForm";
import { updateProject } from "@/app/admin/projects/actions";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) notFound();

  const boundUpdate = updateProject.bind(null, id);

  return (
    <section className="min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin/projects"
          className="text-xs text-text-muted hover:text-[#38bdf8] transition-colors"
        >
          ← Projects
        </Link>
        <h1 className="text-3xl font-bold text-white mt-2 mb-8">Edit Project</h1>
        <ProjectForm
          project={data as ProjectRow}
          action={boundUpdate}
          submitLabel="Save Changes"
        />
      </div>
    </section>
  );
}

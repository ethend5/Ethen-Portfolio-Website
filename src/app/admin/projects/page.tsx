import Link from "next/link";
import { Plus, Pencil, Star } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { ProjectRow } from "@/lib/supabase/projects";
import DeleteProjectButton from "./DeleteProjectButton";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw new Error(error.message);
  const projects = (data ?? []) as ProjectRow[];

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
            <h1 className="text-3xl font-bold text-white mt-2 mb-2">Projects</h1>
            <div className="h-1 w-12 rounded-full bg-primary-500" />
          </div>
          <Link
            href="/admin/projects/new"
            className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2.5
                       text-sm font-semibold text-white hover:bg-primary-600
                       transition-colors duration-200"
          >
            <Plus size={16} strokeWidth={2.5} />
            New Project
          </Link>
        </div>

        {projects.length === 0 ? (
          <p className="text-sm text-text-secondary">
            No projects yet. Create your first one to get started.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-4 rounded-xl border border-white/8
                           bg-background-800 px-5 py-4"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-semibold text-white">
                      {project.title}
                    </p>
                    {project.featured && (
                      <Star size={12} className="shrink-0 fill-current text-[#38bdf8]" />
                    )}
                  </div>
                  <p className="truncate text-xs text-text-muted">
                    /{project.slug} · {project.category} · order {project.display_order}
                  </p>
                </div>
                <Link
                  href={`/admin/projects/${project.id}/edit`}
                  className="flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5
                             text-xs text-text-secondary hover:text-white hover:border-white/20
                             transition-colors duration-200"
                >
                  <Pencil size={13} />
                  Edit
                </Link>
                <DeleteProjectButton id={project.id} title={project.title} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

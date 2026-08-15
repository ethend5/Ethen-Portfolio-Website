import Link from "next/link";
import ProjectForm from "@/app/admin/projects/ProjectForm";
import { createProject } from "@/app/admin/projects/actions";

export default function NewProjectPage() {
  return (
    <section className="min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin/projects"
          className="text-xs text-text-muted hover:text-[#38bdf8] transition-colors"
        >
          ← Projects
        </Link>
        <h1 className="text-3xl font-bold text-white mt-2 mb-8">New Project</h1>
        <ProjectForm action={createProject} submitLabel="Create Project" />
      </div>
    </section>
  );
}

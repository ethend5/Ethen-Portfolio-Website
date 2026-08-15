import ProjectsPageClient from "./ProjectsPageClient";
import { getProjects } from "@/lib/supabase/projects";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectsPageClient projects={projects} />;
}

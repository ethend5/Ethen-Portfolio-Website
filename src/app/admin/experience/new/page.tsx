import Link from "next/link";
import ExperienceForm from "@/app/admin/experience/ExperienceForm";
import { createExperience } from "@/app/admin/experience/actions";

export default function NewExperiencePage() {
  return (
    <section className="min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin/experience"
          className="text-xs text-text-muted hover:text-[#38bdf8] transition-colors"
        >
          ← Experience
        </Link>
        <h1 className="text-3xl font-bold text-white mt-2 mb-8">New Experience</h1>
        <ExperienceForm action={createExperience} submitLabel="Create Experience" />
      </div>
    </section>
  );
}

import Link from "next/link";
import SkillForm from "@/app/admin/skills/SkillForm";
import { createSkill } from "@/app/admin/skills/actions";

export default function NewSkillPage() {
  return (
    <section className="min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin/skills"
          className="text-xs text-text-muted hover:text-[#38bdf8] transition-colors"
        >
          ← Skills
        </Link>
        <h1 className="text-3xl font-bold text-white mt-2 mb-8">New Skill</h1>
        <SkillForm action={createSkill} submitLabel="Create Skill" />
      </div>
    </section>
  );
}

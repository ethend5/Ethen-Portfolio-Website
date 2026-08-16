import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { ExperienceRow } from "@/lib/supabase/experience";
import DeleteExperienceButton from "./DeleteExperienceButton";

export default async function AdminExperiencePage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) throw new Error(error.message);
  const items = (data ?? []) as ExperienceRow[];

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
            <h1 className="text-3xl font-bold text-white mt-2 mb-2">Experience</h1>
            <div className="h-1 w-12 rounded-full bg-primary-500" />
          </div>
          <Link
            href="/admin/experience/new"
            className="flex items-center gap-2 rounded-lg bg-primary-500 px-4 py-2.5
                       text-sm font-semibold text-white hover:bg-primary-600
                       transition-colors duration-200"
          >
            <Plus size={16} strokeWidth={2.5} />
            New Experience
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="text-sm text-text-secondary">
            No experience entries yet. Create your first one to get started.
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-white/8
                           bg-background-800 px-5 py-4"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">
                    {item.role} · {item.company}
                  </p>
                  <p className="truncate text-xs text-text-muted">
                    {item.start_date} – {item.end_date ?? "Present"} · {item.type} · order{" "}
                    {item.display_order}
                  </p>
                </div>
                <Link
                  href={`/admin/experience/${item.id}/edit`}
                  className="flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5
                             text-sm text-text-secondary hover:text-white hover:border-white/20
                             transition-colors duration-200"
                >
                  <Pencil size={13} />
                  Edit
                </Link>
                <DeleteExperienceButton id={item.id} label={`${item.role} at ${item.company}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

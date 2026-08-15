import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { SiteContentRow } from "@/lib/supabase/site-content";
import HomeContentForm from "./HomeContentForm";

export default async function AdminHomePage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("site_content")
    .select("*")
    .eq("id", 1)
    .single();

  if (error) throw new Error(error.message);

  return (
    <section className="min-h-screen px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/admin"
          className="text-xs text-text-muted hover:text-[#38bdf8] transition-colors"
        >
          ← Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-white mt-2 mb-2">Home / About</h1>
        <div className="h-1 w-12 rounded-full bg-primary-500 mb-8" />
        <HomeContentForm content={data as SiteContentRow} />
      </div>
    </section>
  );
}

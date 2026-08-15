import Link from "next/link";
import { redirect } from "next/navigation";
import { FolderKanban, Briefcase, Wrench, User } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/admin/SignOutButton";
import FadeIn from "@/components/admin/FadeIn";

const CONTENT_TYPES = [
  {
    label: "Projects",
    description: "Manage the projects shown on the site.",
    href: "/admin/projects",
    Icon: FolderKanban,
  },
  {
    label: "Experience",
    description: "Manage work, leadership, and technical experience.",
    href: "/admin/experience",
    Icon: Briefcase,
  },
  {
    label: "Skills",
    description: "Manage the skills grid shown on the site.",
    href: "/admin/skills",
    Icon: Wrench,
  },
  {
    label: "Home / About",
    description: "Manage your name, bio, and contact links.",
    href: "/admin/home",
    Icon: User,
  },
] as const;

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <section className="min-h-screen px-6 py-24">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-12 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
              <div className="h-1 w-12 rounded-full bg-primary-500" />
            </div>
            <SignOutButton />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Content</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CONTENT_TYPES.map(({ label, description, href, Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-4 rounded-xl border border-white/8
                             bg-background-800 px-5 py-4 text-text-secondary
                             hover:border-[#0284c7]/50 hover:text-white
                             transition-colors duration-200"
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg
                               border border-white/8 bg-background-900 text-[#38bdf8]"
                  >
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="truncate text-xs text-text-muted">{description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

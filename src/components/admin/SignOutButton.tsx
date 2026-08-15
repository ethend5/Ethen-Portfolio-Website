"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSignOut() {
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className="flex items-center gap-2 rounded-md border border-primary-600 px-3 py-1.5
                 text-sm text-[#38bdf8] hover:bg-primary-500/10 hover:border-[#38bdf8]
                 disabled:opacity-60 disabled:cursor-not-allowed
                 transition-all duration-200"
    >
      <LogOut size={14} strokeWidth={2.5} />
      {loading ? "Signing out…" : "Sign Out"}
    </button>
  );
}

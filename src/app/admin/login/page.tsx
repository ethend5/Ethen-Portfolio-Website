"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "loading" | "error";

const INPUT_CLASS =
  "w-full rounded-lg border border-white/8 bg-[#111118] py-2.5 pl-11 pr-4 text-sm text-white " +
  "placeholder:text-[#64748b] outline-none " +
  "focus:border-[#0284c7]/60 focus:ring-1 focus:ring-[#0284c7]/30 " +
  "transition-colors duration-200";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm rounded-xl border border-white/5 bg-[#111118] p-8"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Admin Login</h1>
          <div className="mx-auto mt-2 h-1 w-12 rounded-full bg-primary-500" />
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-medium text-text-secondary">
              Email
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={INPUT_CLASS}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-medium text-text-secondary">
              Password
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={INPUT_CLASS}
              />
            </div>
          </div>

          {status === "error" && (
            <p className="text-sm text-red-400">
              {errorMsg || "Something went wrong. Please try again."}
            </p>
          )}

          <motion.button
            type="submit"
            disabled={status === "loading"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
            className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-primary-500
                       px-6 py-3 text-sm font-semibold text-white
                       hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed
                       transition-colors duration-200"
          >
            {status === "loading" ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Signing in…
              </>
            ) : (
              <>
                <LogIn size={14} strokeWidth={2.5} />
                Sign In
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </section>
  );
}

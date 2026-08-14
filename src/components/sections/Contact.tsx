"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";


// ─── Brand SVGs ───────────────────────────────────────────────────────────────

function GithubIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

// ─── Social connect cards ─────────────────────────────────────────────────────

const CONNECT_LINKS = [
  {
    label: "GitHub",
    sub: "github.com/ethend5",                                    // Replace with your GitHub username
    href: "https://github.com/ethend5",                           // Replace with your GitHub URL
    Icon: GithubIcon,
    hoverBg: "hover:bg-[#0ea5e9]/5 hover:border-[#0284c7]/50 hover:text-[#38bdf8]",
  },
  {
    label: "LinkedIn",
    sub: "linkedin.com/in/ethen-dhanaraj",                        // Replace with your LinkedIn handle
    href: "https://www.linkedin.com/in/ethen-dhanaraj/",          // Replace with your LinkedIn URL
    Icon: LinkedinIcon,
    hoverBg: "hover:bg-violet-500/5 hover:border-violet-500/40 hover:text-violet-300",
  },
  {
    label: "Email",
    sub: "ethendhanaraj@gmail.com",                             // Replace with your real email
    href: "mailto:ethendhanaraj@gmail.com",                     // Replace with your real email
    Icon: Mail,
    hoverBg: "hover:bg-emerald-500/5 hover:border-emerald-500/40 hover:text-emerald-300",
  },
] as const;

// ─── Form types ───────────────────────────────────────────────────────────────

type FormState = { name: string; email: string; subject: string; message: string };
type Status = "idle" | "loading" | "success" | "error";

const EMPTY_FORM: FormState = { name: "", email: "", subject: "", message: "" };

// ─── Shared input class ───────────────────────────────────────────────────────

const INPUT_CLASS =
  "w-full rounded-lg border border-white/8 bg-[#111118] px-4 py-2.5 text-sm text-white " +
  "placeholder:text-[#64748b] outline-none " +
  "focus:border-[#0284c7]/60 focus:ring-1 focus:ring-[#0284c7]/30 " +
  "transition-colors duration-200";

// ─── Component ───────────────────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Send failed");
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  }

  function reset() {
    setForm(EMPTY_FORM);
    setStatus("idle");
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Get In Touch</h2>
          <div className="h-1 w-12 rounded-full bg-primary-500" />
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

          {/* ── Left: contact form ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex h-full min-h-72 flex-col items-center justify-center gap-4 rounded-xl
                           border border-emerald-500/20 bg-emerald-500/5 p-10 text-center"
              >
                <div className="text-emerald-400">
                  <CheckCircleIcon />
                </div>
                <p className="text-lg font-semibold text-white">Message sent!</p>
                <p className="text-sm text-text-secondary">
                  Thanks for reaching out — I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={reset}
                  className="mt-2 text-sm text-[#38bdf8] hover:text-white transition-colors"
                >
                  Send another message →
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-medium text-text-secondary">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ethen Dhanaraj"
                      className={INPUT_CLASS}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-medium text-text-secondary">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={INPUT_CLASS}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="subject" className="text-xs font-medium text-text-secondary">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Let's work together"
                    className={INPUT_CLASS}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-medium text-text-secondary">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    className={`${INPUT_CLASS} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">
                    {errorMsg || "Something went wrong. Please try again or email me directly."}
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 350, damping: 22 }}
                  className="flex items-center justify-center gap-2 rounded-lg bg-primary-500
                             px-6 py-3 text-sm font-semibold text-white
                             hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed
                             transition-colors duration-200 self-start"
                >
                  {status === "loading" ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={14} strokeWidth={2.5} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* ── Right: connect links ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">Let&apos;s connect</h3>
              <p className="text-text-secondary leading-relaxed text-sm">
                I&apos;m always open to talking about new projects, internship
                opportunities, or just connecting with people working on interesting
                problems. Feel free to reach out!
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {CONNECT_LINKS.map(({ label, sub, href, Icon, hoverBg }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15 + i * 0.08 }}
                  whileHover={{ x: 4 }}
                  className={`group flex items-center gap-4 rounded-xl border border-white/8
                              bg-background-800 px-5 py-4 text-text-secondary
                              transition-all duration-200 ${hoverBg}`}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg
                               border border-white/8 bg-background-900 transition-colors duration-200
                               group-hover:border-current group-hover:bg-current/5"
                  >
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white">{label}</p>
                    <p className="truncate text-xs text-text-muted">{sub}</p>
                  </div>
                  <span className="ml-auto text-sm opacity-0 transition-opacity group-hover:opacity-100">
                    →
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

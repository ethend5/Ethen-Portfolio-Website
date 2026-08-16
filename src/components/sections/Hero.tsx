"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { Mail, ExternalLink, ArrowDown } from "lucide-react";

// ─── Typing effect hook ───────────────────────────────────────────────────────

function useTypingEffect(
  phrases: string[],
  typingMs = 75,
  deletingMs = 38,
  pauseMs = 1900
): string {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx] ?? "";

    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), typingMs);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx((c) => c - 1), deletingMs);
      return () => clearTimeout(t);
    }
    // Finished deleting — advance to next phrase
    const t = setTimeout(() => {
      setDeleting(false);
      setPhraseIdx((i) => (i + 1) % phrases.length);
    }, typingMs);
    return () => clearTimeout(t);
  }, [charIdx, deleting, phraseIdx, phrases, typingMs, deletingMs, pauseMs]);

  return (phrases[phraseIdx] ?? "").slice(0, charIdx);
}

// ─── Brand icon SVGs (lucide-react v1 has no brand icons) ────────────────────

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ─── Person silhouette for image placeholder ──────────────────────────────────

function PersonSilhouette() {
  return (
    <svg viewBox="0 0 80 90" fill="none" className="w-20 h-20 opacity-20" aria-hidden>
      <circle cx="40" cy="28" r="18" fill="currentColor" />
      <path d="M4 88c0-19.882 16.118-36 36-36s36 16.118 36 36" fill="currentColor" />
    </svg>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

// ─── Staggered container variants ────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  name: string;
  tagline: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  phrases: string[];
}

export default function Hero({ name, tagline, email, linkedinUrl, githubUrl, phrases }: Props) {
  const typed = useTypingEffect(phrases);

  const socialLinks = [
    githubUrl && { label: "GitHub", href: githubUrl, Icon: GithubIcon },
    linkedinUrl && { label: "LinkedIn", href: linkedinUrl, Icon: LinkedinIcon },
    email && { label: "Email", href: `mailto:${email}`, Icon: Mail },
  ].filter(Boolean) as { label: string; href: string; Icon: typeof Mail }[];

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden flex items-center"
    >
      {/* Dot-grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(56,189,248,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Corner orb blobs */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#0ea5e9]/5 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#0284c7]/5 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32 pt-36">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">

          {/* ── Left column ─────────────────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left"
          >
            {/* Greeting */}
            <motion.p
              variants={itemVariants}
              className="font-mono text-sm tracking-widest text-[#38bdf8] uppercase"
            >
              Hi, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.div variants={itemVariants} className="flex flex-col items-center lg:items-start">
              <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
                {name}
              </h1>
              {/* Blue underline accent */}
              <motion.div
                className="mt-2 h-1 w-24 rounded-full bg-[#0ea5e9]"
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
              />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg font-medium text-[#94a3b8]"
            >
              {tagline}
            </motion.p>

            {/* Typing effect */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-0 text-xl font-semibold text-white md:text-2xl"
              aria-live="polite"
              aria-atomic="true"
            >
              <span>{typed}</span>
              <span className="ml-0.5 inline-block h-6 w-0.5 animate-pulse rounded-full bg-[#38bdf8] align-middle" />
            </motion.div>

            {/* Social links + Resume */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center gap-3 lg:justify-start"
            >
              {socialLinks.map(({ label, href, Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.93 }}
                  transition={{ type: "spring", stiffness: 400, damping: 18 }}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10
                             bg-white/5 text-[#94a3b8] hover:border-[#0284c7]/50 hover:text-[#38bdf8]
                             transition-colors duration-200"
                >
                  <Icon size={16} />
                </motion.a>
              ))}

              {/*
               * Resume link — two options:
               *   href="/resume"        → opens the embedded resume page
               *   href="/resume.pdf" download → direct PDF download
               */}
              <Link
                href="/resume"
                className="flex items-center gap-1.5 rounded-lg border border-[#0284c7]/60 px-4 py-1.5
                           text-sm font-medium text-[#38bdf8] hover:bg-[#0ea5e9]/10 hover:border-[#38bdf8]
                           transition-all duration-200"
              >
                <ExternalLink size={13} strokeWidth={2.5} />
                Resume
              </Link>
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 lg:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                <Link
                  href="/projects"
                  className="block rounded-lg bg-primary-500 px-7 py-3 text-sm font-semibold text-white
                             shadow-lg shadow-primary-500/20 hover:bg-primary-600
                             transition-colors duration-200"
                >
                  View Projects
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 350, damping: 22 }}
              >
                <Link
                  href="/#contact"
                  className="block rounded-lg border border-primary-600 px-7 py-3 text-sm font-semibold
                             text-[#38bdf8] hover:bg-primary-500/10 hover:border-[#38bdf8]
                             transition-all duration-200"
                >
                  Contact Me
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Right column: image ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="flex justify-center lg:justify-end"
          >
            {/* Floating wrapper */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Outer glow ring */}
              <motion.div
                aria-hidden
                animate={{ opacity: [0.2, 0.55, 0.2], scale: [1, 1.04, 1] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-5 rounded-full border border-[#0ea5e9]/20"
              />
              {/* Inner glow ring */}
              <motion.div
                aria-hidden
                animate={{ opacity: [0.35, 0.75, 0.35] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                className="absolute -inset-2 rounded-full border border-[#0ea5e9]/35"
              />

              <div
                className="relative flex h-80 w-80 items-center justify-center overflow-hidden
                           rounded-full border-2 border-primary-600/40 bg-background-800
                           sm:h-96 sm:w-96 md:h-104 md:w-104"
              >
                <Image
                  src="/headshot.jpg"
                  alt={name}
                  fill
                  sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, 416px"
                  className="object-cover object-top"
                  priority
                />
                {/* Subtle radial gradient overlay */}
                <div
                  aria-hidden
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 60% 30%, rgba(14,165,233,0.07) 0%, transparent 70%)",
                  }}
                />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollTo("about")}
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          aria-label="Scroll to about section"
          className="text-[#64748b] hover:text-[#38bdf8] transition-colors"
        >
          <ArrowDown size={20} />
        </motion.button>
      </motion.div>
    </section>
  );
}

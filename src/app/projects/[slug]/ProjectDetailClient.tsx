"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ArrowLeft, Calendar, Play, X } from "lucide-react";
import type { Project } from "@/types";

// ─── Category config ──────────────────────────────────────────────────────────

type CatConfig = { gradient: string; badge: string; label: string; accent: string };

const CATEGORY: Record<Project["category"], CatConfig> = {
  embedded: {
    gradient: "from-sky-800/60 via-sky-950/95 to-[#0a0a0f]",
    badge:    "bg-sky-400/10 text-sky-300 border border-sky-400/25",
    label:    "Embedded Systems",
    accent:   "text-sky-400",
  },
  ai: {
    gradient: "from-violet-800/60 via-violet-950/95 to-[#0a0a0f]",
    badge:    "bg-violet-400/10 text-violet-300 border border-violet-400/25",
    label:    "AI / ML",
    accent:   "text-violet-400",
  },
  hardware: {
    gradient: "from-orange-800/60 via-orange-950/95 to-[#0a0a0f]",
    badge:    "bg-orange-400/10 text-orange-300 border border-orange-400/25",
    label:    "Hardware",
    accent:   "text-orange-400",
  },
  web: {
    gradient: "from-cyan-800/60 via-cyan-950/95 to-[#0a0a0f]",
    badge:    "bg-cyan-400/10 text-cyan-300 border border-cyan-400/25",
    label:    "Web",
    accent:   "text-cyan-400",
  },
  software: {
    gradient: "from-emerald-800/60 via-emerald-950/95 to-[#0a0a0f]",
    badge:    "bg-emerald-400/10 text-emerald-300 border border-emerald-400/25",
    label:    "Software",
    accent:   "text-emerald-400",
  },
};

// ─── GitHub SVG (lucide-react v1 has no brand icons) ─────────────────────────

function GithubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  return new Date(+year, +month - 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

// ─── Convert share URLs to embeddable URLs ────────────────────────────────────

function toEmbedUrl(url: string): string {
  // YouTube: youtube.com/watch?v=ID, youtu.be/ID, or youtube.com/shorts/ID
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&\s?]+)/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0`;

  // Google Drive: drive.google.com/file/d/ID/view
  const drive = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`;

  return url;
}

// ─── Video modal ──────────────────────────────────────────────────────────────

function VideoModal({ url, onClose }: { url: string; onClose: () => void }) {
  const embedUrl = toEmbedUrl(url);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative w-full max-w-4xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close video"
            className="absolute -top-10 right-0 flex items-center gap-1.5 text-sm
                       text-white/70 hover:text-white transition-colors"
          >
            <X size={16} /> Close
          </button>

          {/* 16:9 iframe wrapper */}
          <div className="relative w-full rounded-xl overflow-hidden bg-black"
               style={{ paddingTop: "56.25%" }}>
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Project demo video"
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Content sections definition ─────────────────────────────────────────────

const SECTION_DEFS = [
  { key: "longDescription" as const, title: "Overview"              },
  { key: "problem"         as const, title: "The Problem"           },
  { key: "process"         as const, title: "Design Process"        },
  { key: "challenges"      as const, title: "Technical Challenges"  },
  { key: "results"         as const, title: "Results"               },
  { key: "lessons"         as const, title: "Lessons Learned"       },
];

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  project: Project;
}

export default function ProjectDetailClient({ project }: Props) {
  const cfg = CATEGORY[project.category];
  const [videoOpen, setVideoOpen] = useState(false);

  const sections = SECTION_DEFS.map((def) => ({
    title:   def.title,
    content: project[def.key],
  })).filter((s): s is { title: string; content: string } => Boolean(s.content));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Hero banner ─────────────────────────────────────────────── */}
      <div
        className={`relative bg-gradient-to-b ${cfg.gradient} pt-32 pb-14 overflow-hidden`}
      >
        {/* Decorative grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        {/* Corner glow */}
        <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 max-w-6xl mx-auto px-6">
          {/* Category + date row */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="flex flex-wrap items-center gap-3 mb-5"
          >
            <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${cfg.badge}`}>
              {cfg.label}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#64748b]">
              <Calendar size={12} />
              {formatDate(project.date)}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-4xl font-bold leading-tight text-white mb-6 md:text-5xl max-w-3xl"
          >
            {project.title}
          </motion.h1>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.18 }}
            className="flex flex-wrap gap-2"
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs
                           text-[#94a3b8] backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Below-hero content ───────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 py-10 pb-24">

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="mb-10"
        >
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-[#64748b]
                       hover:text-[#38bdf8] transition-colors duration-200 group"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            All Projects
          </Link>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

          {/* ── Left: content sections ───────────────────────────── */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {sections.map((section, i) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 + i * 0.07 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-lg font-semibold text-white">{section.title}</h2>
                  <div className={`h-px flex-1 bg-gradient-to-r ${
                    i === 0
                      ? `from-[#0284c7]/40 to-transparent`
                      : "from-white/5 to-transparent"
                  }`} />
                </div>
                <p className="text-[#94a3b8] leading-relaxed">{section.content}</p>
              </motion.section>
            ))}
          </div>

          {/* ── Right: sticky sidebar ────────────────────────────── */}
          <motion.aside
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 flex flex-col gap-5">

              {/* Links */}
              {(project.github || project.demo) && (
                <div className="rounded-xl border border-white/5 bg-[#111118] p-5 flex flex-col gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-lg bg-[#0ea5e9]
                                 px-4 py-2.5 text-sm font-semibold text-white
                                 hover:bg-[#0284c7] transition-colors duration-200"
                    >
                      <GithubIcon size={15} />
                      View on GitHub
                    </a>
                  )}
                  {project.demo && (
                    <button
                      onClick={() => setVideoOpen(true)}
                      className="flex items-center justify-center gap-2 rounded-lg border border-[#0284c7]
                                 px-4 py-2.5 text-sm font-semibold text-[#38bdf8]
                                 hover:bg-[#0ea5e9]/10 hover:border-[#38bdf8] transition-colors duration-200"
                    >
                      <Play size={14} strokeWidth={2.5} />
                      {project.demoLabel ?? "Live Demo"}
                    </button>
                  )}
                </div>
              )}

              {/* Tech stack */}
              <div className="rounded-xl border border-white/5 bg-[#111118] p-5">
                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-white/5 bg-[#0a0a0f] px-2.5 py-1
                                 text-xs text-[#94a3b8]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Meta */}
              <div className="rounded-xl border border-white/5 bg-[#111118] p-5 flex flex-col gap-4">
                <div>
                  <h3 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                    Date Built
                  </h3>
                  <p className="text-sm text-[#94a3b8]">{formatDate(project.date)}</p>
                </div>
                <div>
                  <h3 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
                    Category
                  </h3>
                  <span className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${cfg.badge}`}>
                    {cfg.label}
                  </span>
                </div>
                {project.featured && (
                  <div>
                    <span className="inline-flex rounded-md px-2.5 py-1 text-xs font-medium
                                     bg-[#0ea5e9]/10 text-[#38bdf8] border border-[#0284c7]/25">
                      ★ Featured Project
                    </span>
                  </div>
                )}
              </div>

            </div>
          </motion.aside>

        </div>
      </div>

      {/* Video modal */}
      {videoOpen && project.demo && (
        <VideoModal url={project.demo} onClose={() => setVideoOpen(false)} />
      )}
    </motion.div>
  );
}

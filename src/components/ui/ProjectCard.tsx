"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/types";

// ─── Category visual config ───────────────────────────────────────────────────

const CATEGORY_GRADIENT: Record<Project["category"], string> = {
  embedded: "from-sky-900/60 via-sky-950/80 to-[#0a0a0f]",
  ai:       "from-violet-900/60 via-violet-950/80 to-[#0a0a0f]",
  hardware: "from-orange-900/60 via-orange-950/80 to-[#0a0a0f]",
  web:      "from-cyan-900/60 via-cyan-950/80 to-[#0a0a0f]",
  software: "from-emerald-900/60 via-emerald-950/80 to-[#0a0a0f]",
};

const CATEGORY_ACCENT: Record<Project["category"], string> = {
  embedded: "text-sky-400",
  ai:       "text-violet-400",
  hardware: "text-orange-400",
  web:      "text-cyan-400",
  software: "text-emerald-400",
};

const CATEGORY_DOT: Record<Project["category"], string> = {
  embedded: "bg-sky-400",
  ai:       "bg-violet-400",
  hardware: "bg-orange-400",
  web:      "bg-cyan-400",
  software: "bg-emerald-400",
};

const CATEGORY_LABEL: Record<Project["category"], string> = {
  embedded: "Embedded",
  ai:       "AI / ML",
  hardware: "Hardware",
  web:      "Web",
  software: "Software",
};

// ─── Date formatter ───────────────────────────────────────────────────────────

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  return new Date(+year, +month - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

// ─── Component ───────────────────────────────────────────────────────────────

interface Props {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: Props) {
  const gradient = CATEGORY_GRADIENT[project.category];
  const accent   = CATEGORY_ACCENT[project.category];
  const dot      = CATEGORY_DOT[project.category];
  const label    = CATEGORY_LABEL[project.category];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Link href={`/projects/${project.slug}`} className="block group">
        <motion.article
          whileHover={{ y: -6, scale: 1.01 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="flex flex-col overflow-hidden rounded-xl border border-white/5 bg-[#111118]
                     group-hover:border-[#0284c7]/50
                     group-hover:shadow-[0_0_28px_rgba(14,165,233,0.08)]
                     transition-colors duration-300"
        >
          {/* ── Image / placeholder area ─────────────────────────────── */}
          <div className={`relative h-44 bg-gradient-to-br ${gradient} overflow-hidden`}>

            {/* Real image — place file at public/projects/<slug>.png (or .jpg) */}
            {project.image && (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}

            {/* Decorative grid lines (visible when no image) */}
            {!project.image && (
              <div
                aria-hidden
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />
            )}

            {/* Category label watermark (visible when no image) */}
            {!project.image && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-5xl font-black font-mono tracking-tighter opacity-10 ${accent}`}>
                  {label}
                </span>
              </div>
            )}

            {/* Category dot */}
            <div className={`absolute top-3 right-3 h-2 w-2 rounded-full ${dot}`} aria-hidden />

            {/* Hover overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center
                         bg-black/65 opacity-0 group-hover:opacity-100
                         transition-opacity duration-300"
            >
              <span className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10
                               px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                View Project →
              </span>
            </div>
          </div>

          {/* ── Card body ────────────────────────────────────────────── */}
          <div className="flex flex-1 flex-col gap-3 p-5">

            {/* Title + date */}
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-semibold leading-snug text-white
                             group-hover:text-[#38bdf8] transition-colors duration-200">
                {project.title}
              </h3>
              <span className="shrink-0 text-xs text-[#64748b] mt-0.5">
                {formatDate(project.date)}
              </span>
            </div>

            {/* Description */}
            <p className="flex-1 text-sm leading-relaxed text-[#94a3b8] line-clamp-2">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.tags.slice(0, 5).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/5 bg-[#1a1a24]
                             px-2 py-0.5 text-[11px] text-[#64748b]"
                >
                  {tag}
                </span>
              ))}
              {project.tags.length > 5 && (
                <span className="rounded-md border border-white/5 bg-[#1a1a24]
                                 px-2 py-0.5 text-[11px] text-[#64748b]">
                  +{project.tags.length - 5}
                </span>
              )}
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

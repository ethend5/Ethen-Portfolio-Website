"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Experience } from "@/types";

type TypeConfig = {
  gradient: string;
  accent: string;
  dot: string;
  label: string;
};

const TYPE_CONFIG: Record<Experience["type"], TypeConfig> = {
  professional: {
    gradient: "from-sky-900/60 via-sky-950/80 to-background-900",
    accent:   "text-sky-400",
    dot:      "bg-sky-400",
    label:    "Internship",
  },
  leadership: {
    gradient: "from-violet-900/60 via-violet-950/80 to-background-900",
    accent:   "text-violet-400",
    dot:      "bg-violet-400",
    label:    "Leadership",
  },
  technical: {
    gradient: "from-emerald-900/60 via-emerald-950/80 to-background-900",
    accent:   "text-emerald-400",
    dot:      "bg-emerald-400",
    label:    "Technical",
  },
};

function formatDate(d: string): string {
  if (d === "Present") return "Present";
  const [y, m] = d.split("-");
  return new Date(+y, +m - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

interface Props {
  experience: Experience;
  isSelected: boolean;
  onSelect: () => void;
}

export default function ExperienceCard({ experience, isSelected, onSelect }: Props) {
  const cfg    = TYPE_CONFIG[experience.type];
  const period = `${formatDate(experience.startDate)} – ${formatDate(experience.endDate)}`;

  return (
    <motion.article
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onClick={onSelect}
      className={[
        "group flex flex-col h-full overflow-hidden rounded-xl border bg-background-800 cursor-pointer",
        "transition-colors duration-300",
        isSelected
          ? "border-primary-600/50 shadow-[0_0_28px_rgba(14,165,233,0.08)]"
          : "border-white/5 hover:border-primary-600/50 hover:shadow-[0_0_28px_rgba(14,165,233,0.08)]",
      ].join(" ")}
    >
      {/* ── Gradient header ─────────────────────────────────────────────── */}
      <div className={`relative h-44 bg-linear-to-br ${cfg.gradient} overflow-hidden`}>

        {/* Decorative grid lines */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Type label watermark */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-5xl font-black font-mono tracking-tighter opacity-10 ${cfg.accent}`}>
            {cfg.label}
          </span>
        </div>

        {/* Company logo — top left */}
        <div className="absolute top-3 left-3 h-9 w-9 rounded-lg overflow-hidden border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center">
          {experience.logo ? (
            <Image
              src={experience.logo}
              alt={experience.company}
              width={28}
              height={28}
              className="object-contain"
            />
          ) : (
            <span className={`text-[10px] font-bold leading-none ${cfg.accent}`}>
              {experience.company.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>

        {/* Color dot — top right */}
        <div className={`absolute top-3 right-3 h-2 w-2 rounded-full ${cfg.dot}`} aria-hidden />

        {/* Hover overlay */}
        <div
          className={[
            "absolute inset-0 flex items-center justify-center bg-black/65",
            "transition-opacity duration-300",
            isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          ].join(" ")}
        >
          <span className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10
                           px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            View Details →
          </span>
        </div>
      </div>

      {/* ── Card body ─────────────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-3 p-5">

        {/* Role + period */}
        <div className="flex items-start justify-between gap-3">
          <h3 className={[
            "text-base font-semibold leading-snug transition-colors duration-200",
            isSelected ? "text-[#38bdf8]" : "text-white group-hover:text-[#38bdf8]",
          ].join(" ")}>
            {experience.role}
          </h3>
          <span className="shrink-0 text-xs text-text-muted mt-0.5">{period}</span>
        </div>

        {/* Company */}
        <p className="flex-1 text-sm leading-relaxed text-text-secondary line-clamp-2">
          {experience.company}
        </p>

        {/* Skills tags — min-height reserves space for 2 rows */}
        <div className="flex flex-wrap gap-1.5 pt-1 min-h-11 content-start">
          {experience.skills.slice(0, 4).map((s) => (
            <span
              key={s}
              className="rounded-md border border-white/5 bg-background-700 px-2 py-0.5 text-[11px] text-text-muted"
            >
              {s}
            </span>
          ))}
          {experience.skills.length > 4 && (
            <span className="rounded-md border border-white/5 bg-background-700 px-2 py-0.5 text-[11px] text-text-muted">
              +{experience.skills.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Skill } from "@/types";

type CategoryColors = {
  iconBg: string;
  iconText: string;
  iconBorder: string;
  badge: string;
  bar: string;
};

const CATEGORY_COLORS: Record<Skill["category"], CategoryColors> = {
  programming: {
    iconBg: "bg-[#0ea5e9]/15",
    iconText: "text-[#38bdf8]",
    iconBorder: "border-[#0ea5e9]/30",
    badge: "bg-[#0ea5e9]/10 text-[#38bdf8]",
    bar: "bg-[#0ea5e9]/70",
  },
  frontend: {
    iconBg: "bg-violet-500/15",
    iconText: "text-violet-300",
    iconBorder: "border-violet-500/30",
    badge: "bg-violet-500/10 text-violet-300",
    bar: "bg-violet-400/70",
  },
  backend: {
    iconBg: "bg-emerald-500/15",
    iconText: "text-emerald-300",
    iconBorder: "border-emerald-500/30",
    badge: "bg-emerald-500/10 text-emerald-300",
    bar: "bg-emerald-400/70",
  },
  cad: {
    iconBg: "bg-orange-500/15",
    iconText: "text-orange-300",
    iconBorder: "border-orange-500/30",
    badge: "bg-orange-500/10 text-orange-300",
    bar: "bg-orange-400/70",
  },
  tools: {
    iconBg: "bg-yellow-500/15",
    iconText: "text-yellow-300",
    iconBorder: "border-yellow-500/30",
    badge: "bg-yellow-500/10 text-yellow-300",
    bar: "bg-yellow-400/70",
  },
};

const CATEGORY_LABELS: Record<Skill["category"], string> = {
  programming: "Programming",
  frontend: "Frontend",
  backend: "Backend",
  cad: "CAD",
  tools: "Tools",
};

function getInitials(name: string): string {
  const words = name.split(/[\s.]+/).filter(Boolean);
  if (words.length > 1) {
    return words
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }
  return name.slice(0, 2).toUpperCase();
}

interface Props {
  skill: Skill;
  index: number;
}

export default function SkillCard({ skill, index }: Props) {
  const c = CATEGORY_COLORS[skill.category];

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="group flex flex-col gap-2 rounded-xl border border-white/5 bg-[#0a0a0f] px-5 py-3 cursor-default
                 hover:border-[#0284c7]/50 hover:shadow-[0_0_20px_rgba(14,165,233,0.07)]
                 transition-colors duration-200"
    >
      {/* Icon — image if icon path set, otherwise initials */}
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-lg border overflow-hidden
                    ${c.iconBg} ${c.iconBorder}`}
      >
        {skill.icon ? (
          <Image
            src={skill.icon}
            alt={skill.name}
            width={28}
            height={28}
            style={{ width: 28, height: 28, objectFit: "contain" }}
          />
        ) : (
          <span className={`font-mono text-sm font-bold ${c.iconText}`}>
            {getInitials(skill.name)}
          </span>
        )}
      </div>

      {/* Name + category badge */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-semibold leading-snug text-white">
          {skill.name}
        </span>
        <span
          className={`shrink-0 rounded-md px-1.5 py-0.5 text-[10px] font-medium capitalize ${c.badge}`}
        >
          {CATEGORY_LABELS[skill.category]}
        </span>
      </div>

      {/* Proficiency bar */}
      <div className="mt-auto flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-200
                        ${i < skill.proficiency ? c.bar : "bg-white/5"}`}
          />
        ))}
        <span className="ml-2 shrink-0 text-[10px] text-[#64748b]">
          {skill.proficiency}/5
        </span>
      </div>
    </motion.div>
  );
}

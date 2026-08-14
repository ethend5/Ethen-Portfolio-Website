"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // AnimatePresence kept for empty-state fade
import SkillCard from "@/components/ui/SkillCard";
import { skills } from "@/data/skills";
import type { Skill } from "@/types";

// ─── Filter config ────────────────────────────────────────────────────────────

type FilterValue = Skill["category"] | "all";

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: "All",         value: "all"         },
  { label: "Programming", value: "programming" },
  { label: "Frontend",    value: "frontend"    },
  { label: "Backend",     value: "backend"     },
  { label: "CAD",         value: "cad"         },
];

// ─── Component ───────────────────────────────────────────────────────────────

export default function Skills() {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");

  const filtered =
    activeFilter === "all"
      ? skills
      : skills.filter((s) => s.category === activeFilter);

  return (
    <section id="skills" className="py-24 px-6 bg-[#111118]">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Skills</h2>
          <div className="h-1 w-12 rounded-full bg-[#0ea5e9]" />
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="mb-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter skills by category"
        >
          {FILTERS.map((f) => {
            const isActive = activeFilter === f.value;
            return (
              <motion.button
                key={f.value}
                onClick={() => setActiveFilter(f.value)}
                role="tab"
                aria-selected={isActive}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 380, damping: 22 }}
                className={[
                  "relative rounded-lg px-4 py-1.5 text-sm font-medium transition-colors duration-200",
                  isActive
                    ? "bg-[#0ea5e9]/15 text-[#38bdf8] border border-[#0284c7]/50"
                    : "border border-white/5 bg-[#0a0a0f] text-[#64748b] hover:text-[#94a3b8] hover:border-white/10",
                ].join(" ")}
              >
                {f.label}
                {/* Active underline */}
                {isActive && (
                  <motion.span
                    layoutId="filter-active"
                    className="absolute inset-0 rounded-lg ring-1 ring-[#0284c7]/40"
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((skill, i) => (
            <SkillCard key={skill.name} skill={skill} index={i} />
          ))}
        </div>

        {/* Empty state */}
        <AnimatePresence>
          {filtered.length === 0 && (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-12 text-center text-sm text-[#64748b]"
            >
              No skills in this category yet.
            </motion.p>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

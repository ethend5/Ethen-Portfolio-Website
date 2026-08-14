"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";
import type { Project } from "@/types";

// ─── Filter / sort config ─────────────────────────────────────────────────────

type CategoryFilter = Project["category"] | "all";
type SortOption = "recent" | "featured";

const CATEGORY_FILTERS: { value: CategoryFilter; label: string }[] = [
  { value: "all",      label: "All"      },
  { value: "hardware", label: "Hardware" },
  { value: "software", label: "Software" },
  { value: "ai",       label: "AI"       },
  { value: "embedded", label: "Embedded" },
  { value: "web",      label: "Web"      },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  const [search,   setSearch]   = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [sort,     setSort]     = useState<SortOption>("recent");

  const filtered = useMemo(() => {
    let result = [...projects];

    const q = search.toLowerCase().trim();
    if (q) {
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    return result.sort((a, b) => {
      if (sort === "featured") {
        if (a.featured !== b.featured) return b.featured ? 1 : -1;
      }
      return b.date.localeCompare(a.date);
    });
  }, [search, category, sort]);

  const hasActiveFilter = search !== "" || category !== "all";

  function clearFilters() {
    setSearch("");
    setCategory("all");
  }

  return (
    <div className="min-h-screen">

      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="relative overflow-hidden pt-32 pb-12 px-6">
        {/* Dot grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(56,189,248,0.12) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-80 w-80 rounded-full bg-[#0ea5e9]/5 blur-3xl" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-bold text-white md:text-5xl mb-3">
            All Projects
          </h1>
          <p className="text-[#94a3b8] text-lg">
            A collection of things I&apos;ve designed, built, and shipped.
          </p>
        </motion.div>
      </div>

      {/* ── Controls ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="px-6 pb-8"
      >
        <div className="max-w-6xl mx-auto flex flex-col gap-4">

          {/* Search + sort row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {/* Search input */}
            <div className="relative flex-1">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b] pointer-events-none"
              />
              <input
                type="text"
                placeholder="Search projects…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-white/8 bg-[#111118] py-2.5 pl-9 pr-9
                           text-sm text-white placeholder:text-[#64748b] outline-none
                           focus:border-[#0284c7]/60 focus:ring-1 focus:ring-[#0284c7]/25
                           transition-colors duration-200"
              />
              <AnimatePresence>
                {search && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748b] hover:text-white transition-colors"
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Sort dropdown */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-lg border border-white/8 bg-[#111118] px-3 py-2.5 text-sm
                         text-[#94a3b8] outline-none cursor-pointer
                         focus:border-[#0284c7]/60 focus:ring-1 focus:ring-[#0284c7]/25
                         transition-colors duration-200"
            >
              <option value="recent">Most Recent</option>
              <option value="featured">Featured First</option>
            </select>
          </div>

          {/* Category filter row */}
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by category">
            {CATEGORY_FILTERS.map((f) => {
              const isActive = category === f.value;
              return (
                <motion.button
                  key={f.value}
                  onClick={() => setCategory(f.value)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 380, damping: 22 }}
                  className={[
                    "relative rounded-lg px-4 py-1.5 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "bg-[#0ea5e9]/15 text-[#38bdf8] border border-[#0284c7]/50"
                      : "border border-white/5 bg-[#111118] text-[#64748b] hover:text-[#94a3b8] hover:border-white/10",
                  ].join(" ")}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter-active"
                      className="absolute inset-0 rounded-lg ring-1 ring-[#0284c7]/40"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  {f.label}
                </motion.button>
              );
            })}

            {/* Results + clear */}
            <div className="ml-auto flex items-center gap-3">
              <span className="text-xs text-[#64748b]">
                {filtered.length} of {projects.length}
              </span>
              <AnimatePresence>
                {hasActiveFilter && (
                  <motion.button
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    onClick={clearFilters}
                    className="text-xs text-[#38bdf8] hover:text-white transition-colors"
                  >
                    Clear filters
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Project grid ────────────────────────────────────────────── */}
      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <motion.div
                  key={project.slug}
                  layout
                  exit={{ opacity: 0, scale: 0.93, transition: { duration: 0.18 } }}
                >
                  {/*
                   * No initial/animate here — let ProjectCard's whileInView handle entrance.
                   * AnimatePresence only handles exit. layout handles repositioning.
                   */}
                  <ProjectCard project={project} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          <AnimatePresence>
            {filtered.length === 0 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center py-28 text-center"
              >
                <div className="mb-4 text-5xl">🔍</div>
                <p className="mb-1 text-lg font-semibold text-white">No projects found</p>
                <p className="mb-6 text-sm text-[#94a3b8]">
                  Try adjusting your search term or changing the category filter.
                </p>
                <button
                  onClick={clearFilters}
                  className="rounded-lg border border-[#0284c7] px-5 py-2 text-sm font-medium
                             text-[#38bdf8] hover:bg-[#0ea5e9]/10 transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

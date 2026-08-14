"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ExperienceCard from "@/components/ui/ExperienceCard";
import { experiences } from "@/data/experience";

const SKILL_PILL: Record<string, string> = {
  professional: "bg-sky-500/10 text-sky-300 border-sky-500/20",
  leadership:   "bg-violet-500/10 text-violet-300 border-violet-500/20",
  technical:    "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
};

const TYPE_ACCENT: Record<string, string> = {
  professional: "bg-sky-500",
  leadership:   "bg-violet-500",
  technical:    "bg-emerald-500",
};

function formatDate(d: string): string {
  if (d === "Present") return "Present";
  const [y, m] = d.split("-");
  return new Date(+y, +m - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function Experience() {
  const scrollRef  = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [canPrev,   setCanPrev]   = useState(false);
  const [canNext,   setCanNext]   = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const selected = experiences.find((e) => e.id === selectedId) ?? null;

  function handleSelect(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  // ESC key + body scroll lock while modal is open
  useEffect(() => {
    if (!selectedId) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setSelectedId(null);
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [selectedId]);

  // Dot tracking
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>("[data-exp-card]");
    const obs = new IntersectionObserver(
      (entries) => {
        let best = -1, bestRatio = 0;
        entries.forEach((e) => {
          if (e.intersectionRatio > bestRatio) {
            bestRatio = e.intersectionRatio;
            best = Array.from(cards).indexOf(e.target as HTMLElement);
          }
        });
        if (best !== -1) setActiveDot(best);
      },
      { root: container, threshold: [0.25, 0.5, 0.75] }
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  // Arrow enable/disable state
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    function update() {
      if (!el) return;
      setCanPrev(el.scrollLeft > 8);
      setCanNext(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    }
    update();
    el.addEventListener("scroll", update, { passive: true });
    return () => el.removeEventListener("scroll", update);
  }, []);

  function scrollBy(dir: 1 | -1) {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.querySelector<HTMLElement>("[data-exp-card]");
    const step = card ? card.offsetWidth + 24 : 260;
    container.scrollBy({ left: dir * step, behavior: "smooth" });
  }

  function scrollToCard(idx: number) {
    const container = scrollRef.current;
    if (!container) return;
    const cards = container.querySelectorAll<HTMLElement>("[data-exp-card]");
    cards[idx]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }

  return (
    <section id="experience" className="py-20 px-4 sm:py-24 sm:px-6 bg-background-800">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Experience</h2>
          <div className="h-1 w-12 rounded-full bg-primary-500" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* ── Card track ──────────────────────────────────────────────── */}
          <div className="relative">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
              aria-label="Scroll left"
              className={[
                "absolute left-0 top-1/2 z-10 -translate-x-4 -translate-y-1/2",
                "hidden sm:flex h-8 w-8 items-center justify-center rounded-full border bg-background-900",
                "transition-all duration-200",
                canPrev
                  ? "border-white/15 text-white/60 hover:border-primary-600/60 hover:text-[#38bdf8]"
                  : "border-white/5 text-white/15 cursor-not-allowed",
              ].join(" ")}
            >
              <ChevronLeft size={16} />
            </button>

            {/*
             * py-4 gives 16px of vertical padding inside the scroll container.
             * This headroom prevents overflow clipping of the whileHover y:-6 lift.
             */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto py-4"
              style={{
                scrollSnapType: "x mandatory",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitOverflowScrolling: "touch",
              } as React.CSSProperties}
            >
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  data-exp-card
                  className="w-[calc(100%-24px)] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0"
                  style={{ scrollSnapAlign: "start" }}
                >
                  <ExperienceCard
                    experience={exp}
                    isSelected={selectedId === exp.id}
                    onSelect={() => handleSelect(exp.id)}
                  />
                </div>
              ))}
              <div className="w-2 shrink-0" aria-hidden />
            </div>

            <button
              onClick={() => scrollBy(1)}
              disabled={!canNext}
              aria-label="Scroll right"
              className={[
                "absolute right-0 top-1/2 z-10 translate-x-4 -translate-y-1/2",
                "hidden sm:flex h-8 w-8 items-center justify-center rounded-full border bg-background-900",
                "transition-all duration-200",
                canNext
                  ? "border-white/15 text-white/60 hover:border-primary-600/60 hover:text-[#38bdf8]"
                  : "border-white/5 text-white/15 cursor-not-allowed",
              ].join(" ")}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Dot indicators */}
          <div className="mt-3 flex justify-center gap-2">
            {experiences.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToCard(i)}
                aria-label={`Go to experience ${i + 1}`}
                className={[
                  "h-2 rounded-full transition-all duration-300",
                  i === activeDot ? "w-6 bg-[#38bdf8]" : "w-2 bg-white/20 hover:bg-white/40",
                ].join(" ")}
              />
            ))}
          </div>
        </motion.div>

      </div>

      {/* ── Modal — rendered into document.body via portal ───────────────── */}
      {isMounted && createPortal(
        <AnimatePresence>
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedId(null)}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

              {/* Modal panel */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 10 }}
                transition={{ duration: 0.22, ease: "easeOut" }}
                className="relative w-full max-w-2xl rounded-2xl border border-white/10 bg-background-900 shadow-2xl max-h-[85vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedId(null)}
                  aria-label="Close"
                  className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full
                             border border-white/10 bg-white/5 text-white/50
                             hover:border-white/20 hover:text-white transition-colors"
                >
                  <X size={14} />
                </button>

                {/* Accent bar */}
                <div className={`h-1 w-full rounded-t-2xl ${TYPE_ACCENT[selected.type]}`} />

                {/* Content */}
                <div className="p-6 sm:p-8">

                  {/* Header — logo + role + company + period */}
                  <div className="flex items-start gap-4 mb-5 pr-8">
                    <div className="shrink-0 h-12 w-12 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
                      {selected.logo ? (
                        <Image
                          src={selected.logo}
                          alt={selected.company}
                          width={40}
                          height={40}
                          className="object-contain p-1"
                        />
                      ) : (
                        <span className="text-sm font-bold text-white/40">
                          {selected.company.slice(0, 2).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl font-bold text-white leading-snug">{selected.role}</h3>
                      <p className="text-sm text-text-secondary mt-0.5">{selected.company}</p>
                      <p className="text-xs text-text-muted mt-1">
                        {formatDate(selected.startDate)} – {formatDate(selected.endDate)}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  {selected.description && (
                    <p className="text-sm leading-relaxed text-text-secondary mb-5">
                      {selected.description}
                    </p>
                  )}

                  {/* Responsibilities */}
                  {selected.responsibilities.length > 0 && (
                    <div className="mb-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
                        Responsibilities
                      </p>
                      <ul className="flex flex-col gap-2.5">
                        {selected.responsibilities.map((r, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-sm text-text-secondary">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-500/60" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills */}
                  {selected.skills.length > 0 && (
                    <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
                      {selected.skills.map((s) => (
                        <span
                          key={s}
                          className={`rounded-md border px-2.5 py-1 text-xs font-medium ${SKILL_PILL[selected.type]}`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}

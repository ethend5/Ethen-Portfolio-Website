"use client";

import { motion, type Variants } from "framer-motion";
import Carousel from "@/components/ui/Carousel";

// Year Ethen started gaining professional/engineering experience
const EXPERIENCE_START_YEAR = 2023;

function getStats(projectCount: number, skillCount: number) {
  const yearsOfExperience = new Date().getFullYear() - EXPERIENCE_START_YEAR;
  return [
    { value: `${projectCount}+`, label: "Projects Completed"  },
    { value: `${skillCount}+`,   label: "Technologies"        },
    { value: `${yearsOfExperience}+`, label: "Years of Experience" },
  ];
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

interface Props {
  projectCount: number;
  skillCount: number;
  bioParagraphs: string[];
  focusAreas: string[];
  images: string[];
}

export default function About({ projectCount, skillCount, bioParagraphs, focusAreas, images }: Props) {
  return (
    <section id="about" className="py-16 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-white mb-2 md:text-3xl">About Me</h2>
          <div className="h-1 w-12 rounded-full bg-[#0ea5e9]" />
        </motion.div>

        {/*
          Grid layout — 2 columns on desktop:
            [bio text + pills]  [carousel]
                                [stat cards]
          Mobile: single column, DOM source order = bio+tags → carousel → stats
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-start">

          {/* ── 1. Bio text + pills ──────────────────────────────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-5 text-text-secondary leading-relaxed"
          >
            {bioParagraphs.map((paragraph, i) => (
              <motion.p key={i} variants={itemVariants}>
                {paragraph}
              </motion.p>
            ))}

            {/* Quick-fact tags */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2 pt-2">
              {focusAreas.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-white/5 bg-background-800 px-3 py-1
                             text-xs font-medium text-text-muted"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── 2. Carousel + stat cards, stacked in the right column ──── */}
          <div className="flex flex-col gap-8 min-w-0 lg:min-w-[320px]">

            {images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                className="flex flex-col items-center justify-center"
              >
                <Carousel images={images} />
              </motion.div>
            )}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <div style={{ display: "flex", gap: "16px", width: "100%" }}>
                {getStats(projectCount, skillCount).map(({ value, label }) => (
                  <motion.div
                    key={label}
                    variants={itemVariants}
                    style={{ flex: 1 }}
                    className="flex flex-col items-center justify-center gap-1 rounded-lg
                               border border-white/5 border-l-[3px] border-l-primary-500
                               bg-background-800 px-3 py-3 text-center"
                  >
                    <span className="text-xl font-bold text-[#38bdf8]">{value}</span>
                    <span
                      style={{
                        fontSize: "clamp(0.7rem, 1.5vw, 0.85rem)",
                        whiteSpace: "normal",
                        textAlign: "center",
                      }}
                      className="text-text-muted"
                    >
                      {label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}

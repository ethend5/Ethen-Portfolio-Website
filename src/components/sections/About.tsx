"use client";

import { motion, type Variants } from "framer-motion";
import Carousel from "@/components/ui/Carousel";

/*
 * ── Photo paths ────────────────────────────────────────────────────────────
 * Save the three photos to public/images/ using these exact filenames:
 *   about-1.jpg  →  hiking in the Santa Cruz redwoods (UCSC hoodie)
 *   about-2.jpg  →  photography / camera shot
 *   about-3.jpg  →  water polo
 */
const ABOUT_IMAGES = [
  "/images/about-1.jpg",
  "/images/about-2.jpg",
  "/images/about-3.jpg",
];

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
}

export default function About({ projectCount, skillCount, bioParagraphs, focusAreas }: Props) {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-2">About Me</h2>
          <div className="h-1 w-12 rounded-full bg-[#0ea5e9]" />
        </motion.div>

        {/*
          Grid layout — 3 children, 2 columns on desktop:
            [text+pills]  [carousel]   ← row 1
            [stat cards]  [carousel]   ← row 2 (carousel spans both rows)
          Mobile: single column, DOM source order = text → carousel → stats
        */}
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 items-center">

          {/* ── 1. Bio text + pills (col 1, row 1 on desktop) ──────────── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-col gap-5 text-text-secondary leading-relaxed
                       lg:col-start-1 lg:row-start-1"
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

          {/* ── 2. Carousel (col 2, spans both rows on desktop; row 2 mobile) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="min-w-0 lg:min-w-[320px] lg:col-start-2 lg:row-start-1 lg:row-end-3
                       flex flex-col items-center justify-center"
          >
            <Carousel images={ABOUT_IMAGES} />
          </motion.div>

          {/* ── 3. Stat cards (col 1, row 2 on desktop; row 3 mobile) ───── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="lg:col-start-1 lg:row-start-2 lg:self-start"
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
    </section>
  );
}

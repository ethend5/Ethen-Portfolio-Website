"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

const featured = projects.filter((p) => p.featured).slice(0, 3);

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Featured Projects</h2>
          <div className="h-1 w-12 rounded-full bg-[#0ea5e9]" />
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {featured.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </div>

        {/* View all CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 350, damping: 22 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-lg border border-[#0284c7]
                         px-8 py-3 text-sm font-semibold text-[#38bdf8]
                         hover:bg-[#0ea5e9]/10 hover:border-[#38bdf8]
                         transition-colors duration-200"
            >
              View All Projects
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

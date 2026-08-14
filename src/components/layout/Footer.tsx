"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, ArrowUp } from "lucide-react";

// ─── Brand SVGs (lucide-react v1 has no brand icons) ─────────────────────────

function GithubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ─── Social links config ──────────────────────────────────────────────────────

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/ethend5",                  // Replace with your GitHub URL
    icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ethen-dhanaraj/", // Replace with your LinkedIn URL
    icon: LinkedinIcon,
  },
  {
    label: "Email",
    href: "mailto:ethendhanaraj@gmail.com",            // Replace with your real email
    icon: Mail,
  },
] as const;

// ─── Back-to-top button ───────────────────────────────────────────────────────

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          whileHover={{ y: -3, boxShadow: "0 0 18px 2px rgba(14,165,233,0.35)" }}
          whileTap={{ scale: 0.93 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-background-800 border border-primary-600/50 text-[#38bdf8] hover:border-[#38bdf8] transition-colors duration-200"
        >
          <ArrowUp size={16} strokeWidth={2.5} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <>
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="border-t border-white/8 bg-background-900"
      >
        <div className="max-w-6xl mx-auto px-6 py-10">

          {/* Top row: logo + social icons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

            {/* Logo */}
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-md bg-primary-500/15 border border-primary-500/30 text-[#38bdf8] text-sm font-bold font-mono">
                ED
              </span>
              <span className="text-sm font-semibold text-white/80">
                Ethen Dhanaraj
              </span>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-5">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="text-text-muted hover:text-[#38bdf8] transition-colors duration-200"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-white/5" />

          {/* Bottom row: copyright + credit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-text-muted">
            <p>© 2026 Ethen Dhanaraj. All rights reserved.</p>
            <p>Coded by Ethen Dhanaraj</p>
          </div>

        </div>
      </motion.footer>

      <BackToTop />
    </>
  );
}

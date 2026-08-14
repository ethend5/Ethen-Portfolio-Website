"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "About",      href: "#about"      },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
] as const;

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

function useScrolled(threshold = 10) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Track how much of each section is visible
    const visibilityMap = new Map<string, number>();

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          visibilityMap.set(id, entry.intersectionRatio);
          // Pick the section with the highest intersection ratio
          let bestId = "";
          let bestRatio = 0;
          visibilityMap.forEach((ratio, key) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              bestId = key;
            }
          });
          setActive(bestId);
        },
        { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0], rootMargin: "-10% 0px -10% 0px" }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);

  return active;
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
}

// ─── Desktop nav link ────────────────────────────────────────────────────────

function NavLink({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <li className="relative">
      <button
        onClick={onClick}
        className={[
          "relative py-1 text-sm font-medium transition-colors duration-200",
          isActive ? "text-white" : "text-text-secondary hover:text-white",
        ].join(" ")}
        aria-current={isActive ? "page" : undefined}
      >
        {label}

        {/* Hover underline */}
        <motion.span
          className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#38bdf8]/50 rounded-full"
          initial={false}
          animate={{ scaleX: isActive ? 0 : 0, opacity: 0 }}
          whileHover={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
          style={{ originX: 0 }}
        />

        {/* Active indicator */}
        {isActive && (
          <motion.span
            layoutId="nav-active-indicator"
            className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#38bdf8] rounded-full"
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          />
        )}
      </button>
    </li>
  );
}

// ─── Mobile overlay link ──────────────────────────────────────────────────────

function MobileLink({
  label,
  index,
  isActive,
  onClick,
}: {
  label: string;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: "spring", stiffness: 300, damping: 28, delay: index * 0.06 }}
    >
      <button
        onClick={onClick}
        className={[
          "w-full text-left text-2xl font-semibold py-3 transition-colors duration-200 border-b border-white/5",
          isActive ? "text-[#38bdf8]" : "text-text-secondary hover:text-white",
        ].join(" ")}
      >
        {label}
      </button>
    </motion.li>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled();
  const active = useActiveSection(SECTION_IDS);
  const pathname = usePathname();

  // Prevent body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // After navigating from another page (e.g. /resume → /#projects), Next.js
  // resets scroll during hydration. Re-scroll to the hash once effects run.
  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
  }, [pathname]);

  function handleNavClick(id: string) {
    setMobileOpen(false);
    if (pathname !== "/") {
      window.location.href = "/#" + id;
    } else {
      scrollToSection(id);
    }
  }

  return (
    <>
      {/* ── Navbar bar ─────────────────────────────────────────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-background-900/85 backdrop-blur-xl border-b border-white/8 shadow-lg shadow-black/20"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

          {/* Logo — navigates to home from any page */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            aria-label="Go to home"
            onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}
          >
            {/* ED monogram box */}
            <span className="flex items-center justify-center w-8 h-8 rounded-md bg-primary-500/15 border border-primary-500/30 text-[#38bdf8] text-sm font-bold font-mono group-hover:bg-primary-500/25 group-hover:border-primary-500/50 transition-all duration-200">
              ED
            </span>
            <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors duration-200 hidden sm:block">
              Ethen Dhanaraj
            </span>
          </Link>

          {/* Desktop links */}
          <nav aria-label="Primary navigation">
            <ul className="hidden md:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  label={link.label}
                  isActive={active === link.href.slice(1)}
                  onClick={() => handleNavClick(link.href.slice(1))}
                />
              ))}

              {/* Resume button */}
              <li>
                <a
                  href="/resume"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium rounded-md border border-primary-600 text-[#38bdf8] hover:bg-primary-500/10 hover:border-[#38bdf8] transition-all duration-200"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden relative w-9 h-9 flex items-center justify-center text-text-secondary hover:text-white transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="x"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={22} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={22} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* ── Mobile fullscreen overlay ───────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />

            {/* Panel */}
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-40 w-[min(80vw,340px)] bg-background-800 border-l border-white/8 flex flex-col md:hidden"
            >
              {/* Panel header */}
              <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
                <span className="flex items-center justify-center w-8 h-8 rounded-md bg-primary-500/15 border border-primary-500/30 text-[#38bdf8] text-sm font-bold font-mono">
                  ED
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-text-secondary hover:text-white transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Links */}
              <nav className="flex-1 overflow-y-auto px-6 py-8" aria-label="Mobile navigation">
                <ul className="flex flex-col">
                  {NAV_LINKS.map((link, i) => (
                    <MobileLink
                      key={link.href}
                      label={link.label}
                      index={i}
                      isActive={active === link.href.slice(1)}
                      onClick={() => handleNavClick(link.href.slice(1))}
                    />
                  ))}
                </ul>

                {/* Resume in mobile menu */}
                <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 28,
                    delay: NAV_LINKS.length * 0.06,
                  }}
                  className="mt-8"
                >
                  <a
                    href="/resume"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center w-full py-3 rounded-lg border border-primary-600 text-[#38bdf8] font-medium hover:bg-primary-500/10 transition-all duration-200"
                  >
                    Resume
                  </a>
                </motion.div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

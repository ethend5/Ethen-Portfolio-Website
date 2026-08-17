"use client";

import { useEffect } from "react";

// Renders nothing. On mount, checks window.location.hash and smooth-scrolls
// to the matching section — the App Router doesn't do this automatically
// after a full route navigation (e.g. clicking "Contact" from a project page).
export default function ScrollToHash() {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return null;
}

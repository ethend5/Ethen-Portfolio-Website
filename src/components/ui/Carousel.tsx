"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  images: string[];
}

export default function Carousel({ images }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const hovered = useRef(false);

  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length]
  );

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );

  useEffect(() => {
    const id = setInterval(() => {
      if (!hovered.current) next();
    }, 4000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="flex flex-col items-center gap-3 w-full">
      {/* Image frame — drop photos at public/images/about-1.jpg … about-4.jpg */}
      <div
        className="relative w-full h-75 lg:h-105 rounded-2xl overflow-hidden bg-background-800"
        onMouseEnter={() => { hovered.current = true; }}
        onMouseLeave={() => { hovered.current = false; }}
      >
        <AnimatePresence mode="sync">
          <motion.img
            key={current}
            src={images[current]}
            alt={`About photo ${current + 1}`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </AnimatePresence>

        <button
          onClick={prev}
          aria-label="Previous photo"
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full
                     bg-black/40 p-1.5 text-white backdrop-blur-sm
                     hover:bg-black/65 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          aria-label="Next photo"
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full
                     bg-black/40 p-1.5 text-white backdrop-blur-sm
                     hover:bg-black/65 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-5 bg-[#0ea5e9]" : "w-2 bg-white/20 hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

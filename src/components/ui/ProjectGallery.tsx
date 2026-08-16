"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const GRID_LIMIT = 9;

interface Props {
  images: string[];
  title: string;
}

export default function ProjectGallery({ images, title }: Props) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (images.length === 0) return null;

  const visible = images.slice(0, GRID_LIMIT);
  const remaining = images.length - GRID_LIMIT;

  return (
    <div className="rounded-xl border border-white/5 bg-[#111118] p-5">
      <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#64748b]">
        Gallery
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {visible.map((url, i) => {
          const isLastWithOverflow = i === GRID_LIMIT - 1 && remaining > 0;
          return (
            <button
              key={url + i}
              type="button"
              onClick={() => setLightboxIndex(i)}
              aria-label={`View photo ${i + 1} of ${images.length}`}
              className="group relative aspect-square overflow-hidden rounded-md bg-background-900"
            >
              <Image
                src={url}
                alt={`${title} photo ${i + 1}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="120px"
              />
              {isLastWithOverflow && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-sm font-semibold text-white">
                  +{remaining}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {lightboxIndex !== null && (
        <GalleryLightbox
          images={images}
          title={title}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onChangeIndex={setLightboxIndex}
        />
      )}
    </div>
  );
}

// ─── Lightbox ──────────────────────────────────────────────────────────────

interface LightboxProps {
  images: string[];
  title: string;
  index: number;
  onClose: () => void;
  onChangeIndex: (index: number) => void;
}

function GalleryLightbox({ images, title, index, onClose, onChangeIndex }: LightboxProps) {
  const next = useCallback(
    () => onChangeIndex((index + 1) % images.length),
    [index, images.length, onChangeIndex]
  );
  const prev = useCallback(
    () => onChangeIndex((index - 1 + images.length) % images.length),
    [index, images.length, onChangeIndex]
  );

  // Keyboard navigation + close, and lock page scroll while open.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, next, prev]);

  const handleDragEnd = useCallback(
    (_e: unknown, info: PanInfo) => {
      const SWIPE_DISTANCE = 50;
      const SWIPE_VELOCITY = 400;
      if (info.offset.x < -SWIPE_DISTANCE || info.velocity.x < -SWIPE_VELOCITY) {
        next();
      } else if (info.offset.x > SWIPE_DISTANCE || info.velocity.x > SWIPE_VELOCITY) {
        prev();
      }
    },
    [next, prev]
  );

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center
                     rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Counter */}
        <div className="absolute top-4 left-4 z-10 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/80">
          {index + 1} / {images.length}
        </div>

        {/* Prev / Next */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center
                         justify-center rounded-full bg-white/10 text-white hover:bg-white/20
                         transition-colors sm:left-6"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-11 w-11 items-center
                         justify-center rounded-full bg-white/10 text-white hover:bg-white/20
                         transition-colors sm:right-6"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Full-size image — swipe on mobile, drag on desktop, same threshold
            technique as the About carousel, reimplemented here rather than
            imported so this stays a fully separate component. */}
        <motion.img
          key={index}
          src={images[index]}
          alt={`${title} photo ${index + 1}`}
          draggable={false}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="max-h-[85vh] max-w-full rounded-lg object-contain cursor-grab active:cursor-grabbing"
          style={{ touchAction: "pan-y" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          onClick={(e) => e.stopPropagation()}
        />
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

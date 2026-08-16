"use client";

import { useState } from "react";
import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import { ImageUp, X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  name: string;
  label: string;
  defaultValue?: string[];
}

export default function CloudinaryGalleryField({ name, label, defaultValue = [] }: Props) {
  const [urls, setUrls] = useState<string[]>(defaultValue);

  function handleSuccess(result: CloudinaryUploadWidgetResults) {
    const info = result.info;
    if (info && typeof info === "object" && "secure_url" in info) {
      setUrls((prev) => [...prev, info.secure_url as string]);
    }
  }

  function removeAt(index: number) {
    setUrls((prev) => prev.filter((_, i) => i !== index));
  }

  function moveAt(index: number, dir: -1 | 1) {
    setUrls((prev) => {
      const target = index + dir;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-text-secondary">{label}</span>

      {urls.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {urls.map((url, i) => (
            <div
              key={url + i}
              className="group relative aspect-square overflow-hidden rounded-lg border border-white/8 bg-[#111118]"
            >
              <input type="hidden" name={name} value={url} />
              {/* eslint-disable-next-line @next/next/no-img-element -- arbitrary/user-supplied URLs, not a build-time-known set of remote hosts */}
              <img src={url} alt="" className="h-full w-full object-cover" />

              <div
                className="absolute inset-0 flex flex-col items-center justify-between p-1.5
                           opacity-0 transition-opacity duration-150 group-hover:bg-black/50 group-hover:opacity-100"
              >
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  aria-label="Remove image"
                  className="ml-auto flex h-6 w-6 items-center justify-center rounded-md bg-black/60 text-white
                             hover:bg-red-500/80 transition-colors"
                >
                  <X size={13} />
                </button>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => moveAt(i, -1)}
                    disabled={i === 0}
                    aria-label="Move earlier"
                    className="flex h-6 w-6 items-center justify-center rounded-md bg-black/60 text-white
                               disabled:opacity-30 hover:bg-white/20 transition-colors"
                  >
                    <ChevronLeft size={13} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveAt(i, 1)}
                    disabled={i === urls.length - 1}
                    aria-label="Move later"
                    className="flex h-6 w-6 items-center justify-center rounded-md bg-black/60 text-white
                               disabled:opacity-30 hover:bg-white/20 transition-colors"
                  >
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <CldUploadWidget
        signatureEndpoint="/api/sign-cloudinary"
        onSuccess={handleSuccess}
        options={{ multiple: true, folder: "portfolio", sources: ["local", "url", "camera"] }}
      >
        {({ open }) => (
          <button
            type="button"
            onClick={() => open()}
            className="flex w-fit items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5
                       text-xs text-text-secondary hover:text-white hover:border-white/20
                       transition-colors duration-200"
          >
            <ImageUp size={13} />
            Add Images
          </button>
        )}
      </CldUploadWidget>
    </div>
  );
}

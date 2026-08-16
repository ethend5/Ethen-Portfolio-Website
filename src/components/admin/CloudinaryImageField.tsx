"use client";

import { useState } from "react";
import { CldUploadWidget, type CloudinaryUploadWidgetResults } from "next-cloudinary";
import { ImageUp, Image as ImageIcon } from "lucide-react";

const INPUT_CLASS =
  "w-full rounded-lg border border-white/8 bg-[#111118] px-4 py-2.5 text-sm text-white " +
  "placeholder:text-[#64748b] outline-none " +
  "focus:border-[#0284c7]/60 focus:ring-1 focus:ring-[#0284c7]/30 " +
  "transition-colors duration-200";

interface Props {
  name: string;
  label: string;
  defaultValue?: string | null;
  placeholder?: string;
}

export default function CloudinaryImageField({ name, label, defaultValue, placeholder }: Props) {
  const [url, setUrl] = useState(defaultValue ?? "");

  function handleSuccess(result: CloudinaryUploadWidgetResults) {
    const info = result.info;
    if (info && typeof info === "object" && "secure_url" in info) {
      setUrl(info.secure_url as string);
    }
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-text-secondary">{label}</span>
      <div className="flex items-start gap-3">
        {/* Preview of the currently-set image */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/8 bg-[#111118]">
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element -- arbitrary/user-supplied URLs, not a build-time-known set of remote hosts
            <img src={url} alt="" className="h-full w-full object-cover" />
          ) : (
            <ImageIcon size={18} className="text-text-muted" />
          )}
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <input
            name={name}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={placeholder}
            className={INPUT_CLASS}
          />
          <CldUploadWidget
            signatureEndpoint="/api/sign-cloudinary"
            onSuccess={handleSuccess}
            options={{ multiple: false, folder: "portfolio", sources: ["local", "url", "camera"] }}
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
                Upload Image
              </button>
            )}
          </CldUploadWidget>
        </div>
      </div>
    </div>
  );
}

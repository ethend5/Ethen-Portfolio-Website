"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import type { SiteContentRow } from "@/lib/supabase/site-content";
import { updateSiteContent, type ActionState } from "./actions";

const INPUT_CLASS =
  "w-full rounded-lg border border-white/8 bg-[#111118] px-4 py-2.5 text-sm text-white " +
  "placeholder:text-[#64748b] outline-none " +
  "focus:border-[#0284c7]/60 focus:ring-1 focus:ring-[#0284c7]/30 " +
  "transition-colors duration-200";

const TEXTAREA_CLASS = `${INPUT_CLASS} resize-none`;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-text-secondary">{label}</span>
      {children}
    </label>
  );
}

interface Props {
  content: SiteContentRow;
}

const initialState: ActionState = {};

export default function HomeContentForm({ content }: Props) {
  const [state, formAction, pending] = useActionState(updateSiteContent, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name">
          <input
            name="name"
            required
            defaultValue={content.name}
            className={INPUT_CLASS}
          />
        </Field>
        <Field label="Tagline">
          <input
            name="tagline"
            defaultValue={content.tagline ?? ""}
            placeholder="Electrical Engineering Student at UC Santa Cruz"
            className={INPUT_CLASS}
          />
        </Field>
      </div>

      <Field label="Bio (separate paragraphs with a blank line)">
        <textarea
          name="bio"
          rows={10}
          defaultValue={content.bio ?? ""}
          className={TEXTAREA_CLASS}
        />
      </Field>

      <Field label="Rotating header phrases (one per line)">
        <textarea
          name="typed_phrases"
          rows={4}
          defaultValue={content.typed_phrases?.join("\n")}
          placeholder={"Embedded Systems Developer\nAI & Hardware Enthusiast"}
          className={TEXTAREA_CLASS}
        />
      </Field>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Resume URL">
          <input
            name="resume_url"
            defaultValue={content.resume_url ?? ""}
            placeholder="/resume.pdf"
            className={INPUT_CLASS}
          />
        </Field>
        <Field label="Email">
          <input
            type="email"
            name="email"
            defaultValue={content.email ?? ""}
            placeholder="you@example.com"
            className={INPUT_CLASS}
          />
        </Field>
        <Field label="LinkedIn URL">
          <input
            name="linkedin_url"
            defaultValue={content.linkedin_url ?? ""}
            placeholder="https://linkedin.com/in/…"
            className={INPUT_CLASS}
          />
        </Field>
        <Field label="GitHub URL">
          <input
            name="github_url"
            defaultValue={content.github_url ?? ""}
            placeholder="https://github.com/…"
            className={INPUT_CLASS}
          />
        </Field>
      </div>

      {state.error && <p className="text-sm text-red-400">{state.error}</p>}
      {state.success && !state.error && (
        <p className="text-sm text-emerald-400">Saved.</p>
      )}

      <motion.button
        type="submit"
        disabled={pending}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className="flex items-center justify-center gap-2 self-start rounded-lg bg-primary-500
                   px-6 py-3 text-sm font-semibold text-white
                   hover:bg-primary-600 disabled:opacity-60 disabled:cursor-not-allowed
                   transition-colors duration-200"
      >
        {pending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Saving…
          </>
        ) : (
          <>
            <Save size={14} strokeWidth={2.5} />
            Save Changes
          </>
        )}
      </motion.button>
    </form>
  );
}

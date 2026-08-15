"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import type { ExperienceRow } from "@/lib/supabase/experience";
import type { ActionState } from "./actions";

const INPUT_CLASS =
  "w-full rounded-lg border border-white/8 bg-[#111118] px-4 py-2.5 text-sm text-white " +
  "placeholder:text-[#64748b] outline-none " +
  "focus:border-[#0284c7]/60 focus:ring-1 focus:ring-[#0284c7]/30 " +
  "transition-colors duration-200";

const TEXTAREA_CLASS = `${INPUT_CLASS} resize-none`;

const TYPE_OPTIONS = [
  { value: "professional", label: "Internship" },
  { value: "leadership", label: "Leadership" },
  { value: "technical", label: "Technical" },
] as const;

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-text-secondary">{label}</span>
      {children}
    </label>
  );
}

interface Props {
  experience?: ExperienceRow;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
}

const initialState: ActionState = {};

export default function ExperienceForm({ experience, action, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Basic Info
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Company">
            <input
              name="company"
              required
              defaultValue={experience?.company}
              placeholder="Company name"
              className={INPUT_CLASS}
            />
          </Field>
          <Field label="Role">
            <input
              name="role"
              required
              defaultValue={experience?.role}
              placeholder="Job title"
              className={INPUT_CLASS}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Type">
            <select
              name="type"
              required
              defaultValue={experience?.type ?? "professional"}
              className={INPUT_CLASS}
            >
              {TYPE_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Location">
            <input
              name="location"
              defaultValue={experience?.location ?? ""}
              placeholder="City, State (optional)"
              className={INPUT_CLASS}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Start Date">
            <input
              name="start_date"
              required
              defaultValue={experience?.start_date}
              placeholder="YYYY-MM"
              className={INPUT_CLASS}
            />
          </Field>
          <Field label="End Date">
            <input
              name="end_date"
              defaultValue={experience?.end_date ?? ""}
              placeholder="YYYY-MM, or blank for Present"
              className={INPUT_CLASS}
            />
          </Field>
          <Field label="Display Order">
            <input
              type="number"
              name="display_order"
              defaultValue={experience?.display_order ?? 0}
              className={INPUT_CLASS}
            />
          </Field>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
          Content
        </h2>

        <Field label="Description">
          <textarea
            name="description"
            rows={3}
            defaultValue={experience?.description ?? ""}
            placeholder="One or two sentence summary"
            className={TEXTAREA_CLASS}
          />
        </Field>

        <Field label="Responsibilities (one per line)">
          <textarea
            name="bullets"
            rows={5}
            defaultValue={experience?.bullets?.join("\n")}
            placeholder={"Led a cross-functional team of 5...\nDesigned and shipped..."}
            className={TEXTAREA_CLASS}
          />
        </Field>

        <Field label="Skills (comma-separated)">
          <input
            name="skills"
            defaultValue={experience?.skills?.join(", ")}
            placeholder="React, TypeScript, Leadership"
            className={INPUT_CLASS}
          />
        </Field>
      </div>

      {state.error && <p className="text-sm text-red-400">{state.error}</p>}

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
            {submitLabel}
          </>
        )}
      </motion.button>
    </form>
  );
}

"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import CloudinaryImageField from "@/components/admin/CloudinaryImageField";
import type { SkillRow } from "@/lib/supabase/skills";
import type { ActionState } from "./actions";

const INPUT_CLASS =
  "w-full rounded-lg border border-white/8 bg-[#111118] px-4 py-2.5 text-sm text-white " +
  "placeholder:text-[#64748b] outline-none " +
  "focus:border-[#0284c7]/60 focus:ring-1 focus:ring-[#0284c7]/30 " +
  "transition-colors duration-200";

const CATEGORY_OPTIONS = [
  { value: "programming", label: "Programming" },
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "cad", label: "CAD" },
  { value: "tools", label: "Tools" },
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
  skill?: SkillRow;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
}

const initialState: ActionState = {};

export default function SkillForm({ skill, action, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Name">
          <input
            name="name"
            required
            defaultValue={skill?.name}
            placeholder="React"
            className={INPUT_CLASS}
          />
        </Field>
        <Field label="Category">
          <select
            name="category"
            required
            defaultValue={skill?.category ?? "programming"}
            className={INPUT_CLASS}
          >
            {CATEGORY_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <CloudinaryImageField
        name="icon"
        label="Icon"
        defaultValue={skill?.icon}
        placeholder="/skills/react.svg or https://…"
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Proficiency (1–5)">
          <input
            type="number"
            name="proficiency"
            min={1}
            max={5}
            defaultValue={skill?.proficiency ?? ""}
            placeholder="Optional"
            className={INPUT_CLASS}
          />
        </Field>
        <Field label="Display Order">
          <input
            type="number"
            name="display_order"
            defaultValue={skill?.display_order ?? 0}
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

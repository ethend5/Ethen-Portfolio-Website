"use client";

import { useActionState, useState } from "react";
import { motion } from "framer-motion";
import { Save } from "lucide-react";
import type { ProjectRow } from "@/lib/supabase/projects";
import type { ActionState } from "./actions";

const INPUT_CLASS =
  "w-full rounded-lg border border-white/8 bg-[#111118] px-4 py-2.5 text-sm text-white " +
  "placeholder:text-[#64748b] outline-none " +
  "focus:border-[#0284c7]/60 focus:ring-1 focus:ring-[#0284c7]/30 " +
  "transition-colors duration-200";

const TEXTAREA_CLASS = `${INPUT_CLASS} resize-none`;

const CATEGORY_OPTIONS = [
  { value: "hardware", label: "Hardware" },
  { value: "software", label: "Software" },
  { value: "ai", label: "AI / ML" },
  { value: "embedded", label: "Embedded" },
  { value: "web", label: "Web" },
] as const;

const LINK_TYPE_OPTIONS = [
  { value: "", label: "None" },
  { value: "github", label: "GitHub" },
  { value: "youtube", label: "YouTube Demo" },
] as const;

const LINK_TYPE_META: Record<string, { label: string; placeholder: string }> = {
  "": { label: "Project URL", placeholder: "Pick a link type above to enable this field" },
  github: { label: "GitHub URL", placeholder: "https://github.com/username/repo" },
  youtube: { label: "YouTube URL", placeholder: "https://youtube.com/watch?v=… or a youtu.be link" },
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-text-secondary">{label}</span>
      {children}
    </label>
  );
}

interface Props {
  project?: ProjectRow;
  action: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
  submitLabel: string;
}

const initialState: ActionState = {};

export default function ProjectForm({ project, action, submitLabel }: Props) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const [title, setTitle] = useState(project?.title ?? "");
  const [slug, setSlug] = useState(project?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(project));
  const [linkType, setLinkType] = useState(project?.link_type ?? "");
  const linkTypeMeta = LINK_TYPE_META[linkType];

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setTitle(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  return (
    <form action={formAction} className="flex flex-col gap-10">
      {/* ── Basic info ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
          Basic Info
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Title">
            <input
              name="title"
              required
              value={title}
              onChange={handleTitleChange}
              placeholder="Project name"
              className={INPUT_CLASS}
            />
          </Field>
          <Field label="Slug">
            <input
              name="slug"
              required
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setSlugTouched(true);
              }}
              placeholder="project-name"
              className={INPUT_CLASS}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Category">
            <select
              name="category"
              required
              defaultValue={project?.category ?? "software"}
              className={INPUT_CLASS}
            >
              {CATEGORY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Date Built">
            <input
              type="month"
              name="date"
              required
              defaultValue={project?.date?.slice(0, 7)}
              className={INPUT_CLASS}
            />
          </Field>
          <Field label="Display Order">
            <input
              type="number"
              name="display_order"
              defaultValue={project?.display_order ?? 0}
              className={INPUT_CLASS}
            />
          </Field>
        </div>

        <label className="flex items-center gap-2 text-sm text-text-secondary">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={project?.featured}
            className="h-4 w-4 rounded border-white/20 bg-[#111118] accent-[#0ea5e9]"
          />
          Featured project
        </label>
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
          Content
        </h2>

        <Field label="Short Description">
          <textarea
            name="description"
            required
            rows={3}
            defaultValue={project?.description}
            placeholder="One or two sentences shown on project cards"
            className={TEXTAREA_CLASS}
          />
        </Field>

        <Field label="Tags (comma-separated)">
          <input
            name="tags"
            defaultValue={project?.tags?.join(", ")}
            placeholder="React, TypeScript, Node.js"
            className={INPUT_CLASS}
          />
        </Field>

        <Field label="Image URL">
          <input
            name="image_url"
            defaultValue={project?.image_url ?? ""}
            placeholder="/projects/my-project.png or https://…"
            className={INPUT_CLASS}
          />
        </Field>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-medium text-text-secondary">Link Type</span>
          <div className="flex flex-wrap gap-2">
            {LINK_TYPE_OPTIONS.map((o) => {
              const isActive = linkType === o.value;
              return (
                <label
                  key={o.value || "none"}
                  className={[
                    "cursor-pointer rounded-lg px-4 py-1.5 text-sm font-medium border transition-colors duration-200",
                    isActive
                      ? "bg-[#0ea5e9]/15 text-[#38bdf8] border-[#0284c7]/50"
                      : "border-white/5 bg-[#111118] text-[#64748b] hover:text-[#94a3b8] hover:border-white/10",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="link_type"
                    value={o.value}
                    checked={isActive}
                    onChange={() => setLinkType(o.value)}
                    className="sr-only"
                  />
                  {o.label}
                </label>
              );
            })}
          </div>
        </div>

        <Field label={linkTypeMeta.label}>
          <input
            name="project_url"
            defaultValue={project?.project_url ?? ""}
            placeholder={linkTypeMeta.placeholder}
            className={INPUT_CLASS}
          />
        </Field>
      </div>

      {/* ── Case study ─────────────────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
          Case Study <span className="normal-case text-text-muted/70">(optional)</span>
        </h2>

        <Field label="Overview">
          <textarea
            name="long_description"
            rows={3}
            defaultValue={project?.long_description ?? ""}
            className={TEXTAREA_CLASS}
          />
        </Field>
        <Field label="The Problem">
          <textarea
            name="problem"
            rows={3}
            defaultValue={project?.problem ?? ""}
            className={TEXTAREA_CLASS}
          />
        </Field>
        <Field label="Design Process">
          <textarea
            name="process"
            rows={3}
            defaultValue={project?.process ?? ""}
            className={TEXTAREA_CLASS}
          />
        </Field>
        <Field label="Technical Challenges">
          <textarea
            name="challenges"
            rows={3}
            defaultValue={project?.challenges ?? ""}
            className={TEXTAREA_CLASS}
          />
        </Field>
        <Field label="Results">
          <textarea
            name="results"
            rows={3}
            defaultValue={project?.results ?? ""}
            className={TEXTAREA_CLASS}
          />
        </Field>
        <Field label="Lessons Learned">
          <textarea
            name="lessons"
            rows={3}
            defaultValue={project?.lessons ?? ""}
            className={TEXTAREA_CLASS}
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

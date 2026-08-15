"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteExperience } from "./actions";

interface Props {
  id: string;
  label: string;
}

export default function DeleteExperienceButton({ id, label }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
    startTransition(() => {
      deleteExperience(id);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      aria-label={`Delete ${label}`}
      className="flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5
                 text-xs text-red-400/80 hover:text-red-400 hover:border-red-400/40
                 disabled:opacity-60 disabled:cursor-not-allowed
                 transition-colors duration-200"
    >
      <Trash2 size={13} />
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}

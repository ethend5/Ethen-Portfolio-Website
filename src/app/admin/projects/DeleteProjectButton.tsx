"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteProject } from "./actions";

interface Props {
  id: string;
  title: string;
}

export default function DeleteProjectButton({ id, title }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    startTransition(() => {
      deleteProject(id);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      aria-label={`Delete ${title}`}
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

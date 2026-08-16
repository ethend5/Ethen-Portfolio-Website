"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { deleteSkill } from "./actions";

interface Props {
  id: string;
  name: string;
}

export default function DeleteSkillButton({ id, name }: Props) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    startTransition(() => {
      deleteSkill(id);
    });
  }

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      aria-label={`Delete ${name}`}
      className="flex items-center gap-1.5 rounded-md border border-white/10 px-3 py-1.5
                 text-sm text-red-400/80 hover:text-red-400 hover:border-red-400/40
                 disabled:opacity-60 disabled:cursor-not-allowed
                 transition-colors duration-200"
    >
      <Trash2 size={13} />
      {isPending ? "Deleting…" : "Delete"}
    </button>
  );
}

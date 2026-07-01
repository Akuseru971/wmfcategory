"use client";

import type { ActiveFilterChip } from "@/lib/filters";

interface ActiveFilterChipsProps {
  chips: ActiveFilterChip[];
  onRemove: (chip: ActiveFilterChip) => void;
  onClearAll: () => void;
}

export default function ActiveFilterChips({ chips, onRemove, onClearAll }: ActiveFilterChipsProps) {
  if (chips.length === 0) return null;

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-2">
      <div className="flex shrink-0 items-center gap-2">
        {chips.map((chip) => (
          <button
            key={chip.id}
            type="button"
            onClick={() => onRemove(chip)}
            className="active-chip press flex shrink-0 items-center gap-1.5 rounded-full border border-mist bg-cloud px-3 py-1.5 text-[11px] text-ink transition-colors hover:border-silver"
          >
            <span>{chip.label}</span>
            <svg className="h-3 w-3 text-silver" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M3 3l6 6M9 3L3 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onClearAll}
        className="press shrink-0 text-[11px] text-silver underline-offset-2 transition-colors hover:text-ink hover:underline"
      >
        すべて解除
      </button>
    </div>
  );
}

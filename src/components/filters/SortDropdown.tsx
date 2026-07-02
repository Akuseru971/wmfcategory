"use client";

import { useEffect, useRef, useState } from "react";
import type { SortOption, SortType } from "@/data/types";

interface SortDropdownProps {
  value: SortType;
  options: SortOption[];
  onChange: (sort: SortType) => void;
}

export default function SortDropdown({ value, options, onChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.id === value);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="catalog-btn press flex h-9 items-center gap-1.5 px-3.5 text-[12px] text-ink"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="text-silver">並び順:</span>
        <span className="font-medium">{current?.label}</span>
        <svg
          className={`h-3.5 w-3.5 text-graphite transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          className="sort-dropdown absolute right-0 top-[calc(100%+4px)] z-50 min-w-[160px] border border-mist bg-paper py-1 shadow-lg"
        >
          {options.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                role="option"
                aria-selected={value === option.id}
                onClick={() => {
                  onChange(option.id);
                  setOpen(false);
                }}
                className={`press flex w-full items-center justify-between px-4 py-2.5 text-left text-[12px] transition-colors ${
                  value === option.id
                    ? "bg-cloud font-medium text-ink"
                    : "text-graphite hover:bg-cloud hover:text-ink"
                }`}
              >
                {option.label}
                {value === option.id && (
                  <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

"use client";

import { useEffect } from "react";
import type { SortOption, SortType } from "@/data/types";

interface SortBottomSheetProps {
  open: boolean;
  onClose: () => void;
  value: SortType;
  options: SortOption[];
  onChange: (sort: SortType) => void;
}

export default function SortBottomSheet({
  open,
  onClose,
  value,
  options,
  onChange,
}: SortBottomSheetProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] md:hidden">
      <div className="drawer-backdrop absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-paper pb-[max(1rem,env(safe-area-inset-bottom))] shadow-2xl">
        <div className="border-b border-mist px-4 py-4">
          <h2 className="text-[15px] font-medium text-ink">並び順</h2>
        </div>
        <ul className="py-2">
          {options.map((option) => (
            <li key={option.id}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.id);
                  onClose();
                }}
                className={`press flex w-full items-center justify-between px-5 py-3.5 text-left text-[14px] ${
                  value === option.id ? "bg-cloud font-medium text-ink" : "text-graphite"
                }`}
              >
                {option.label}
                {value === option.id && (
                  <svg className="h-4 w-4" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6l2.5 2.5 4.5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

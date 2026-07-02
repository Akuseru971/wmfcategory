"use client";

import { useEffect } from "react";
import FilterPanel from "./FilterPanel";
import { EMPTY_FILTERS, type ProductFilters } from "@/lib/filters";
import type { CategoryConfig } from "@/data/types";

interface FilterSidebarProps {
  config: CategoryConfig;
  open: boolean;
  onClose: () => void;
  draftFilters: ProductFilters;
  onDraftChange: (filters: ProductFilters) => void;
  onApply: () => void;
  previewCount: number;
}

export default function FilterSidebar({
  config,
  open,
  onClose,
  draftFilters,
  onDraftChange,
  onApply,
  previewCount,
}: FilterSidebarProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] hidden md:block">
      <div className="drawer-backdrop absolute inset-0" onClick={onClose} aria-hidden="true" />
      <aside
        className="filter-sidebar absolute left-0 top-0 flex h-full w-[380px] max-w-[90vw] flex-col bg-paper shadow-2xl"
        role="dialog"
        aria-label="絞り込み"
      >
        <div className="flex items-center justify-between border-b border-mist px-6 py-4">
          <h2 className="text-[15px] font-medium text-ink">Filter</h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onDraftChange(EMPTY_FILTERS)}
              className="press text-[12px] text-silver transition-colors hover:text-ink"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onClose}
              className="press flex h-9 w-9 items-center justify-center text-ink"
              aria-label="閉じる"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <FilterPanel
          config={config}
          filters={draftFilters}
          onChange={onDraftChange}
          previewCount={previewCount}
        />

        <div className="border-t border-mist p-5">
          <button
            type="button"
            onClick={onApply}
            className="btn-primary press flex h-11 w-full items-center justify-center text-[13px] font-medium"
          >
            絞り込む（{previewCount}件）
          </button>
        </div>
      </aside>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import FilterPanel from "./FilterPanel";
import { EMPTY_FILTERS, type ProductFilters } from "@/lib/filters";

interface FilterBottomSheetProps {
  open: boolean;
  onClose: () => void;
  draftFilters: ProductFilters;
  onDraftChange: (filters: ProductFilters) => void;
  onApply: () => void;
  previewCount: number;
}

export default function FilterBottomSheet({
  open,
  onClose,
  draftFilters,
  onDraftChange,
  onApply,
  previewCount,
}: FilterBottomSheetProps) {
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
      <div className="filter-sheet absolute bottom-0 left-0 right-0 flex max-h-[92vh] flex-col rounded-t-2xl bg-paper shadow-2xl">
        <div className="flex items-center justify-between border-b border-mist px-4 py-4">
          <h2 className="text-[15px] font-medium text-ink">Filter</h2>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onDraftChange(EMPTY_FILTERS)}
              className="press text-[12px] text-silver"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={onClose}
              className="press flex h-9 w-9 items-center justify-center"
              aria-label="閉じる"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden">
          <FilterPanel filters={draftFilters} onChange={onDraftChange} previewCount={previewCount} />
        </div>

        <div className="border-t border-mist bg-paper p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            onClick={onApply}
            className="btn-primary press flex h-12 w-full items-center justify-center text-[13px] font-medium"
          >
            {previewCount}件の商品を表示
          </button>
        </div>
      </div>
    </div>
  );
}

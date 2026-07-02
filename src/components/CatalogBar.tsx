"use client";

import ActiveFilterChips from "@/components/filters/ActiveFilterChips";
import SortDropdown from "@/components/filters/SortDropdown";
import type { ActiveFilterChip } from "@/lib/filters";
import type { SortType } from "@/data/products";

interface CatalogBarProps {
  totalCount: number;
  totalCatalog: number;
  sortType: SortType;
  onSortChange: (sort: SortType) => void;
  onFilterOpen: () => void;
  onSortOpen: () => void;
  activeChips: ActiveFilterChip[];
  onRemoveChip: (chip: ActiveFilterChip) => void;
  onClearAll: () => void;
}

export default function CatalogBar({
  totalCount,
  totalCatalog,
  sortType,
  onSortChange,
  onFilterOpen,
  onSortOpen,
  activeChips,
  onRemoveChip,
  onClearAll,
}: CatalogBarProps) {
  return (
    <div className="sticky top-[3.75rem] z-40 border-b border-mist bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        {/* Mobile bar */}
        <div className="flex items-center justify-between py-3 md:hidden">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onFilterOpen}
              className="press flex h-9 items-center gap-1.5 border border-mist px-3 text-[12px] font-medium text-ink"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              Filter
            </button>
            <button
              type="button"
              onClick={onSortOpen}
              className="press flex h-9 items-center gap-1.5 border border-mist px-3 text-[12px] font-medium text-ink"
            >
              Sort
            </button>
          </div>
          <p className="text-[12px] text-graphite">
            <span className="font-medium text-ink">{totalCount}</span>件
          </p>
        </div>

        {/* Desktop bar */}
        <div className="hidden items-center gap-4 py-4 md:flex">
          <button
            type="button"
            onClick={onFilterOpen}
            className="press flex h-9 shrink-0 items-center gap-2 border border-ink bg-ink px-4 text-[12px] font-medium text-paper"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
              <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Filter
          </button>

          <p className="shrink-0 text-[13px] font-medium text-ink">
            全<span className="mx-0.5">{totalCount}</span>商品
            {totalCount !== totalCatalog && (
              <span className="ml-1 text-[11px] font-normal text-silver">/ {totalCatalog}</span>
            )}
          </p>

          <div className="min-w-0 flex-1">
            <ActiveFilterChips
              chips={activeChips}
              onRemove={onRemoveChip}
              onClearAll={onClearAll}
            />
          </div>

          <SortDropdown value={sortType} onChange={onSortChange} />
        </div>

        {/* Mobile chips */}
        <div className="md:hidden">
          <ActiveFilterChips
            chips={activeChips}
            onRemove={onRemoveChip}
            onClearAll={onClearAll}
          />
        </div>
      </div>
    </div>
  );
}

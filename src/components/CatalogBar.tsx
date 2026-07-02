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

function FilterIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
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
  const hasChips = activeChips.length > 0;

  return (
    <div className="sticky top-[3.75rem] z-40 border-b border-mist bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8">
        {/* Single toolbar — responsive order, no duplicate DOM */}
        <div className="flex items-center gap-2 py-2.5 md:gap-4 md:py-3">
          <p className="order-2 ml-auto shrink-0 text-[12px] font-medium text-ink md:order-1 md:ml-0 md:text-[13px]">
            全<span className="mx-0.5">{totalCount}</span>商品
            {totalCount !== totalCatalog && (
              <span className="ml-1 text-[11px] font-normal text-silver">/ {totalCatalog}</span>
            )}
          </p>

          {hasChips && (
            <div className="order-3 hidden min-w-0 flex-1 md:order-2 md:block">
              <ActiveFilterChips chips={activeChips} onRemove={onRemoveChip} onClearAll={onClearAll} />
            </div>
          )}

          <div className="order-1 flex shrink-0 items-center gap-2 md:order-3">
            <button
              type="button"
              onClick={onFilterOpen}
              className="press flex h-9 items-center gap-1.5 border border-mist px-3 text-[12px] font-medium text-ink md:gap-2 md:border-ink md:bg-ink md:px-4 md:text-paper"
            >
              <FilterIcon />
              Filter
            </button>

            <button
              type="button"
              onClick={onSortOpen}
              className="press flex h-9 items-center gap-1.5 border border-mist px-3 text-[12px] font-medium text-ink md:hidden"
            >
              Sort
            </button>

            <div className="hidden md:block">
              <SortDropdown value={sortType} onChange={onSortChange} />
            </div>
          </div>
        </div>

        {hasChips && (
          <div className="border-t border-mist/60 pb-2 md:hidden">
            <ActiveFilterChips chips={activeChips} onRemove={onRemoveChip} onClearAll={onClearAll} />
          </div>
        )}
      </div>
    </div>
  );
}

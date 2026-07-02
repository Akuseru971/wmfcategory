"use client";

import ActiveFilterChips from "@/components/filters/ActiveFilterChips";
import SortDropdown from "@/components/filters/SortDropdown";
import type { ActiveFilterChip } from "@/lib/filters";
import type { SortOption, SortType } from "@/data/types";

interface CatalogBarProps {
  totalCount: number;
  totalCatalog: number;
  sortType: SortType;
  sortOptions: SortOption[];
  onSortChange: (sort: SortType) => void;
  onFilterOpen: () => void;
  onSortOpen: () => void;
  activeChips: ActiveFilterChip[];
  onRemoveChip: (chip: ActiveFilterChip) => void;
  onClearAll: () => void;
}

function FilterIcon() {
  return (
    <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6h16M7 12h10M10 18h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CatalogButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="catalog-btn press flex h-9 shrink-0 items-center gap-1.5 px-3.5 text-[12px] font-medium text-ink"
    >
      {children}
    </button>
  );
}

function ProductCount({
  totalCount,
  totalCatalog,
}: {
  totalCount: number;
  totalCatalog: number;
}) {
  return (
    <p className="shrink-0 text-[12px] font-medium text-ink md:text-[13px]">
      全<span className="mx-0.5">{totalCount}</span>商品
      {totalCount !== totalCatalog && (
        <span className="ml-1 text-[11px] font-normal text-silver">/ {totalCatalog}</span>
      )}
    </p>
  );
}

export default function CatalogBar({
  totalCount,
  totalCatalog,
  sortType,
  sortOptions,
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
        {/* Mobile toolbar */}
        <div className="flex items-center justify-between gap-3 py-2.5 md:hidden">
          <div className="flex items-center gap-2.5">
            <CatalogButton onClick={onFilterOpen} ariaLabel="フィルター">
              <FilterIcon />
              <span>Filter</span>
            </CatalogButton>
            <CatalogButton onClick={onSortOpen} ariaLabel="並び順">
              <span>Sort</span>
            </CatalogButton>
          </div>
          <ProductCount totalCount={totalCount} totalCatalog={totalCatalog} />
        </div>

        {/* Desktop toolbar */}
        <div className="hidden items-center justify-between gap-4 py-3 md:flex">
          <ProductCount totalCount={totalCount} totalCatalog={totalCatalog} />

          <div className="flex shrink-0 items-center gap-2.5">
            <CatalogButton onClick={onFilterOpen} ariaLabel="フィルター">
              <FilterIcon />
              <span>Filter</span>
            </CatalogButton>
            <SortDropdown value={sortType} options={sortOptions} onChange={onSortChange} />
          </div>
        </div>

        {/* Active filter chips — separate row */}
        {hasChips && (
          <div className="border-t border-mist/60 pb-2.5 pt-2">
            <ActiveFilterChips chips={activeChips} onRemove={onRemoveChip} onClearAll={onClearAll} />
          </div>
        )}
      </div>
    </div>
  );
}
